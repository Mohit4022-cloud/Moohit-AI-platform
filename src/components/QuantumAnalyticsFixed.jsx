import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Users, Target, DollarSign, Shield, Zap,
  Brain, Activity, Calendar, Download, Plus, ChevronDown,
  Settings, RefreshCw, Sparkles, AlertCircle, Info,
  ArrowUp, ArrowDown, Bell, TrendingUp, TrendingDown,
  AlertTriangle, Lightbulb, Share2, FileText
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import './QuantumAnalytics.css';

// Quantum Constants
const QUANTUM_CONSTANTS = {
  PHI: 1.618033988749,
  METRIC_COLORS: {
    responseTime: { primary: 'hsl(210, 70%, 50%)', secondary: 'hsl(220, 70%, 60%)' },
    conversion: { primary: 'hsl(120, 70%, 50%)', secondary: 'hsl(130, 70%, 60%)' },
    revenue: { primary: 'hsl(45, 85%, 55%)', secondary: 'hsl(55, 85%, 65%)' },
    leads: { primary: 'hsl(270, 70%, 50%)', secondary: 'hsl(280, 70%, 60%)' },
    compliance: { primary: 'hsl(180, 70%, 50%)', secondary: 'hsl(190, 70%, 60%)' },
    cost: { primary: 'hsl(0, 70%, 50%)', secondary: 'hsl(10, 70%, 60%)' }
  },
  INSIGHT_TYPES: {
    anomaly: { icon: AlertTriangle, color: 'hsl(0, 85%, 55%)' },
    trend: { icon: TrendingUp, color: 'hsl(120, 70%, 50%)' },
    prediction: { icon: Brain, color: 'hsl(270, 70%, 50%)' },
    optimization: { icon: Lightbulb, color: 'hsl(45, 85%, 55%)' }
  }
};

