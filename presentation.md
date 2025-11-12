# Mock Service Worker (MSW) - 5 Minute Presentation

## Slide 1: Title + Hook (30 seconds)

### Visual: MSW logo on dark background

Today I'm showing you Mock Service Worker - a library that intercepts network requests at the **network level**.

---

## Slide 2: THE PROBLEM (40 seconds)

### Visual: Code snippet showing traditional mocking pain points

```typescript
// Traditional mocking - tightly coupled to implementation
jest.mock("axios");
axios.get.mockResolvedValue({ data: { id: 1, name: "John" } });

// ⚠️ Problems:
// - Mocks the library, not the network
// - Different code path than production
// - Breaks when you change HTTP client
```

"Traditional API mocking has serious problems:

- **Implementation Coupling**: Tied to your HTTP client (axios, fetch)
- **Inconsistent Behavior**: Tests use mocks, production uses real APIs
- **Can't Use in Development**: Traditional mocks only work in tests

MSW solves this by intercepting at the **network level**."

---

## Slide 3: WHAT IS MSW? (50 seconds)

### Visual: Diagram showing network interception

```typescript
// MSW - Intercepts at the network level
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: "John Doe",
    });
  }),
];

// ✅ Works with ANY HTTP client
// ✅ Same code for tests AND development
// ✅ Simulates real network behavior
```

"MSW uses **Service Workers** (browser) or **Node.js interceptors** (tests) to catch requests **before they leave your app**.

**Key Benefit**: Your app code doesn't know it's mocked. Same handlers work everywhere."

---

## Slide 4: LIVE DEMO (90 seconds)

### Visual: Live code showing setup

"Quick setup in 3 steps:

**Step 1**: Define handlers (shared everywhere)

```typescript
// handlers.ts
export const handlers = [
  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({ id: params.id, name: "Mock User" });
  }),
];
```

**Step 2**: Browser setup (development)

```typescript
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

setupWorker(...handlers).start();
```

**Step 3**: Test setup

```typescript
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close());
```

**Same handlers, different environments!**"

---

## Slide 5: COMPARISONS & WHEN TO USE (60 seconds)

### Visual: Comparison table + decision guide

| Feature                  | MSW    | jest.mock()  | Mirage JS |
| ------------------------ | ------ | ------------ | --------- |
| **Network Level**        | ✅     | ❌           | ✅        |
| **Works in Browser**     | ✅     | ❌           | ✅        |
| **HTTP Client Agnostic** | ✅     | ❌           | ✅        |
| **Dev + Test**           | ✅     | ❌ Test only | ✅        |
| **Setup Complexity**     | Medium | Easy         | Medium    |

**vs jest.mock()**: MSW mocks network, not code. No coupling.
**vs Mirage JS**: MSW is lighter, Mirage has ORM features.

**Use MSW when:**

- Building frontend apps consuming APIs
- Backend isn't ready yet
- Need consistent dev/test experience

**Skip for:**

- Pure backend services
- Very simple apps with 1-2 API calls

---

## Slide 6: CONCLUSION (30 seconds)

### Visual: MSW logo + quick start

"MSW = Network-level mocking. Mock once, use everywhere.
