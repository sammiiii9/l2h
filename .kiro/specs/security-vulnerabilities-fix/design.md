# Security Vulnerabilities Fix — Bugfix Design

## Overview

Six security and code quality bugs affect the L2H Solution Next.js real estate platform. They fall into three concern areas:

- **Data integrity** (Issues 1 & 2): synchronous full-file rewrites on every mutation and on property reads cause race conditions and write amplification under concurrent load.
- **Access control** (Issue 3): admin routes have no server-side auth guard; protection relies solely on a client-side `localStorage` check.
- **Input hygiene & abuse prevention** (Issues 4, 5 & 6): mixed-case category types force compensating filter logic, API routes accept unsanitized input, and the analytics endpoint is unbounded.

The fix strategy is minimal and targeted: introduce a write-serialization wrapper around `persistStore`, decouple `viewsCount` from synchronous persistence, add a Next.js middleware auth guard, normalize `PropertyCategory` to canonical casing, add schema validation to lead/contact routes, and apply an in-memory rate limiter to analytics ingestion.

---

## Glossary

- **Bug_Condition (C)**: The input or system state that triggers defective behavior — defined per issue below.
- **Property (P)**: The desired (correct) behavior when C holds.
- **Preservation**: Existing correct behaviors that must remain unchanged after the fix.
- **`persistStore()`**: The function in `src/lib/data-store.ts` that writes the entire in-memory cache to `data/db.json` via `fs.writeFileSync`.
- **`cachedStore`**: The in-memory `DataStoreSchema` object that backs all service reads and writes.
- **`PropertyCategory`**: The TypeScript union type in `src/types/index.ts` that categorizes properties.
- **Middleware**: The `src/middleware.ts` Next.js edge middleware file (does not exist yet) that intercepts requests before page/API handlers.

---

## Bug Details

### Bug Condition

There are six distinct bug conditions, each with a formal specification.

---

#### C1 — Concurrent Writes / Race Condition

The bug manifests when two or more API requests that mutate data arrive within the same event-loop tick or before the previous `fs.writeFileSync` call completes. Because Node.js `fs.writeFileSync` is synchronous but the async I/O queue can interleave calls from parallel requests (in worker threads or under cluster mode), or simply because the in-memory `cachedStore` is read and written non-atomically across awaited steps, a late-arriving write can overwrite a file written by an earlier request, discarding those changes.

**Formal Specification:**
```
FUNCTION isBugCondition_C1(requests)
  INPUT: requests — a set of concurrent HTTP mutation requests (POST/PUT/DELETE)
  OUTPUT: boolean

  RETURN |requests| >= 2
         AND requests arrive before any single persistStore() call completes
         AND cachedStore snapshot taken by request_A differs from snapshot taken by request_B
END FUNCTION
```

**Examples:**
- Two simultaneous lead submissions both call `LeadService.create()`. Both read `cachedStore.leads`, push a new lead, then call `persistStore()`. The second write overwrites the file with a snapshot that does not include the first lead. One lead is silently lost.
- A property update and a site visit creation fire concurrently. The property update wins the file write; the site visit is dropped.

---

#### C2 — Read-Triggered Synchronous Write

The bug manifests on every call to `PropertyService.getBySlug(slug)`. The function increments `viewsCount` and immediately calls `persistStore()`, turning a GET request into a full-file write.

**Formal Specification:**
```
FUNCTION isBugCondition_C2(request)
  INPUT: request — an HTTP GET request to /api/properties/[slug]
  OUTPUT: boolean

  RETURN request.method = 'GET'
         AND PropertyService.getBySlug is invoked
         AND persistStore() is called before the response is returned
END FUNCTION
```

**Examples:**
- A property detail page is loaded by 100 concurrent visitors. `persistStore()` is called 100 times, each rewriting the entire `db.json`. This amplifies C1 and degrades server throughput.
- A search engine crawler indexes all property slugs. Every crawl visit triggers a full db write.

---

#### C3 — Missing Server-Side Auth Guard

The bug manifests when any request reaches an `/admin/*` page handler without a valid session token. The current `AdminLayout` only checks `localStorage` on the client, which is bypassed by direct server-rendered requests or API calls.

