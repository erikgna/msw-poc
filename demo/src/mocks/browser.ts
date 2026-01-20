import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { http, HttpResponse } from 'msw';

export const worker = setupWorker(...handlers);

(window as any).worker = worker;

// To stop the mocking
// worker.stop();

// worker.use(
//   http.get('/api/user', () => {
//     return HttpResponse.json({ name: 'John Doe2', id: 1 })
//   })
// );