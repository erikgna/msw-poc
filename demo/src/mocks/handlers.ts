import { http, HttpResponse } from 'msw'

const projectHandlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'MSW Demo Post 1', body: 'This is mocked by MSW', userId: 1 },
      { id: 2, title: 'MSW Demo Post 2', body: 'Backend not ready yet', userId: 1 },
      { id: 3, title: 'MSW Demo Post 3', body: 'Frontend can work in parallel', userId: 1 },
    ])
  }),

  http.get('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Number(id),
      title: `MSW Mocked Post ${id}`,
      body: 'This response comes from MSW, not the real backend',
      userId: 1
    })
  }),

  http.get('https://api.example.com/teams', () => {
    return HttpResponse.json([
      { id: 1, name: 'Frontend Team', members: 5 },
      { id: 2, name: 'Backend Team', members: 3 },
    ])
  }),

  http.get('https://api.example.com/projects', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'MSW Integration',
        status: 'in_progress',
        description: 'Backend API not ready, using MSW contract'
      },
      {
        id: 2,
        name: 'User Dashboard',
        status: 'completed',
        description: 'Already integrated with real API'
      },
    ])
  }),
]

export const handlers = [...projectHandlers]