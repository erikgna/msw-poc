# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MSW (Mock Service Worker) demonstration project built with React 19, Vite, TypeScript, and Vitest. Demonstrates API mocking for both browser (development) and Node.js (testing) environments.

## Development Commands

```bash
npm run dev          # Start Vite dev server with MSW browser worker
npm run build        # Type-check with tsc and build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:ui      # Run Vitest with UI interface
```

## Testing Strategy

Run specific test file:
```bash
npx vitest src/userService.test.ts
```

Run tests in watch mode:
```bash
npm run test -- --watch
```

## MSW Architecture

### Two Execution Contexts

MSW operates differently based on environment:

1. **Browser (Development)**: Uses Service Worker API
   - Configured in `src/mocks/browser.ts` with `setupWorker()`
   - Started conditionally in `src/main.tsx` when `import.meta.env.DEV` is true
   - Worker script located in `public/` directory (defined in `package.json` msw.workerDirectory)
   - Access worker instance via `window.worker` for runtime manipulation

2. **Node.js (Testing)**: Uses request interception
   - Configured in `src/mocks/server.ts` with `setupServer()`
   - Lifecycle managed in `src/setupTests.ts` via Vitest hooks (beforeAll, afterEach, afterAll)
   - Configured with `onUnhandledRequest: 'error'` to catch unmocked requests

### Request Handlers

- Centralized in `src/mocks/handlers.ts`
- Shared between browser and Node.js environments
- Use `http` and `HttpResponse` from MSW for route definitions
- Pattern: Export handler arrays by domain (e.g., `userHandlers`), combine into single `handlers` export

### Test Patterns

- Use `server.use()` for test-specific handler overrides
- Call `server.resetHandlers()` in afterEach to restore default handlers
- Avoid calling `server.close()` in beforeEach (it's managed globally)

### Runtime Manipulation (Browser Only)

During development, modify handlers at runtime:
```javascript
worker.use(
  http.get('/api/user', () => HttpResponse.json({ name: 'Override' }))
)
```

Stop mocking:
```javascript
worker.stop()
```

## Code Organization

- `src/mocks/handlers.ts` - API route handlers (shared across environments)
- `src/mocks/server.ts` - Node.js test server setup
- `src/mocks/browser.ts` - Browser worker setup
- `src/setupTests.ts` - Vitest global test configuration
- `src/userService.ts` - Example service demonstrating both axios and fetch
