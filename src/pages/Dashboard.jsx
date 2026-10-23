
import { Link } from 'react-router-dom'
import ApplicantNav from '../components/ApplicantNav'
import './Dashboard.css'

function Dashboard() {
  return (
    <main className="dashboard-page">
      <ApplicantNav />
      <section className="dashboard-welcome">
        <p className="dashboard-eyebrow">APPLICANT DASHBOARD · DEMO</p>

        <h1>Your next opportunity starts here.</h1>

        <p>
          Discover opportunities, manage your applications, and keep
          track of your progress with TechTrack.
        </p>

        <Link to="/" className="dashboard-primary-button">
          Explore opportunities
        </Link>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Your activity</h2>
            <p>
              These are demonstration figures, not personal account data.
            </p>
          </div>

          <span className="dashboard-demo-badge">Demo data</span>
        </div>

        <div className="dashboard-stats">
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon">♡</span>
            <h3>Saved opportunities</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Opportunities you want to revisit.</p>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon">↗</span>
            <h3>Applications</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Applications you have submitted.</p>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon">◷</span>
            <h3>Upcoming deadlines</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Deadlines approaching for your opportunities.</p>
          </article>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Continue your journey</h2>
            <p>Quick access to the things that matter.</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/" className="dashboard-action-card">
            <span>01</span>
            <h3>Find opportunities</h3>
            <p>Explore jobs, internships, scholarships and training.</p>
            <strong>Explore now →</strong>
          </Link>

          <Link
            to="/my-applications"
            className="dashboard-action-card"
          >
            <span>02</span>
            <h3>My applications</h3>
            <p>View your application tracking page.</p>
            <strong>View applications →</strong>
          </Link>
        </div>
      </section>

      <section className="dashboard-note">
        <strong>About this preview</strong>
        <p>
          This dashboard is a frontend demonstration. Real account
          information, saved opportunities, and application tracking
          will require secure authentication and persistent storage.
        </p>
      </section>
    </main>
  )
}

export default Dashboard
