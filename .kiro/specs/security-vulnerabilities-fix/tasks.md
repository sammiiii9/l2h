# Implementation Plan

- [-] 1. Write bug condition exploration tests
  - **Property 1: Bug Condition** - All Six Security & Data-Integrity Bug Conditions
  - **CRITICAL**: Write these tests BEFORE implementing any fixes — failure confirms each bug exists
  - **DO NOT attempt to fix the test or the code when tests fail**
  - **NOTE**: These tests encode the expected behavior — they will validate the fixes when they pass after implementation
  - **GOAL**: Surface counterexamples that demonstrate each of the 6 bugs on unfixed code
  - Set up a test file at `src/lib/__tests__/data-store.bugcondition.test.ts` (and API route tests as needed)
  - **C1 — Concurrent Write Race**: Call `LeadService.create()` twice concurrently (e.g. `Promise.all`), then read `db.json` and assert both leads are present. **EXPECTED: FAILS** — one lead is missing.
  - **C2 — Read-Triggered Write**: Spy on `fs.writeFileSync`; call `PropertyService.getBySlug('any-slug')`; assert `writeFileSync` was called. **EXPECTED: PASSES the spy assertion** — confirms read triggers a write (the bug).
  - **C3 — Unauthenticated Admin Access**: Issue a `GET /admin` HTTP request without the `l2h_admin_session` cookie; assert the response status is `302` and `Location` is `/admin/login`. **EXPECTED: FAILS** — returns `200`.
  - **C4 — Category Case Mismatch**: Insert a property with `category: 'plots'` (lowercase); call `PropertyService.getAll({ category: 'Plots' })`; assert the property is returned. **EXPECTED: FAILS** — returns empty results.
  - **C5 — Unvalidated Input**: POST `{ name: "T", phone: "<script>alert(1)</script>" }` to `/api/leads`; assert response status is `400`. **EXPECTED: FAILS** — returns `201`.
  - **C6 — Analytics Rate Limit**: Send 100 rapid POSTs to `/api/analytics/events`; assert at least one returns `429`. **EXPECTED: FAILS** — all return `201`.
  - Run all exploration tests on UNFIXED code and document the counterexamples found for each
  - Mark task complete when all six tests are written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12_

- [~] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Existing Correct Behaviors Across All Six Fix Areas
  - **IMPORTANT**: Follow observation-first methodology — observe on UNFIXED code, then encode as tests
  - **Observation 1**: Single sequential `LeadService.create()` returns a lead that appears in `db.json` → write property test: for any single lead creation, the lead is persisted correctly
  - **Observation 2**: `GET /api/properties` returns filtered, paginated results without mutating state → write test: reading properties produces no write side effect
  - **Observation 3**: `POST /api/leads` with `{ name: "Alice", phone: "9876543210", email: "alice@example.com" }` returns `201` and a `referenceId` → write property test: valid lead inputs always produce `201` and a reference ID
  - **Observation 4**: `GET /api/analytics/events` returns stored events with correct structure → write test: GET analytics returns events array
  - **Observation 5**: Admin login with valid credentials sets `l2h_admin_session` cookie → write test: login flow produces session cookie
  - **Observation 6**: Filtering by `category: 'Apartments'` (canonical casing) returns matching properties → write test: canonical category values continue to match correctly
  - **Observation 7**: Data store falls back to seed data when `db.json` is absent → write test: missing db.json produces seed data without error
  - Property-based tests: generate 50+ random valid lead payloads; assert all produce `201`; generate 50+ random GET requests to `/api/properties`; assert no `writeFileSync` is called
  - Run all preservation tests on UNFIXED code and verify they PASS
  - Mark task complete when all tests are written, run, and confirmed passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ] 3. Fix Issue 1 — Serialize `persistStore()` writes to prevent race conditions

  - [~] 3.1 Implement write serialization in `src/lib/data-store.ts`
    - Add a module-level write queue: `let writeQueue: Promise<void> = Promise.resolve();`
    - Refactor `persistStore()` to enqueue writes: `writeQueue = writeQueue.then(() => { fs.writeFileSync(...) })`
    - Additionally adopt an atomic write pattern: write to `data/db.json.tmp` first, then `fs.renameSync('data/db.json.tmp', 'data/db.json')` to prevent torn writes
    - Ensure the `DATA_DIR` and temp file cleanup are handled in the `.catch()` branch
    - _Bug_Condition: isBugCondition_C1 — two or more concurrent mutation requests before any single persistStore() completes_
    - _Expected_Behavior: all mutations are durably written; no write is silently dropped_
    - _Preservation: single-request mutations produce identical results to original implementation_
    - _Requirements: 2.1, 2.2, 3.2, 3.3, 3.5_

  - [~] 3.2 Verify C1 exploration test now passes
    - **Property 1: Expected Behavior** - Concurrent Write Serialization
    - **IMPORTANT**: Re-run the SAME concurrent lead creation test from task 1 — do NOT write a new test
    - Run `C1 — Concurrent Write Race` test from task 1
    - **EXPECTED OUTCOME**: Test PASSES — both leads are present in `db.json`
    - _Requirements: 2.1, 2.2_

  - [~] 3.3 Verify C1 preservation tests still pass
    - **Property 2: Preservation** - Sequential Write Behavior
    - **IMPORTANT**: Re-run the SAME preservation tests from task 2 — do NOT write new tests
    - Run sequential mutation preservation tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — no regressions in single-request mutations

