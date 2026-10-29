
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found-page">
      <section
        className="not-found-card"
        aria-labelledby="not-found-title"
      >
        <span className="not-found-code" aria-hidden="true">
          404
        </span>

        <p className="not-found-eyebrow">
          PAGE NOT FOUND
        </p>

        <h1 id="not-found-title">
          Looks like you're off track.
        </h1>

        <p className="not-found-description">
          The page you're looking for may have moved, been removed,
          or never existed. Let's help you find your way back.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-primary">
            Back to homepage
          </Link>

          <Link to="/login" className="not-found-secondary">
            Sign in to your account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
