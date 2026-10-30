
import { useState } from 'react'
import './AdminDashboard.css'



const OFFERS_KEY = 'techtrack-company-offers'
const PROFILES_KEY = 'techtrack-applicant-profiles'
const SCREENING_KEY = 'techtrack-applicant-screening'
const MATCHES_KEY = 'techtrack-matches'
const ATS_RESULTS_KEY = 'techtrack-ats-results'

function readStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}



async function extractPDFText(fileData) {
  const pdfjsLib = await import('pdfjs-dist')
  const pdfjsWorker = await import(
    'pdfjs-dist/build/pdf.worker.min.mjs?url'
  )

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default

  const pdf = await pdfjsLib.getDocument(fileData).promise
  let extractedText = ''

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber)
    const content = await page.getTextContent()

    extractedText +=
      content.items.map((item) => item.str).join(' ') + '\n'
  }

  return extractedText.trim()
}

async function extractDOCXText(fileData) {
  const mammothModule = await import('mammoth/mammoth.browser')
  const mammoth = mammothModule.default || mammothModule

  const response = await fetch(fileData)
  const arrayBuffer = await response.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })

  return result.value.trim()
}

async function extractCVText(cv) {
  if (!cv?.data || !cv?.type) {
    throw new Error('No valid CV file was found.')
  }

  if (cv.type === 'pdf') {
    return extractPDFText(cv.data)
  }

  if (cv.type === 'docx') {
    return extractDOCXText(cv.data)
  }

  throw new Error('Unsupported CV format.')
}




const COMMON_WORDS = new Set([
  'with', 'from', 'that', 'this', 'have', 'will', 'your',
  'their', 'they', 'them', 'into', 'about', 'using', 'work',
  'working', 'years', 'year', 'must', 'should', 'good',
  'strong', 'ability', 'experience', 'knowledge', 'skills',
  'skill', 'required', 'requirements', 'candidate', 'role',
  'position', 'company', 'team', 'looking', 'including',
  'other', 'related', 'preferred', 'responsibilities',
  'opportunity', 'developer', 'applicant',
])