- [ ] 4. Fix Issue 2 — Decouple `viewsCount` increment from synchronous hot-path write

  - [~] 4.1 Remove `persistStore()` from `PropertyService.getBySlug` hot path in `src/lib/data-store.ts`
    - Locate the `getBySlug` function and remove the inline `persistStore()` call after `viewsCount` increment
    - Schedule deferred persistence using `setImmediate(() => persistStore())` so the view count is eventually flushed without blocking the response
    - Optionally add a debounce: accumulate view count increments and flush every 30 seconds or on the next non-read mutation
    - _Bug_Condition: isBugCondition_C2 — GET /api/properties/[slug] triggers synchronous persistStore()_
    - _Expected_Behavior: getBySlug returns property data without calling persistStore() synchronously_
    - _Preservation: viewsCount continues to be tracked accurately and persisted eventually_
    - _Requirements: 2.3, 2.4, 3.8_

  - [~] 4.2 Verify C2 exploration test now passes (inverted expectation)
    - **Property 1: Expected Behavior** - Read Does Not Trigger Synchronous Write
    - **IMPORTANT**: Re-run the SAME spy test from task 1 — do NOT write a new test
    - The C2 test asserts that `writeFileSync` IS called; after the fix it should NOT be called synchronously
    - Update the assertion to expect zero synchronous calls (the original failing direction is now resolved)
    - Run the test
    - **EXPECTED OUTCOME**: Test PASSES — no synchronous write on GET
    - _Requirements: 2.3, 2.4_

  - [~] 4.3 Verify C2 preservation tests still pass
    - **Property 2: Preservation** - viewsCount Accuracy
    - Re-run the GET properties preservation tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — read behavior is unchanged, viewsCount still increments in memory

