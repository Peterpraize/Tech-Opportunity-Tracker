
import { useState } from 'react'
import ApplicantNav from '../components/ApplicantNav'
import './Profile.css'

const PROFILE_STORAGE_KEY = 'techtrack-demo-profile'

const initialProfile = {
  fullName: '',
  email: '',
  location: '',
  education: '',
  summary: '',
  skills: '',
  interests: 'Internship',
  careerGoal: '',
}

function loadProfile() {
  try {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)

    if (!savedProfile) {
      return initialProfile
    }

    const parsedProfile = JSON.parse(savedProfile)

    return {
      ...initialProfile,
      ...parsedProfile,
    }
  } catch {
    return initialProfile
  }
}

function Profile() {
  const [profile, setProfile] = useState(loadProfile)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }))

    setMessage('')
    setError('')
    setIsSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!profile.fullName.trim()) {
      setError('Please enter your full name.')
      setMessage('')
      return
    }

    if (!profile.email.trim()) {
      setError('Please enter your email address.')
      setMessage('')
      return
    }

    try {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(profile)
      )

      setError('')
      setMessage('Your profile has been saved in this browser.')
      setIsSaved(true)
    } catch {
      setError(
        'We could not save your profile. Check your browser storage and try again.'
      )
      setMessage('')
      setIsSaved(false)
    }
  }

  function handleClear() {
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY)
      setProfile(initialProfile)
      setMessage('Your locally saved profile has been cleared.')
      setError('')
      setIsSaved(false)
    } catch {
      setError('Unable to clear the saved profile. Please try again.')
      setMessage('')
    }
  }

  return (
    <main className="profile-page">
      <ApplicantNav />
      <section className="profile-heading">
        <p className="profile-eyebrow">YOUR CAREER PROFILE</p>
        <h1>Tell TechTrack about yourself.</h1>
        <p>
          Add your background, skills, and interests to prepare for
          opportunities that match your career goals.
        </p>
      </section>

      <form className="profile-form" onSubmit={handleSubmit}>
        <section className="profile-form-section">
          <h2>Personal information</h2>
          <p>Start with the details you want organizations to know.</p>

          <div className="profile-fields">
            <label>
              Full name
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="e.g. Lagos, Nigeria"
                autoComplete="address-level2"
              />
            </label>

            <label>
              Education
              <input
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="e.g. Computer Science student"
              />
            </label>
          </div>
        </section>

        <section className="profile-form-section">
          <h2>Professional background</h2>
          <p>Briefly describe your experience and the skills you have.</p>

          <label>
            Professional summary
            <textarea
              name="summary"
              value={profile.summary}
              onChange={handleChange}
              placeholder="Tell us about your experience, projects, or interests..."
              rows={4}
            />
          </label>

          <label>
            Skills and technologies
            <textarea
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js, PostgreSQL"
              rows={3}
            />
          </label>
        </section>

        <section className="profile-form-section">
          <h2>Career interests</h2>
          <p>Tell us what kind of opportunity you are looking for.</p>

          <div className="profile-fields">
            <label>
              Preferred opportunity
              <select
                name="interests"
                value={profile.interests}
                onChange={handleChange}
              >
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Fellowship">Fellowship</option>
                <option value="Training">Training</option>
              </select>
            </label>

            <label>
              Career goal
              <input
                name="careerGoal"
                value={profile.careerGoal}
                onChange={handleChange}
                placeholder="e.g. Become a backend developer"
              />
            </label>
          </div>
        </section>
<div
  className="profile-form-actions"
  style={{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    marginTop: '24px',
  }}
>
  <button
    type="submit"
    className="profile-save-button"
    style={{
      flex: '0 1 auto',
      width: 'auto',
      minWidth: '140px',
      margin: 0,
    }}
  >
    {isSaved ? 'Profile saved' : 'Save profile'}
  </button>

  <button
    type="button"
    className="profile-save-button profile-clear-button"
    onClick={handleClear}
    style={{
      flex: '0 1 auto',
      width: 'auto',
      minWidth: '140px',
      margin: 0,
    }}
  >
    Clear saved profile
  </button>
</div>
        {error && (
          <p className="profile-message" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="profile-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="profile-demo-note">
        Demo notice: profile information is saved in this browser only.
        It is not connected to an account or shared with organizations.
        Use fictional details for testing if you prefer.
      </p>
    </main>
  )
}
export default Profile
