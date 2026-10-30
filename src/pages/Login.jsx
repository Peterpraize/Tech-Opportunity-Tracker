
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import {
  ADMIN_DEMO_EMAIL,
  findDemoAccount,
  getRoleHome,
} from '../context/demoAccounts.js'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, startDemoSession, isAuthenticated } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to={getRoleHome(user?.role)} replace />
  }

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const email = form.email.trim().toLowerCase()

    if (!email || !form.password) {
      setError('Enter your email address and password.')
      return
    }

    let account

    if (email === ADMIN_DEMO_EMAIL) {
      account = {
        fullName: 'TechTrack Admin',
        email,
        role: 'admin',
      }
    } else {
      const registeredAccount = findDemoAccount(email)

      if (registeredAccount) {
        account = registeredAccount
      } else {
        const emailName = email.split('@')[0]

        const fullName = emailName
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (character) => character.toUpperCase())

        account = {
          fullName,
          email,
          role: 'applicant',
        }
      }
    }

    startDemoSession(account)

    const destination = location.state?.from?.pathname

    navigate(
      destination &&
        destination !== '/login' &&
        destination !== '/register'
        ? destination
        : getRoleHome(account.role),
      { replace: true }
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">WELCOME BACK</p>

        <h1>Sign in to TechTrack</h1>

        <p className="auth-description">
          Continue managing your opportunities and career journey.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit-button">
            Login
          </button>
        </form>

        <p className="auth-switch">
          New to TechTrack? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
