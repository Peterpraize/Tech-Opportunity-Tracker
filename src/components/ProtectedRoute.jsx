
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  // Redirect users who are not logged in.
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  // Restrict access when a route specifies permitted roles.
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    const roleHome = {
      applicant: '/dashboard',
      company: '/company/dashboard',
      admin: '/admin',
    }

    return (
      <Navigate
        to={roleHome[user.role] || '/'}
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute
