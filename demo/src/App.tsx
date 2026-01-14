import { useState } from 'react'
import { getUserWithAxios, getUserWithFetch } from './userService'
import type { User } from './userService'

function App() {
  const [userAxios, setUserAxios] = useState<User | null>(null)
  const [userFetch, setUserFetch] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    setLoading(true)
    setError(null)
    try {
      setUserAxios(await getUserWithAxios())
      setUserFetch(await getUserWithFetch())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>MSW Demo: Axios vs Fetch</h1>

      <button onClick={fetchUser} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User'}
      </button>

      {error && <div className="error">Error: {error}</div>}

      {userAxios && (
        <div className="result">
          <h2>User Data with Axios:</h2>
          <pre>{JSON.stringify(userAxios, null, 2)}</pre>
        </div>
      )}

      {userFetch && (
        <div className="result">
          <h2>User Data with Fetch:</h2>
          <pre>{JSON.stringify(userFetch, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
