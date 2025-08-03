import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { useOrganization } from './hooks/useOrganization'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Profile from './pages/Profile'
import CreateApplication from './pages/CreateApplication'
import RFPAnalysis from './pages/RFPAnalysis'
import TemplateSelection from './pages/TemplateSelection'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const { needsOnboarding, loading: orgLoading } = useOrganization()
  
  if (authLoading || orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (needsOnboarding) {
    return <Navigate to="/onboarding" replace />
  }
  
  return <>{children}</>
}

function AppRoutes() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/onboarding" 
        element={user ? <Onboarding /> : <Navigate to="/login" replace />} 
      />
      <Route
        path="/applications/new"
        element={
          <ProtectedRoute>
            <CreateApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications/rfp-analysis"
        element={
          <ProtectedRoute>
            <RFPAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications/template-selection"
        element={
          <ProtectedRoute>
            <TemplateSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/applications" element={<div>Applications Page</div>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<div>Settings Page</div>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
