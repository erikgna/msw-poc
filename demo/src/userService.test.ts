import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getUserWithAxios, getUserWithFetch } from './userService'
import { server } from './mocks/server'
import { http, HttpResponse } from 'msw'

describe('User Service - MSW Way (Network Simulation)', () => {

  beforeEach(() => {
    // server.close();
  })

  afterEach(() => {
    server.resetHandlers();
  })

  it('fetches user data with axios', async () => {
    server.use(
      http.get('/api/user', () => {
        return HttpResponse.json({ name: 'John Doe2', id: 1 })
      })
    );
    const user = await getUserWithAxios()

    expect(user).toEqual({ name: 'John Doe2', id: 1 })
  })

  it('fetches user data with fetch', async () => {
    const user = await getUserWithFetch()

    expect(user).toEqual({ name: 'John Doe', id: 1 })
  })

  it('both methods return the same data', async () => {
    const userAxios = await getUserWithAxios()
    const userFetch = await getUserWithFetch()

    expect(userAxios).toEqual(userFetch)
  })
})