**Formal Specification:**
```
FUNCTION isBugCondition_C3(request)
  INPUT: request — any HTTP request to a path matching /admin/*
  OUTPUT: boolean

  RETURN request.path matches '/admin/*'
         AND request.path != '/admin/login'
         AND NOT hasValidSessionCookie(request)
         AND NO server-side redirect is performed before the handler executes
END FUNCTION
```

**Examples:**
- `curl https://example.com/admin` returns the admin dashboard HTML without any auth check.
- An attacker POSTs to `/api/admin/*` endpoints without a cookie and receives data.

---

#### C4 — PropertyCategory Mixed-Case Type

The bug manifests when data is stored or compared using mismatched casings of the same category. The union type permits `'plots'` and `'Plots'` simultaneously.

**Formal Specification:**
```
FUNCTION isBugCondition_C4(value)
  INPUT: value — a PropertyCategory string value from stored data or a filter
  OUTPUT: boolean

  RETURN value IN PropertyCategory
         AND toLower(value) IN { 'plots', 'residential', 'commercial', 'apartments', 'villas', 'land', 'investments' }
         AND canonical(value) != value  // value is a lowercase variant, not the canonical capitalized form
END FUNCTION
```

**Examples:**
- A property stored with `category: 'plots'` does not appear when filtering by `category: 'Plots'` using a simple equality check.
- The `PropertyService.getAll` filter requires 5 separate string comparisons for what should be a single category match.

---

#### C5 — Unvalidated API Input

The bug manifests when a POST request to `/api/leads` or `/api/contact` contains fields that violate expected constraints and the server persists them without validation.

**Formal Specification:**
```
FUNCTION isBugCondition_C5(body)
  INPUT: body — the parsed JSON body of a POST to /api/leads or /api/contact
  OUTPUT: boolean

  RETURN (body.email IS NOT NULL AND NOT isValidEmail(body.email))
         OR (body.phone IS NOT NULL AND NOT isValidPhone(body.phone))
         OR (anyStringField(body).length > MAX_FIELD_LENGTH)
         OR containsMaliciousPayload(body)
END FUNCTION
```

**Examples:**
- `POST /api/leads` with `{ "name": "A", "phone": "<script>alert(1)</script>", "email": "notanemail" }` creates a lead record with a script tag in the phone field.
- A bot submits leads with a 100,000-character `message` field, bloating `db.json`.

---

#### C6 — Unbounded Analytics Ingestion

The bug manifests when a single client sends more events than a reasonable per-time-window threshold to `POST /api/analytics/events`.

**Formal Specification:**
```
FUNCTION isBugCondition_C6(client, timeWindow)
  INPUT: client — identified by IP or session, timeWindow — a fixed interval (e.g. 60 seconds)
  OUTPUT: boolean

  RETURN countRequestsInWindow(client, '/api/analytics/events', timeWindow) > RATE_LIMIT_THRESHOLD
END FUNCTION
```

**Examples:**
- A script sends 10,000 POST requests to `/api/analytics/events` in 10 seconds. All are logged; legitimate events are evicted by the 1000-event cap.
- A misconfigured frontend fires `property_view` on every render, flooding the store with duplicates.

---

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Authenticated admin users must continue to access all `/admin/*` pages and CMS functionality without additional friction.
- Valid lead and contact form submissions must continue to create lead records and return reference IDs.
- Property listing and filtering APIs must continue to return correct, paginated results.
- Analytics event reads (`GET /api/analytics/events`) must continue to return stored events.
- The data store must continue to initialize from seed data when `db.json` is absent or empty.
- `viewsCount` must continue to be tracked accurately (persistence may be deferred, but counts must not be lost on graceful shutdown).

**Scope:**
All requests that do NOT satisfy any of C1–C6 must be completely unaffected by this fix. In particular:
- All read-only API routes (GET) that do not mutate state
- All authenticated admin operations with valid session tokens
- Valid lead/contact submissions that pass schema validation
- Analytics event submissions below the rate limit threshold

---

## Hypothesized Root Cause

### Issue 1 (Race Condition)
`persistStore()` uses `fs.writeFileSync` without any mutual exclusion. Node.js is single-threaded for JS execution, but Next.js in production runs multiple worker processes (or concurrent async operations within a single process), so two in-flight requests can each snapshot `cachedStore`, mutate it, and call `writeFileSync` — the last writer wins.

**Root cause**: No write queue, no lock, no atomic rename pattern.

