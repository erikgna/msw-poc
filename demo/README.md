# MSW Demo Application

This demo showcases Mock Service Worker (MSW) for network mocking in both browser and testing environments.

## Features

- Interactive UI to compare Axios vs Fetch API
- MSW intercepts network requests at runtime
- Tests demonstrate module mocking vs MSW network simulation
- Same mock handlers work for both browser and Node.js

## Setup

```bash
npm install
```

## Run Demo

```bash
npm run dev
```

Open the browser and test the application. Notice that:
- MSW service worker is registered (check console)
- Both Axios and Fetch use the same mock handlers
- No real network requests are made

## Run Tests

```bash
npm test
```

Tests include:
- `userService.old.test.ts` - Traditional module mocking approach
- `userService.test.ts` - MSW network simulation (works with both axios and fetch)
- `App.test.tsx` - Component testing with MSW

## Key Files

- `src/mocks/handlers.ts` - Define mock API responses
- `src/mocks/browser.ts` - MSW setup for browser
- `src/mocks/server.ts` - MSW setup for Node.js tests
- `src/setupTests.ts` - Test configuration
- `src/userService.ts` - API client with axios and fetch implementations

## Why MSW?

Traditional mocking couples tests to implementation:
- Change axios to fetch → tests break
- Mock library internals, not network

MSW treats your app as a black box:
- Change any HTTP library → tests still pass
- Mock at network level, test contracts not implementations
