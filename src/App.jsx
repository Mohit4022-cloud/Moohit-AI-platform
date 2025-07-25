import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import QuantumDashboard from './components/QuantumDashboard'
import QuantumLeadsPage from './components/QuantumLeadsPage'
import QuantumConversations from './components/QuantumConversations'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<QuantumDashboard />} />
        <Route path="/leads" element={<QuantumLeadsPage />} />
        <Route path="/conversations" element={<QuantumConversations />} />
      </Routes>
    </Router>
  )
}

export default App