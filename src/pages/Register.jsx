
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
  const [demoReady, setDemoReady] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setError('')
    setMessage('')
    setDemoReady(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setDemoReady(false)

    if (form.password !== form.confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    if (!form.agree) {
      setError(
        'Please confirm that you understand this is a demonstration.'
      )
      return
    }

    setMessage(
      'Demo validation successful. No account has been created, and your details have not been saved.'
    )
    setDemoReady(true)

    // Clear password fields immediately after demo validation.
    setForm((previous) => ({
      ...previous,
      password: '',
      confirmPassword: '',
    }))
  }

  function continueToLogin() {
    navigate('/login', {
      state: {
        demoNotice:
          'Registration was only a demonstration. No account was created, so you cannot log in with the details entered here.',
      },
    })
  }

  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <span className="section-kicker">JOIN TECHTRACK</span>

        <h1>Create your account</h1>

        <p className="auth-description">
          Start discovering opportunities for your next career step.
        </p>

        <div className="auth-demo-banner" role="note">
          <strong>Frontend demonstration</strong>
          <p>
            You can test the form, but registration is not connected
            to a real account system. Use fictional details.
          </p>
        </div>

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

          <label htmlFor="register-password">Demo password</label>

          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="off"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            required
          />

          <label htmlFor="register-confirm-password">
            Confirm demo password
          </label>

          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="off"
            minLength={8}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter the same password again"
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
              I understand this is a frontend demonstration and my
              account details will not be saved.
            </span>
          </label>

          <button className="primary-button" type="submit">
            Validate Registration Demo
          </button>
        </form>

        {demoReady && (
          <button
            className="primary-button register-continue-button"
            type="button"
            onClick={continueToLogin}
          >
            Continue to Login Demo
          </button>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <button
          className="auth-back-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>

        <p className="auth-demo-note">
          No account is created, no password is stored, and no
          details are sent to a server. Do not enter a real password.
        </p>
      </section>
    </main>
  )
}

export default Register
