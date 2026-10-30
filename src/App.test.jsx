
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import {
  cleanup,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext.jsx'
import SavedOpportunitiesProvider from './context/SavedOpportunitiesContext.jsx'
import { getOpportunities } from './services/opportunityService'

vi.mock('./services/opportunityService', () => ({
  getOpportunities: vi.fn(),
}))

function renderApp(path = '/') {
  window.history.pushState({}, '', path)

  return render(<App />)
}

describe('Tech Opportunity Tracker', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    getOpportunities.mockResolvedValue([])
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('renders the main navigation links for a visitor', () => {
    render(
      <AuthProvider>
        <SavedOpportunitiesProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </SavedOpportunitiesProvider>
      </AuthProvider>
    )

    expect(
      screen.getByRole('navigation', { name: /main navigation/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /techtrack/i })
    ).toHaveAttribute('href', '/')

    expect(
      screen.getByRole('link', { name: /my saved/i })
    ).toHaveAttribute('href', '/saved-opportunities')

    expect(
      screen.getByRole('link', { name: /create account/i })
    ).toHaveAttribute('href', '/register')
  })

  it('renders the not-found page for an unknown route', async () => {
    renderApp('/this-route-does-not-exist')

    expect(
      await screen.findByRole('heading', {
        name: /looks like you're off track/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /back to homepage/i })
    ).toHaveAttribute('href', '/')

    expect(
      screen.getByRole('link', {
        name: /sign in to your account/i,
      })
    ).toHaveAttribute('href', '/login')

    expect(
      screen.queryByRole('link', { name: /go to dashboard/i })
    ).not.toBeInTheDocument()
  })

  it('renders the home page and requests opportunities', async () => {
    getOpportunities.mockResolvedValueOnce([])

    renderApp('/')

    expect(
      screen.getByRole('heading', { name: /your future in tech/i })
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(getOpportunities).toHaveBeenCalled()
    })
  })
})
