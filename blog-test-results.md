# Blog API automated test report

Run: 2026-11-27T17:54:13.408Z

- PASS: 132
- FAIL: 0
- BLOCKED: 14
- REVIEW: 2

| ID | Test | Result | Details |
|---|---|---|---|
| A01 | Valid login, cookie attributes and 24h expiry | PASS |  |
| A02 | Unauthenticated protected endpoints | PASS |  |
| A03 | Invalid cookie rejected | PASS |  |
| A04 | Missing and foreign origins rejected | PASS |  |
| A05 | Login invalid input and strict schema | PASS |  |
| A06 | Malformed and oversized login body | PASS |  |
| R01 | Login: five wrong attempts, sixth blocked, Retry-After | PASS |  |
| R02 | Expired login counter resets | PASS |  |
| A07 | Unknown email returns generic 401 | PASS |  |
| A08 | Expired session rejected | PASS |  |
| A09 | Logout clears cookie and revokes session | PASS |  |
| R03 | read_blogs limit and Retry-After | PASS |  |
| R04 | create_blog limit and Retry-After | PASS |  |
| R05 | update_blog limit and Retry-After | PASS |  |
| R06 | delete_blog limit and Retry-After | PASS |  |
| R07 | upload limit and Retry-After | PASS |  |
| R08 | logout limit and Retry-After | PASS |  |
| B01 | Create draft (default) | PASS |  |
| B02/S01 | Create published and auto-generate slug | PASS |  |
| B03/B04 | GET list and detail | PASS |  |
| B05/S02 | Rename published blog | PASS |  |
| S03 | Duplicate title suffix | PASS |  |
| S04 | Non-title edit preserves slug | PASS |  |
| B06 | Delete owned record | PASS |  |
| B07/B08 | Basic search and pagination | PASS |  |
| B09 | Historical manual slug behavior replaced by strict validation | PASS |  |
| B10 | Empty title | PASS |  |
| B11 | Published to draft | PASS |  |
| B12 | Missing blog and initial sanitization | PASS |  |
| 01 | Limit > 100 | PASS |  |
| 02 | Zero limit | PASS |  |
| 03 | Negative limit | PASS |  |
| 04 | Text limit | PASS |  |
| 05 | Decimal limit | PASS |  |
| 06 | Zero page | PASS |  |
| 07 | Negative page | PASS |  |
| 08 | Text page | PASS |  |
| 09 | Nonexistent page | PASS |  |
| 10 | Multiple pages | PASS |  |
| 11 | Unsafe integer page | PASS |  |
| 12 | Maximum limit | PASS |  |
| 13 | Decimal page | PASS |  |
| 14 | Offset overflow protection | PASS |  |
| 15 | Maximum page | PASS |  |
| 16 | Above maximum page | PASS |  |
| 17 | Case-insensitive search | PASS |  |
| 18 | Nonexistent search | PASS |  |
| 19 | Empty search | PASS |  |
| 20 | Whitespace search | PASS |  |
| 21 | Special characters | PASS |  |
| 22 | Literal percent | PASS |  |
| 23 | Literal underscore | PASS |  |
| 24 | Literal backslash | PASS |  |
| 25 | Normal search regression | PASS |  |
| 26 | Apostrophe search | PASS |  |
| 27 | Emoji search | PASS |  |
| 28 | Search > 255 characters | PASS |  |
| 29 | Search page 1 | PASS |  |
| 30 | Search page 2 | PASS |  |
| 31 | SQL-like search treated as literal | PASS |  |
| 32 | Empty POST object | PASS |  |
| J01 | Blank JSON request | PASS |  |
| 33 | Empty PATCH object | PASS |  |
| 34 | Unknown field | PASS |  |
| 35 | Invalid status | PASS |  |
| 36 | Invalid image URL | PASS |  |
| 37 | Manual slug | PASS |  |
| 38 | Manual UUID | PASS |  |
| 39 | Invalid slug | PASS |  |
| 40 | Update nonexistent blog | PASS |  |
| 41 | Delete nonexistent blog | PASS |  |
| 42 | Whitespace title | PASS |  |
| 43 | Title too long | PASS |  |
| 44 | Category too long | PASS |  |
| 45 | Meta title too long | PASS |  |
| 46 | Numeric title | PASS |  |
| 47 | Null title | PASS |  |
| 48 | Whitespace description | PASS |  |
| 49 | Whitespace category | PASS |  |
| 50 | Whitespace content | PASS |  |
| 51 | Null POST | PASS |  |
| 52 | Array POST | PASS |  |
| 53 | Default draft | PASS |  |
| 54 | Manual slug on POST | PASS |  |
| 55 | Save optional fields | PASS |  |
| 56 | Clear optional fields | PASS |  |
| 57 | Publish | PASS |  |
| 58 | Publish again preserves timestamp | PASS |  |
| 59 | Unpublish | PASS |  |
| 60 | Republish sets new timestamp | PASS |  |
| 61 | Read persisted fields | PASS |  |
| 62 | Delete disposable blog | PASS |  |
| 63 | Delete same blog twice | PASS |  |
| 64 | GET deleted blog | PASS |  |
| 65 | Slug: Hello World | PASS |  |
| 66 | Slug: HELLO WORLD | PASS |  |
| 67 | Slug: Hello    World | PASS |  |
| 68 | Slug: Hello---World | PASS |  |
| 69 | Slug: UI/UX Design | PASS |  |
| 70 | Slug: Next.js | PASS |  |
| 71 | Slug: Café | PASS |  |
| 72 | Fallback slug: @#$! | PASS | Current fallback policy verified; Unicode/punctuation policy remains a product decision. |
| 73 | Fallback slug: سلام | PASS | Current fallback policy verified; Unicode/punctuation policy remains a product decision. |
| 74 | 255-character title | PASS |  |
| 75 | 255-character duplicate title | PASS |  |
| 76 | Rename to existing title | PASS |  |
| 77 | Unchanged title | PASS |  |
| 78 | Changed title with same normalized base | PASS |  |
| 79 | Previous slug 404 | PASS |  |
| 80 | Concurrent duplicate creation | PASS | 2/2 created; 409 is allowed by current policy, automatic retry not required by this test. |
| 81 | Remove script | PASS |  |
| 82 | Remove event attribute | PASS |  |
| 83 | Remove unsafe link | PASS |  |
| 84 | Preserve image, remove event | PASS |  |
| 85 | Preserve formatting | PASS |  |
| 86 | Preserve safe URL | PASS |  |
| 87 | Remove protocol-relative URL | PASS |  |
| 88 | Reject empty sanitized content | PASS |  |
| 89 | Reject visually empty content | PASS |  |
| 90 | Reject non-HTTP image URL | PASS |  |
| 91 | Reject FTP image URL | PASS |  |
| 92 | Reject null character in text | PASS |  |
| 93 | Reject null character in search | PASS |  |
| 94 | Blog request size limit | PASS |  |
| 95 | Controlled database failure | BLOCKED | Requires manual database shutdown/recovery; not safe in shared runner. |
| 96 | Malformed slug variants | PASS |  |
| 97 | Search by category | PASS |  |
| 98 | Search by description | PASS |  |
| 99 | Search exactly 255 characters | PASS |  |
| 100 | Search beyond last page | PASS |  |
| 101 | Positive literal wildcard matches | PASS |  |
| 102 | Empty numeric query parameters | PASS |  |
| 103 | Scientific/hex query syntax | REVIEW | HTTP 400; [{"field":"page","message":"Must be a positive integer"},{"field":"limit","message":"Must be a positive integer"}]. Decide desired parsing policy. |
| 104 | Duplicate page parameters | REVIEW | HTTP 400; undefined. Decide desired parsing policy. |
| 105 | Empty database list | BLOCKED | Requires isolated empty database; existing records will not be deleted. |
| 106 | Count after cleanup | PASS |  |
| 107 | Public published-only list | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 108 | Public draft detail | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 109 | Public visibility | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 110 | Public URL after rename | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 111 | Admin list and UI states | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 112 | TinyMCE create/edit | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 113 | Admin delete/cancel | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 114 | Public metadata | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| 115 | Production access protection | BLOCKED | Requires implemented UI/public routes or access controls; not covered by this HTTP CRUD runner. |
| R09 | Rate limiter database unavailable | BLOCKED | Requires controlled failure injection. |
| A10 | Production Secure and __Host- cookie | BLOCKED | Requires HTTPS deployment verification. |
| A11 | Successful Cloudinary upload | BLOCKED | Requires isolated Cloudinary test account and asset cleanup. |

Remaining tracked fixtures: 0
