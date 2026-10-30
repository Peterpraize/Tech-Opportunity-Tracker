
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import './CompanyDashboard.css'

const OFFERS_KEY = 'techtrack-company-offers'

function readOffers(email) {
  try {
    const offers = JSON.parse(localStorage.getItem(OFFERS_KEY) || '[]')

    if (!Array.isArray(offers)) return []

    return offers.filter(
      (offer) => offer.companyEmail === email
    )
  } catch {
    return []
  }
}

function CompanyDashboard() {
  const { user } = useAuth()
  const [offers] = useState(
    () => readOffers(user?.email)
  )

  const pendingOffers = offers.filter(
    (offer) => offer.status === 'Pending review'
  )

  return (
    <main className="company-dashboard">
      <section className="company-welcome">
        <p className="company-eyebrow">COMPANY WORKSPACE</p>
        <h1>Welcome, {user?.fullName}</h1>
        <p>
          Submit opportunities for TechTrack to review and match
          with suitable screened clients.
        </p>
        <Link
          className="company-primary-button"
          to="/company/offers/new"
        >
          + Submit an Offer
        </Link>
      </section>

      <section className="company-stats">
        <article className="company-stat-card">
          <span>Total Offers</span>
          <strong>{offers.length}</strong>
        </article>

        <article className="company-stat-card">
          <span>Pending Review</span>
          <strong>{pendingOffers.length}</strong>
        </article>

        <article className="company-stat-card">
          <span>Approved Offers</span>
          <strong>
            {offers.filter((offer) => offer.status === 'Approved').length}
          </strong>
        </article>
      </section>

      <section className="company-offers-section">
        <div className="company-section-heading">
          <div>
            <h2>Your submitted offers</h2>
            <p>Track the status of opportunities you have submitted.</p>
          </div>

          <Link to="/company/offers/new">Submit another offer</Link>
        </div>

        {offers.length === 0 ? (
          <div className="company-empty-state">
            <h3>No offers submitted yet</h3>
            <p>
              Submit your first offer so the TechTrack team can review it.
            </p>
            <Link
              className="company-primary-button"
              to="/company/offers/new"
            >
              Submit Your First Offer
            </Link>
          </div>
        ) : (
          <div className="company-offer-list">
            {offers.map((offer) => (
              <article className="company-offer-card" key={offer.id}>
                <div>
                  <h3>{offer.title}</h3>
                  <p>{offer.offerType} · {offer.location}</p>
                  <small>
                    Submitted: {new Date(offer.submittedAt).toLocaleDateString()}
                  </small>
                </div>

                <span className="company-offer-status">
                  {offer.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CompanyDashboard
