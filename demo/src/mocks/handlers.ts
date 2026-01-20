import { http, HttpResponse } from 'msw'

const userHandlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'John Doe', id: 1 })
  }),
]

export const handlers = [...userHandlers]