
import { useState } from 'react'
import { useAuth } from '../context/useAuth.js'
import ApplicantNav from '../components/ApplicantNav'
import './Profile.css'

const PROFILE_STORAGE_KEY = 'techtrack-demo-profile'
const PROFILES_KEY = 'techtrack-applicant-profiles'

const MAX_PHOTO_SIZE = 500 * 1024
const MAX_CV_SIZE = 1024 * 1024

const initialProfile = {
  fullName: '',
  email: '',
  location: '',
  education: '',
  summary: '',
  skills: '',
  interests: 'Internship',
  careerGoal: '',
  profilePhoto: '',
  cv: null,
}

function loadProfile(accountEmail) {
  try {
    const storedProfiles = JSON.parse(
      localStorage.getItem(PROFILES_KEY) || '[]'
    )

    if (Array.isArray(storedProfiles) && accountEmail) {
      const savedApplicant = storedProfiles.find(
        (item) =>
          item.accountEmail?.toLowerCase() ===
          accountEmail.toLowerCase()
      )

      if (savedApplicant) {
        return { ...initialProfile, ...savedApplicant }
      }
    }

    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)

    if (savedProfile) {
      return { ...initialProfile, ...JSON.parse(savedProfile) }
    }
  } catch (error) {
  console.error('Unable to load the saved profile:', error)
}

  return {
    ...initialProfile,
    email: accountEmail || '',
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Unable to read this file.'))

    reader.readAsDataURL(file)
  })
}

