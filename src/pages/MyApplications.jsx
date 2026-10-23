
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplications } from '../services/applicationService'
import ApplicantNav from '../components/ApplicantNav'
import './MyApplications.css'

function MyApplications() {
  const [applications] = useState(() => getApplications())

  return (
    <main className="app-shell my-applications-page">
      <section className="opportunities-section">
        <ApplicantNav />

        <div className="apply-heading">
          <span className="section-kicker">YOUR ACTIVITY</span>
          <h1>My Applications</h1>
          <p>
            Review the demo application records you have saved
            in this browser.
          </p>
        </div>

        <div className="applications-demo-notice" role="note">
          <strong>Demo mode:</strong> These records are stored in this
          browser only. They are not real submissions, and no
          opportunity provider has received them.
        </div>

        <div className="applications-summary">
          <div className="applications-summary-card">
            <span>Total records</span>
            <strong>{applications.length}</strong>
          </div>

          <div className="applications-summary-card">
            <span>Record type</span>
            <strong>Demo</strong>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h2>No applications yet</h2>
            <p>
              Explore opportunities and complete a demo application
              to see your record here.
            </p>

            <Link to="/" className="primary-button">
              Explore opportunities
            </Link>
          </div>
        ) : (
          <section className="applications-records">
            <div className="applications-records-heading">
              <h2>Your application records</h2>
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
                      {application.status || 'Demo record'}
                    </span>

                    <span className="application-record-date">
                      {application.submittedAt
                        ? new Date(
                            application.submittedAt
                          ).toLocaleDateString()
                        : 'Date unavailable'}
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

                  {application.message && (
                    <div className="application-interest">
                      <strong>Interest statement</strong>
                      <p>{application.message}</p>
                    </div>
                  )}

                  <div className="application-record-actions">
                    <Link
                      to={`/opportunities/${application.opportunityId}`}
                      className="secondary-button"
                    >
                      View opportunity
                    </Link>
                  </div>
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
