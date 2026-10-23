
import { NavLink } from 'react-router-dom'
import './ApplicantNav.css'

function ApplicantNav() {
  return (
    <nav
      className="applicant-nav"
      aria-label="Applicant navigation"
    >
      <p className="applicant-nav-heading">
        APPLICANT WORKSPACE
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

      <p className="applicant-nav-notice">
        Demo workspace — these pages do not require real account
        authentication yet.
      </p>
    </nav>
  )
}

export default ApplicantNav