function extractKeywords(text) {
  return [
    ...new Set(
      (text || '')
        .toLowerCase()
        .replace(/[^a-z0-9+#.\s-]/g, ' ')
        .split(/[\s,;|/]+/)
        .map((word) => word.trim().replace(/^[.-]+|[.-]+$/g, ''))
        .filter(
          (word) =>
            word.length > 1 &&
            !COMMON_WORDS.has(word) &&
            !/^\d+$/.test(word)
        )
    ),
  ]
}

function analyzeApplicantAgainstOffer(offer, applicant, cvText = '') {
  const offerText = [
    offer.title,
    offer.description,
    offer.requirements,
    offer.offerType,
  ].filter(Boolean).join(' ')

  const applicantText = [
    applicant.skills,
    applicant.summary,
    applicant.careerGoal,
    applicant.interests,
    applicant.education,
    cvText,
  ].filter(Boolean).join(' ')

  const requiredKeywords = extractKeywords(offerText)
  const applicantKeywords = extractKeywords(applicantText)

  const applicantKeywordSet = new Set(applicantKeywords)

  const matchedKeywords = requiredKeywords.filter(
    (keyword) => applicantKeywordSet.has(keyword)
  )

  const missingKeywords = requiredKeywords.filter(
    (keyword) => !applicantKeywordSet.has(keyword)
  )

  const score = requiredKeywords.length
    ? Math.round(
      (matchedKeywords.length / requiredKeywords.length) * 100
    )
    : 0

  const reasons = []

  if (matchedKeywords.length > 0) {
    reasons.push(
      `Matching keywords: ${matchedKeywords.join(', ')}.`
    )
  }

  if (missingKeywords.length > 0) {
    reasons.push(
      `Keywords not found: ${missingKeywords.slice(0, 12).join(', ')}.`
    )
  }

  if (!cvText.trim()) {
    reasons.push(
      'CV text has not been extracted. This assessment uses profile information only.'
    )
  } else {
    reasons.push(
      'Assessment includes extracted CV text and saved profile information.'
    )
  }

  return {
    score,
    matchedKeywords,
    missingKeywords,
    reasons,
    analyzedAt: new Date().toISOString(),
    source: cvText.trim() ? 'CV and profile' : 'Profile only',
  }
}

function getMatchScore(offer, applicant) {
  return analyzeApplicantAgainstOffer(
    offer,
    applicant,
    applicant.cvText || ''
  ).score
}


function AdminDashboard() {
  const [offers, setOffers] = useState(() =>
    readStorage(OFFERS_KEY)
  )

  const [applicants, setApplicants] = useState(() =>
    readStorage(PROFILES_KEY)
  )

  const [screening, setScreening] = useState(() =>
    readStorage(SCREENING_KEY)
  )

  const [matches, setMatches] = useState(() =>
    readStorage(MATCHES_KEY)
  )

  const [message, setMessage] = useState('')
  const [atsResults, setAtsResults] = useState(() =>
    readStorage(ATS_RESULTS_KEY)
  )

  const [scanningApplicant, setScanningApplicant] = useState('')

  async function runATSAnalysis(applicant) {
    const email = (
      applicant.accountEmail || applicant.email || ''
    ).toLowerCase()

    if (!applicant.cv?.data) {
      setMessage(`No CV uploaded by ${applicant.fullName}.`)
      return
    }

    const approvedOffers = offers.filter(
      (offer) => offer.status === 'Approved'
    )

    if (approvedOffers.length === 0) {
      setMessage('Approve at least one company offer before running ATS.')
      return
    }

    setScanningApplicant(email)
    setMessage('Extracting CV and analysing applicant...')

    try {
      const cvText = await extractCVText(applicant.cv)

      if (!cvText.trim()) {
        throw new Error(
          'No readable text was found. This may be a scanned PDF.'
        )
      }

      const results = approvedOffers.map((offer) => {
        const analysis = analyzeApplicantAgainstOffer(
          offer,
          applicant,
          cvText
        )

        return {
          id: `${email}-${offer.id}`,
          applicantEmail: email,
          applicantName: applicant.fullName,
          offerId: offer.id,
          offerTitle: offer.title,
          companyName: offer.companyName,
          ...analysis,
        }
      })

      const existingResults = atsResults.filter(
        (result) => result.applicantEmail !== email
      )

      const updatedResults = [
        ...existingResults,
        ...results,
      ]

      localStorage.setItem(
        ATS_RESULTS_KEY,
        JSON.stringify(updatedResults)
      )

      setAtsResults(updatedResults)

      setMessage(
        `ATS analysis completed for ${applicant.fullName}. Analysed against ${results.length} approved offer(s).`
      )
    } catch (error) {
      setMessage(
        `ATS analysis failed: ${error.message || 'Unable to process CV.'}`
      )
    } finally {
      setScanningApplicant('')
    }
  }

  function updateOfferStatus(id, status) {
    const updated = offers.map((offer) =>
      offer.id === id ? { ...offer, status } : offer
    )

    localStorage.setItem(OFFERS_KEY, JSON.stringify(updated))
    setOffers(updated)
    setMessage(`Offer status updated to ${status}.`)
  }

  function updateScreening(email, status) {
    const existing = screening.filter(
      (item) => item.email.toLowerCase() !== email.toLowerCase()
    )

    const updated = [
      ...existing,
      { email, status, updatedAt: new Date().toISOString() },
    ]

    localStorage.setItem(SCREENING_KEY, JSON.stringify(updated))
    setScreening(updated)
    setMessage(`Applicant screening updated: ${status}.`)
  }

  function getApplicantStatus(applicant) {
    return screening.find(
      (item) =>
        item.email.toLowerCase() ===
        (applicant.accountEmail || applicant.email || '').toLowerCase()
    )?.status || 'Not screened'
  }

  function proposeMatch(offer, applicant) {
    if (offer.status !== 'Approved') {
      setMessage('Approve the offer before proposing a match.')
      return
    }

    if (getApplicantStatus(applicant) !== 'Screened') {
      setMessage('Screen the applicant before proposing a match.')
      return
    }

    const email = applicant.accountEmail || applicant.email

    const alreadyMatched = matches.some(
      (match) =>
        match.offerId === offer.id &&
        match.applicantEmail === email &&
        match.status !== 'Cancelled'
    )

    if (alreadyMatched) {
      setMessage('This applicant is already matched to this offer.')
      return
    }

    const match = {
      id: crypto.randomUUID(),
      offerId: offer.id,
      offerTitle: offer.title,
      companyName: offer.companyName,
      applicantEmail: email,
      applicantName: applicant.fullName,
      score:
        atsResults.find(
          (result) =>
            result.applicantEmail.toLowerCase() === email.toLowerCase() &&
            result.offerId === offer.id
        )?.score ?? getMatchScore(offer, applicant),
      status: 'Proposed',
      createdAt: new Date().toISOString(),
    }

    const updated = [match, ...matches]

    localStorage.setItem(MATCHES_KEY, JSON.stringify(updated))
    setMatches(updated)
    setMessage(`Match proposed for ${applicant.fullName}.`)
  }

  function updateMatchStatus(id, status) {
    const updated = matches.map((match) =>
      match.id === id ? { ...match, status } : match
    )

    localStorage.setItem(MATCHES_KEY, JSON.stringify(updated))
    setMatches(updated)
    setMessage(`Match status updated to ${status}.`)
  }

  const pendingOffers = offers.filter(
    (offer) => offer.status === 'Pending review'
  )

  const screenedCount = applicants.filter(
    (applicant) => getApplicantStatus(applicant) === 'Screened'
  ).length

  const approvedOffers = offers.filter(
    (offer) => offer.status === 'Approved'
  )

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <p className="admin-eyebrow">TECHTRACK ADMINISTRATION</p>
        <h1>Management Workspace</h1>
        <p>
          Review company offers, screen registered applicants and
          coordinate suitable matches.
        </p>
      </header>

      {message && (
        <p className="admin-message" role="status">{message}</p>
      )}

      <section className="admin-stats">
        <article>
          <span>Total offers</span>
          <strong>{offers.length}</strong>
        </article>
        <article>
          <span>Pending review</span>
          <strong>{pendingOffers.length}</strong>
        </article>
        <article>
          <span>Registered applicants</span>
          <strong>{applicants.length}</strong>
        </article>
        <article>
          <span>Screened applicants</span>
          <strong>{screenedCount}</strong>
        </article>
      </section>

      <section className="admin-section">
        <h2>1. Review company offers</h2>
        <p>Approve suitable offers before matching applicants.</p>

        {offers.length === 0 && (
          <p className="admin-empty">No company offers submitted yet.</p>
        )}

        {offers.map((offer) => (
          <article className="admin-card" key={offer.id}>
            <div className="admin-card-heading">
              <div>
                <h3>{offer.title}</h3>
                <p>{offer.companyName} · {offer.companyEmail}</p>
                <p>{offer.offerType} · {offer.location || 'Location not specified'}</p>
              </div>
              <span className="admin-status">{offer.status}</span>
            </div>

            <p>{offer.description}</p>

            {offer.requirements && (
              <p><strong>Requirements:</strong> {offer.requirements}</p>
            )}

            <p><strong>Budget:</strong> {offer.budget || 'Not specified'}</p>

            <div className="admin-actions">
              <button
                type="button"
                disabled={offer.status === 'Approved'}
                onClick={() => updateOfferStatus(offer.id, 'Approved')}
              >
                Approve
              </button>

              <button
                type="button"
                className="admin-secondary"
                disabled={offer.status === 'Rejected'}
                onClick={() => updateOfferStatus(offer.id, 'Rejected')}
              >
                Reject
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-section">
        <h2>2. Registered applicants</h2>
        <p>
          Applicant profiles are loaded from saved TechTrack profiles.
          Review their details and screen them before matching.
        </p>

        {applicants.length === 0 ? (
          <div className="admin-empty">
            <p>No saved applicant profiles found.</p>
            <p>
              Applicants must register and save their profiles before
              they appear here. Profiles saved before the profile update
              may need to be saved again.
            </p>
          </div>
        ) : (

          applicants.map((applicant) => {
            const email = (
              applicant.accountEmail || applicant.email || ''
            ).toLowerCase()

            const status = getApplicantStatus(applicant)

            const applicantATSResults = atsResults.filter(
              (result) => result.applicantEmail === email
            )

            const suggestions = approvedOffers
              .map((offer) => {
                const atsResult = applicantATSResults.find(
                  (result) => result.offerId === offer.id
                )

                return {
                  offer,
                  score: atsResult
                    ? atsResult.score
                    : getMatchScore(offer, applicant),
                  source: atsResult
                    ? 'CV and profile'
                    : 'Profile only',
                }
              })
              .sort((a, b) => b.score - a.score)

            return (
              <article className="admin-card" key={email}>
                {/* Applicant identity */}
                <div className="admin-card-heading admin-applicant-heading">
                  <div className="admin-applicant-identity">
                    {applicant.profilePhoto ? (
                      <img
                        src={applicant.profilePhoto}
                        alt={`${applicant.fullName}'s profile`}
                        className="admin-applicant-photo"
                      />
                    ) : (
                      <div className="admin-applicant-avatar">
                        {applicant.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}

                    <div>
                      <h3>{applicant.fullName}</h3>
                      <p>{email}</p>
                      <p>{applicant.location || 'Location not provided'}</p>
                    </div>
                  </div>

                  <span className="admin-status">{status}</span>
                </div>

                {/* Applicant CV */}
                <div className="admin-cv-actions">
                  {applicant.cv?.data ? (
                    <>
                      {applicant.cv.type === 'pdf' ? (
                        <a
                          href={applicant.cv.data}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View CV
                        </a>
                      ) : (
                        <a
                          href={applicant.cv.data}
                          download={applicant.cv.name}
                        >
                          Download CV
                        </a>
                      )}

                      <span>{applicant.cv.name}</span>
                    </>
                  ) : (
                    <p>No CV uploaded.</p>
                  )}
                </div>

                {/* Applicant information */}
                <div className="admin-applicant-details">
                  <p>
                    <strong>Education:</strong>{' '}
                    {applicant.education || 'Not provided'}
                  </p>

                  <p>
                    <strong>Skills:</strong>{' '}
                    {applicant.skills || 'Not provided'}
                  </p>

                  <p>
                    <strong>Career goal:</strong>{' '}
                    {applicant.careerGoal || 'Not provided'}
                  </p>

                  <p>
                    <strong>Interests:</strong>{' '}
                    {applicant.interests || 'Not provided'}
                  </p>

                  <p>
                    <strong>Professional summary:</strong>{' '}
                    {applicant.summary || 'Not provided'}
                  </p>
                </div>

                {/* Screening and ATS actions */}
                <div className="admin-actions">
                  <button
                    type="button"
                    disabled={status === 'Screened'}
                    onClick={() => updateScreening(email, 'Screened')}
                  >
                    Mark Screened
                  </button>

                  <button
                    type="button"
                    className="admin-secondary"
                    onClick={() =>
                      updateScreening(email, 'Screening required')
                    }
                  >
                    Screening Required
                  </button>

                  <button
                    type="button"
                    disabled={
                      scanningApplicant === email ||
                      !applicant.cv?.data ||
                      approvedOffers.length === 0
                    }
                    onClick={() => runATSAnalysis(applicant)}
                  >
                    {scanningApplicant === email
                      ? 'Analysing CV...'
                      : 'Run ATS Analysis'}
                  </button>
                </div>

                {/* ATS analysis results */}
                <div className="admin-suggestions">
                  <h4>ATS Analysis Results</h4>

                  {applicantATSResults.length === 0 ? (
                    <p>No ATS analysis performed yet.</p>
                  ) : (
                    applicantATSResults.map((result) => (
                      <article
                        className="admin-suggestion"
                        key={result.id}
                      >
                        <div className="admin-ats-result-details">
                          <strong>{result.offerTitle}</strong>
                          <p>{result.companyName}</p>

                          <p>
                            <strong>Match score:</strong> {result.score}%
                          </p>

                          <p>
                            <strong>Assessment source:</strong>{' '}
                            {result.source}
                          </p>

                          <p>
                            <strong>Matched keywords:</strong>{' '}
                            {result.matchedKeywords.join(', ') || 'None identified'}
                          </p>

                          <p>
                            <strong>Missing keywords:</strong>{' '}
                            {result.missingKeywords.slice(0, 10).join(', ') ||
                              'None identified'}
                          </p>

                          {result.reasons?.map((reason, index) => (
                            <p key={index}>{reason}</p>
                          ))}

                          <small>
                            Analysed: {new Date(result.analyzedAt).toLocaleString()}
                          </small>
                        </div>
                      </article>
                    ))
                  )}
                </div>

                {/* Suggested matches */}
                <div className="admin-suggestions">
                  <h4>Suggested Matches</h4>

                  {suggestions.length === 0 ? (
                    <p>No approved offers available for matching yet.</p>
                  ) : (
                    suggestions.map(({ offer, score, source }) => (
                      <div className="admin-suggestion" key={offer.id}>
                        <div>
                          <strong>{offer.title}</strong>
                          <p>{offer.companyName}</p>
                          <p>{score}% match · {source}</p>
                        </div>

                        <button
                          type="button"
                          disabled={
                            status !== 'Screened' ||
                            matches.some(
                              (match) =>
                                match.offerId === offer.id &&
                                match.applicantEmail.toLowerCase() === email &&
                                match.status !== 'Cancelled'
                            )
                          }
                          onClick={() => proposeMatch(offer, applicant)}
                        >
                          {status !== 'Screened'
                            ? 'Screen first'
                            : 'Propose Match'}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </article>
            )
          })

        )}
      </section>

      <section className="admin-section">
        <h2>3. Matching and outcomes</h2>

        {matches.length === 0 ? (
          <p className="admin-empty">No matches proposed yet.</p>
        ) : (
          matches.map((match) => (
            <article className="admin-card" key={match.id}>
              <h3>{match.offerTitle}</h3>
              <p>Company: {match.companyName}</p>
              <p>Applicant: {match.applicantName} ({match.applicantEmail})</p>
              <p>Profile match score: {match.score}%</p>
              <p>Status: {match.status}</p>

              <label htmlFor={`match-status-${match.id}`}>
                Update outcome
              </label>

              <select
                id={`match-status-${match.id}`}
                value={match.status}
                onChange={(event) =>
                  updateMatchStatus(match.id, event.target.value)
                }
              >
                <option value="Proposed">Proposed</option>
                <option value="Under discussion">Under discussion</option>
                <option value="Successful">Successful</option>
                <option value="Unsuccessful">Unsuccessful</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default AdminDashboard
