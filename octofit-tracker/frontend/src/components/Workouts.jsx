import { useEffect, useState } from 'react'

function normalizePayload(payload) {
  if (Array.isArray(payload)) return { items: payload, total: payload.length }
  if (Array.isArray(payload?.results)) return { items: payload.results, total: payload.total ?? payload.results.length }
  if (Array.isArray(payload?.items)) return { items: payload.items, total: payload.total ?? payload.items.length }
  if (Array.isArray(payload?.data)) return { items: payload.data, total: payload.total ?? payload.data.length }
  if (Array.isArray(payload?.docs)) return { items: payload.docs, total: payload.totalDocs ?? payload.docs.length }
  return { items: [], total: 0 }
}

function Workouts({ apiBaseUrl }) {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0 })

  useEffect(() => {
    let isMounted = true
    fetch(`${apiBaseUrl}/workouts/`)
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted) return
        const normalized = normalizePayload(payload)
        setState({ loading: false, error: '', ...normalized })
      })
      .catch((error) => {
        if (!isMounted) return
        setState({ loading: false, error: String(error), items: [], total: 0 })
      })

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h5">Workouts</h2>
      <p className="text-muted">Total records: {state.total}</p>
      {state.loading && <p>Loading workouts...</p>}
      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {!state.loading && !state.error && (
        <ul className="list-group">
          {state.items.map((item) => (
            <li className="list-group-item" key={item._id ?? item.id ?? item.title}>
              <strong>{item.title ?? 'Untitled Workout'}</strong> <span className="text-muted">({item.difficulty ?? 'n/a'})</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts