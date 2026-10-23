
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOpportunities } from '../services/opportunityService'
import './OpportunityDetails.css'
import '../App.css'

function OpportunityDetails() {
  const { id } = useParams()
  const [opportunity, setOpportunity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchOpportunity() {
      try {
        const data = await getOpportunities()
        const match = data.find((item) => String(item.id) === id)

        if (!cancelled) {
          setOpportunity(match || null)
        }
      } catch {
        if (!cancelled) {
          setError('We could not load this opportunity. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchOpportunity()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <main className="empty-state" role="status">
        <h2>Loading opportunity...</h2>
      </main>
    )
  }

  if (error) {
    return (
      <main className="empty-state" role="alert">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
        <p>
          <Link to="/">Back to opportunities</Link>
        </p>
      </main>
    )
  }

  if (!opportunity) {
    return (
      <main className="empty-state">
        <h2>Opportunity not found</h2>
        <p>
          This opportunity may no longer be available in the sample data.
        </p>
        <Link
          className="secondary-button"
          to="/"
          style={{ display: 'inline-flex', marginBottom: '20px' }}
        >
          ← Back to opportunities
        </Link>
      </main>
    )
  }

  const imageContext = `${opportunity.title} ${opportunity.organization} ${opportunity.category}`

  let imageUrl =
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'

  if (/google career|scholarship/i.test(imageContext)) {
    imageUrl =
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80'
  } else if (/women in tech|fellowship/i.test(imageContext)) {
    imageUrl =
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80'
  } else if (/design|ui|ux/i.test(`${opportunity.title} ${opportunity.category}`)) {
    imageUrl =
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80'
  } else if (/training|bootcamp|course/i.test(imageContext)) {
    imageUrl =
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'
  }

  return (
    <main className="app-shell">
      <section className="opportunities-section">
        <Link
          className="secondary-button"
          to="/"
          style={{ display: 'inline-flex', marginBottom: '20px' }}
        >
          ← Back to opportunities
        </Link>

        <div className="opportunity-details-layout">
          <div className="opportunity-details-content">
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  {opportunity.category}
                </span>
                <h1>{opportunity.title}</h1>
                <p>{opportunity.organization}</p>
              </div>
            </div>

            {opportunity.isSample && (
              <p role="note">
                Demo listing: this is sample data, not a verified live opening.
              </p>
            )}

            <article className="opportunity-card opportunity-details-card">
              <div className="opportunity-details-info">
                <h2>About this opportunity</h2>
                <p>{opportunity.description}</p>

                <h3>Skills and topics</h3>
                <div className="tag-list">
                  {opportunity.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3>Opportunity details</h3>
                <p>
                  <strong>Category:</strong> {opportunity.category}
                </p>
                <p>
                  <strong>Type:</strong> {opportunity.type}
                </p>
                <p>
                  <strong>Location:</strong>{' '}
                  {opportunity.location || 'Not specified'}
                </p>
                <p>
                  <strong>Deadline:</strong> {opportunity.deadline}
                </p>

                <p>
                  Confirm eligibility, requirements, and application
                  instructions with the opportunity provider before applying.
                </p>

                <Link
                  className="primary-button"
                  to={`/apply/${opportunity.id}`}
                  state={{ opportunity }}
                >
                  Apply Now →
                </Link>
              </div>

              <aside className="opportunity-details-image">
                <img
                  src={imageUrl}
                  alt={`Illustrative image for ${opportunity.title}`}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src =
                      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
                  }}
                />

                <div className="opportunity-image-caption">
                  <h2>Build your future with TechTrack</h2>
                  <p>
                    Discover opportunities, develop your skills, and take your
                    next career step.
                  </p>
                </div>
              </aside>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OpportunityDetails