### Issue 2 (Read-Triggered Write)
`PropertyService.getBySlug` was designed to conveniently track views in one place, but the side effect of calling `persistStore()` was not considered in a high-traffic context.

**Root cause**: Side-effectful mutation embedded in a read path with no debouncing or batching.

### Issue 3 (Missing Server-Side Auth)
The admin layout uses `useEffect` and `localStorage` — both are client-side only. Next.js App Router server components render before client JS executes, and Next.js middleware (which runs on the edge before any handler) was never created.

**Root cause**: No `src/middleware.ts` file exists; auth is entirely client-side.

### Issue 4 (Type Inconsistency)
The `PropertyCategory` type was extended over time with both lowercase and capitalized variants to accommodate different data entry points, resulting in a union with duplicates.

**Root cause**: Ad-hoc type extension without a normalization contract.

### Issue 5 (No Input Validation)
The API route handlers use only a presence check (`if (!body.name || !body.phone)`). No validation library or schema was introduced.

**Root cause**: Missing schema validation layer on POST handlers.

### Issue 6 (No Rate Limiting)
The analytics endpoint was built for internal use but was exposed publicly. No rate limiting middleware or per-client throttle was added.

**Root cause**: No rate-limiting layer on the analytics ingestion endpoint.

---

## Correctness Properties

Property 1: Bug Condition — Concurrent Write Serialization

_For any_ pair of concurrent mutation requests where `isBugCondition_C1` holds, the fixed `persistStore` implementation SHALL serialize writes so that every mutation is durably written to `db.json` and no write is silently overwritten.

**Validates: Requirements 2.1, 2.2**

Property 2: Preservation — Non-Concurrent Read/Write Behavior

_For any_ single-request (non-concurrent) mutation or read where `isBugCondition_C1` does NOT hold, the fixed data store SHALL produce the same result as the original implementation, preserving all existing CRUD semantics.

**Validates: Requirements 3.2, 3.3, 3.5**

Property 3: Bug Condition — Read-Path Does Not Trigger Synchronous Write

_For any_ GET request to `/api/properties/[slug]` where `isBugCondition_C2` holds, the fixed `PropertyService.getBySlug` SHALL return the property without calling `persistStore()` synchronously on the hot path.

**Validates: Requirements 2.3, 2.4**

Property 4: Preservation — viewsCount Accuracy

_For any_ sequence of property slug reads where `isBugCondition_C2` does NOT hold (i.e. persistence is deferred, not skipped), the fixed implementation SHALL CONTINUE TO track `viewsCount` accurately and persist it eventually (e.g. on the next mutation or process shutdown).

**Validates: Requirements 3.8**

Property 5: Bug Condition — Server-Side Auth Guard Rejects Unauthenticated Admin Requests

_For any_ request where `isBugCondition_C3` holds (unauthenticated request to `/admin/*`), the fixed middleware SHALL redirect to `/admin/login` before any page or API handler executes.

**Validates: Requirements 2.5, 2.6**

Property 6: Preservation — Authenticated Admin Access Unaffected

_For any_ request where `isBugCondition_C3` does NOT hold (request carries a valid session), the fixed middleware SHALL allow the request through unchanged, preserving all admin functionality.

**Validates: Requirements 3.1, 3.7**

Property 7: Bug Condition — Invalid Input Is Rejected

_For any_ POST to `/api/leads` or `/api/contact` where `isBugCondition_C5` holds, the fixed handler SHALL return `400 Bad Request` and SHALL NOT persist the invalid data.

**Validates: Requirements 2.9, 2.10**

Property 8: Preservation — Valid Input Creates Lead Correctly

_For any_ POST to `/api/leads` or `/api/contact` where `isBugCondition_C5` does NOT hold (input is valid), the fixed handler SHALL create the lead record and return a reference ID, identical to original behavior.

**Validates: Requirements 3.3**

Property 9: Bug Condition — Rate Limit Enforced on Analytics Endpoint

_For any_ client where `isBugCondition_C6` holds (exceeds threshold in time window), the fixed analytics endpoint SHALL return `429 Too Many Requests` and reject the excess event.

**Validates: Requirements 2.11, 2.12**

Property 10: Preservation — Analytics Events Below Threshold Are Logged Normally

_For any_ client where `isBugCondition_C6` does NOT hold (within rate limit), the fixed endpoint SHALL log the analytics event as before and return `201 Created`.

**Validates: Requirements 3.4**

