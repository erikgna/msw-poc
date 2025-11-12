## Opening (10 seconds)

[Show handlers.ts file]
"Let me show you how MSW works in practice. I've built a simple user management app. Here are our API handlers - notice we define GET, POST, and even error scenarios."

## Part 1: Handlers (15 seconds)

[Point to handlers.ts code]
"This http.get('/api/users') intercepts any request to that endpoint. We return mock data with a 500ms delay to simulate real network behavior. The key is: these handlers work everywhere - development AND tests."

## Part 2: Browser Setup (15 seconds)

[Show browser.ts and main.tsx]
"For development, we use setupWorker which creates a Service Worker. In main.tsx, we only enable it in development mode - it never ships to production. The app waits for MSW to start, then renders normally."

## Part 3: App Code (10 seconds)

[Show App.tsx fetchUsers function]
"Notice the app just uses regular fetch() - no MSW code here. The app has no idea it's mocked. This means zero coupling to our mocking library."

## Part 4: Live Demo (20 seconds)

[Open browser with DevTools Network tab]
"Let's run it. Watch the Network tab - see these requests? MSW is intercepting them. Click 'Fetch Users' - there's our mock data. Click 'Fetch Invalid User' - we get a proper 404 error. Everything looks like a real API."

## Part 5: Tests (15 seconds)

[Show App.test.tsx, then run tests]
"Now the magic: same handlers work in tests. Look at this test - just render the component, wait for data, and assert. No axios mocking, no fetch mocking. Let's run it..."
[npm test]
"All passing! Same mock data, same behavior as development."

## Closing (5 seconds)

"That's MSW - mock once at the network level, use everywhere. Same handlers, same behavior, zero coupling."

🎯 KEY TALKING POINTS TO EMPHASIZE

"Same handlers everywhere" - Say this multiple times
"Zero coupling" - App uses regular fetch, not MSW-specific code
"Network level interception" - Not mocking libraries
Show Network tab - Proof it looks like real requests
Run tests live - Show test/dev parity

🎬 DEMO CHECKLIST
Before presenting:

Run npm run dev and verify app works
Open DevTools Network tab
Have handlers.ts file ready to show
Have App.test.tsx ready to show
Test npm test to ensure tests pass
Practice timing (aim for 75-80 seconds)
