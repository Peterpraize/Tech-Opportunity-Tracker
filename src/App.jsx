
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OpportunityDetails from './pages/OpportunityDetails'
import Apply from './pages/Apply'
import MyApplications from './pages/MyApplications'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import SavedOpportunities from './pages/SavedOpportunities'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import SavedOpportunitiesProvider from './context/SavedOpportunitiesContext.jsx'

function App() {
  return (
    <SavedOpportunitiesProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/opportunities/:id"
            element={<OpportunityDetails />}
          />

          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/saved-opportunities"
            element={<SavedOpportunities />}
          />

                    <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SavedOpportunitiesProvider>
  )
}

export default App
