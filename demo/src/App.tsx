import { useState, useEffect } from "react";
import type { User } from "./mocks/handlers";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error(`User ${id} not found`);
      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setSelectedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New User",
          email: "new@example.com",
          status: "active",
        }),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const newUser = await response.json();
      setUsers([...users, newUser]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          User Management
        </h1>

        {loading && <p className="text-blue-500 mb-2">Loading...</p>}
        {error && <p className="text-red-500 mb-2">Error: {error}</p>}

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black border border-gray-300 text-white cursor-pointer hover:opacity-75 transition-opacity duration-300"
          >
            Refresh Users
          </button>
          <button
            onClick={createUser}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black border border-gray-300 text-white cursor-pointer hover:opacity-75 transition-opacity duration-300"
          >
            Create User
          </button>
          <button
            onClick={() => fetchUserById(999)}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black border border-gray-300 text-white cursor-pointer hover:opacity-75 transition-opacity duration-300"
          >
            Fetch Invalid User (404)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User List */}
          <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">All Users</h2>
            {users.length > 0 ? (
              <ul className="space-y-2">
                {users.map((user) => (
                  <li key={user.id} className="flex items-center justify-between">
                    <button
                      onClick={() => fetchUserById(user.id)}
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      {user.name}
                    </button>
                    <span className="text-sm text-gray-500">({user.status})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No users available.</p>
            )}
          </div>

          {/* Selected User */}
          <div className="bg-white dark:bg-black rounded-xl shadow p-6 border border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Selected User</h2>
            {selectedUser ? (
              <div className="space-y-1">
                <p>
                  <strong>ID:</strong> {selectedUser.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Click a user to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
