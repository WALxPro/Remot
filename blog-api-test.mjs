import assert from 'node:assert/strict';

import { randomUUID, createHash } from 'node:crypto';

import { writeFile } from 'node:fs/promises';
import pg from 'pg';



// Local development only. Run: node blog-api-test.mjs

const base = new URL(process.env.BLOG_API_URL || 'http://localhost:3000/api/blogs');

if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname) || !['http:', 'https:'].includes(base.protocol) || base.pathname.replace(/\/$/, '') !== '/api/blogs' || base.search || base.hash) {

  throw new Error('Only a local /api/blogs endpoint is permitted.');

}

const endpoint = base.href.replace(/\/$/, '');

// Run only against a dedicated LOCAL development/test database and dev server.
const dbUrl = new URL(process.env.DATABASE_URL || '');
if (!['postgres:', 'postgresql:'].includes(dbUrl.protocol) || !['localhost','127.0.0.1','[::1]'].includes(dbUrl.hostname)) throw new Error('Local PostgreSQL only.');
if (process.env.QA_ALLOW_LOCAL_DB !== '1') throw new Error('Set QA_ALLOW_LOCAL_DB=1 only for an isolated local database.');
const password = process.env.QA_ADMIN_PASSWORD;
if (!password) throw new Error('Set QA_ADMIN_PASSWORD (never put it in the script).');
const email = process.env.QA_ADMIN_EMAIL || 'admin@studioremot.com';
const origin = base.origin;
const db = new pg.Pool({
  connectionString: dbUrl.toString(),
});let cookie = '', adminId, verifiedDb = false;
const sessionHashes = new Set();
const hash = v => createHash('sha256').update(v).digest('hex');
const localIp = '127.0.0.1';
const adminKeys = () => ['read_blogs','create_blog','update_blog','delete_blog','upload'].map(p=>`${p}:${adminId}`);
async function resetKeys(keys) { await db.query('DELETE FROM public.rate_limits WHERE key = ANY($1::text[])', [keys]); }
async function resetAdminLimits() { if (verifiedDb) await resetKeys(adminKeys()); }
async function authRequest(route, { body, raw, sendOrigin = origin, session = '', method = 'POST' } = {}) {
  const headers = {};
  if (sendOrigin !== null) headers.Origin = sendOrigin;
  if (session) headers.Cookie = session;
  if (body !== undefined || raw !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(origin + route, { method, headers, body: raw !== undefined ? raw : body === undefined ? undefined : JSON.stringify(body), redirect:'error', signal: AbortSignal.timeout(15000) });
  const json = await res.json();
  const setCookie = res.headers.get('set-cookie') || '';
  return {status:res.status,json,data:json.data,headers:res.headers,setCookie};
}
const login = (p=password, extra={}) => authRequest('/api/auth/login',{body:{email,password:p},...extra});
async function newSession() {
  const r=await login(); expect(r,200);
  const c=r.setCookie.split(';')[0];
  assert.match(c,/^admin_session=[a-f0-9]{64}$/);
  const h=hash(c.split('=')[1]); sessionHashes.add(h);
  const {rows}=await db.query('SELECT admin_id, expires_at FROM public.admin_sessions WHERE token_hash=$1',[h]);
  assert.equal(rows.length,1,'API and local database do not match');
  adminId=rows[0].admin_id; verifiedDb=true;
  return {r,c,h,expiresAt:rows[0].expires_at};
}
const token = `qa-${randomUUID().slice(0, 12)}`;

const records = new Map();

const results = [];

let baseline, fixture, a, b, oldSlug, pubTime, secondPubTime, longTitle;

const enc = encodeURIComponent;

const path = (slug) => `/${enc(slug)}`;

const search = (value, tail = '') => `?search=${enc(value)}${tail}`;

const payload = (title = `${token} Fixture`, more = {}) => ({ title, description: `${token} description`, content: '<p>Safe test content.</p>', category: `${token} category`, ...more });



async function request(method, suffix = '', body, { raw = false, track = false } = {}) {

  const options = { method, signal: AbortSignal.timeout(15000), redirect: 'error', headers: { Origin: origin, Cookie: cookie } };

  if (body !== undefined || raw) {

    options.headers['Content-Type'] = 'application/json';

    options.body = raw ? body : JSON.stringify(body);

  }

  const response = await fetch(endpoint + suffix, options);

  const text = await response.text();

  let json;

  try { json = JSON.parse(text); } catch { throw new Error(`HTTP ${response.status}: non-JSON response (${text.slice(0, 250)})`); }

  const data = json.data;

  // Track successful POSTs, including unexpected successes in negative tests.

  if (track && response.status >= 200 && response.status < 300 && data?.id && data?.slug) records.set(data.id, data.slug);

  if (method === 'PATCH' && data?.id && data?.slug && records.has(data.id)) records.set(data.id, data.slug);

  return { status: response.status, json, data };

}

function expect(r, status) {

  assert.equal(r.status, status, `Expected HTTP ${status}, got ${r.status}: ${JSON.stringify(r.json).slice(0, 600)}`);

  assert.equal(r.json.success, status < 400, 'Incorrect success flag');

  return r.data;

}

function validation(r, field, message) {

  expect(r, 400);

  assert.equal(r.json.message, 'Validation failed');

  assert.ok(Array.isArray(r.json.errors), 'Missing validation errors');

  if (field !== undefined) assert.ok(r.json.errors.some(e => e.field === field && (!message || e.message.includes(message))), `Missing issue for ${field}: ${JSON.stringify(r.json.errors)}`);

}

async function list(suffix = '') {

  const d = expect(await request('GET', suffix), 200);

  assert.ok(Array.isArray(d.blogs));

  assert.ok(d.pagination);

  assert.equal(d.pagination.totalPages, Math.ceil(d.pagination.total / d.pagination.limit));

  assert.ok(d.blogs.length <= d.pagination.limit);

  return d;

}

async function create(body) {

  const d = expect(await request('POST', '', body, { track: true }), 201);

  assert.ok(d.id && d.slug);

  assert.match(d.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);

  assert.ok(d.slug.length <= 255);

  return d;

}

async function patch(record, body, status = 200) {

  assert.ok(record?.id && records.has(record.id), 'No owned fixture; refusing PATCH');

  const r = await request('PATCH', path(records.get(record.id)), body);

  if (status === 200) { const d = expect(r, 200); assert.equal(d.id, record.id); Object.assign(record, d); }

  else expect(r, status);

  return r;

}

async function read(record) {

  assert.ok(record?.id && records.has(record.id));

  const d = expect(await request('GET', path(records.get(record.id))), 200);

  assert.equal(d.id, record.id);

  return d;

}

async function remove(record) {

  assert.ok(record?.id && records.has(record.id), 'Refusing to delete an untracked record');

  const slug = records.get(record.id);

  // Guard against slug reuse or accidental deletion of an unrelated record.

  const check = await request('GET', path(slug));

  if (check.status === 404) { records.delete(record.id); return slug; }

  assert.equal(expect(check, 200).id, record.id, 'Slug belongs to a different record; refusing DELETE');

  const d = expect(await request('DELETE', path(slug)), 200);

  assert.equal(d.id, record.id);

  records.delete(record.id);

  return slug;

}

async function test(id, name, fn) {

  try { if (!id.startsWith('A') && !id.startsWith('R')) await resetAdminLimits(); const detail = await fn(); results.push({ id, name, status: 'PASS', detail: detail || '' }); console.log(`PASS   ${id} ${name}`); }

  catch (e) { results.push({ id, name, status: 'FAIL', detail: String(e.message).replaceAll(password,'[REDACTED]') }); console.log(`FAIL   ${id} ${name}: ${String(e.message).replaceAll(password,'[REDACTED]')}`); }

}

function skip(id, name, detail, status = 'BLOCKED') { results.push({ id, name, status, detail }); console.log(`${status} ${id} ${name}: ${detail}`); }

const edge = (n, name, fn) => test(String(n).padStart(2, '0'), name, fn);

const badList = (n, name, q, field) => edge(n, name, async () => validation(await request('GET', q), field));

const badPatch = (n, name, body, field, msg) => edge(n, name, async () => validation(await patch(fixture, body, 400), field, msg));

const badPost = (n, name, body, field) => edge(n, name, async () => validation(await request('POST', '', body, { track: true }), field));

const noMatch = async (value) => { const d = await list(search(value)); assert.equal(d.pagination.total, 0); assert.equal(d.blogs.length, 0); };

const owns = (d, r) => assert.ok(d.blogs.some(x => x.id === r.id), 'Expected fixture not returned');

const missing = `${token}-missing`;



async function run() {

  baseline = (await list('?limit=100')).pagination.total;

  fixture = await create(payload());

  // Repeat current CRUD and slug smoke tests using owned records.

  await test('B01', 'Create draft (default)', async () => { assert.equal(fixture.status, 'draft'); assert.equal(fixture.publishedAt, null); });

  await test('B02/S01', 'Create published and auto-generate slug', async () => { a = await create(payload(`${token} PostgreSQL`, { status: 'published' })); assert.equal(a.slug, `${token}-postgresql`); assert.ok(a.publishedAt); });

  await test('B03/B04', 'GET list and detail', async () => { owns(await list(search(token)), fixture); assert.equal((await read(fixture)).title, fixture.title); });

  await test('B05/S02', 'Rename published blog', async () => { const id = a.id, timestamp = a.publishedAt, previous = a.slug; await patch(a, { title: `${token} PostgreSQL Guide` }); assert.equal(a.id, id); assert.equal(a.slug, `${token}-postgresql-guide`); assert.equal(a.publishedAt, timestamp); expect(await request('GET', path(previous)), 404); });

  await test('S03', 'Duplicate title suffix', async () => { b = await create(payload(`${token} PostgreSQL Guide`)); assert.equal(b.slug, `${a.slug}-2`); assert.notEqual(a.id, b.id); });

  await test('S04', 'Non-title edit preserves slug', async () => { const slug = b.slug; await patch(b, { description: `${token} revised description` }); assert.equal(b.slug, slug); });

  await test('B06', 'Delete owned record', async () => { const temp = await create(payload(`${token} delete smoke`)); const slug = await remove(temp); expect(await request('GET', path(slug)), 404); });

  await test('B07/B08', 'Basic search and pagination', async () => { const d = await list(search(token, '&limit=1')); assert.equal(d.blogs.length, 1); assert.equal(d.pagination.total, 3); });

  await test('B09', 'Historical manual slug behavior replaced by strict validation', async () => validation(await request('POST', '', payload(`${token} manual`, { slug: 'manual' }), { track: true }), '', 'Unrecognized key'));

  await test('B10', 'Empty title', async () => validation(await patch(fixture, { title: '' }, 400), 'title'));

  await test('B11', 'Published to draft', async () => { await patch(a, { status: 'draft' }); assert.equal(a.publishedAt, null); });

  await test('B12', 'Missing blog and initial sanitization', async () => { expect(await request('GET', path(missing)), 404); await patch(fixture, { content: '<p>Safe</p><script>void(0)</script>' }); assert.equal(fixture.content, '<p>Safe</p>'); });



  for (const [n, name, q, field] of [

    [1,'Limit > 100','?page=1&limit=101','limit'],[2,'Zero limit','?limit=0','limit'],[3,'Negative limit','?limit=-10','limit'],[4,'Text limit','?limit=abc','limit'],[5,'Decimal limit','?limit=2.5','limit'],[6,'Zero page','?page=0','page'],[7,'Negative page','?page=-1','page'],[8,'Text page','?page=abc','page'],

  ]) await badList(n,name,q,field);

  await edge(9,'Nonexistent page',async()=>{ const d=await list(search(token,'&page=999&limit=10')); assert.equal(d.blogs.length,0); assert.equal(d.pagination.total,3); });

  await edge(10,'Multiple pages',async()=>{ const p1=await list(search(token,'&page=1&limit=1')),p2=await list(search(token,'&page=2&limit=1')); assert.equal(p2.pagination.total,3); assert.equal(p2.blogs.length,1); assert.notEqual(p1.blogs[0].id,p2.blogs[0].id); });

  await badList(11,'Unsafe integer page','?page=999999999999999999&limit=10','page');

  await edge(12,'Maximum limit',async()=>{const d=await list(search(token,'&limit=100'));assert.equal(d.blogs.length,3);assert.equal(d.pagination.limit,100);});

  await badList(13,'Decimal page','?page=1.5','page');

  await badList(14,'Offset overflow protection','?page=9007199254740991&limit=100','page');

  await edge(15,'Maximum page',async()=>{const d=await list(search(token,'&page=10000&limit=100'));assert.equal(d.blogs.length,0);assert.equal(d.pagination.page,10000);});

  await badList(16,'Above maximum page','?page=10001','page');

  await edge(17,'Case-insensitive search',async()=>{const d=await list(search(token.toUpperCase()));assert.equal(d.pagination.total,3);owns(d,fixture);});

  await edge(18,'Nonexistent search',()=>noMatch(missing));

  await edge(19,'Empty search',async()=>{const d=await list('?search=');assert.equal(d.pagination.total,baseline+records.size);});

  await edge(20,'Whitespace search',async()=>{const d=await list(search('   '));assert.equal(d.pagination.total,baseline+records.size);});

  // Scoped queries prevent assumptions about existing blogs containing special characters.

  for(const [n,name,char] of [[21,'Special characters','@#$!'],[22,'Literal percent','%'],[23,'Literal underscore','_'],[24,'Literal backslash','\\\\']]) await edge(n,name,()=>noMatch(`${token}${char}`));

  await edge(25,'Normal search regression',async()=>{const d=await list(search(`${token} PostgreSQL`));assert.equal(d.pagination.total,2);owns(d,a);owns(d,b);});

  await edge(26,'Apostrophe search',()=>noMatch(`${token} O'Reilly`));

  await edge(27,'Emoji search',()=>noMatch(`${token} 😀`));

  await badList(28,'Search > 255 characters',search('a'.repeat(260)),'search');

  await edge(29,'Search page 1',async()=>{const d=await list(search(`${token} PostgreSQL`,'&page=1&limit=1'));assert.equal(d.pagination.total,2);assert.equal(d.blogs.length,1);assert.equal(d.blogs[0].id,b.id);});

  await edge(30,'Search page 2',async()=>{const d=await list(search(`${token} PostgreSQL`,'&page=2&limit=1'));assert.equal(d.pagination.total,2);assert.equal(d.blogs[0].id,a.id);});

  await edge(31,'SQL-like search treated as literal',()=>noMatch("' OR 1=1 --"));

  await edge(32,'Empty POST object',async()=>{const r=await request('POST','',{}, {track:true});for(const f of ['title','description','content','category']) validation(r,f);});

  await test('J01','Blank JSON request',async()=>{const r=await request('POST','','',{raw:true,track:true});expect(r,400);assert.equal(r.json.message,'Invalid JSON request');});

  await badPatch(33,'Empty PATCH object',{},'','At least one field');

  await badPatch(34,'Unknown field',{unknownField:'test'},'','Unrecognized key');

  await badPatch(35,'Invalid status',{status:'active'},'status');

  await badPatch(36,'Invalid image URL',{featuredImage:'invalid-image-url'},'featuredImage');

  await badPatch(37,'Manual slug',{slug:'custom-slug'},'','Unrecognized key');

  await badPatch(38,'Manual UUID',{id:randomUUID()},'','Unrecognized key');

  await edge(39,'Invalid slug',async()=>validation(await request('GET','/Invalid_Slug'),'','Invalid slug format'));

  await edge(40,'Update nonexistent blog',async()=>expect(await request('PATCH',path(missing),{title:`${token} Missing`}),404)&&undefined);

  await edge(41,'Delete nonexistent blog',async()=>{assert.equal((await request('GET',path(missing))).status,404);expect(await request('DELETE',path(missing)),404);});

  await badPatch(42,'Whitespace title',{title:'   '},'title');

  await badPatch(43,'Title too long',{title:'a'.repeat(260)},'title');

  await badPatch(44,'Category too long',{category:'a'.repeat(104)},'category');

  await badPatch(45,'Meta title too long',{metaTitle:'a'.repeat(260)},'metaTitle');

  await badPatch(46,'Numeric title',{title:12345},'title');

  await badPatch(47,'Null title',{title:null},'title');

  await badPatch(48,'Whitespace description',{description:'   '},'description');

  await badPatch(49,'Whitespace category',{category:'   '},'category');

  await badPatch(50,'Whitespace content',{content:'   '},'content');

  await badPost(51,'Null POST',null,'');

  await badPost(52,'Array POST',[],'');

  await edge(53,'Default draft',async()=>{const d=await create(payload(`${token} default`));assert.equal(d.status,'draft');assert.equal(d.publishedAt,null);});

  await badPost(54,'Manual slug on POST',payload(`${token} manual`,{slug:'manual'}),'');

  await edge(55,'Save optional fields',async()=>{const fields={featuredImage:'https://example.com/test.jpg',metaTitle:'QA title',metaDescription:'QA description'};await patch(fixture,fields);for(const [k,v] of Object.entries(fields))assert.equal(fixture[k],v);});

  await edge(56,'Clear optional fields',async()=>{const fields={featuredImage:null,metaTitle:null,metaDescription:null};await patch(fixture,fields);for(const k of Object.keys(fields))assert.equal(fixture[k],null);});

  await edge(57,'Publish',async()=>{await patch(fixture,{status:'published'});assert.equal(fixture.status,'published');assert.ok(fixture.publishedAt);pubTime=fixture.publishedAt;});

  await edge(58,'Publish again preserves timestamp',async()=>{await patch(fixture,{status:'published'});assert.ok(pubTime);assert.equal(fixture.publishedAt,pubTime);});

  await edge(59,'Unpublish',async()=>{await patch(fixture,{status:'draft'});assert.equal(fixture.status,'draft');assert.equal(fixture.publishedAt,null);});

  await edge(60,'Republish sets new timestamp',async()=>{await new Promise(r=>setTimeout(r,20));await patch(fixture,{status:'published'});secondPubTime=fixture.publishedAt;assert.ok(secondPubTime);assert.ok(Date.parse(secondPubTime)>Date.parse(pubTime));});

  await edge(61,'Read persisted fields',async()=>{const d=await read(fixture);for(const k of ['title','slug','status','publishedAt','featuredImage','metaTitle','metaDescription'])assert.equal(d[k],fixture[k]);});

  await edge(62,'Delete disposable blog',async()=>{oldSlug=await remove(fixture);});

  await edge(63,'Delete same blog twice',async()=>{assert.ok(oldSlug);assert.equal((await request('GET',path(oldSlug))).status,404);expect(await request('DELETE',path(oldSlug)),404);});

  await edge(64,'GET deleted blog',async()=>{assert.ok(oldSlug);expect(await request('GET',path(oldSlug)),404);});

  fixture=await create(payload(`${token} Security Fixture`));

  const hello=`${token}-hello-world`;

  for(const [n,title,slug] of [[65,'Hello World',hello],[66,'HELLO WORLD',`${hello}-2`],[67,'Hello    World',`${hello}-3`],[68,'Hello---World',`${hello}-4`],[69,'UI/UX Design',`${token}-uiux-design`],[70,'Next.js',`${token}-nextjs`],[71,'Café',`${token}-cafe`]]) await edge(n,`Slug: ${title}`,async()=>{const d=await create(payload(`${token} ${title}`));assert.equal(d.slug,slug);});

  for(const [n,title] of [[72,'@#$!'],[73,'سلام']]) await edge(n,`Fallback slug: ${title}`,async()=>{const d=await create(payload(title));assert.match(d.slug,/^blog(?:-\d+)?$/);return 'Current fallback policy verified; Unicode/punctuation policy remains a product decision.';});

  longTitle=token+'a'.repeat(255-token.length);

  await edge(74,'255-character title',async()=>{const d=await create(payload(longTitle));assert.equal(d.slug.length,255);});

  await edge(75,'255-character duplicate title',async()=>{const d=await create(payload(longTitle));assert.equal(d.slug.length,255);assert.ok(d.slug.endsWith('-2'));});

  await edge(76,'Rename to existing title',async()=>{oldSlug=fixture.slug;await patch(fixture,{title:`${token} Hello World`});assert.equal(fixture.slug,`${hello}-5`);});

  await edge(77,'Unchanged title',async()=>{const slug=fixture.slug;await patch(fixture,{title:fixture.title});assert.equal(fixture.slug,slug);});

  await edge(78,'Changed title with same normalized base',async()=>{const slug=fixture.slug;await patch(fixture,{title:`${token} HELLO WORLD`});assert.equal(fixture.slug,slug);});

  await edge(79,'Previous slug 404',async()=>{assert.ok(oldSlug);expect(await request('GET',path(oldSlug)),404);await read(fixture);});

  await edge(80,'Concurrent duplicate creation',async()=>{const p=payload(`${token} concurrent`);const rs=await Promise.all([request('POST','',p,{track:true}),request('POST','',p,{track:true})]);assert.ok(rs.every(r=>[201,409].includes(r.status)));const created=rs.filter(r=>r.status===201);assert.ok(created.length>=1);assert.equal(new Set(created.map(r=>r.data.slug)).size,created.length);return `${created.length}/2 created; 409 is allowed by current policy, automatic retry not required by this test.`;});

  const sanitizeTests=[

    [81,'Remove script','<p>Safe</p><script>void(0)</script>',v=>assert.equal(v,'<p>Safe</p>')],

    [82,'Remove event attribute','<p onclick="void(0)">Safe</p>',v=>assert.equal(v,'<p>Safe</p>')],

    [83,'Remove unsafe link','<a href="javascript:void(0)">Link</a>',v=>{assert.ok(v.includes('Link'));assert.ok(!v.includes('href='));}],

    [84,'Preserve image, remove event','<img src="https://example.com/test.jpg" alt="QA" onerror="void(0)">',v=>{assert.ok(v.includes('https://example.com/test.jpg'));assert.ok(!v.includes('onerror'));}],

    [85,'Preserve formatting','<p><strong>Bold</strong> <em>Italic</em></p>',v=>assert.equal(v,'<p><strong>Bold</strong> <em>Italic</em></p>')],

    [86,'Preserve safe URL','<a href="https://example.com">Safe link</a>',v=>assert.ok(v.includes('href="https://example.com"'))],

    [87,'Remove protocol-relative URL','<a href="//example.com">Link</a>',v=>{assert.ok(v.includes('Link'));assert.ok(!v.includes('href='));}],

  ];

  for(const [n,name,content,check] of sanitizeTests)await edge(n,name,async()=>{await patch(fixture,{content});check(fixture.content);check((await read(fixture)).content);});

  // Desired security policies: failures here are real findings, not runner errors.

  await badPatch(88,'Reject empty sanitized content',{content:'<script>void(0)</script>'},undefined);

  await badPatch(89,'Reject visually empty content',{content:'<p>&nbsp;</p>'},undefined);

  await badPatch(90,'Reject non-HTTP image URL',{featuredImage:'javascript:void(0)'},undefined);

  await badPatch(91,'Reject FTP image URL',{featuredImage:'ftp://example.com/test.jpg'},undefined);

  await badPatch(92,'Reject null character in text',{description:`${token}\u0000`},undefined);

  await badList(93,'Reject null character in search','?search=%00',undefined);

  await edge(94,'Blog request size limit',async()=>expect(await request('POST','',JSON.stringify({content:'x'.repeat(1024*1024)}),{raw:true,track:true}),413));

  skip('95','Controlled database failure','Requires manual database shutdown/recovery; not safe in shared runner.');

  await edge(96,'Malformed slug variants',async()=>{for(const method of ['GET','PATCH','DELETE'])for(const slug of [`${token}_bad`,`${token}--bad`,`${token.toUpperCase()}`]){const r=await request(method,path(slug),method==='PATCH'?{title:`${token} invalid`}:undefined);validation(r,'','Invalid slug format');}});

  await edge(97,'Search by category',async()=>{const d=await create(payload(`${token} category test`,{category:`${token}-category-only`}));owns(await list(search(`${token}-category-only`)),d);});

  await edge(98,'Search by description',async()=>{const d=await create(payload(`${token} description test`,{description:`${token}-description-only`}));owns(await list(search(`${token}-description-only`)),d);});

  await edge(99,'Search exactly 255 characters',async()=>{const d=await list(search(longTitle));assert.ok(d.pagination.total>=2);});

  await edge(100,'Search beyond last page',async()=>{const d=await list(search(`${token}-description-only`,'&page=2&limit=1'));assert.equal(d.blogs.length,0);assert.equal(d.pagination.total,1);});

  await edge(101,'Positive literal wildcard matches',async()=>{const d=await create(payload(`${token} 100%_literal`));for(const c of ['%','_']){const found=await list(search(`${token} 100${c==='_'?'%_':'%'}`));owns(found,d);assert.equal(found.pagination.total,1);}for(const c of ['%','_']){const found=await list(search(c,'&limit=100'));if(found.pagination.total<=100)owns(found,d);assert.ok(!found.blogs.some(x=>x.id===a.id||x.id===b.id));}});

  await edge(102,'Empty numeric query parameters',async()=>{const r=await request('GET','?page=&limit=');validation(r,'page');validation(r,'limit');});

  for(const [n,name,q] of [[103,'Scientific/hex query syntax','?page=1e2&limit=0x10'],[104,'Duplicate page parameters','?page=1&page=2']]){try{const r=await request('GET',q);assert.ok([200,400].includes(r.status));skip(String(n),name,`HTTP ${r.status}; ${JSON.stringify(r.data?.pagination||r.json.errors)}. Decide desired parsing policy.`,'REVIEW');}catch(e){results.push({id:String(n),name,status:'FAIL',detail:String(e.message).replaceAll(password,'[REDACTED]')});}}

  skip('105','Empty database list','Requires isolated empty database; existing records will not be deleted.');

}



async function securityTests() {
  await test('A01','Valid login, cookie attributes and 24h expiry',async()=>{
    const {r,c,expiresAt}=await newSession(); cookie=c;
    assert.match(r.setCookie,/;\s*HttpOnly/i); assert.match(r.setCookie,/;\s*SameSite=Strict/i); assert.match(r.setCookie,/;\s*Path=\/(?:;|$)/i);
    assert.doesNotMatch(r.setCookie,/;\s*(Secure|Domain=)/i);
    assert.ok(Math.abs(Date.parse(expiresAt)-Date.now()-86400000)<60000);
    assert.equal(r.data.admin.id,adminId);
    assert.deepEqual(Object.keys(r.data.admin).sort(),['email','id']);
    assert.deepEqual(Object.keys(r.data),['admin']);
  });
  if(!verifiedDb || !cookie) throw new Error('Login/database verification failed; refusing database changes and CRUD tests.');
  await resetKeys(['login:'+localIp,'logout:'+localIp]);
  await test('A02','Unauthenticated protected endpoints',async()=>{
    for(const [method,route] of [['GET','/api/blogs'],['POST','/api/blogs'],['GET','/api/blogs/'+missing],['PATCH','/api/blogs/'+missing],['DELETE','/api/blogs/'+missing],['POST','/api/upload']]) expect(await authRequest(route,{method}),401);
  });
  await test('A03','Invalid cookie rejected',async()=>expect(await authRequest('/api/blogs',{method:'GET',session:'admin_session='+ 'f'.repeat(64)}),401));
  await test('A04','Missing and foreign origins rejected',async()=>{
    for(const sendOrigin of [null,'https://example.invalid']) for(const [method,route] of [['POST','/api/auth/login'],['POST','/api/auth/logout'],['POST','/api/blogs'],['PATCH','/api/blogs/'+missing],['DELETE','/api/blogs/'+missing],['POST','/api/upload']]) expect(await authRequest(route,{method,sendOrigin,session:cookie}),403);
    expect(await authRequest('/api/blogs',{method:'GET',sendOrigin:null,session:cookie}),200);
  });
  await test('A05','Login invalid input and strict schema',async()=>{
    await resetKeys(['login:'+localIp]);
    for(const body of [{},{email:'bad',password:'x'},{email,password:''},{email,password:'x'.repeat(129)},{email,password,extra:true}]) validation(await authRequest('/api/auth/login',{body}));
  });
  await test('A06','Malformed and oversized login body',async()=>{
    await resetKeys(['login:'+localIp]);
    expect(await authRequest('/api/auth/login',{raw:'{'}),400);
    expect(await authRequest('/api/auth/login',{raw:JSON.stringify({password:'x'.repeat(4096)})}),413);
  });
  await test('R01','Login: five wrong attempts, sixth blocked, Retry-After',async()=>{
    await resetKeys(['login:'+localIp]);
    for(let i=0;i<5;i++) expect(await login(password==='qa-wrong-password'?'qa-other-wrong-password':'qa-wrong-password'),401);
    const r=await login(); expect(r,429); assert.ok(Number(r.headers.get('retry-after'))>0);
    const {rows}=await db.query('SELECT points,expire FROM public.rate_limits WHERE key=$1',['login:'+localIp]); assert.equal(rows.length,1); assert.ok(rows[0].points>=6);
  });
  await test('R02','Expired login counter resets',async()=>{
    await db.query('UPDATE public.rate_limits SET expire=$1 WHERE key=$2',[Date.now()-1000,'login:'+localIp]);
    expect(await login(password==='qa-wrong-password'?'qa-other-wrong-password':'qa-wrong-password'),401);
    const {rows}=await db.query('SELECT points FROM public.rate_limits WHERE key=$1',['login:'+localIp]); assert.equal(rows[0].points,1);
  });
  await test('A07','Unknown email returns generic 401',async()=>{await resetKeys(['login:'+localIp]);const r=await authRequest('/api/auth/login',{body:{email:token+'@example.invalid',password:'wrong'}});expect(r,401);assert.equal(r.json.message,'Invalid email or password.');});
  await test('A08','Expired session rejected',async()=>{
    await resetKeys(['login:'+localIp]);const {c,h}=await newSession();
    await db.query("UPDATE public.admin_sessions SET created_at=NOW()-INTERVAL '25 hours', expires_at=NOW()-INTERVAL '1 hour' WHERE token_hash=$1",[h]);
    expect(await authRequest('/api/blogs',{method:'GET',session:c}),401);
  });
  await test('A09','Logout clears cookie and revokes session',async()=>{
    await resetKeys(['login:'+localIp,'logout:'+localIp]);const {c,h}=await newSession();const r=await authRequest('/api/auth/logout',{session:c});expect(r,200);assert.match(r.setCookie,/Max-Age=0/i);
    expect(await authRequest('/api/blogs',{method:'GET',session:c}),401);
    const {rows}=await db.query('SELECT 1 FROM public.admin_sessions WHERE token_hash=$1',[h]);assert.equal(rows.length,0);
  });
  // Seed just below the configured limit, then exercise actual HTTP enforcement.
  // This avoids 120+ requests and prevents valid writes or Cloudinary uploads.
  for(const [id,prefix,limit,method,route,body,allowed] of [
    ['R03','read_blogs',120,'GET','/api/blogs',undefined,200],
    ['R04','create_blog',20,'POST','/api/blogs',{},400],
    ['R05','update_blog',30,'PATCH','/api/blogs/'+missing,{title:token},404],
    ['R06','delete_blog',10,'DELETE','/api/blogs/'+missing,undefined,404],
    ['R07','upload',20,'POST','/api/upload',undefined,null],
    ['R08','logout',10,'POST','/api/auth/logout',undefined,200]
  ]) await test(id,prefix+' limit and Retry-After',async()=>{
    const key=prefix+':'+(prefix==='logout'?localIp:adminId);
    await resetKeys([key]);
    await db.query('INSERT INTO public.rate_limits(key,points,expire) VALUES($1,$2,$3)',[key,limit-1,Date.now()+60000]);
    const call=()=>authRequest(route,{method,body,session:prefix==='logout'?'':cookie});
    try {
      const first=await call();
      if(allowed!==null) expect(first,allowed); else assert.ok([400,415,422].includes(first.status),'Upload must reject empty input with client error');
      const second=prefix==='read_blogs'?await authRequest('/api/blogs/'+missing,{method:'GET',session:cookie}):await call();
      expect(second,429);assert.ok(Number(second.headers.get('retry-after'))>0);
    } finally {await resetKeys([key]);}
  });
  await resetAdminLimits();
}

try { await securityTests(); await run(); }

catch (e) { results.push({id:'SETUP',name:'Setup or fixture creation',status:'FAIL',detail:String(e.message).replaceAll(password,'[REDACTED]')}); console.error(String(e.message).replaceAll(password,'[REDACTED]')); }

finally {

  for(const [id,slug] of [...records]) {try{await resetAdminLimits();await remove({id});}catch(e){results.push({id:'CLEANUP',name:`Cleanup ${slug}`,status:'FAIL',detail:String(e.message).replaceAll(password,'[REDACTED]')});}}

  if(baseline!==undefined)await edge(106,'Count after cleanup',async()=>{assert.equal(records.size,0,'Tracked fixtures remain');assert.equal((await list('?limit=100')).pagination.total,baseline,'Database count changed during run');});

  else skip('106','Count after cleanup','Baseline unavailable.');

  for(const [id,name] of [[107,'Public published-only list'],[108,'Public draft detail'],[109,'Public visibility'],[110,'Public URL after rename'],[111,'Admin list and UI states'],[112,'TinyMCE create/edit'],[113,'Admin delete/cancel'],[114,'Public metadata'],[115,'Production access protection']])skip(String(id),name,'Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner.');

  // Any numbered tests not reached due to setup failure must be explicitly marked blocked.

  for(let n=1;n<=115;n++){const id=String(n).padStart(2,'0');if(!results.some(r=>r.id===id))skip(id,'Not reached','An earlier setup failure prevented execution.');}

  if(verifiedDb) { try { await resetAdminLimits(); await resetKeys(['login:'+localIp,'logout:'+localIp]); await db.query('DELETE FROM public.admin_sessions WHERE token_hash = ANY($1::text[])',[[...sessionHashes]]); } catch(e) { results.push({id:'AUTH-CLEANUP',name:'Test session/counter cleanup',status:'FAIL',detail:String(e.message).replaceAll(password,'[REDACTED]')}); } }
  await db.end();
  for(const id of ['A01','A02','A03','A04','A05','A06','A07','A08','A09','R01','R02','R03','R04','R05','R06','R07','R08']) if(!results.some(r=>r.id===id)) skip(id,'Security test not reached','Setup failed.');
  skip('R09','Rate limiter database unavailable','Requires controlled failure injection.');
  skip('A10','Production Secure and __Host- cookie','Requires HTTPS deployment verification.');
  skip('A11','Successful Cloudinary upload','Requires isolated Cloudinary test account and asset cleanup.');
  const counts=Object.fromEntries(['PASS','FAIL','BLOCKED','REVIEW'].map(s=>[s,results.filter(r=>r.status===s).length]));

  const report={generatedAt:new Date().toISOString(),endpoint,token,baseline,counts,remainingFixtures:[...records].map(([id,slug])=>({id,slug})),results};

  await writeFile('blog-test-results.json',JSON.stringify(report,null,2));

  const clean=v=>String(v??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');

  await writeFile('blog-test-results.md',`# Blog API automated test report\n\nRun: ${report.generatedAt}\n\n${Object.entries(counts).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\n| ID | Test | Result | Details |\n|---|---|---|---|\n${results.map(r=>`| ${clean(r.id)} | ${clean(r.name)} | ${r.status} | ${clean(r.detail)} |`).join('\n')}\n\nRemaining tracked fixtures: ${records.size}\n`);

  console.log('\nSummary:',counts,'\nReports: blog-test-results.md, blog-test-results.json');

  if(records.size)console.warn('Cleanup incomplete; verify these UUIDs before manual cleanup:',[...records]);

  process.exitCode=counts.FAIL?1:0;

}
