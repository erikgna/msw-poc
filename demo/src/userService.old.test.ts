import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { getUserWithAxios } from './userService'

vi.mock('axios')

describe('getUserWithAxios - Old Way (Module Mocking)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches user data with axios mock', async () => {
    const mockUser = { name: 'John Doe', id: 1 }

    vi.mocked(axios.get).mockResolvedValue({ data: mockUser })

    const user = await getUserWithAxios()

    expect(user).toEqual(mockUser)
    expect(axios.get).toHaveBeenCalledWith('/api/user')
  })

  it('handles errors', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network error'))

    await expect(getUserWithAxios()).rejects.toThrow('Network error')
  })
})
