
import { Link } from 'react-router-dom'
import ApplicantNav from '../components/ApplicantNav'
import './Dashboard.css'

function Dashboard() {
  return (
    <main className="dashboard-page">
      <ApplicantNav />

      <section className="dashboard-welcome">
        <p className="dashboard-eyebrow">YOUR CAREER JOURNEY</p>

        <h1>Your next opportunity starts here.</h1>

        <p>
          Discover opportunities, organise your interests, and
          take the next step towards your career goals with TechTrack.
        </p>

        <Link to="/" className="dashboard-primary-button">
          Explore opportunities
        </Link>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Your activity</h2>
            <p>A quick overview of your opportunity search.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon" aria-hidden="true">
              ♡
            </span>
            <h3>Saved opportunities</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Opportunities you want to revisit.</p>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon" aria-hidden="true">
              ↗
            </span>
            <h3>Applications</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Keep track of opportunities you pursue.</p>
          </article>

          <article className="dashboard-stat-card">
            <span className="dashboard-stat-icon" aria-hidden="true">
              ◷
            </span>
            <h3>Upcoming deadlines</h3>
            <p className="dashboard-stat-number">0</p>
            <p>Stay aware of important closing dates.</p>
          </article>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Continue your journey</h2>
            <p>Quick access to your next steps.</p>
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
            <p>Review the application records saved in your browser.</p>
            <strong>View applications →</strong>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
