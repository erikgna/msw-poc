## The Mocking Problem

Slide: What is a Mock and Why Does it Hurt?

In testing, a Mock is a replacement for a real dependency (like an API or a Database) used to verify behavior.

- **Stubs:** Are hardcoded objects. They are fast but require manual updates every time the data shape changes.

- **Module Mocks**: Using jest.mock() to hijack alibrary like Axios. It’s better, but it creates Implementation Coupling. If you swap Axios for Fetch, your test breaks even if the logic is correct.

- **Network Simulation**: With Mocking Service Worker we don't mock the code, we simulate the network.

The Difference is that on traditional mocking alters the internals of our app. MSW treats our app as a Black Box, intercepting communication at the lowest possible level.

## Browser Engine: Service Workers & Fetch API

Slide: The Proxy in your Browser

- **Service Worker API**: A Service Worker is a script that runs in a background thread, separate from our tabs. It acts as a Network Proxy.
- **How it works**: MSW registers a Service Worker that listens for the fetch event. When our app makes a request, the browser sends it to the Service Worker first.
- **The Fetch API:** MSW uses standard Request and Response objects. So it’s not "faking" a response; it’s providing a real cryptographic-standard response that the browser processes as if it came from a remote server.

The benefit is that "mock" code never enters our application bundle.

## Node Engine: Monkey Patching & Interceptors

Slide: Intercepting Sockets in Node.js

- In Node.js we don't have Service Workers so the solution from MSW is using @mswjs/interceptors to perform Monkey Patching. It temporarily replaces the native methods of Node's http, https, and XMLHttpRequest modules at runtime.

- When we use Axios, Superagent, or Got, they eventually call the native http.request. Since MSW has "patched" that native function, it can divert the call to our mock handlers. And this is why MSW works across any library. It’s not mocking the library; it’s mocking the Node.js runtime environment.

## Live Code

Step 1: The "Before" (Module Mocking)

JavaScript
// user.test.js
import axios from 'axios';
vi.mock('axios'); // We are lying to the compiler

test('gets user', async () => {
axios.get.mockResolvedValue({ data: { name: 'John' } });
// If I change axios to fetch, this test dies.
});
Step 2: The "After" (MSW Simulation)

JavaScript

// mocks/handlers.js
http.get('/user', () => {
return HttpResponse.json({ name: 'John' })
})

// user.test.js
test('gets user', async () => {
const user = await getUser();
expect(user.name).toBe('John');
// I can use axios, fetch, or ky. The test doesn't care.
});
Action: Run the test. Change the internal implementation from axios to fetch. Run it again. It still passes.

## Trade-offs and Finishing
   Slide: Pros and Cons

- **Trade-off:** MSW has a slightly higher initial setup compared to a simple jest.fn(), but it pays off in maintenance.
- **Why to use:** We gain the ability to refactor our entire data-fetching layer without touching our tests. We are testing contracts, not implementations.
