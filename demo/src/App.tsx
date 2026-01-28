import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Project {
  id: number
  name: string
  status: string
  description: string
}

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mswActive, setMswActive] = useState(true)
  const [scenario, setScenario] = useState<'initial' | 'msw-enabled' | 'backend-ready'>('initial')

  const worker = (window as any).worker

  useEffect(() => {
    if (mswActive && worker && scenario !== 'initial') {
      worker.start({ onUnhandledRequest: 'bypass' })
    }
  }, [mswActive, worker, scenario])

  const fetchRealPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      if (!response.ok) throw new Error('Backend not available')
      const data = await response.json()
      setPosts(data)
      setProjects([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchMockedProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.example.com/projects')
      if (!response.ok) throw new Error('API not available')
      const data = await response.json()
      setProjects(data)
      setPosts([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  const fetchMockedPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setPosts(data)
      setProjects([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const toggleMSW = async () => {
    if (mswActive && worker) {
      await worker.stop()
      setMswActive(false)
      setPosts([])
      setProjects([])
      setError(null)
    } else if (worker) {
      await worker.start({ onUnhandledRequest: 'bypass' })
      setMswActive(true)
      setPosts([])
      setProjects([])
      setError(null)
    }
  }

  const handleScenario = (newScenario: 'initial' | 'msw-enabled' | 'backend-ready') => {
    setScenario(newScenario)
    setPosts([])
    setProjects([])
    setError(null)
  }

  return (
    <div className="App">
      <header>
        <h1>MSW Development Workflow Demo</h1>
        <p>Demonstrating parallel frontend/backend development</p>
      </header>

      <div className="status-bar">
        <div className={`status ${mswActive ? 'active' : 'inactive'}`}>
          MSW: {mswActive ? '🟢 Active' : '🔴 Inactive'}
        </div>
        <button onClick={toggleMSW} className="toggle-btn">
          {mswActive ? 'Stop MSW' : 'Start MSW'}
        </button>
      </div>

      <div className="scenarios">
        <h2>Demo Scenarios</h2>

        <div className="scenario-section">
          <h3>1. Backend Not Ready</h3>
          <p>Team needs a new /projects endpoint. Backend hasn't implemented it yet.</p>
          <button
            onClick={() => {
              handleScenario('initial')
              if (worker) worker.stop()
              setMswActive(false)
              fetchMockedProjects()
            }}
            disabled={loading}
            className="scenario-btn error"
          >
            Try to Fetch Projects (No Backend)
          </button>
        </div>

        <div className="scenario-section">
          <h3>2. Using MSW - Contract Defined</h3>
          <p>After contract validation with backend team, frontend uses MSW to continue work.</p>
          <button
            onClick={async () => {
              handleScenario('msw-enabled')
              if (worker && !mswActive) {
                await worker.start({ onUnhandledRequest: 'bypass' })
                setMswActive(true)
              }
              setTimeout(() => fetchMockedProjects(), 300)
            }}
            disabled={loading}
            className="scenario-btn msw"
          >
            Fetch Projects with MSW
          </button>
        </div>

        <div className="scenario-section">
          <h3>3. Backend Ready - Remove MSW</h3>
          <p>Backend completed. Same code, just toggle MSW off. No code changes needed!</p>
          <button
            onClick={async () => {
              handleScenario('backend-ready')
              if (worker && mswActive) {
                await worker.stop()
                setMswActive(false)
              }
              setTimeout(() => fetchRealPosts(), 300)
            }}
            disabled={loading}
            className="scenario-btn success"
          >
            Fetch from Real API
          </button>
        </div>

        <div className="scenario-section">
          <h3>4. Compare: MSW vs Real API</h3>
          <p>Same endpoint, toggle between mock and real data.</p>
          <div className="button-group">
            <button
              onClick={async () => {
                if (worker && !mswActive) {
                  await worker.start({ onUnhandledRequest: 'bypass' })
                  setMswActive(true)
                }
                setTimeout(() => fetchMockedPosts(), 300)
              }}
              disabled={loading}
              className="scenario-btn msw small"
            >
              Fetch Posts (MSW)
            </button>
            <button
              onClick={async () => {
                if (worker && mswActive) {
                  await worker.stop()
                  setMswActive(false)
                }
                setTimeout(() => fetchRealPosts(), 300)
              }}
              disabled={loading}
              className="scenario-btn success small"
            >
              Fetch Posts (Real API)
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && (
        <div className="error-box">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <small>This demonstrates the backend not being available</small>
        </div>
      )}

      {projects.length > 0 && (
        <div className="result-box msw-result">
          <h3>✅ Projects Data (from MSW)</h3>
          <p className="info">Frontend team can continue development while backend team works in parallel</p>
          <pre>{JSON.stringify(projects, null, 2)}</pre>
        </div>
      )}

      {posts.length > 0 && (
        <div className={`result-box ${mswActive ? 'msw-result' : 'real-result'}`}>
          <h3>✅ Posts Data (from {mswActive ? 'MSW Mock' : 'Real API'})</h3>
          <p className="info">
            {mswActive
              ? 'Data mocked by MSW - same code path as real API'
              : 'Data from JSONPlaceholder - MSW removed without code changes'}
          </p>
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      )}

      <div className="key-points">
        <h3>Key Takeaways</h3>
        <ul>
          <li>✅ Frontend unblocked while backend develops</li>
          <li>✅ Same code works with mock and real API</li>
          <li>✅ No code changes when switching between MSW and real backend</li>
          <li>✅ Contract-first development workflow</li>
        </ul>
      </div>
    </div>
  )
}

export default App
