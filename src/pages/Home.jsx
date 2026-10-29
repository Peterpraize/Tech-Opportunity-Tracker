
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOpportunities } from '../services/opportunityService'
import OpportunityCard from '../components/OpportunityCard'
import { useSavedOpportunities } from '../context/useSavedOpportunities'
import '../App.css'

const categories = [
  'All Opportunities',
  'Internship',
  'Scholarship',
  'Job',
  'Fellowship',
  'Training',
]

function Home() {
  const [opportunities, setOpportunities] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Opportunities')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { savedIds } = useSavedOpportunities()

  async function loadOpportunities() {
    setLoading(true)
    setError('')

    try {
      const data = await getOpportunities()
      setOpportunities(data)
    } catch {
      setError(
        'We could not load opportunities. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    async function fetchOpportunities() {
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
            'We could not load opportunities. Please check your connection and try again.'
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchOpportunities()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const tags = Array.isArray(opportunity.tags)
      ? opportunity.tags
      : []

    const searchableText = [
      opportunity.title,
      opportunity.organization,
      opportunity.description,
      ...tags,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    const matchesSearch = searchableText.includes(
      search.trim().toLowerCase()
    )

    const matchesCategory =
      category === 'All Opportunities' ||
      opportunity.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          aria-label="TechTrack home"
        >
          <span className="brand-icon">T</span>
          <span>TechTrack</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#opportunities">
            Discover
          </a>

          <Link className="nav-link" to="/saved-opportunities">
            My Saved
            {savedIds.length > 0 && (
              <span className="saved-nav-count">
                {' '}
                ({savedIds.length})
              </span>
            )}
          </Link>
        </nav>

        <a className="header-cta" href="#opportunities">
          Explore opportunities <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="status-dot" />
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Your future in tech
              <br />
              <span>starts with one click.</span>
            </h1>

            <p>
              Discover internships, scholarships, entry-level jobs, and
              learning opportunities to help you grow your tech career.
            </p>

            <a className="primary-button" href="#opportunities">
              Find your opportunity <span aria-hidden="true">→</span>
            </a>

            <div className="hero-note">
              <span aria-hidden="true">✦</span>
              Explore opportunities and keep track of the ones you love.
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-card main-visual-card">
              <div className="visual-card-top">
                <span className="visual-symbol">✳</span>
                <span className="visual-badge">CAREER GROWTH</span>
              </div>

              <div className="visual-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="visual-card-footer">
                <span>Small steps.</span>
                <strong>Big possibilities.</strong>
              </div>
            </div>

            <div className="floating-card floating-top">
              <span className="floating-icon">↗</span>
              <span>
                <strong>New opportunities</strong>
                <small>Start exploring today</small>
              </span>
            </div>

            <div className="floating-card floating-bottom">
              <span className="floating-check">✓</span>
              <span>
                <strong>Your next step</strong>
                <small>Could start right here</small>
              </span>
            </div>
          </div>
        </section>

        <section
          className="stats-row"
          aria-label="Opportunity overview"
        >
          <div className="stat-item">
            <span className="stat-number">
              {String(opportunities.length).padStart(2, '0')}
            </span>
            <span className="stat-label"> opportunities</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <span className="stat-number">
              {categories.length - 1}
            </span>
            <span className="stat-label">Opportunity categories</span>
          </div>

          <div className="stat-divider" />

          <div className="stat-item">
            <span className="stat-number">
              {String(savedIds.length).padStart(2, '0')}
            </span>
            <span className="stat-label">Opportunities saved</span>
          </div>
        </section>

        <section
          className="opportunities-section"
          id="opportunities"
        >
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                THE OPPORTUNITY BOARD
              </span>

              <h2>
                Find your next big thing<span>.</span>
              </h2>

              <p>
                Explore possibilities. Discover your path. Take the next step.
              </p>
            </div>

            {!loading && !error && (
              <span className="results-count">
                {filteredOpportunities.length}{' '}
                {filteredOpportunities.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>

          <div className="search-panel">
            <label className="search-box">
              <span className="search-icon" aria-hidden="true">
                ⌕
              </span>

              <span className="visually-hidden">
                Search opportunities
              </span>

              <input
                type="search"
                placeholder="Search roles, skills, or organizations..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="clear-search"
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <label className="category-select-label">
              <span className="visually-hidden">
                Filter by category
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {loading ? (
            <div
              className="empty-state"
              role="status"
              aria-live="polite"
            >
              <h3>Loading opportunities...</h3>
              <p>
                Please wait while we fetch the available opportunities.
              </p>
            </div>
          ) : error ? (
            <div className="empty-state" role="alert">
              <h3>Something went wrong</h3>
              <p>{error}</p>

              <button
                className="primary-button"
                type="button"
                onClick={loadOpportunities}
              >
                Try again
              </button>
            </div>
          ) : filteredOpportunities.length > 0 ? (
            <div className="opportunity-grid">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">
                ⌕
              </span>

              <h3>No opportunities found</h3>

              <p>
                Try another keyword or category to find what you are
                looking for.
              </p>

              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setSearch('')
                  setCategory('All Opportunities')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="saved-section" id="saved">
          <div>
            <span className="section-kicker">YOUR SHORTLIST</span>

            <h2>
              Keep your goals in sight<span>.</span>
            </h2>

            <p>
              {savedIds.length === 0
                ? 'Save opportunities using the Save button to build your personal shortlist.'
                : `You have saved ${savedIds.length} ${
                    savedIds.length === 1
                      ? 'opportunity'
                      : 'opportunities'
                  }. Keep going!`}
            </p>
          </div>

          <Link
            className="secondary-button"
            to="/saved-opportunities"
          >
            View saved opportunities →
          </Link>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">T</span>
          <span>TechTrack</span>
        </a>

        <p>Built for the next generation of tech talent.</p>

        <span className="footer-note">
          BuildLab · Stage 1 Frontend Development
        </span>
      </footer>
    </div>
  )
}

export default Home
