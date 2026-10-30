
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOpportunities } from '../services/opportunityService'
import { saveApplication } from '../services/applicationService'
import '../App.css'
import './Apply.css'

function Apply() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [opportunity, setOpportunity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  })

  useEffect(() => {
    let cancelled = false

    async function loadOpportunity() {
      try {
        const data = await getOpportunities()
        const match = data.find((item) => String(item.id) === id)

        if (!cancelled) {
          setOpportunity(match || null)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load this opportunity. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadOpportunity()

    return () => {
      cancelled = true
    }
  }, [id])

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.agree || !opportunity) {
      return
    }

    try {
      const application = saveApplication({
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        organization: opportunity.organization,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      })

      navigate('/my-applications', {
        state: { demoApplication: application },
      })
    } catch {
      setError(
        'Unable to save your application. Please try again.'
      )
    }
  }

  if (loading) {
    return (
      <main className="empty-state">
        <h2>Loading application form...</h2>
      </main>
    )
  }

  if (error && !opportunity) {
    return (
      <main className="empty-state">
        <h2>Unable to process application</h2>
        <p role="alert">{error}</p>
        <Link to="/">Back to opportunities</Link>
      </main>
    )
  }

  if (!opportunity) {
    return (
      <main className="empty-state">
        <h2>Opportunity not found</h2>
        <Link to="/">Back to opportunities</Link>
      </main>
    )
  }

  return (
    <main className="app-shell apply-page">
      <section className="opportunities-section">
        <Link
          className="secondary-button"
          to={`/opportunities/${id}`}
        >
          ← Back to opportunity
        </Link>

        <div className="apply-heading">
          <span className="section-kicker">APPLICATION FORM</span>
          <h1>Apply for {opportunity.title}</h1>
          <p>{opportunity.organization}</p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="phone">Phone number (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <label htmlFor="message">
            Why are you interested? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Briefly tell us about your interest"
            rows="5"
          />

          <label className="apply-consent">
            <input
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            I understand that my application details will be stored
            locally in this browser and will not be sent to the
            opportunity provider.
          </label>

          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}

          <button className="primary-button" type="submit">
            Continue to application tracking →
          </button>
        </form>
      </section>
    </main>
  )
}

export default Apply
