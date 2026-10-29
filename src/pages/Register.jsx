
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'
import './Auth.css'

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [registrationChecked, setRegistrationChecked] =
    useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setError('')
    setMessage('')
    setRegistrationChecked(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setRegistrationChecked(false)

    if (form.password !== form.confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    if (!form.agree) {
      setError(
        'Please confirm that you understand how registration works.'
      )
      return
    }

    setMessage(
      'Your details have been checked, but an account has not been created. Account registration will be available when account services are connected.'
    )
    setRegistrationChecked(true)

    setForm((previous) => ({
      ...previous,
      password: '',
      confirmPassword: '',
    }))
  }

  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <span className="section-kicker">JOIN TECHTRACK</span>

        <h1>Create your account</h1>

        <p className="auth-description">
          Build your profile and get ready to explore opportunities
          that match your career goals.
        </p>

        {error && (
          <p className="auth-notice auth-error" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="auth-notice" role="status">
            {message}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full name</label>

          <input
            id="register-name"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="register-email">Email address</label>

          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
          />

          <label htmlFor="register-confirm-password">
            Confirm password
          </label>

          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password again"
            required
          />

          <label className="apply-consent">
            <input
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              required
            />

            <span>
              I understand that submitting this form does not create
              an account yet.
            </span>
          </label>

          <button className="primary-button" type="submit">
            Check registration details
          </button>
        </form>

        {registrationChecked && (
          <button
            className="primary-button register-continue-button"
            type="button"
            onClick={() => navigate('/login')}
          >
            Go to login
          </button>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <button
          className="auth-back-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to home
        </button>
      </section>
    </main>
  )
}

export default Register
