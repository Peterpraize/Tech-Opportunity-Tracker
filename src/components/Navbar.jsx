
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="techtrack-header">
      <nav className="techtrack-nav" aria-label="Main navigation">
        <Link
          className="techtrack-brand"
          to="/"
          onClick={closeMenu}
        >
          TechTrack<span>.</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
          aria-controls="techtrack-nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div
          id="techtrack-nav-links"
          className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/saved-opportunities" onClick={closeMenu}>
            My Saved
          </NavLink>

          <NavLink to="/login" onClick={closeMenu}>
            Login
          </NavLink>

          <NavLink
            className="nav-register"
            to="/register"
            onClick={closeMenu}
          >
            Create Account
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
