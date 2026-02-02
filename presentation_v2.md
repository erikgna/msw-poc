## Slide 1 — The Problem: The Mocking Debt

Traditional testing relies on implementation coupling.
When we use Jest mocks, we’re not testing behavior — we’re testing how our UI calls a specific library.

### Our pain points:

1. Refactoring from Axios to Fetch breaks the entire test suite.
2. Tests pass because mocks are “satisfied,” while the real API contract is broken.
3. We spend more time maintaining mocks than shipping features.

We need to stop testing implementations and start testing contracts.

## Slide 2 — How it Works: The Architecture

MSW treats your application as a black box, intercepting requests at the lowest possible level.

### The Browser — Service Workers

MSW registers a Service Worker that runs between your app and the network.
When fetch() is called, the Service Worker intercepts the request, matches a handler, and returns a real Response object.
From the app’s perspective, the request behaves exactly like a real network call.

### Node.js — Low-Level Interceptors

Node doesn’t support Service Workers, so MSW hooks into the core http and https modules via @mswjs/interceptors.
Since all HTTP libraries eventually use these modules, MSW stays library-agnostic and intercepts requests at the runtime level.

## Slide 3 — The Evolution: Stateful Mocks

Static mocks work, but they’re limited. MSW enables stateful mocking:

1. An in-memory database replaces hardcoded JSON — a POST actually affects the next GET.
2. Handlers use real Request and Response objects, including headers, cookies, and query params.
3. Mocks can enforce behavior, like requiring auth headers and returning real error responses.

## Slide 4 — Chaos & Resilience

Real confidence comes from testing failure scenarios.

With MSW, we can:

1. Randomly trigger 500s or 429s to validate error handling.
2. Add artificial delays to test loading states and prevent UI flicker.
3. Resolve requests out of order to catch race conditions — one of the hardest frontend bugs to find.

## Slide 5 — Efficiency: Record and Replay

MSW can also eliminate manual mock writing.

1. Run your app against a real environment and record requests and responses.
2. MSW generates handlers directly from real traffic.

This turns mock maintenance into a simple re-record, not a rewrite.

## Slide 6 — Comparison: The Competitive Landscape

### Why MSW?

1. MirageJS: browser-only, tied to XMLHttpRequest, implemented as a global mock.
2. Nock: Node-only, library-agnostic, but relies on heavy patching of Node’s core APIs.

### MSW, by contrast:

1. Works in both browser and Node
2. Is fully library-agnostic
3. Intercepts at the network level
4. Acts like a standard web proxy

## Slide 7 — The Benefit: Total Confidence

1. Build features before the backend exists.
2. Swap your data-fetching library without changing tests.
3. Use handlers as executable, living API contracts.
