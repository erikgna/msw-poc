# The Mocking Problem
### Why traditional mocks hurt and how MSW changes the game

---

## Slide 1 — What is a Mock and Why Does it Hurt?
**(~30s)**

In testing, a **Mock** is a replacement for a real dependency  
(API, Database, external service) used to verify behavior.

The problem is not mocking itself —  
the problem is **where** and **how** we mock.

> Speaker notes:
> Open with pain: fragile tests, refactors breaking things that still work.
> Set expectation: this talk is about *behavior vs implementation*.

---

## Slide 2 — Stubs
**(~25s)**

- Hardcoded objects
- Extremely fast
- Manual maintenance

Stubs work well **until the data shape changes**.  
Then every test becomes a migration task.

> Speaker notes:
> Emphasize brittleness. Clear end of thought before moving on.

---

## Slide 3 — Module Mocks
**(~30s)**

- `jest.mock('axios')`
- Mocks a **library**, not behavior
- Creates **implementation coupling**

If Axios is replaced with Fetch,  
tests break even if the logic is still correct.

> Speaker notes:
> Key phrase: “tests know too much about the internals”.

---

## Slide 4 — The Real Problem
**(~20s)**

Traditional mocks:
- Alter application internals
- Test *how* code works
- Break on refactor

**We are testing implementations, not contracts.**

> Speaker notes:
> This slide is the bridge. Pause slightly here.

---

## Slide 5 — Network Simulation with MSW
**(~35s)**

Mock Service Worker does **not mock code**.  
It **simulates the network**.

- The app is treated as a **black box**
- Requests leave the app normally
- Responses come back as real HTTP responses

We test **real behavior**, not internal logic.

> Speaker notes:
> Do NOT explain Service Workers yet.
> Just establish the mental model shift.

---

## Slide 6 — Browser Engine: Service Workers
**(~45s)**

This works in the browser because of **Service Workers**.

- Event-driven JS process
- Runs in a background thread
- Shared across tabs under the same origin
- Acts as a **network proxy**

MSW registers a Service Worker that listens to the `fetch` event.  
Every request passes through it **before** hitting the network.

> Speaker notes:
> Focus on positioning: “between the app and the network”.

---

## Slide 7 — Real HTTP, Not Fake Objects
**(~30s)**

MSW uses **standard Request and Response objects**.

- Browser processes them normally
- No fake return values
- No test-only branches

Mock code **never enters the application bundle**.

> Speaker notes:
> This replaces “what is Fetch API” with impact.

---

## Slide 8 — Node.js: Monkey Patching & Interceptors
**(~45s)**

Node.js has no Service Workers.

MSW uses `@mswjs/interceptors` to:
- Monkey patch `http`, `https`, and `XMLHttpRequest`
- Intercept socket-level requests at runtime

Axios, Got, Superagent —  
they all eventually call `http.request`.

MSW intercepts **the runtime**, not the library.

> Speaker notes:
> Skip reading the title. End with a full stop.

---

## Slide 9 — When and Why to Use MSW
**(~35s)**

**When to use**
- Frontend before backend
- Contract testing
- Refactor-safe test suites

**Why it pays off**
- Refactor data-fetching without touching tests
- Same mocks for dev, test, and CI
- Safe “dry-run” of the application

> Speaker notes:
> This is the payoff slide. Slow down slightly here.

---

## Slide 10 — Trade-offs & Closing
**(~30s)**

- Slightly higher setup cost
- Much lower long-term maintenance

MSW is not about mocks.  
It’s about **confidence in real behavior**.

> Speaker notes:
> Strong close. Don’t rush the last sentence.
