import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QuantumDashboard from './components/QuantumDashboard'
import QuantumLeadsPage from './components/QuantumLeadsPage'
import QuantumConversations from './components/QuantumConversations'
import QuantumAnalyticsFixed from './components/QuantumAnalyticsFixed'
import QuantumCampaigns from './components/QuantumCampaigns'
import QuantumSettings from './components/QuantumSettings'
import QuantumLiveQueue from './components/QuantumLiveQueueFixed'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<QuantumDashboard />} />
        <Route path="/leads" element={<QuantumLeadsPage />} />
        <Route path="/conversations" element={<QuantumConversations />} />
        <Route path="/analytics" element={<QuantumAnalyticsFixed />} />
        <Route path="/campaigns" element={<QuantumCampaigns />} />
        <Route path="/settings" element={<QuantumSettings />} />
        <Route path="/live-queue" element={<QuantumLiveQueue />} />
      </Routes>
    </Router>
  )
}

export default App