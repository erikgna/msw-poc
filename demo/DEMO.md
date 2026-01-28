# MSW Development Workflow Demo

Live demonstration showing how MSW enables parallel frontend/backend development.

## Running the Demo

```bash
npm run dev
```

Visit `http://localhost:5173`

## Demo Flow for Presentation

### Scenario 1: Backend Not Ready
**Goal**: Show the problem - frontend blocked waiting for backend

1. Click "Try to Fetch Projects (No Backend)"
2. Watch the error: endpoint doesn't exist
3. Explain: "Frontend team is blocked. Backend hasn't implemented /projects yet"

### Scenario 2: Using MSW - Contract Defined
**Goal**: Show MSW unblocking frontend work

1. Explain: "Teams meet, define the contract for /projects endpoint"
2. Click "Fetch Projects with MSW"
3. Show: MSW returns mocked data following the contract
4. Explain: "Frontend can now work in parallel. Backend team still building real API"

### Scenario 3: Backend Ready - Remove MSW
**Goal**: Demonstrate seamless transition

1. Explain: "Backend team completed the API"
2. Click "Fetch from Real API"
3. Show: MSW stops, real JSONPlaceholder API responds
4. Emphasize: "Same code. Zero changes needed. Just toggle MSW off"

### Scenario 4: Compare MSW vs Real API
**Goal**: Show the contract consistency

1. Click "Fetch Posts (MSW)" - show mocked data
2. Click "Fetch Posts (Real API)" - show real JSONPlaceholder data
3. Explain: "Different data source, same code path, same data structure"

## Key Points to Emphasize

1. **No Code Changes**: The application code never changes between MSW and real API
2. **Contract-First**: Teams define the contract, then work in parallel
3. **Real HTTP**: MSW intercepts at network level, not at code level
4. **Development Focus**: Primary value is development workflow, not just testing

## Browser Console

During the demo, open DevTools Network tab to show:
- Real HTTP requests being made
- MSW intercepting and responding
- Clean transition when MSW is toggled off

## Runtime Controls

The demo exposes `window.worker` for manual control:

```javascript
// Stop MSW
worker.stop()

// Start MSW
worker.start({ onUnhandledRequest: 'bypass' })

// Add runtime handler
worker.use(
  http.get('https://api.example.com/new-endpoint', () => {
    return HttpResponse.json({ message: 'Runtime override' })
  })
)
```

## Presentation Tips

1. Start with Scenario 1 to establish the pain point
2. Move through scenarios 2-3 to show the workflow
3. Use Scenario 4 for Q&A to demonstrate flexibility
4. Keep DevTools Network tab visible throughout
5. Emphasize "same code, different data source" repeatedly
