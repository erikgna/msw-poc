import { describe, it, expect } from 'vitest'
import { getUserWithAxios, getUserWithFetch } from './userService'

describe('User Service - MSW Way (Network Simulation)', () => {
  it('fetches user data with axios', async () => {
    const user = await getUserWithAxios()

    expect(user).toEqual({ name: 'John Doe', id: 1 })
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