function Profile() {
  const { user } = useAuth()

  const [profile, setProfile] = useState(() =>
    loadProfile(user?.email)
  )
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [isReadingFile, setIsReadingFile] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setMessage('')
    setError('')
    setIsSaved(false)
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setError('Your profile photo must be 500 KB or smaller.')
      return
    }

    setIsReadingFile(true)
    setError('')
    setMessage('')

    try {
      const data = await readFileAsDataURL(file)

      setProfile((current) => ({
        ...current,
        profilePhoto: data,
      }))

      setIsSaved(false)
      setMessage('Photo selected. Save your profile to keep it.')
    } catch {
      setError('Unable to read your photo. Please try another file.')
    } finally {
      setIsReadingFile(false)
    }
  }

  async function handleCVChange(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    const extension = file.name.split('.').pop()?.toLowerCase()
    const isPDF =
      extension === 'pdf' &&
      (file.type === 'application/pdf' || file.type === '')

    const isDOCX =
      extension === 'docx' &&
      (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === ''
      )

    if (!isPDF && !isDOCX) {
      setError('Upload your CV as a PDF or DOCX file.')
      return
    }

    if (file.size > MAX_CV_SIZE) {
      setError('Your CV must be 1 MB or smaller for this demo.')
      return
    }

    setIsReadingFile(true)
    setError('')
    setMessage('')

    try {
      const data = await readFileAsDataURL(file)

      setProfile((current) => ({
        ...current,
        cv: {
          name: file.name,
          type: isPDF ? 'pdf' : 'docx',
          size: file.size,
          data,
          uploadedAt: new Date().toISOString(),
        },
      }))

      setIsSaved(false)
      setMessage('CV selected. Save your profile to keep it.')
    } catch {
      setError('Unable to read your CV. Please try another file.')
    } finally {
      setIsReadingFile(false)
    }
  }

  function handleRemovePhoto() {
    setProfile((current) => ({
      ...current,
      profilePhoto: '',
    }))

    setIsSaved(false)
    setMessage('')
    setError('')
  }

  function handleRemoveCV() {
    setProfile((current) => ({
      ...current,
      cv: null,
    }))

    setIsSaved(false)
    setMessage('')
    setError('')
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
      const storedProfiles = JSON.parse(
        localStorage.getItem(PROFILES_KEY) || '[]'
      )

      const profiles = Array.isArray(storedProfiles)
        ? storedProfiles
        : []

      const accountEmail = (
        user?.email || profile.email
      ).trim().toLowerCase()

      const updatedProfile = {
        ...profile,
        fullName: profile.fullName.trim(),
        email: accountEmail,
        accountEmail,
        updatedAt: new Date().toISOString(),
      }

      const existingIndex = profiles.findIndex(
        (item) =>
          item.accountEmail?.toLowerCase() === accountEmail
      )

      if (existingIndex >= 0) {
        profiles[existingIndex] = updatedProfile
      } else {
        profiles.push(updatedProfile)
      }

      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))

      const legacyProfile = { ...updatedProfile }
      delete legacyProfile.profilePhoto
      delete legacyProfile.cv

      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(legacyProfile)
      )

      setProfile(updatedProfile)
      setError('')
      setMessage('Your profile, photo and CV have been saved.')
      setIsSaved(true)
    } catch {
      setError(
        'Unable to save your profile. Browser storage may be full. Try a smaller CV or photo.'
      )
      setMessage('')
      setIsSaved(false)
    }
  }

  function handleClear() {
    try {
      const accountEmail = user?.email?.toLowerCase()

      const storedProfiles = JSON.parse(
        localStorage.getItem(PROFILES_KEY) || '[]'
      )

      if (Array.isArray(storedProfiles) && accountEmail) {
        const remainingProfiles = storedProfiles.filter(
          (item) =>
            item.accountEmail?.toLowerCase() !== accountEmail
        )

        localStorage.setItem(
          PROFILES_KEY,
          JSON.stringify(remainingProfiles)
        )
      }

      localStorage.removeItem(PROFILE_STORAGE_KEY)

      setProfile({
        ...initialProfile,
        email: user?.email || '',
      })

      setMessage('Your saved profile has been cleared.')
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
          Add your background, skills, CV and photo to prepare for
          opportunities that match your career goals.
        </p>
      </section>

      <form className="profile-form" onSubmit={handleSubmit}>
        <section className="profile-form-section">
          <h2>Profile photo</h2>
          <p>
            Add a professional photo so your profile is easy to identify.
          </p>

          <div className="tt-profile-photo-area">
            {profile.profilePhoto ? (
              <img
                className="tt-profile-photo"
                src={profile.profilePhoto}
                alt="Your profile"
              />
            ) : (
              <div className="tt-profile-photo-placeholder">
                {profile.fullName?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}

            <div className="tt-upload-controls">
              <label className="tt-upload-button">
                Upload photo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  disabled={isReadingFile}
                  hidden
                />
              </label>

              {profile.profilePhoto && (
                <button
                  type="button"
                  className="tt-secondary-button"
                  onClick={handleRemovePhoto}
                >
                  Remove photo
                </button>
              )}

              <small>JPG, PNG or WebP. Maximum 500 KB.</small>
            </div>
          </div>
        </section>

        <section className="profile-form-section">
          <h2>Your CV or Resume</h2>
          <p>
            Upload your latest CV so TechTrack can use it for applicant
            screening and opportunity matching.
          </p>


          <div className="tt-cv-upload">
            <label className="tt-cv-select-button">
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleCVChange}
                disabled={isReadingFile}
                hidden
              />
              <span>+ Choose CV</span>
            </label>

            <p className="tt-cv-selected-name">
              {profile.cv?.name || 'No CV selected'}
            </p>

            <small>PDF or DOCX. Maximum 1 MB.</small>
          </div>


          {profile.cv && (
            <div className="tt-cv-card">
              <div>
                <strong>{profile.cv.name}</strong>
                <p>
                  {profile.cv.type.toUpperCase()} ·{' '}
                  {(profile.cv.size / 1024).toFixed(0)} KB
                </p>
                {profile.cv.uploadedAt && (
                  <small>
                    Uploaded{' '}
                    {new Date(profile.cv.uploadedAt).toLocaleDateString()}
                  </small>
                )}
              </div>

              {profile.cv.data && (
                <a
                  href={profile.cv.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-cv-download"
                >
                  View CV
                </a>
              )}

              <button
                type="button"
                className="tt-secondary-button"
                onClick={handleRemoveCV}
              >
                Remove CV
              </button>
            </div>
          )}

          {!profile.cv && (
            <p className="tt-no-cv">No CV uploaded yet.</p>
          )}
        </section>

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
                placeholder="Lagos, Nigeria"
                autoComplete="address-level2"
              />
            </label>

            <label>
              Education
              <input
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="Bachelor of Science in Computer Science"
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
              placeholder="JavaScript, React, Node.js, PostgreSQL"
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
                placeholder="Become a backend developer"
              />
            </label>
          </div>
        </section>

        <div className="profile-form-actions">
          <button
            type="submit"
            className="profile-save-button"
            disabled={isReadingFile}
          >
            {isSaved ? 'Profile saved' : 'Save profile'}
          </button>

          <button
            type="button"
            className="profile-save-button profile-clear-button"
            onClick={handleClear}
            disabled={isReadingFile}
          >
            Clear saved profile
          </button>
        </div>

        {isReadingFile && (
          <p className="profile-message" role="status">
            Reading file…
          </p>
        )}

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
    </main>
  )
}

export default Profile
