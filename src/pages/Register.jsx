
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import {
  ADMIN_DEMO_EMAIL,
  saveDemoAccount,
  getRoleHome,
} from '../context/demoAccounts.js'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const { user, startDemoSession, isAuthenticated } = useAuth()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
    accountType: 'applicant',
  })

  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to={getRoleHome(user?.role)} replace />
  }

  function handleChange(event) {
    const { name, value, checked, type } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Please complete all required fields.')
      return
    }

    if (form.password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    if (!form.agree) {
      setError('Please accept the terms to continue.')
      return
    }

    const email = form.email.trim().toLowerCase()

    if (email === ADMIN_DEMO_EMAIL) {
      setError('This email address is reserved.')
      return
    }

    const accountSaved = saveDemoAccount({
      fullName: form.fullName,
      email,
      role: form.accountType,
    })

    if (!accountSaved) {
      setError('An account with this email already exists. Please sign in.')
      return
    }

    startDemoSession({
      fullName: form.fullName,
      email,
      role: form.accountType,
    })

    navigate(getRoleHome(form.accountType), { replace: true })
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">JOIN TECHTRACK</p>

        <h1>Create your account</h1>

        <p className="auth-description">
          Register to access TechTrack and connect with relevant
          technology opportunities.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="accountType">Register as</label>
          <select
            id="accountType"
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            required
          >
            <option value="applicant">Applicant / Client</option>
            <option value="company">Company / Organization</option>
          </select>

          <label htmlFor="fullName">
            {form.accountType === 'company' ? 'Company name' : 'Full name'}
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            placeholder={
              form.accountType === 'company'
                ? 'Enter your company name'
                : 'Enter your full name'
            }
            required
          />

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
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
          />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password again"
            required
          />

          <label className="terms-checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the applicable terms and privacy policy.
            </span>
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit-button">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