- [ ] 5. Fix Issue 3 — Add server-side admin auth middleware

  - [~] 5.1 Create `src/middleware.ts` with Next.js edge middleware auth guard
    - Create the file at the correct location (`src/middleware.ts`, adjacent to `src/app/`)
    - Implement: check `pathname.startsWith('/admin')` and exclude `/admin/login`
    - Read cookie `l2h_admin_session` from the request
    - If absent or empty: return `NextResponse.redirect(new URL('/admin/login', request.url))`
    - If present: return `NextResponse.next()`
    - Export `config = { matcher: ['/admin/:path*'] }` to scope the middleware
    - _Bug_Condition: isBugCondition_C3 — unauthenticated request to /admin/* without valid session cookie_
    - _Expected_Behavior: middleware redirects to /admin/login before any handler executes_
    - _Preservation: authenticated requests with valid cookie pass through unchanged_
    - _Requirements: 2.5, 2.6, 3.1, 3.7_

  - [~] 5.2 Verify C3 exploration test now passes
    - **Property 1: Expected Behavior** - Unauthenticated Admin Redirect
    - **IMPORTANT**: Re-run the SAME unauthenticated GET /admin test from task 1
    - **EXPECTED OUTCOME**: Test PASSES — response is `302` redirect to `/admin/login`
    - _Requirements: 2.5, 2.6_

  - [~] 5.3 Verify C3 preservation tests still pass
    - **Property 2: Preservation** - Authenticated Admin Access
    - Re-run the authenticated admin and login flow preservation tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — valid session cookie grants access, login flow unchanged

- [ ] 6. Fix Issue 4 — Normalize `PropertyCategory` to canonical capitalized casing

  - [~] 6.1 Remove lowercase duplicate variants from `PropertyCategory` in `src/types/index.ts`
    - Remove `'plots'`, `'residential'`, `'commercial'` from the union (keep only `'Plots'`, `'Residential'`, `'Commercial'`)
    - Update any seed data or stored properties that use lowercase variants to use canonical casing
    - Simplify `PropertyService.getAll` category filter branches in `src/lib/data-store.ts` to use single equality comparisons per canonical category
    - Run TypeScript compiler to surface any type errors from the change
    - _Bug_Condition: isBugCondition_C4 — lowercase PropertyCategory variant used where canonical capitalized form expected_
    - _Expected_Behavior: single canonical casing per category; direct equality comparisons work correctly_
    - _Preservation: filtering by canonical capitalized category continues to return correct results_
    - _Requirements: 2.7, 2.8, 3.6_

  - [~] 6.2 Verify C4 exploration test now passes
    - **Property 1: Expected Behavior** - Category Filter Consistency
    - **IMPORTANT**: Re-run the SAME category mismatch test from task 1
    - **EXPECTED OUTCOME**: Test PASSES — property with canonical `'Plots'` is found by `category: 'Plots'` filter
    - _Requirements: 2.7, 2.8_

  - [~] 6.3 Verify C4 preservation tests still pass
    - **Property 2: Preservation** - Existing Category Filter Behavior
    - Re-run the canonical category filtering preservation tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — all existing canonical-cased category filters return correct results

- [ ] 7. Fix Issue 5 — Add input validation to lead and contact API routes

  - [~] 7.1 Implement field validation in `src/app/api/leads/route.ts` and `src/app/api/contact/route.ts`
    - Add a `validateLeadInput(body)` helper function (inline or in a shared `src/lib/validate.ts` module)
    - Validate: `name` non-empty, max 100 chars; `phone` non-empty, matches `/^[+\d\s\-().]{7,20}$/`, max 20 chars; `email` if provided matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, max 100 chars; `message` if provided max 1000 chars; all other string fields max 200 chars
    - Trim all string inputs before validation and storage
    - Return `400` with `{ error: 'Validation failed', details: [...] }` if any constraint fails
    - Do not call `LeadService.create()` if validation fails
    - _Bug_Condition: isBugCondition_C5 — POST body contains invalid email, phone injection, or oversized string fields_
    - _Expected_Behavior: 400 returned and no lead record persisted for invalid input_
    - _Preservation: valid inputs continue to produce 201 and a reference ID_
    - _Requirements: 2.9, 2.10, 3.3_

  - [~] 7.2 Verify C5 exploration test now passes
    - **Property 1: Expected Behavior** - Invalid Input Rejected
    - **IMPORTANT**: Re-run the SAME script-injection lead POST test from task 1
    - **EXPECTED OUTCOME**: Test PASSES — response is `400` and no lead is persisted
    - _Requirements: 2.9, 2.10_

  - [~] 7.3 Verify C5 preservation tests still pass
    - **Property 2: Preservation** - Valid Lead Submission
    - Re-run the valid lead submission property tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — all valid payloads produce `201` and a reference ID

- [ ] 8. Fix Issue 6 — Add rate limiting to analytics event ingestion

  - [~] 8.1 Implement in-memory sliding-window rate limiter in `src/app/api/analytics/events/route.ts`
    - Add a module-level `Map<string, { count: number; windowStart: number }>` named `rateLimitStore`
    - Extract client IP from `request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'`
    - In the `POST` handler: check if the client has exceeded 60 requests in the last 60 seconds
    - If exceeded: return `NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '60' } })`
    - If within limit: increment counter and proceed as normal
    - Prune expired entries from `rateLimitStore` on each request (entries older than 60 seconds)
    - _Bug_Condition: isBugCondition_C6 — single client exceeds 60 analytics events in 60 seconds_
    - _Expected_Behavior: 429 returned for excess requests; legitimate events below threshold are logged normally_
    - _Preservation: analytics GET endpoint unaffected; events below threshold receive 201_
    - _Requirements: 2.11, 2.12, 3.4_

  - [~] 8.2 Verify C6 exploration test now passes
    - **Property 1: Expected Behavior** - Rate Limit Enforced
    - **IMPORTANT**: Re-run the SAME 100-request burst test from task 1
    - **EXPECTED OUTCOME**: Test PASSES — at least one response (beyond the 60th) returns `429`
    - _Requirements: 2.11, 2.12_

  - [~] 8.3 Verify C6 preservation tests still pass
    - **Property 2: Preservation** - Analytics Below Threshold
    - Re-run the below-threshold analytics preservation tests from task 2
    - **EXPECTED OUTCOME**: Tests PASS — events within the rate limit continue to return `201`

- [~] 9. Checkpoint — Ensure all tests pass
  - Run the full test suite and confirm all exploration tests (tasks 1.x) and preservation tests (task 2.x) pass
  - Run `npx tsc --noEmit` to confirm no TypeScript errors from the `PropertyCategory` type change
  - Manually verify the admin login flow: login with valid credentials → access `/admin` → confirm access granted
  - Manually verify unauthenticated redirect: clear cookies → navigate to `/admin` → confirm redirect to `/admin/login`
  - Check that `data/db.json` is not corrupted after running concurrent mutation tests
  - Ensure all tests pass; ask the user if any questions arise
