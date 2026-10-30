
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getApplications } from '../services/applicationService'
import ApplicantNav from '../components/ApplicantNav'
import './MyApplications.css'

const TRACKING_STAGES = [
  { id: 'recorded', label: 'Application recorded' },
  { id: 'screening', label: 'Recruitment screening' },
  { id: 'assessment', label: 'Assessment or interview' },
  { id: 'referred', label: 'Referred to opportunity provider' },
  { id: 'outcome', label: 'Final outcome' },
]

function ApplicationTimeline({ application }) {
  const currentIndex = TRACKING_STAGES.findIndex(
    (stage) => stage.id === application.stage
  )

  return (
    <div className="application-timeline">
      <h4>Application progress</h4>

      <ol>
        {TRACKING_STAGES.map((stage, index) => {
          const completed =
            currentIndex >= 0 && index <= currentIndex

          return (
            <li
              key={stage.id}
              className={completed ? 'is-complete' : 'is-pending'}
            >
              <span className="timeline-marker" aria-hidden="true">
                {completed ? '✓' : index + 1}
              </span>

              <span>{stage.label}</span>

              <span className="timeline-status">
                {completed
                  ? index === currentIndex
                    ? 'Current stage'
                    : 'Recorded'
                  : 'Pending'}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function MyApplications() {
  const location = useLocation()
  const newApplication = location.state?.demoApplication

  const [applications] = useState(() => getApplications())

  return (
    <main className="app-shell my-applications-page">
      <section className="opportunities-section">
        <ApplicantNav />

        {newApplication && (
          <div className="application-success" role="status">
            <h2>Application recorded successfully!</h2>

            <p>
              Your application for{' '}
              {newApplication.opportunityTitle} has been recorded.
            </p>

            <p>
              Application reference:{' '}
              <strong>
                {newApplication.reference || 'Reference unavailable'}
              </strong>
            </p>
          </div>
        )}

        <div className="apply-heading">
          <span className="section-kicker">YOUR ACTIVITY</span>
          <h1>My Applications</h1>
          <p>
            Keep track of the opportunities you have expressed
            interest in.
          </p>
        </div>

        <div className="applications-summary">
          <div className="applications-summary-card">
            <span>Applications recorded</span>
            <strong>{applications.length}</strong>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h2>Your next opportunity awaits</h2>

            <p>
              Explore available opportunities and find one that
              matches your skills and career goals.
            </p>

            <Link to="/" className="primary-button">
              Explore opportunities
            </Link>
          </div>
        ) : (
          <section className="applications-records">
            <div className="applications-records-heading">
              <h2>Your application history</h2>

              <span>
                {applications.length}{' '}
                {applications.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            <div className="applications-list">
              {applications.map((application) => (
                <article
                  className="application-record-card"
                  key={application.id}
                >
                  <div className="application-record-top">
                    <span className="application-demo-status">
                      {application.status || 'Application recorded'}
                    </span>

                    <span className="application-record-date">
                      {application.submittedAt
                        ? new Date(
                            application.submittedAt
                          ).toLocaleDateString()
                        : 'Date unavailable'}
                    </span>
                  </div>

                  <div className="application-reference">
                    <strong>Application reference</strong>

                    <span>
                      {application.reference || 'Reference unavailable'}
                    </span>
                  </div>

                  <h3>{application.opportunityTitle}</h3>

                  <p className="application-record-organization">
                    {application.organization}
                  </p>

                  <div className="application-record-details">
                    <p>
                      <strong>Applicant</strong>
                      <span>{application.fullName}</span>
                    </p>

                    <p>
                      <strong>Email address</strong>
                      <span>{application.email}</span>
                    </p>

                    <p>
                      <strong>Date recorded</strong>
                      <span>
                        {application.submittedAt
                          ? new Date(
                              application.submittedAt
                            ).toLocaleString()
                          : 'Not available'}
                      </span>
                    </p>
                  </div>

                  <ApplicationTimeline application={application} />

                  {application.message && (
                    <div className="application-interest">
                      <strong>Statement of interest</strong>
                      <p>{application.message}</p>
                    </div>
                  )}
                
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default MyApplications
