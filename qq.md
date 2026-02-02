1. How does MSW compare to WireMock or MockServer that we use in Java?             
                                                                                     
  Answer: MSW works at the network level like WireMock, but with key differences.    
  While WireMock runs as a separate HTTP server, MSW uses Service Workers in the     
  browser and socket-level interception in Node.js. The advantage is zero            
  configuration: no ports, no separate processes. Your application code remains      
  identical whether talking to MSW or real APIs. WireMock requires pointing your app 
  to localhost:8080 or another port, which means environment-specific configuration. 
                                                                                     
  2. What happens to performance? Service Workers add overhead, right?               
                                                                                     
  Answer: Service Workers add negligible overhead in development. The interception   
  happens at the network boundary before the request leaves the browser, so you      
  actually save the network round-trip time. In our handlers                         
  (src/mocks/handlers.ts:60), we add artificial 100ms delays to simulate realistic   
  API response times. In production, MSW isn't loaded at all, so there's zero runtime
   cost.                                                                             
                                                                                     
  3. How do you prevent MSW from accidentally running in production?                 
                                                                                     
  Answer: MSW is tree-shaken out of production builds automatically. In our setup    
  (src/main.tsx), we conditionally start the worker only when import.meta.env.DEV is 
  true. The Service Worker registration code is inside an if block that never        
  executes in production builds. Additionally, you can use environment-specific      
  imports that bundlers like Vite eliminate during build optimization.               
                                                                                     
  4. Can MSW handle complex authentication flows like OAuth or JWT refresh tokens?   
                                                                                     
  Answer: Yes. MSW receives the full Request object with headers, cookies, and body. 
  In our handlers (src/mocks/handlers.ts:35), we check the Authorization header and  
  return 401 if missing. For OAuth, you can store tokens in the in-memory database,  
  validate JWT signatures, simulate token expiration, and handle refresh token flows.
   Since you have access to cookies via request.headers.get('Cookie'), you can       
  implement session-based auth identically to a real backend.                        
                                                                                     
  5. How does this work with GraphQL? Your presentation shows REST.                  
                                                                                     
  Answer: MSW has first-class GraphQL support. Instead of http.get(), you use        
  graphql.query() and graphql.mutation(). You define handlers by operation name, not 
  URL. For instance: graphql.query('GetUser', ({ variables }) => { ... }). The same  
  principles apply: network-level interception, stateful resolvers, and              
  library-agnostic testing. You can even mix REST and GraphQL handlers in the same   
  project.                                                                           
                                                                                     
  6. What about WebSockets? Can MSW mock real-time connections?                      
                                                                                     
  Answer: Not directly. MSW intercepts HTTP/HTTPS requests only. For WebSockets,     
  you'd need a complementary solution like mock-socket or a test WebSocket server.   
  However, for SSE (Server-Sent Events), MSW works because SSE uses HTTP with        
  streaming responses. You can return a ReadableStream from your handler to simulate 
  real-time data.                                                                    
                                                                                     
  7. In the chaos mode (src/mocks/handlers.ts:17), how do you ensure consistent test 
  results if failures are random?                                                    
                                                                                     
  Answer: The chaos mode in the demo uses Math.random() for presentation purposes. In
   real testing, you'd control randomness with seeded random number generators or use
   deterministic flags. Better yet, write explicit tests for each failure scenario:  
  one test sends X-Chaos-Mode: true and expects 500, another test omits the header   
  and expects success. Chaos mode is more valuable in development for exploratory    
  testing than in CI/CD pipelines.                                                   
                                                                                     
  8. How do you keep mocks in sync with the real API as it evolves?                  
                                                                                     
  Answer: Three strategies: First, use OpenAPI/Swagger schemas to generate TypeScript
   types and validate handler responses against them. Second, run contract tests     
  (like Pact) where the mock handlers ARE the contract. Third, use the Record and    
  Replay feature mentioned in Slide 5: point your app at staging, let MSW record real
   responses, and auto-generate handlers. This ensures mocks reflect reality.        
                                                                                     
  9. Can multiple tests modify the in-memory database without interfering with each  
  other?                                                                             
                                                                                     
  Answer: The current implementation (src/mocks/handlers.ts:9) uses a global usersDb 
  array, which requires cleanup. In setupTests.ts, you call resetUsersDb() in        
  afterEach to restore initial state. For complete isolation, you could initialize   
  the database per-test using server.use() overrides or use a factory function that  
  returns a fresh database instance for each handler invocation.                     
                                                                                     
  10. Why would we use this instead of just running our real backend locally with    
  Docker Compose?                                                                    
                                                                                     
  Answer: MSW doesn't replace local backend development, it complements it. Use MSW  
  when: (1) Backend APIs don't exist yet, (2) You need to test error conditions (500,
   429, network timeout) that are hard to reproduce with real backends, (3) You're   
  working offline or the staging environment is unstable, (4) You want instant       
  feedback without waiting for Docker containers to start or seed databases. For     
  integration testing with real databases and business logic, Docker Compose is still
   the right tool.   
