import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [golfers, setGolfers] = useState([])
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', email: '' })
  const [editError, setEditError] = useState(null)

  function loadGolfers() {
    fetch(`${API_URL}/api/golfers`)
      .then((res) => res.json())
      .then(setGolfers)
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    loadGolfers()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError(null)

    const res = await fetch(`${API_URL}/api/golfers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const body = await res.json()
      setFormError(body.message)
      return
    }

    setForm({ firstName: '', lastName: '', email: '' })
    loadGolfers()
  }

  function startEdit(golfer) {
    setEditingId(golfer._id)
    setEditForm({
      firstName: golfer.firstName,
      lastName: golfer.lastName,
      email: golfer.email,
    })
    setEditError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditError(null)
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  async function handleEditSubmit(e, id) {
    e.preventDefault()
    setEditError(null)

    const res = await fetch(`${API_URL}/api/golfers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })

    if (!res.ok) {
      const body = await res.json()
      setEditError(body.message)
      return
    }

    setEditingId(null)
    loadGolfers()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this golfer?')) return

    const res = await fetch(`${API_URL}/api/golfers/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      loadGolfers()
    }
  }

  return (
    <div>
      <h1>Golfers</h1>
      {error && <p>Error loading golfers: {error}</p>}
      {!error && golfers.length === 0 && <p>No golfers yet.</p>}
      {!error && golfers.length > 0 && (
        <ul>
          {golfers.map((golfer) =>
            editingId === golfer._id ? (
              <li key={golfer._id}>
                <form onSubmit={(e) => handleEditSubmit(e, golfer._id)}>
                  <input
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit}>
                    Cancel
                  </button>
                </form>
                {editError && <p>Error: {editError}</p>}
              </li>
            ) : (
              <li key={golfer._id}>
                {golfer.firstName} {golfer.lastName} ({golfer.email})
                <button type="button" onClick={() => startEdit(golfer)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(golfer._id)}>
                  Delete
                </button>
              </li>
            )
          )}
        </ul>
      )}

      <h2>Add golfer</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
      {formError && <p>Error: {formError}</p>}
    </div>
  )
}

export default App
