import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { 
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip
} from 'recharts';
import './QuantumAnalytics.css';

export default function QuantumAnalyticsTest() {
  const navigate = useNavigate();
  
  const data = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 40 },
    { name: 'Wed', value: 35 },
    { name: 'Thu', value: 50 },
    { name: 'Fri', value: 45 }
  ];

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
            <h1 className="page-title">Analytics Test</h1>
            <p className="page-subtitle">Testing if basic charts work</p>
          </div>
        </div>
      </header>

      <section className="key-metrics">
        <div className="quantum-metric-card">
          <div className="metric-header">
            <div className="metric-icon">
              <Clock size={20} />
            </div>
          </div>
          <div className="metric-content">
            <h3 className="metric-title">Test Metric</h3>
            <div className="metric-value">42</div>
          </div>
        </div>
      </section>

      <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)' }}>
        <h3 style={{ color: 'white' }}>Simple Chart Test</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}