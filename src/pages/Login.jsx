
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';
import './Auth.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      'Login is not available yet. Account services have not been connected. Please do not enter a real password.'
    );

    setPassword('');
  }

  return (
    <main className="app-shell auth-page">
      <section className="auth-card">
        <span className="section-kicker">WELCOME BACK</span>

        <h1>Login to TechTrack</h1>

        <p className="auth-description">
          Continue exploring opportunities and preparing for your future.
        </p>

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
            placeholder="Password unavailable until account services are connected"
            required
          />

          <button className="primary-button" type="submit">
            Sign in
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
      </section>
    </main>
  );
}

export default Login;
