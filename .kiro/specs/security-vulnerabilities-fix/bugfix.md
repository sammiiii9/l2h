# Bugfix Requirements Document

## Introduction

The L2H Solution Next.js real estate advisory platform has six security vulnerabilities and code quality issues that collectively expose it to data corruption, unauthorized admin access, denial-of-service, and inconsistent data handling. This document captures the defective behaviors, the correct behaviors that must replace them, and the existing behaviors that must remain unchanged after the fix.

The six issues are:

1. **Data persistence race condition** — concurrent `fs.writeFileSync` calls corrupt `db.json`
2. **Read-triggered write on property views** — a GET request mutates and persists data
3. **No server-side admin auth guard** — admin routes are reachable without a valid session
4. **PropertyCategory type inconsistency** — mixed-case union variants cause compensating filter logic
5. **No input validation on API routes** — lead/contact endpoints accept arbitrary unvalidated input
6. **No rate limiting on analytics event ingestion** — the POST `/api/analytics/events` endpoint is unbounded

---

## Bug Analysis

### Current Behavior (Defect)

**Issue 1 — Data Persistence Race Condition**

1.1 WHEN multiple API requests mutate the data store concurrently THEN the system overwrites `db.json` with a stale in-memory snapshot, silently discarding writes from other concurrent requests

1.2 WHEN `persistStore()` is called while another `fs.writeFileSync` call is still writing THEN the system produces a partially-written or empty `db.json`, corrupting the entire database

**Issue 2 — Read-Triggered Write**

1.3 WHEN a client requests a property detail page via `GET /api/properties/[slug]` THEN the system increments `viewsCount` and calls `persistStore()`, performing a full db.json rewrite on every read request

1.4 WHEN property detail pages receive high traffic THEN the system triggers rapid successive full-file rewrites, amplifying write contention from Issue 1

**Issue 3 — No Server-Side Admin Auth Guard**

1.5 WHEN an unauthenticated user navigates directly to any `/admin/*` URL THEN the system serves the admin page HTML to the browser, relying solely on a client-side `localStorage` check to redirect

1.6 WHEN an attacker bypasses the client-side redirect (e.g. by disabling JavaScript or replaying requests) THEN the system exposes all admin API endpoints and CMS functionality without verifying a valid session token server-side

**Issue 4 — PropertyCategory Type Inconsistency**

1.7 WHEN a property is stored with `category: 'plots'` (lowercase) THEN the system fails to match it against filters using `'Plots'` (capitalized), and vice versa, returning incorrect or empty results

1.8 WHEN filtering by category THEN the system requires multi-branch compensating logic (checking both `'plots'` and `'Plots'`) because the `PropertyCategory` type permits both casings simultaneously

**Issue 5 — No Input Validation on API Routes**

1.9 WHEN a client submits a POST to `/api/leads` or `/api/contact` with oversized strings, unexpected field types, or malicious payloads THEN the system creates a lead record without validating or sanitizing any field beyond `name` and `phone` presence checks

1.10 WHEN a client submits a POST to `/api/leads` with an `email` field containing an invalid format or a `phone` field containing a script injection string THEN the system stores the raw input directly in `db.json`

**Issue 6 — No Rate Limiting on Analytics Event Ingestion**

1.11 WHEN a client sends an unlimited number of POST requests to `/api/analytics/events` THEN the system logs every event without any throttling, allowing a single client to flood the analytics store

1.12 WHEN the analytics store is flooded THEN the system silently drops legitimate events (the 1000-event cap truncates real data) and may degrade server performance due to repeated full-file rewrites

---

### Expected Behavior (Correct)

**Issue 1 — Data Persistence Race Condition**

2.1 WHEN multiple API requests mutate the data store concurrently THEN the system SHALL serialize write operations so that no two writes overlap, preventing data loss and file corruption

2.2 WHEN a write to `db.json` is in progress THEN the system SHALL queue subsequent writes and apply them after the current write completes, preserving all mutations

**Issue 2 — Read-Triggered Write**

2.3 WHEN a client requests a property detail page via `GET /api/properties/[slug]` THEN the system SHALL return the property data without triggering a `persistStore()` call on every request

2.4 WHEN `viewsCount` is incremented THEN the system SHALL batch or defer the persistence so that routine reads do not cause synchronous full-file writes

**Issue 3 — No Server-Side Admin Auth Guard**

2.5 WHEN an unauthenticated request is made to any `/admin/*` route THEN the system SHALL redirect to `/admin/login` at the Next.js middleware layer, before any page or API handler executes

2.6 WHEN a request carries a valid session token THEN the system SHALL allow the request to proceed to the admin handler as normal

**Issue 4 — PropertyCategory Type Inconsistency**

2.7 WHEN the `PropertyCategory` type is defined THEN the system SHALL use a single canonical casing for each category value (e.g. `'Residential'`, `'Commercial'`, `'Plots'`) with no duplicate lowercase variants

2.8 WHEN category filters are applied THEN the system SHALL use direct equality comparisons against the canonical casing without requiring multi-branch compensating logic

**Issue 5 — No Input Validation on API Routes**

2.9 WHEN a client POSTs to `/api/leads` or `/api/contact` THEN the system SHALL validate all fields against defined constraints (e.g. `email` is a valid email format, `phone` is a valid phone string, string lengths are bounded) before creating a record

2.10 WHEN validation fails THEN the system SHALL return a `400 Bad Request` response with a descriptive error message and SHALL NOT persist the invalid data

**Issue 6 — No Rate Limiting on Analytics Event Ingestion**

2.11 WHEN a single client sends more than a defined threshold of POST requests to `/api/analytics/events` within a time window THEN the system SHALL return `429 Too Many Requests` and reject the excess requests

2.12 WHEN the rate limit is not exceeded THEN the system SHALL log the analytics event as normal

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN an authenticated admin user accesses any `/admin/*` page with a valid session token THEN the system SHALL CONTINUE TO display the admin CMS and all its functionality without interruption

3.2 WHEN a client reads property listings via `GET /api/properties` THEN the system SHALL CONTINUE TO return filtered, paginated property results without any change to response structure

3.3 WHEN a valid lead is submitted via `/api/leads` or `/api/contact` with correct fields THEN the system SHALL CONTINUE TO create the lead record, return a reference ID, and persist it to `db.json`

3.4 WHEN a client reads analytics events via `GET /api/analytics/events` THEN the system SHALL CONTINUE TO return the stored events with the same response structure

3.5 WHEN the data store is initialized from `db.json` THEN the system SHALL CONTINUE TO fall back to seed data if the file is missing or empty, without throwing an unhandled error

3.6 WHEN a property category filter of `'Residential'` (or any canonical casing) is applied THEN the system SHALL CONTINUE TO return all matching residential properties

3.7 WHEN the admin login flow is completed with valid credentials THEN the system SHALL CONTINUE TO authenticate the user and set the session cookie as before

3.8 WHEN `viewsCount` increments occur THEN the system SHALL CONTINUE TO accurately track property view counts, even if persistence is deferred
