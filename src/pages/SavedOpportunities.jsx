
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOpportunities } from '../services/opportunityService'
import OpportunityCard from '../components/OpportunityCard'
import ApplicantNav from '../components/ApplicantNav'
import { useSavedOpportunities } from '../context/useSavedOpportunities'
import './SavedOpportunities.css'

function SavedOpportunities() {
  const { savedIds } = useSavedOpportunities()
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')

      try {
        const data = await getOpportunities()

        if (!cancelled) {
          setOpportunities(data)
        }
      } catch {
        if (!cancelled) {
          setError(
            'Unable to load opportunities. Please try again.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [retryCount])

  const savedOpportunities = opportunities.filter(
    (opportunity) => savedIds.includes(opportunity.id)
  )

  function handleRetry() {
    setRetryCount((count) => count + 1)
  }

  return (
    <main className="saved-page">
      <ApplicantNav />

      <section className="saved-heading">
        <p className="saved-eyebrow">
          YOUR OPPORTUNITY COLLECTION
        </p>
        <h1>Saved opportunities</h1>
        <p>
          Revisit opportunities that interest you and review their
          requirements and deadlines.
        </p>
      </section>

      {loading && (
        <div className="saved-loading-state" role="status">
          <span
            className="saved-loading-spinner"
            aria-hidden="true"
          />
          <p>Loading your saved opportunities...</p>
        </div>
      )}

      {!loading && error && (
        <section className="saved-empty-state">
          <h2>We couldn't load your opportunities</h2>
          <p role="alert">{error}</p>
          <button
            type="button"
            className="saved-browse-button"
            onClick={handleRetry}
          >
            Try again
          </button>
        </section>
      )}

      {!loading &&
        !error &&
        savedOpportunities.length === 0 && (
          <section className="saved-empty-state">
            <div
              className="saved-empty-icon"
              aria-hidden="true"
            >
              ♡
            </div>
            <h2>No saved opportunities yet</h2>
            <p>
              Browse opportunities and select Save to add them to
              your collection.
            </p>
            <Link to="/" className="saved-browse-button">
              Browse opportunities
            </Link>
          </section>
        )}

      {!loading &&
        !error &&
        savedOpportunities.length > 0 && (
          <>
            <div className="saved-results-heading">
              <h2>Your collection</h2>
              <p className="saved-results-count">
                {savedOpportunities.length}{' '}
                {savedOpportunities.length === 1
                  ? 'opportunity'
                  : 'opportunities'}{' '}
                saved
              </p>
            </div>

            <div className="opportunities-grid">
              {savedOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          </>
        )}      
    </main>
  )
}

export default SavedOpportunities