// Quantum Metric Card Component
const QuantumMetricCard = ({ icon: Icon, title, value, change, trend, subtitle, color }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const numericValue = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setAnimatedValue(numericValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [value]);

  const formatValue = (val) => {
    if (typeof value === 'string' && value.includes('$')) {
      return `$${val.toLocaleString()}`;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return `${val.toFixed(1)}%`;
    }
    if (typeof value === 'string' && value.includes('seconds')) {
      return `${Math.round(val)} seconds`;
    }
    return val.toLocaleString();
  };

  return (
    <div 
      className="quantum-metric-card"
      style={{
        '--metric-color': color.primary,
        '--metric-secondary': color.secondary
      }}
    >
      <div className="metric-header">
        <div className="metric-icon">
          <Icon size={20} />
        </div>
        <div className="metric-trend">
          {trend === 'up' ? (
            <ArrowUp size={16} className="trend-up" />
          ) : trend === 'down' ? (
            <ArrowDown size={16} className="trend-down" />
          ) : (
            <Activity size={16} className="trend-neutral" />
          )}
        </div>
      </div>
      
      <div className="metric-content">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{formatValue(animatedValue)}</div>
        <div className="metric-subtitle">{subtitle}</div>
        {change && (
          <div className={`metric-change ${trend}`}>
            <span className="change-icon">
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </span>
            <span className="change-value">{change}</span>
            <span className="change-period">vs. last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Response Time Chart Component
const ResponseTimeChart = ({ timeRange }) => {
  const chartData = useMemo(() => {
    const hours = timeRange === '24h' ? 24 : 168;
    return Array.from({ length: Math.min(hours, 50) }, (_, i) => ({
      time: timeRange === '24h' ? `${i}:00` : `Day ${Math.floor(i / 24) + 1}`,
      actual: 45 + Math.sin(i * 0.2) * 15 + Math.random() * 10,
      predicted: 45 + Math.sin(i * 0.2) * 15 + 5,
      benchmark: 60
    }));
  }, [timeRange]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Response Time Trend</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="hsl(45, 85%, 55%)"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="hsl(210, 70%, 50%)"
            fill="url(#actualGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// AI Insights Panel
const AIInsightsPanel = ({ insights }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);
  
  return (
    <div className="ai-insights-panel">
      <div className="insights-header">
        <h3>
          <Brain className="insights-icon" />
          AI Insights
        </h3>
        <span className="insights-badge">
          {insights.length} new
        </span>
      </div>
      
      <div className="insights-list">
        {insights.map((insight, index) => {
          const InsightIcon = QUANTUM_CONSTANTS.INSIGHT_TYPES[insight.type].icon;
          const isExpanded = expandedInsight === index;
          
          return (
            <div 
              key={index}
              className={`insight-card ${insight.priority}`}
              onClick={() => setExpandedInsight(isExpanded ? null : index)}
            >
              <div className="insight-main">
                <div className="insight-icon-wrapper">
                  <InsightIcon size={16} />
                </div>
                <div className="insight-content">
                  <h4 className="insight-title">{insight.title}</h4>
                  <p className="insight-message">{insight.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Analytics Dashboard
export default function QuantumAnalyticsFixed() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const [activeTab, setActiveTab] = useState('performance');
  const [isExporting, setIsExporting] = useState(false);

  // Mock insights data
  const insights = [
    {
      type: 'trend',
      priority: 'high',
      title: 'Conversion Rate Improving',
      message: '2.3% increase over last 30 days'
    },
    {
      type: 'optimization',
      priority: 'medium',
      title: 'Response Time Optimization',
      message: 'Your team is responding 40% faster than average'
    }
  ];

  const tabs = [
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'conversion', label: 'Conversion', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'predictive', label: 'Predictive', icon: Brain }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="quantum-analytics">
      {/* Quantum Background */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-orbs"></div>
        <div className="data-streams"></div>
      </div>

      {/* Header */}
      <header className="analytics-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
          >
            ←
          </button>
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">Comprehensive performance insights and custom reporting</p>
          </div>
        </div>

        <div className="header-controls">
          <button className="date-range-btn">
            <Calendar size={16} />
            {timeRange}
            <ChevronDown size={16} />
          </button>
          
          <button 
            className="create-report-btn"
          >
            <Plus size={16} />
            Create Report
          </button>
          
          <button 
            className={`export-btn ${isExporting ? 'exporting' : ''}`}
            onClick={handleExport}
          >
            {isExporting ? (
              <>
                <RefreshCw size={16} className="spinning" />
                Exporting...
              </>
            ) : (
              <>
                <Download size={16} />
                Export
              </>
            )}
          </button>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="key-metrics">
        <QuantumMetricCard
          icon={Clock}
          title="Avg Response Time"
          value="47 seconds"
          change="-23%"
          trend="down"
          subtitle="vs. 61 seconds last period"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.responseTime}
        />
        <QuantumMetricCard
          icon={Target}
          title="Lead Conversion Rate"
          value="24.3%"
          change="+2.3%"
          trend="up"
          subtitle="1,247 of 5,132 leads"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.conversion}
        />
        <QuantumMetricCard
          icon={DollarSign}
          title="Revenue Generated"
          value="$487,230"
          change="+18.5%"
          trend="up"
          subtitle="From converted leads"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.revenue}
        />
        <QuantumMetricCard
          icon={Users}
          title="Active Leads"
          value="1,832"
          change="+12%"
          trend="up"
          subtitle="In pipeline"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.leads}
        />
        <QuantumMetricCard
          icon={Shield}
          title="SLA Compliance"
          value="96.7%"
          change="+2.1%"
          trend="up"
          subtitle="5-min target"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.compliance}
        />
        <QuantumMetricCard
          icon={DollarSign}
          title="Cost per Lead"
          value="$12.40"
          change="-8.3%"
          trend="down"
          subtitle="Efficiency improved"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.cost}
        />
      </section>

      {/* Tab Navigation */}
      <nav className="analytics-tabs">
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon size={16} />
              <span>{tab.label}</span>
              {tab.id === 'predictive' && (
                <span className="tab-badge">AI</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <div className="analytics-content">
        {/* Left Panel - AI Insights */}
        <AIInsightsPanel insights={insights} />

        {/* Center - Charts */}
        <div className="charts-container">
          {activeTab === 'performance' && (
            <ResponseTimeChart timeRange="24h" />
          )}
        </div>

        {/* Right Panel - Quick Actions */}
        <div className="insights-sidebar">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button className="quick-action-btn">
              <Share2 size={16} />
              Share Dashboard
            </button>
            <button className="quick-action-btn">
              <Bell size={16} />
              Set Alerts
            </button>
            <button className="quick-action-btn">
              <Calendar size={16} />
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}