import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white border-bottom">
        <div className="container py-3 d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
          <div>
            <h1 className="h4 mb-1">OctoFit Tracker</h1>
            <p className="text-muted mb-0">Modern multi-tier dashboard</p>
          </div>
          <nav className="d-flex flex-wrap gap-2">
            {['users', 'teams', 'activities', 'leaderboard', 'workouts'].map((item) => (
              <NavLink
                key={item}
                to={`/${item}`}
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
                }
              >
                {item[0].toUpperCase() + item.slice(1)}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <div className="alert alert-secondary" role="status">
          <strong>API Base URL:</strong> {apiBaseUrl}
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
