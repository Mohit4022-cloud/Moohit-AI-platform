import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QuantumDashboard from './components/QuantumDashboard'
import QuantumLeadsPage from './components/QuantumLeadsPage'
import QuantumConversations from './components/QuantumConversations'
import QuantumAnalytics from './components/QuantumAnalytics'
import QuantumCampaigns from './components/QuantumCampaigns'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<QuantumDashboard />} />
        <Route path="/leads" element={<QuantumLeadsPage />} />
        <Route path="/conversations" element={<QuantumConversations />} />
        <Route path="/analytics" element={<QuantumAnalytics />} />
        <Route path="/campaigns" element={<QuantumCampaigns />} />
      </Routes>
    </Router>
  )
}

export default App