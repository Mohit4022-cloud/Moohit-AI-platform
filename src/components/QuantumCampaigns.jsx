import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Calendar, TrendingUp, Users, DollarSign, BarChart3, Mail, MessageSquare,
  Phone, Globe, Linkedin, Twitter, ArrowUp, ArrowDown, MoreVertical, Filter,
  Play, Pause, Edit2, X, Layers, Zap, Target, Activity, Send, Hash, Building,
  Clock, CheckCircle, AlertCircle, Info, Settings, Download, Upload, Share2,
  Brain, Sparkles, ChevronRight, Eye, EyeOff, RefreshCw, GitBranch, Command
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadialBarChart, RadialBar, ComposedChart, Scatter
} from 'recharts';

// Campaign Status Configuration
const CAMPAIGN_STATUS = {
  active: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)' },
  paused: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)' },
  completed: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)' },
  draft: { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', border: 'rgba(107, 114, 128, 0.3)' }
};

// Mock campaign performance data
const generatePerformanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    sent: Math.floor(Math.random() * 100) + 50,
    opened: Math.floor(Math.random() * 80) + 30,
    clicked: Math.floor(Math.random() * 50) + 10,
    converted: Math.floor(Math.random() * 20) + 5
  }));
};

// AI Predictions Component
const AIPredictionsPanel = ({ isOpen, onClose, campaign }) => {
  const [predictions, setPredictions] = useState({
    revenueForcast: 892450,
    optimalSendTime: '2:30 PM PST',
    engagementBoost: 34,
    confidence: 87
  });

  const recommendations = [
    'Increase personalization tokens in subject lines',
    'Add social proof elements to email templates',
    'Test shorter email sequences for SMB segment',
    'Implement behavior-triggered follow-ups'
  ];

  if (!isOpen) return null;

  return (
    <div className={`ai-sidebar ${isOpen ? 'active' : ''}`}>
      <div className="ai-header">
        <h3 className="ai-title">
          <Brain size={20} />
          AI Predictions
          <span className="ai-badge">LIVE</span>
        </h3>
        <button className="close-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="prediction-section">
        <div className="prediction-label">Revenue Forecast</div>
        <div className="prediction-card">
          <div className="prediction-value">${predictions.revenueForcast.toLocaleString()}</div>
          <div className="prediction-detail">Next 7 days • {predictions.confidence}% confidence</div>
        </div>
      </div>

      <div className="prediction-section">
        <div className="prediction-label">Optimal Actions</div>
        <div className="prediction-card">
          <div className="prediction-value">{predictions.optimalSendTime}</div>
          <div className="prediction-detail">Best send time • +{predictions.engagementBoost}% engagement</div>
        </div>
      </div>

      <div className="prediction-section">
        <div className="prediction-label">Recommendations</div>
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li key={index} className="recommendation-item">{rec}</li>
          ))}
        </ul>
      </div>

      <div className="prediction-section">
        <div className="prediction-label">Performance Trend</div>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={generatePerformanceData().slice(-7)}>
            <defs>
              <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="converted"
              stroke="#8b5cf6"
              fill="url(#predictionGradient)"
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Campaign Card Component
const CampaignCard = ({ campaign, onAction }) => {
  const performanceData = useMemo(() => generatePerformanceData(), []);
  const statusConfig = CAMPAIGN_STATUS[campaign.status];

  return (
    <div className="campaign-card">
      <div className="campaign-header">
        <div 
          className="campaign-status"
          style={{
            background: statusConfig.bg,
            border: `1px solid ${statusConfig.border}`,
            color: statusConfig.color
          }}
        >
          {campaign.status.toUpperCase()}
        </div>
        <h3 className="campaign-name">{campaign.name}</h3>
        <p className="campaign-description">{campaign.description}</p>
      </div>

      <div className="campaign-metrics">
        <div className="campaign-metric">
          <div className="campaign-metric-label">Sent</div>
          <div className="campaign-metric-value">{campaign.metrics.sent.toLocaleString()}</div>
          <div className="campaign-metric-trend trend-up">
            <ArrowUp size={10} />
            {campaign.metrics.sentTrend}% today
          </div>
        </div>
        <div className="campaign-metric">
          <div className="campaign-metric-label">Opened</div>
          <div className="campaign-metric-value">{campaign.metrics.opened.toLocaleString()}</div>
          <div className="campaign-metric-detail">{campaign.metrics.openRate}%</div>
        </div>
        <div className="campaign-metric">
          <div className="campaign-metric-label">Clicked</div>
          <div className="campaign-metric-value">{campaign.metrics.clicked.toLocaleString()}</div>
          <div className="campaign-metric-detail">{campaign.metrics.clickRate}%</div>
        </div>
        <div className="campaign-metric">
          <div className="campaign-metric-label">Converted</div>
          <div className="campaign-metric-value">{campaign.metrics.converted.toLocaleString()}</div>
          <div className="campaign-metric-detail">${campaign.metrics.revenue.toLocaleString()}</div>
        </div>
      </div>

      <div className="campaign-performance">
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={performanceData.slice(-10)}>
            <defs>
              <linearGradient id={`gradient-${campaign.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="opened"
              stroke="#8b5cf6"
              fill={`url(#gradient-${campaign.id})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="campaign-actions">
        <button className="action-btn" onClick={() => onAction('analytics', campaign)}>
          <BarChart3 size={14} />
          Analytics
        </button>
        <button className="action-btn" onClick={() => onAction('edit', campaign)}>
          <Edit2 size={14} />
          Edit
        </button>
        <button className="action-btn" onClick={() => onAction('toggle', campaign)}>
          {campaign.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
          {campaign.status === 'active' ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

// Main Campaigns Component
export default function QuantumCampaigns() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [showAI, setShowAI] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [dateRange, setDateRange] = useState('last30days');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Enterprise ABM Campaign Q4',
      description: 'Account-based marketing campaign targeting Fortune 500 companies',
      status: 'active',
      metrics: {
        sent: 150,
        sentTrend: 12,
        opened: 98,
        openRate: 65.3,
        clicked: 45,
        clickRate: 30.0,
        converted: 3,
        revenue: 450000
      }
    },
    {
      id: 2,
      name: 'SaaS Onboarding Sequence',
      description: 'Automated onboarding campaign for new SaaS customers',
      status: 'active',
      metrics: {
        sent: 1026,
        sentTrend: 23,
        opened: 856,
        openRate: 83.4,
        clicked: 412,
        clickRate: 40.2,
        converted: 298,
        revenue: 178800
      }
    }
  ]);

  const overviewMetrics = useMemo(() => ({
    totalReach: campaigns.reduce((acc, c) => acc + c.metrics.sent, 0),
    avgEngagement: campaigns.reduce((acc, c) => acc + c.metrics.openRate, 0) / campaigns.length,
    totalRevenue: campaigns.reduce((acc, c) => acc + c.metrics.revenue, 0),
    totalConversions: campaigns.reduce((acc, c) => acc + c.metrics.converted, 0),
    conversionRate: (campaigns.reduce((acc, c) => acc + c.metrics.converted, 0) / 
                     campaigns.reduce((acc, c) => acc + c.metrics.sent, 0) * 100).toFixed(1)
  }), [campaigns]);

  const handleCampaignAction = (action, campaign) => {
    console.log(`Action: ${action}`, campaign);
    if (action === 'analytics') {
      setSelectedCampaign(campaign);
      // Navigate to detailed analytics
    }
  };

  return (
    <div className="quantum-campaigns">
      {/* Background Effects */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigate('/dashboard')}
            >
              ←
            </button>
            <div>
              <h1>Campaigns</h1>
              <p className="header-subtitle">Create and manage multi-channel outreach campaigns</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn">
              <Calendar size={16} />
              Date Range
            </button>
            <button className="btn">A/B Testing</button>
            <button className="btn">Template Library</button>
            <button className="btn btn-primary">
              <Plus size={16} />
              Create Campaign
            </button>
          </div>
        </div>
      </header>

      {/* Performance Overview */}
      <section className="performance-overview">
        <div className="metric-card">
          <div className="metric-label">Total Reach</div>
          <div className="metric-value">{overviewMetrics.totalReach.toLocaleString()}</div>
          <div className="metric-change positive">
            <ArrowUp size={12} />
            <span>18.5%</span>
          </div>
          <div className="metric-subtitle">Across all channels</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg Engagement</div>
          <div className="metric-value">{overviewMetrics.avgEngagement.toFixed(1)}%</div>
          <div className="metric-change positive">
            <ArrowUp size={12} />
            <span>5.2% vs last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Revenue Attributed</div>
          <div className="metric-value">${overviewMetrics.totalRevenue.toLocaleString()}</div>
          <div className="metric-change positive">
            <ArrowUp size={12} />
            <span>23.7%</span>
          </div>
          <div className="metric-subtitle">{overviewMetrics.totalConversions} conversions</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Conversion Rate</div>
          <div className="metric-value">{overviewMetrics.conversionRate}%</div>
          <div className="metric-change positive">
            <ArrowUp size={12} />
            <span>12.3%</span>
          </div>
          <div className="metric-subtitle">Industry avg: 18.2%</div>
        </div>
      </section>

      {/* AI Insights Bar */}
      <div className="insights-bar">
        <div>
          <span className="insight-label">AI Insights</span>
          <span className="insight-value">Optimal send time: 2:30 PM PST</span>
        </div>
        <div>
          <span className="insight-value">SaaS campaign performing 34% above benchmark</span>
        </div>
        <div>
          <span className="insight-value">Email channel showing highest engagement (67%)</span>
        </div>
      </div>

      {/* Campaigns Section */}
      <section className="campaigns-section">
        <div className="section-header">
          <h2 className="section-title">Active Campaigns</h2>
          <div className="view-controls">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
            <button className="btn">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        <div className={`campaigns-${viewMode}`}>
          {campaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onAction={handleCampaignAction}
            />
          ))}
        </div>
      </section>

      {/* AI Predictions Sidebar */}
      <AIPredictionsPanel
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        campaign={selectedCampaign}
      />

      {/* AI Toggle Button */}
      <button className="ai-toggle" onClick={() => setShowAI(!showAI)}>
        <Layers size={24} />
      </button>

      <style jsx>{`
        .quantum-campaigns {
          min-height: 100vh;
          background: #0f0f1a;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Background Effects */
        .quantum-background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .quantum-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: gridMove 60s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }

        .quantum-particles {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 50%);
          animation: particleFloat 30s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.1) rotate(120deg); }
          66% { transform: scale(0.9) rotate(240deg); }
        }

        /* Header */
        .dashboard-header {
          position: relative;
          z-index: 10;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-content {
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .back-button {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-2px);
        }

        .header-left h1 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .header-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .btn-primary {
          background: #8b5cf6;
          border-color: #8b5cf6;
          color: white;
        }

        .btn-primary:hover {
          background: #7c3aed;
          border-color: #7c3aed;
        }

        /* Performance Overview */
        .performance-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .metric-card {
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .metric-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .metric-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .metric-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
        }

        .metric-change.positive {
          color: #10b981;
        }

        .metric-change.negative {
          color: #ef4444;
        }

        .metric-subtitle {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 0.25rem;
        }

        /* Insights Bar */
        .insights-bar {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          margin: 0 2rem;
          max-width: 1600px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          gap: 2rem;
          overflow-x: auto;
          position: relative;
          z-index: 1;
        }

        .insight-label {
          font-size: 0.75rem;
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-right: 0.5rem;
        }

        .insight-value {
          color: white;
          font-weight: 500;
        }

        /* Campaigns Section */
        .campaigns-section {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .view-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .view-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 2px;
        }

        .view-btn {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #8b5cf6;
          color: white;
        }

        /* Campaign Grid */
        .campaigns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 1.5rem;
        }

        /* Campaign Card */
        .campaign-card {
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .campaign-card:hover {
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .campaign-header {
          padding: 1.5rem;
          position: relative;
        }

        .campaign-status {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .campaign-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          padding-right: 5rem;
        }

        .campaign-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        /* Campaign Metrics */
        .campaign-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .campaign-metric {
          padding: 1rem;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .campaign-metric:last-child {
          border-right: none;
        }

        .campaign-metric-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .campaign-metric-value {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .campaign-metric-detail {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .campaign-metric-trend {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .trend-up {
          color: #10b981;
        }

        .trend-down {
          color: #ef4444;
        }

        /* Campaign Performance */
        .campaign-performance {
          padding: 0 1.5rem 1rem;
          height: 80px;
          position: relative;
          overflow: hidden;
        }

        /* Campaign Actions */
        .campaign-actions {
          padding: 1rem 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* AI Sidebar */
        .ai-sidebar {
          position: fixed;
          right: 0;
          top: 0;
          width: 320px;
          height: 100vh;
          background: #1a1a2e;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2rem 1.5rem;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 100;
        }

        .ai-sidebar.active {
          transform: translateX(0);
        }

        .ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .ai-title {
          font-size: 1.125rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ai-badge {
          padding: 0.125rem 0.5rem;
          background: #8b5cf6;
          border-radius: 4px;
          font-size: 0.625rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .close-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        /* Prediction Cards */
        .prediction-section {
          margin-bottom: 2rem;
        }

        .prediction-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .prediction-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .prediction-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #a78bfa;
          margin-bottom: 0.25rem;
        }

        .prediction-detail {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Recommendations */
        .recommendations-list {
          list-style: none;
        }

        .recommendation-item {
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .recommendation-item:last-child {
          border-bottom: none;
        }

        /* AI Toggle Button */
        .ai-toggle {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background: #8b5cf6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
          transition: all 0.2s ease;
          z-index: 100;
          border: none;
          color: white;
        }

        .ai-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .campaigns-grid {
            grid-template-columns: 1fr;
          }
          
          .performance-overview {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .header-left {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .header-actions {
            flex-wrap: wrap;
          }
          
          .performance-overview {
            grid-template-columns: 1fr;
          }
          
          .campaign-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .ai-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}