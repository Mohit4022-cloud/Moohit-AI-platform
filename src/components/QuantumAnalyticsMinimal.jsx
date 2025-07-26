import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuantumAnalytics.css';

export default function QuantumAnalyticsMinimal() {
  const navigate = useNavigate();
  
  return (
    <div className="quantum-analytics">
      <div className="quantum-background">
        <div className="quantum-grid"></div>
      </div>

      <header className="analytics-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
          >
            ←
          </button>
          <div>
            <h1 className="page-title">Analytics Minimal</h1>
            <p className="page-subtitle">Testing without any complex imports</p>
          </div>
        </div>
      </header>

      <div style={{ padding: '20px', color: 'white' }}>
        <p>If you can see this, the basic routing and CSS work.</p>
        <p>The issue is likely with:</p>
        <ul>
          <li>Complex component logic</li>
          <li>Recharts imports</li>
          <li>Large component size</li>
        </ul>
      </div>
    </div>
  );
}