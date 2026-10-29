
import { NavLink } from 'react-router-dom'
import './ApplicantNav.css'

function ApplicantNav() {
  return (
    <nav
      className="applicant-nav"
      aria-label="Applicant navigation"
    >
      <p className="applicant-nav-heading">
        MY ACCOUNT
      </p>

      <div className="applicant-nav-links">
        <NavLink to="/dashboard" end>
          Dashboard
        </NavLink>

        <NavLink to="/profile">
          My Profile
        </NavLink>

        <NavLink to="/saved-opportunities">
          Saved Opportunities
        </NavLink>

        <NavLink to="/my-applications">
          My Applications
        </NavLink>
      </div>
    </nav>
  )
}

export default ApplicantNav