---

## Fix Implementation

### Changes Required

#### File: `src/lib/data-store.ts`

**Fix 1 — Write Serialization**
- Introduce a `writeQueue` promise chain: `let writeQueue: Promise<void> = Promise.resolve();`
- Replace `fs.writeFileSync` in `persistStore()` with `fs.writeFileSync` called inside a `.then()` appended to the queue, ensuring sequential writes.
- Alternatively, use an atomic write pattern: write to a temp file (`db.json.tmp`) and `fs.renameSync` it over `db.json` to make each write atomic.

**Fix 2 — Decouple viewsCount from Hot-Path Write**
- In `PropertyService.getBySlug`, remove the `persistStore()` call.
- Increment `viewsCount` in memory as before.
- Schedule persistence via `setImmediate(() => persistStore())` or batch with a debounce (e.g. flush every 30 seconds or on the next mutation).

#### File: `src/middleware.ts` (new file)

**Fix 3 — Server-Side Admin Auth Guard**
- Create `src/middleware.ts` at the workspace root's `src/` directory.
- Match paths `/admin/:path*` excluding `/admin/login`.
- Read the `l2h_admin_session` cookie from the request.
- If absent or empty, return `NextResponse.redirect` to `/admin/login`.
- If present, call `NextResponse.next()`.

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  if (isAdminRoute) {
    const session = request.cookies.get('l2h_admin_session');
    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

#### File: `src/types/index.ts`

**Fix 4 — Normalize PropertyCategory**
- Remove all lowercase variants from the `PropertyCategory` union: `'plots'`, `'residential'`, `'commercial'`.
- Keep only the canonical capitalized forms: `'Plots'`, `'Residential'`, `'Commercial'`, `'Homes'`, `'Apartments'`, `'Villas'`, `'Land'`, `'Investments'`, `'Luxury Properties'`, `'Farmhouses'`.
- Update `PropertyService.getAll` filter logic to use single equality comparisons per canonical category value.

#### File: `src/app/api/leads/route.ts` and `src/app/api/contact/route.ts`

**Fix 5 — Input Validation**
- Add a lightweight validation helper (or inline checks) for:
  - `name`: non-empty string, max 100 chars
  - `phone`: non-empty string, matches a phone pattern, max 20 chars
  - `email`: if provided, matches a valid email regex, max 100 chars
  - `message`: if provided, max 1000 chars
  - All other string fields: max 200 chars each
- Return `400` with a descriptive error if any constraint is violated.
- Sanitize strings by trimming whitespace before storing.

#### File: `src/app/api/analytics/events/route.ts`

**Fix 6 — Rate Limiting**
- Implement a simple in-memory sliding-window rate limiter keyed by client IP (from `request.headers.get('x-forwarded-for')` or `request.headers.get('x-real-ip')`).
- Allow a maximum of 60 events per minute per client IP.
- Return `429 Too Many Requests` with a `Retry-After` header when the limit is exceeded.
- Use a `Map<string, { count: number; windowStart: number }>` store with automatic cleanup.

---

## Testing Strategy

### Validation Approach

Follow the four-phase methodology: **Explore → Preserve → Implement → Validate**.

1. Write exploration tests on UNFIXED code to confirm each bug condition manifests.
2. Write preservation tests on UNFIXED code to confirm baseline correct behaviors.
3. Implement the fixes.
4. Re-run all tests to verify bug conditions are resolved and preservation tests still pass.

---

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate each bug before implementing the fix. Confirm or refute root cause analysis.

**Test Cases**:

1. **C1 — Concurrent Write Race**: Simulate two simultaneous `LeadService.create()` calls and assert both leads appear in `db.json`. On unfixed code, one lead will be missing (will FAIL).

2. **C2 — Read-Triggered Write**: Spy on `fs.writeFileSync` and call `PropertyService.getBySlug('some-slug')`. Assert that `writeFileSync` was called. On unfixed code, this will PASS the spy assertion (confirming the bug exists — a read triggers a write).

3. **C3 — Unauthenticated Admin Access**: Send a `GET /admin` request without the `l2h_admin_session` cookie. Assert the response is a redirect to `/admin/login`. On unfixed code, this will FAIL (returns 200 HTML).

4. **C4 — Category Mismatch**: Create a property with `category: 'plots'` (lowercase), then call `PropertyService.getAll({ category: 'Plots' })`. Assert the property is in the result. On unfixed code, this will FAIL.

5. **C5 — Unvalidated Input**: POST to `/api/leads` with `{ name: "A", phone: "<script>alert(1)</script>" }`. Assert the response is `400`. On unfixed code, this will FAIL (returns `201`).

6. **C6 — Rate Limit Bypass**: Send 100 POST requests to `/api/analytics/events` in rapid succession. Assert at least one returns `429`. On unfixed code, this will FAIL (all return `201`).

**Expected Counterexamples**:
- C1: `db.json` contains only one of two expected leads after concurrent creation.
- C2: `fs.writeFileSync` call count > 0 for a GET request.
- C3: HTTP 200 returned for unauthenticated `/admin` request.
- C4: Empty results array when filtering lowercase-categorized properties by capitalized filter.
- C5: HTTP 201 returned for a lead with a script-injection phone number.
- C6: HTTP 201 returned for the 100th event in a burst.

---

### Fix Checking

**Goal**: Verify that for all inputs where each bug condition holds, the fixed code produces expected behavior.

```
FOR ALL input WHERE isBugCondition_C1(input) DO
  result := concurrentMutations_fixed(input)
  ASSERT all mutations are present in db.json
END FOR

FOR ALL input WHERE isBugCondition_C2(input) DO
  result := getBySlug_fixed(input)
  ASSERT writeFileSync was NOT called synchronously during the GET
END FOR

FOR ALL request WHERE isBugCondition_C3(request) DO
  result := middleware_fixed(request)
  ASSERT result.status = 302 AND result.headers.location = '/admin/login'
END FOR

FOR ALL value WHERE isBugCondition_C4(value) DO
  result := filterByCategory_fixed(value)
  ASSERT matching properties are returned
END FOR

FOR ALL body WHERE isBugCondition_C5(body) DO
  result := postLead_fixed(body)
  ASSERT result.status = 400 AND no lead was created
END FOR

FOR ALL (client, window) WHERE isBugCondition_C6(client, window) DO
  result := postAnalyticsEvent_fixed(client)
  ASSERT result.status = 429
END FOR
```

---

### Preservation Checking

**Goal**: Verify that for all inputs where bug conditions do NOT hold, fixed code behaves identically to original code.

```
FOR ALL input WHERE NOT isBugCondition_C1(input) DO
  ASSERT original_store(input) = fixed_store(input)
END FOR

// ... (same pattern for C2–C6)
```

**Testing Approach**: Property-based testing is recommended for C1 (generates many concurrent request patterns), C5 (generates many valid and invalid input combinations), and C6 (generates many request sequences).

**Test Cases**:
1. **Sequential Write Preservation**: Single sequential mutations produce identical `db.json` results before and after fix.
2. **Authenticated Admin Access**: Requests with valid session cookie continue to reach admin handlers.
3. **Valid Lead Submission**: POSTs with valid name, phone, email produce `201` and a reference ID.
4. **Analytics Below Threshold**: Fewer than 60 events per minute per IP all receive `201`.
5. **Category Filter Regression**: Existing properties with canonical capitalized categories continue to be found by filters.

---

### Unit Tests

- Test `persistStore` serialization: verify second write waits for first to complete.
- Test `PropertyService.getBySlug` does not call `fs.writeFileSync`.
- Test middleware redirects unauthenticated requests and passes authenticated ones.
- Test `PropertyCategory` type: verify no lowercase variants exist and filters work with canonical casing.
- Test lead/contact validation for each field constraint.
- Test rate limiter: verify counter increments, resets after window, and blocks at threshold.

### Property-Based Tests

- Generate random pairs of concurrent lead creation requests; assert both leads appear in the store.
- Generate random valid lead payloads; assert all are accepted and stored.
- Generate random invalid lead payloads (bad email, oversized strings, injection strings); assert all are rejected with `400`.
- Generate random sequences of analytics events; assert events below threshold are accepted and events above are rejected with `429`.

### Integration Tests

- Full admin login flow: login → receive cookie → access `/admin` → receive 200.
- Unauthenticated admin flow: no cookie → GET `/admin` → redirect to `/admin/login`.
- Lead form submission end-to-end: valid POST → `201` → lead appears in GET `/api/leads`.
- Property page view end-to-end: GET property slug → `200` → no synchronous write side effect.
