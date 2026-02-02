## Slide 1 — The Problem: The Mocking Debt

In traditional testing, we rely on Implementation Coupling. When we use jest, we are not testing if our UI works; we are testing if our UI calls a specific library in a specific way.

### So, our pain points are that:

1. A simple refactor from Axios to Fetch breaks the entire suite.
2. Tests pass because the mock is "satisfied," but the app is broken because the real API contract changed.
3. We spend more time updating mocks than writing features.

We need to stop testing code and start testing contracts.

## Slide 2 — How it Works: The Architecture

MSW works by trating your application as a Black Box, intercepting requests at the lowest possible level.

**The Browser: Service Workers**

In the browser, MSW registers a Service Worker. This is a proxy script that runs in a background thread, sitting between your app and the internet. When your app calls fetch(), the Service Worker intercepts the event. It doesn't "fake" the call; it captures the real request, matches it to a handler, and returns a standard Response object. The app never knows the request didn't hit a real server.

**Node.js: Monkey Patching & Interceptors**

Node.js lacks Service Workers, so MSW uses Monkey Patching via @mswjs/interceptors. It hooks into the low-level http and https modules at the socket level. Whether you use Axios, Got, or Superagent, they all eventually call these core modules. MSW intercepts them at the runtime source, ensuring your tests remain library-agnostic.

## Slide 3 — The Evolution: Stateful Mocks

Basic mocking is static, it gets us there, but it’s manual. MSW evolves by adding stateful mock:

1. Instead of hardcoded JSON, we use an in-memory database. If you POST a new user, the next GET request actually returns that new user.

2. We use the actual Request and Response classes. You can access headers, cookies, and query parameters to drive conditional logic.

3. Your mocks can verify that an Auth header exists, returning an error if it’s missing, exactly like a real backend.

## Slide 4 — Chaos & Resilience

To reach the highest level of confidence, we must test the "Bad Days." MSW allows us to simulate these network conditions:

1. Randomly trigger 500 Server Errors or 429 Too Many Requests to verify your error boundaries.

2. Inject a 3-second delay to test loading skeletons and prevent UI flickering.

3. You can resolve "Request B" before "Request A" to ensure your UI handles out-of-order data correctly—solving the most elusive bugs in frontend development.

## Slide 5 — Efficiency: Record and Replay

We can further accelerate development by removing manual writing mocks.

1. By running your app against a live staging environment, MSW records every outgoing request and incoming response.

2. It generates the mock code for you. This ensures your mocks are a 1-to-1 reflection of your real API, turning "mock maintenance" into a simple "re-record" task.

## Slide 6 — Comparison: The Competitive Landscape

Why choose MSW?

- MirageJS intercepts the browser XMLHttpRequest, it's browser only, it's not library agnostic and it's implemented as global mock which can leak into app logic.
- Nock intercepts at Node http level, it's node only, it's library agnostic but it's implenetation relies on heavy patching of core Node's API's.

In the other hand, MSW uses service worker and sockets, supports both node and browser, it's library agnostic since works at network level and it's implemented as a standard web proxy.

## Slide 7 — The Benefit: Total Confidence

1. Build entire features before the backend API even exists.

2. Change your entire data-fetching library without touching a single test file.

3. Your handlers become a clear, executable contract of how your system behaves.

Stop mocking the code. Start simulating the world. That is how you gain 100% confidence in your software’s behavior.
