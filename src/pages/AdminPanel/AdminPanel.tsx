import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../shared/AuthContext/useAuth'

export default function AdminPanel() {
  const { user } = useAuth()
  return (
    <div className="w-full grid flex flex-column bg-gradient-main admin-pannel">
      <h1>Pannel</h1>
      {user?.role === 'manager' && (
        <nav className="tabs grid aling-content-center justify-content-center">
          <NavLink to="applications" className="tab">
            Applications
          </NavLink>
          <NavLink to="users" className="tab">
            Users
          </NavLink>
        </nav>
      )}
      <div className="tab-content grid">
        <Outlet />
      </div>
    </div>
  )
}
