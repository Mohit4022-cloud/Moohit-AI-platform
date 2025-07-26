import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QuantumLogin from './components/QuantumLogin'
import QuantumDashboard from './components/QuantumDashboard'
import QuantumLeadsPage from './components/QuantumLeadsPage'
import QuantumConversations from './components/QuantumConversations'
import QuantumAnalytics from './components/QuantumAnalytics'
import QuantumCampaigns from './components/QuantumCampaigns'
import QuantumSettings from './components/QuantumSettings'
import QuantumLiveQueue from './components/QuantumLiveQueueFixed'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const isDemoMode = localStorage.getItem('isDemoMode') === 'true'
  return (isAuthenticated || isDemoMode) ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<QuantumLogin />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <QuantumDashboard />
          </ProtectedRoute>
        } />
        <Route path="/leads" element={
          <ProtectedRoute>
            <QuantumLeadsPage />
          </ProtectedRoute>
        } />
        <Route path="/conversations" element={
          <ProtectedRoute>
            <QuantumConversations />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <QuantumAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/campaigns" element={
          <ProtectedRoute>
            <QuantumCampaigns />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <QuantumSettings />
          </ProtectedRoute>
        } />
        <Route path="/live-queue" element={
          <ProtectedRoute>
            <QuantumLiveQueue />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App