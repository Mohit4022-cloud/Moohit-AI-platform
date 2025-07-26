import React from 'react';
import './QuantumAnalytics.css';

export default function QuantumAnalyticsDebug() {
  console.log('QuantumAnalyticsDebug component loaded');
  
  return (
    <div className="quantum-analytics">
      <h1>Analytics Debug - Component Loaded Successfully</h1>
      <p>If you can see this, the basic component structure works.</p>
    </div>
  );
}