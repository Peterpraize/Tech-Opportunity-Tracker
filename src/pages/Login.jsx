
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(
    location.state?.demoNotice || ''
  )

  function handleSubmit(event) {
    event.preventDefault()

    setMessage(
      'Demo only: no account was authenticated. TechTrack does not yet have real login functionality. Please do not enter a real password.'
    )

    setPassword('')
  }

  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <span className="section-kicker">WELCOME BACK</span>

        <h1>Login to TechTrack</h1>

        <p className="auth-description">
          Continue exploring opportunities and preparing for your future.
        </p>

        <div className="auth-demo-banner" role="note">
          <strong>Demo mode</strong>
          <p>
            This form does not sign you in. Use fictional details
            to explore the interface.
          </p>
        </div>

        {message && (
          <p className="auth-notice" role="status">
            {message}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>

          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Do not use a real password"
            required
          />

          <button className="primary-button" type="submit">
            Try Login Demo
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>

        <button
          className="auth-back-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>

        <p className="auth-demo-note">
          Demo limitation: this form does not authenticate users,
          create sessions, or send credentials to a server.
          Registration does not create a real account.
        </p>
      </section>
    </main>
  )
}

export default Login
