import axios from 'axios'

export type User = {
  name: string
  id: number
}

export async function getUserWithAxios(): Promise<User> {
  const response = await axios.get<User>('/api/user')
  return response.data
}

export async function getUserWithFetch(): Promise<User> {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}
