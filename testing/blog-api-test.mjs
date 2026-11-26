import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

// Local development only. Run: node blog-api-test.mjs
const base = new URL(process.env.BLOG_API_URL || 'http://localhost:3000/api/blogs');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname) || !['http:', 'https:'].includes(base.protocol) || base.pathname.replace(/\/$/, '') !== '/api/blogs' || base.search || base.hash) {
  throw new Error('Only a local /api/blogs endpoint is permitted.');
}
const endpoint = base.href.replace(/\/$/, '');
const token = `qa-${randomUUID().slice(0, 12)}`;
const records = new Map();
const results = [];
let baseline, fixture, a, b, oldSlug, pubTime, secondPubTime, longTitle;
const enc = encodeURIComponent;
const path = (slug) => `/${enc(slug)}`;
const search = (value, tail = '') => `?search=${enc(value)}${tail}`;
const payload = (title = `${token} Fixture`, more = {}) => ({ title, description: `${token} description`, content: '<p>Safe test content.</p>', category: `${token} category`, ...more });

async function request(method, suffix = '', body, { raw = false, track = false } = {}) {
  const options = { method, signal: AbortSignal.timeout(15000), redirect: 'error' };
  if (body !== undefined || raw) {
    options.headers = { 'Content-Type': 'application/json' };
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
  try { const detail = await fn(); results.push({ id, name, status: 'PASS', detail: detail || '' }); console.log(`PASS   ${id} ${name}`); }
  catch (e) { results.push({ id, name, status: 'FAIL', detail: e.message }); console.log(`FAIL   ${id} ${name}: ${e.message}`); }
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
  for(const [n,name,char] of [[21,'Special characters','@#$!'],[22,'Literal percent','%'],[23,'Literal underscore','_'],[24,'Literal backslash','\\']]) await edge(n,name,()=>noMatch(`${token}${char}`));
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
  skip('94','Request size limit','No size policy defined; do not send oversized bodies automatically.');
  skip('95','Controlled database failure','Requires isolated database and manual shutdown/recovery.');
  await edge(96,'Malformed slug variants',async()=>{for(const method of ['GET','PATCH','DELETE'])for(const slug of [`${token}_bad`,`${token}--bad`,`${token.toUpperCase()}`]){const r=await request(method,path(slug),method==='PATCH'?{title:`${token} invalid`}:undefined);validation(r,'','Invalid slug format');}});
  await edge(97,'Search by category',async()=>{const d=await create(payload(`${token} category test`,{category:`${token}-category-only`}));owns(await list(search(`${token}-category-only`)),d);});
  await edge(98,'Search by description',async()=>{const d=await create(payload(`${token} description test`,{description:`${token}-description-only`}));owns(await list(search(`${token}-description-only`)),d);});
  await edge(99,'Search exactly 255 characters',async()=>{const d=await list(search(longTitle));assert.ok(d.pagination.total>=2);});
  await edge(100,'Search beyond last page',async()=>{const d=await list(search(`${token}-description-only`,'&page=2&limit=1'));assert.equal(d.blogs.length,0);assert.equal(d.pagination.total,1);});
  await edge(101,'Positive literal wildcard matches',async()=>{const d=await create(payload(`${token} 100%_literal`));for(const c of ['%','_']){const found=await list(search(`${token} 100${c==='_'?'%_':'%'}`));owns(found,d);assert.equal(found.pagination.total,1);}for(const c of ['%','_']){const found=await list(search(c,'&limit=100'));if(found.pagination.total<=100)owns(found,d);assert.ok(!found.blogs.some(x=>x.id===a.id||x.id===b.id));}});
  await edge(102,'Empty numeric query parameters',async()=>{const r=await request('GET','?page=&limit=');validation(r,'page');validation(r,'limit');});
  for(const [n,name,q] of [[103,'Scientific/hex query syntax','?page=1e2&limit=0x10'],[104,'Duplicate page parameters','?page=1&page=2']]){try{const r=await request('GET',q);assert.ok([200,400].includes(r.status));skip(String(n),name,`HTTP ${r.status}; ${JSON.stringify(r.data?.pagination||r.json.errors)}. Decide desired parsing policy.`,'REVIEW');}catch(e){results.push({id:String(n),name,status:'FAIL',detail:e.message});}}
  skip('105','Empty database list','Requires isolated empty database; existing records will not be deleted.');
}

try { await run(); }
catch (e) { results.push({id:'SETUP',name:'Setup or fixture creation',status:'FAIL',detail:e.message}); console.error(e.message); }
finally {
  for(const [id,slug] of [...records]) {try{await remove({id});}catch(e){results.push({id:'CLEANUP',name:`Cleanup ${slug}`,status:'FAIL',detail:e.message});}}
  if(baseline!==undefined)await edge(106,'Count after cleanup',async()=>{assert.equal(records.size,0,'Tracked fixtures remain');assert.equal((await list('?limit=100')).pagination.total,baseline,'Database count changed during run');});
  else skip('106','Count after cleanup','Baseline unavailable.');
  for(const [id,name] of [[107,'Public published-only list'],[108,'Public draft detail'],[109,'Public visibility'],[110,'Public URL after rename'],[111,'Admin list and UI states'],[112,'TinyMCE create/edit'],[113,'Admin delete/cancel'],[114,'Public metadata'],[115,'Production access protection']])skip(String(id),name,'Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner.');
  // Any numbered tests not reached due to setup failure must be explicitly marked blocked.
  for(let n=1;n<=115;n++){const id=String(n).padStart(2,'0');if(!results.some(r=>r.id===id))skip(id,'Not reached','An earlier setup failure prevented execution.');}
  const counts=Object.fromEntries(['PASS','FAIL','BLOCKED','REVIEW'].map(s=>[s,results.filter(r=>r.status===s).length]));
  const report={generatedAt:new Date().toISOString(),endpoint,token,baseline,counts,remainingFixtures:[...records].map(([id,slug])=>({id,slug})),results};
  await writeFile('blog-test-results.json',JSON.stringify(report,null,2));
  const clean=v=>String(v??'').replace(/\|/g,'\\|').replace(/\r?\n/g,' ');
  await writeFile('blog-test-results.md',`# Blog API automated test report\n\nRun: ${report.generatedAt}\n\n${Object.entries(counts).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\n| ID | Test | Result | Details |\n|---|---|---|---|\n${results.map(r=>`| ${clean(r.id)} | ${clean(r.name)} | ${r.status} | ${clean(r.detail)} |`).join('\n')}\n\nRemaining tracked fixtures: ${records.size}\n`);
  console.log('\nSummary:',counts,'\nReports: blog-test-results.md, blog-test-results.json');
  if(records.size)console.warn('Cleanup incomplete; verify these UUIDs before manual cleanup:',[...records]);
  process.exitCode=counts.FAIL?1:0;
}
