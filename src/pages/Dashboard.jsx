
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ApplicantNav from '../components/ApplicantNav'
import { useAuth } from '../context/useAuth.js'
import { useSavedOpportunities } from '../context/useSavedOpportunities'
import { getApplications } from '../services/applicationService'
import { getOpportunities } from '../services/opportunityService'
import './Dashboard.css'

const PROFILE_STORAGE_KEY = 'techtrack-demo-profile'

function readProfile() {
  try {
    return JSON.parse(
      localStorage.getItem(PROFILE_STORAGE_KEY) || '{}'
    )
  } catch {
    return {}
  }
}

function formatDate(value) {
  if (!value) return 'Date unavailable'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Dashboard() {
  const { user } = useAuth()
  const { savedIds } = useSavedOpportunities()

const [applications] = useState(() => getApplications())
const [opportunities, setOpportunities] = useState([])
const [profile] = useState(readProfile)
  const [loading, setLoading] = useState(true)
  const [opportunityError, setOpportunityError] = useState(false)

  useEffect(() => {
   
    let cancelled = false

    async function loadOpportunities() {
      try {
        const data = await getOpportunities()

        if (!cancelled) {
          setOpportunities(Array.isArray(data) ? data : [])
          setOpportunityError(false)
        }
      } catch {
        if (!cancelled) {
          setOpportunityError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadOpportunities()

    return () => {
      cancelled = true
    }
  }, [])

  const profileFields = [
    profile.fullName || user?.fullName,
    profile.email || user?.email,
    profile.location,
    profile.education,
    profile.summary,
    profile.skills,
    profile.careerGoal,
  ]

  const completedProfileFields = profileFields.filter(
    (value) => typeof value === 'string' && value.trim()
  ).length

  const profileReadiness = Math.round(
    (completedProfileFields / profileFields.length) * 100
  )

  const upcomingDeadlines = opportunities.filter((item) => {
    const deadline =
      item.deadline ||
      item.closingDate ||
      item.applicationDeadline

    if (!deadline) return false

    const date = new Date(deadline)

    return (
      !Number.isNaN(date.getTime()) &&
      date >= new Date(new Date().toDateString())
    )
  }).length

  const recentApplications = applications.slice(0, 3)

  return (
    <main className="dashboard-page">
      <ApplicantNav />

      <section className="dashboard-welcome">
        <p className="dashboard-eyebrow">
          YOUR CAREER JOURNEY
        </p>

        <h1>
          Welcome{user?.fullName ? `, ${user.fullName}` : ' to TechTrack'}.
        </h1>

        <p>
          Manage your applications, improve your profile, and
          discover opportunities that move your career forward.
        </p>

        <div className="dashboard-welcome-actions">
          <Link to="/" className="dashboard-primary-button">
            Explore opportunities
          </Link>

          <Link to="/profile" className="dashboard-secondary-button">
            Complete your profile
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Your activity</h2>
            <p>Your current activity across TechTrack.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <Link
            to="/saved-opportunities"
            className="dashboard-stat-card dashboard-stat-link"
          >
            <span className="dashboard-stat-icon" aria-hidden="true">
              ♡
            </span>
            <h3>Saved opportunities</h3>
            <p className="dashboard-stat-number">
              {savedIds.length}
            </p>
            <p>Review opportunities you want to revisit.</p>
            <strong>View saved opportunities →</strong>
          </Link>

          <Link
            to="/my-applications"
            className="dashboard-stat-card dashboard-stat-link"
          >
            <span className="dashboard-stat-icon" aria-hidden="true">
              ✓
            </span>
            <h3>Applications</h3>
            <p className="dashboard-stat-number">
              {applications.length}
            </p>
            <p>Review your application records and progress.</p>
            <strong>View applications →</strong>
          </Link>

          <Link
            to="/"
            className="dashboard-stat-card dashboard-stat-link"
          >
            <span className="dashboard-stat-icon" aria-hidden="true">
              ◷
            </span>
            <h3>Upcoming deadlines</h3>
            <p className="dashboard-stat-number">
              {loading ? '—' : opportunityError ? '—' : upcomingDeadlines}
            </p>
            <p>Find opportunities with upcoming closing dates.</p>
            <strong>Browse opportunities →</strong>
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Profile readiness</h2>
            <p>
              A more complete profile helps TechTrack understand
              your skills and career interests.
            </p>
          </div>

          <Link to="/profile" className="dashboard-text-link">
            Edit profile →
          </Link>
        </div>

        <div className="dashboard-profile-card">
          <div className="dashboard-profile-progress">
            <div
              className="dashboard-profile-progress-fill"
              style={{ width: `${profileReadiness}%` }}
            />
          </div>

          <div className="dashboard-profile-progress-label">
            <strong>{profileReadiness}% complete</strong>
            <span>
              {profileReadiness === 100
                ? 'Profile details completed'
                : 'Continue building your profile'}
            </span>
          </div>

          <Link to="/profile" className="dashboard-primary-button">
            {profileReadiness === 100
              ? 'Review my profile'
              : 'Complete my profile'}
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Recent applications</h2>
            <p>Quick access to your latest application records.</p>
          </div>

          <Link to="/my-applications" className="dashboard-text-link">
            View all →
          </Link>
        </div>

        {recentApplications.length === 0 ? (
          <div className="dashboard-empty-card">
            <h3>Your career journey starts with an application.</h3>
            <p>
              Explore available opportunities and apply for roles
              that match your interests.
            </p>
            <Link to="/" className="dashboard-primary-button">
              Find opportunities
            </Link>
          </div>
        ) : (
          <div className="dashboard-recent-list">
            {recentApplications.map((application) => (
              <article
                className="dashboard-recent-card"
                key={application.id}
              >
                <div>
                  <h3>{application.opportunityTitle}</h3>
                  <p>{application.organization}</p>
                  <span>
                    Reference: {application.reference || 'Unavailable'}
                  </span>
                </div>

                <div className="dashboard-recent-status">
                  <span>
                    {application.status || 'Application recorded'}
                  </span>
                  <small>
                    {formatDate(application.submittedAt)}
                  </small>
                </div>

                <Link
                  to="/my-applications"
                  className="dashboard-text-link"
                >
                  Track application →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Continue your journey</h2>
            <p>Go straight to the area you want to manage.</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/" className="dashboard-action-card">
            <span>01</span>
            <h3>Find opportunities</h3>
            <p>Explore jobs, internships, scholarships and training.</p>
            <strong>Explore opportunities →</strong>
          </Link>

          <Link
            to="/my-applications"
            className="dashboard-action-card"
          >
            <span>02</span>
            <h3>My applications</h3>
            <p>Review your recorded applications and their statuses.</p>
            <strong>Track applications →</strong>
          </Link>

          <Link
            to="/saved-opportunities"
            className="dashboard-action-card"
          >
            <span>03</span>
            <h3>Saved opportunities</h3>
            <p>Return to the opportunities you bookmarked.</p>
            <strong>View saved items →</strong>
          </Link>

          <Link to="/profile" className="dashboard-action-card">
            <span>04</span>
            <h3>My profile</h3>
            <p>Update your professional background, skills and goals.</p>
            <strong>Manage profile →</strong>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
