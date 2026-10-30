import { lazy, Suspense } from 'react'
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
import ProtectedRoute from './components/ProtectedRoute'

import SavedOpportunitiesProvider from './context/SavedOpportunitiesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import CompanyDashboard from './pages/CompanyDashboard'
import CompanyOfferForm from './pages/CompanyOfferForm'

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunities/:id"
          element={<OpportunityDetails />}
        />

        <Route path="/apply/:id" element={<Apply />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/saved-opportunities"
          element={<SavedOpportunities />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['applicant']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['applicant']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRoles={['applicant']}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/offers/new"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyOfferForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<p>Loading admin dashboard...</p>}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <SavedOpportunitiesProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SavedOpportunitiesProvider>
    </AuthProvider>
  )
}

export default App
