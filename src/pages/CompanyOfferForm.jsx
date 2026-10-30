
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import './CompanyDashboard.css'

const OFFERS_KEY = 'techtrack-company-offers'

function CompanyOfferForm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    offerType: 'Job vacancy',
    description: '',
    requirements: '',
    location: '',
    budget: '',
    deadline: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.title.trim() || !form.description.trim()) {
      setError('Please enter an offer title and description.')
      return
    }

    try {
      const stored = JSON.parse(
        localStorage.getItem(OFFERS_KEY) || '[]'
      )
      const existingOffers = Array.isArray(stored) ? stored : []

      const offer = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        companyName: user.fullName,
        companyEmail: user.email,
        id: crypto.randomUUID(),
        status: 'Pending review',
        submittedAt: new Date().toISOString(),
      }

      localStorage.setItem(
        OFFERS_KEY,
        JSON.stringify([offer, ...existingOffers])
      )

      navigate('/company/dashboard', { replace: true })
    } catch {
      setError('Could not save your offer. Please try again.')
    }
  }

  return (
    <main className="company-dashboard">
      <section className="company-welcome">
        <p className="company-eyebrow">COMPANY WORKSPACE</p>
        <h1>Submit an Offer</h1>
        <p>
          Provide the details of your offer. The TechTrack team will
          review it before considering suitable client matches.
        </p>
        <Link to="/company/dashboard">← Back to dashboard</Link>
      </section>

      <form className="company-offer-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Offer title *</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Junior Software Developer"
          required
        />

        <label htmlFor="offerType">Offer type *</label>
        <select
          id="offerType"
          name="offerType"
          value={form.offerType}
          onChange={handleChange}
          required
        >
          <option>Job vacancy</option>
          <option>Freelance project</option>
          <option>Contract</option>
          <option>IT service</option>
          <option>Talent requirement</option>
          <option>Other</option>
        </select>

        <label htmlFor="description">Offer description *</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the opportunity or service..."
          rows={5}
          required
        />

        <label htmlFor="requirements">Requirements or client needs</label>
        <textarea
          id="requirements"
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Skills, experience, qualifications or other needs..."
          rows={4}
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder=" Remote or Lagos"
        />

        <label htmlFor="budget">Budget or salary range</label>
        <input
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder=" ₦150,000–₦250,000 monthly"
        />

        <label htmlFor="deadline">Application or offer deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
        />

        {error && (
          <p className="auth-error" role="alert">{error}</p>
        )}

        <button type="submit" className="auth-submit-button">
          Submit Offer for Review
        </button>
      </form>
    </main>
  )
}

export default CompanyOfferForm
