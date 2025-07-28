import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Users, Target, DollarSign, Shield, Zap,
  Brain, Activity, Settings, RefreshCw, Sparkles, AlertCircle, Info,
  ArrowUp, ArrowDown, TrendingUp, TrendingDown,
  AlertTriangle, Lightbulb, FileText, X, CheckCircle, Copy, Mail,
  Save, Calendar, MessageSquare
} from 'lucide-react';
import { 
  QuantumCalendar, QuantumDownload, QuantumPlus, QuantumShare, 
  QuantumBell, QuantumChevron, QuantumExport
} from './QuantumAnalyticsIcons';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import './QuantumAnalytics.css';
import './QuantumAnalyticsIcons.css';

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
const QuantumMetricCard = ({ icon: Icon, title, value, change, trend, subtitle, color, iconModifier }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const getIconClass = () => {
    const modifiers = {
      pulse: 'icon-pulse',
      electric: 'icon-electric',
      neural: 'icon-neural',
      quantum: 'icon-quantum',
      shield: 'icon-shield',
      sparkle: 'icon-sparkle'
    };
    return modifiers[iconModifier] || '';
  };
  
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
        <div className={`metric-icon ${getIconClass()}`}>
          <Icon size={20} />
          {iconModifier === 'neural' && (
            <div className="icon-overlay">
              <Activity size={14} className="icon-secondary" />
            </div>
          )}
          {iconModifier === 'quantum' && (
            <div className="icon-particles">
              <span></span><span></span><span></span>
            </div>
          )}
          {iconModifier === 'sparkle' && (
            <div className="icon-sparkles">
              <span></span><span></span><span></span><span></span>
            </div>
          )}
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
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Analytics data exported successfully', 'success');
    }, 2000);
  };

  const handleDateRangeSelect = () => {
    setShowDateRangeModal(true);
    showToast('Select date range for analytics', 'info');
  };

  const handleCreateReport = () => {
    setShowCreateReportModal(true);
    showToast('Create custom analytics report', 'info');
  };

  const handleShareDashboard = () => {
    setShowShareModal(true);
    showToast('Share analytics dashboard', 'info');
  };

  const handleSetAlerts = () => {
    setShowAlertsModal(true);
    showToast('Configure analytics alerts', 'info');
  };

  const handleScheduleReport = () => {
    setShowScheduleModal(true);
    showToast('Schedule automated reports', 'info');
  };

  const handleDateRangeChange = (range) => {
    setTimeRange(range);
    setShowDateRangeModal(false);
    showToast(`Date range updated to ${range}`, 'success');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    showToast(`Switched to ${tabs.find(t => t.id === tabId).label} analytics`, 'info');
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
          <div className="header-left">
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
          <button className="date-range-btn" onClick={handleDateRangeSelect}>
            <QuantumCalendar size={16} />
            {timeRange}
            <QuantumChevron size={16} direction="down" />
          </button>
          
          <button 
            className="create-report-btn"
            onClick={handleCreateReport}
          >
            <QuantumPlus size={16} />
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
                <QuantumExport size={16} />
                Export
              </>
            )}
          </button>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="analytics-main-content">
        {/* Key Metrics */}
        <section className="key-metrics">
        <QuantumMetricCard
          icon={Activity}
          title="Avg Response Time"
          value="47 seconds"
          change="-23%"
          trend="down"
          subtitle="vs. 61 seconds last period"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.responseTime}
          iconModifier="pulse"
        />
        <QuantumMetricCard
          icon={Zap}
          title="Lead Conversion Rate"
          value="24.3%"
          change="+2.3%"
          trend="up"
          subtitle="1,247 of 5,132 leads"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.conversion}
          iconModifier="electric"
        />
        <QuantumMetricCard
          icon={TrendingUp}
          title="Revenue Generated"
          value="$487,230"
          change="+18.5%"
          trend="up"
          subtitle="From converted leads"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.revenue}
          iconModifier="quantum"
        />
        <QuantumMetricCard
          icon={Brain}
          title="Active Leads"
          value="1,832"
          change="+12%"
          trend="up"
          subtitle="In pipeline"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.leads}
          iconModifier="neural"
        />
        <QuantumMetricCard
          icon={Shield}
          title="SLA Compliance"
          value="96.7%"
          change="+2.1%"
          trend="up"
          subtitle="5-min target"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.compliance}
          iconModifier="shield"
        />
        <QuantumMetricCard
          icon={Sparkles}
          title="Cost per Lead"
          value="$12.40"
          change="-8.3%"
          trend="down"
          subtitle="Efficiency improved"
          color={QUANTUM_CONSTANTS.METRIC_COLORS.cost}
          iconModifier="sparkle"
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
              onClick={() => handleTabChange(tab.id)}
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
            <button className="quick-action-btn" onClick={handleShareDashboard}>
              <QuantumShare size={16} />
              Share Dashboard
            </button>
            <button className="quick-action-btn" onClick={handleSetAlerts}>
              <QuantumBell size={16} />
              Set Alerts
            </button>
            <button className="quick-action-btn" onClick={handleScheduleReport}>
              <QuantumCalendar size={16} />
              Schedule Report
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`quantum-toast ${toastMessage.type}`}>
          <div className="toast-content">
            {toastMessage.type === 'success' && <CheckCircle size={18} />}
            {toastMessage.type === 'error' && <AlertCircle size={18} />}
            {toastMessage.type === 'info' && <Info size={18} />}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Date Range Modal */}
      {showDateRangeModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowDateRangeModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Date Range</h3>
              <button onClick={() => setShowDateRangeModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="date-range-options">
                <button 
                  className="date-option"
                  onClick={() => handleDateRangeChange('Today')}
                >
                  Today
                </button>
                <button 
                  className="date-option"
                  onClick={() => handleDateRangeChange('Last 7 days')}
                >
                  Last 7 days
                </button>
                <button 
                  className="date-option"
                  onClick={() => handleDateRangeChange('Last 30 days')}
                >
                  Last 30 days
                </button>
                <button 
                  className="date-option"
                  onClick={() => handleDateRangeChange('Last 90 days')}
                >
                  Last 90 days
                </button>
                <button 
                  className="date-option"
                  onClick={() => handleDateRangeChange('This year')}
                >
                  This year
                </button>
                <button 
                  className="date-option custom"
                  onClick={() => showToast('Custom date range picker coming soon', 'info')}
                >
                  <Calendar size={16} />
                  Custom Range
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {showCreateReportModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowCreateReportModal(false)}>
          <div className="quantum-modal large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Custom Report</h3>
              <button onClick={() => setShowCreateReportModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Report Name</label>
                <input type="text" placeholder="Enter report name" />
              </div>
              <div className="form-group">
                <label>Report Type</label>
                <select>
                  <option>Performance Overview</option>
                  <option>Lead Analytics</option>
                  <option>Team Performance</option>
                  <option>Revenue Analysis</option>
                  <option>Custom Metrics</option>
                </select>
              </div>
              <div className="form-group">
                <label>Metrics to Include</label>
                <div className="metric-checkboxes">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Response Time</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Conversion Rate</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Revenue</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Lead Volume</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Team Efficiency</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Visualization Type</label>
                <div className="viz-options">
                  <button className="viz-option active">Line Chart</button>
                  <button className="viz-option">Bar Chart</button>
                  <button className="viz-option">Pie Chart</button>
                  <button className="viz-option">Table</button>
                </div>
              </div>
              <button 
                className="quantum-button primary"
                onClick={() => {
                  setShowCreateReportModal(false);
                  showToast('Custom report created successfully', 'success');
                }}
              >
                <FileText size={16} />
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Analytics Dashboard</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="share-section">
                <h4>Share via Email</h4>
                <div className="email-share">
                  <input type="email" placeholder="Enter email addresses" />
                  <button className="send-btn">
                    <Mail size={16} />
                    Send
                  </button>
                </div>
              </div>
              <div className="share-section">
                <h4>Share Link</h4>
                <div className="link-share">
                  <input 
                    type="text" 
                    value="https://app.quantum.ai/analytics/dashboard/12345" 
                    readOnly 
                  />
                  <button 
                    className="copy-btn"
                    onClick={() => showToast('Link copied to clipboard', 'success')}
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div className="share-section">
                <h4>Export Options</h4>
                <div className="export-options">
                  <button className="export-option">
                    <FileText size={16} />
                    PDF Report
                  </button>
                  <button className="export-option">
                    <Save size={16} />
                    CSV Data
                  </button>
                  <button className="export-option">
                    <MessageSquare size={16} />
                    Slack Integration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Modal */}
      {showAlertsModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowAlertsModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Configure Alerts</h3>
              <button onClick={() => setShowAlertsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="alert-config">
                <h4>Response Time Alert</h4>
                <div className="alert-setting">
                  <label>Alert when response time exceeds</label>
                  <div className="input-group">
                    <input type="number" defaultValue="60" />
                    <span>seconds</span>
                  </div>
                </div>
              </div>
              <div className="alert-config">
                <h4>Conversion Rate Alert</h4>
                <div className="alert-setting">
                  <label>Alert when conversion rate falls below</label>
                  <div className="input-group">
                    <input type="number" defaultValue="20" />
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="alert-config">
                <h4>Lead Volume Alert</h4>
                <div className="alert-setting">
                  <label>Alert when daily leads drop below</label>
                  <div className="input-group">
                    <input type="number" defaultValue="100" />
                    <span>leads</span>
                  </div>
                </div>
              </div>
              <div className="alert-config">
                <h4>Notification Methods</h4>
                <div className="notification-methods">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Email</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>In-app notification</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>SMS</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Slack</span>
                  </label>
                </div>
              </div>
              <button 
                className="quantum-button primary"
                onClick={() => {
                  setShowAlertsModal(false);
                  showToast('Alert settings saved', 'success');
                }}
              >
                <Save size={16} />
                Save Alert Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule Report</h3>
              <button onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Report Type</label>
                <select>
                  <option>Daily Performance Summary</option>
                  <option>Weekly Analytics Report</option>
                  <option>Monthly Dashboard</option>
                  <option>Custom Report</option>
                </select>
              </div>
              <div className="form-group">
                <label>Frequency</label>
                <div className="frequency-options">
                  <button className="freq-option active">Daily</button>
                  <button className="freq-option">Weekly</button>
                  <button className="freq-option">Monthly</button>
                  <button className="freq-option">Quarterly</button>
                </div>
              </div>
              <div className="form-group">
                <label>Send Time</label>
                <input type="time" defaultValue="09:00" />
              </div>
              <div className="form-group">
                <label>Recipients</label>
                <input type="email" placeholder="Enter email addresses (comma separated)" />
              </div>
              <div className="form-group">
                <label>Format</label>
                <div className="format-options">
                  <label className="radio-label">
                    <input type="radio" name="format" defaultChecked />
                    <span>PDF Report</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="format" />
                    <span>Excel Spreadsheet</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="format" />
                    <span>Interactive Dashboard Link</span>
                  </label>
                </div>
              </div>
              <button 
                className="quantum-button primary"
                onClick={() => {
                  setShowScheduleModal(false);
                  showToast('Report scheduled successfully', 'success');
                }}
              >
                <Calendar size={16} />
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional CSS for new elements */}
      <style jsx>{`
        /* Toast Styles */
        .quantum-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          animation: slideIn 0.3s ease;
          z-index: 1000;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
        }

        .quantum-toast.success {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.1);
        }

        .quantum-toast.error {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.1);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Modal Styles */
        .quantum-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        .quantum-modal {
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }

        .quantum-modal.large {
          max-width: 700px;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-header button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: color 0.2s;
        }

        .modal-header button:hover {
          color: white;
        }

        .modal-content {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(90vh - 80px);
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: hsl(270, 70%, 50%);
          background: rgba(255, 255, 255, 0.08);
        }

        /* Button Styles */
        .quantum-button {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .quantum-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .quantum-button.primary {
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border: none;
          color: white;
        }

        .quantum-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        /* Date Range Options */
        .date-range-options {
          display: grid;
          gap: 0.75rem;
        }

        .date-option {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .date-option:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
          color: white;
        }

        .date-option.custom {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }

        /* Metric Checkboxes */
        .metric-checkboxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
        }

        .checkbox-label input {
          width: auto;
        }

        /* Visualization Options */
        .viz-options {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .viz-option {
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .viz-option:hover,
        .viz-option.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: hsl(270, 70%, 50%);
          color: white;
        }

        /* Share Modal Styles */
        .share-section {
          margin-bottom: 1.5rem;
        }

        .share-section h4 {
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .email-share,
        .link-share {
          display: flex;
          gap: 0.5rem;
        }

        .send-btn,
        .copy-btn {
          padding: 0.5rem 1rem;
          background: hsl(270, 70%, 50%);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .send-btn:hover,
        .copy-btn:hover {
          background: hsl(270, 70%, 60%);
        }

        .export-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .export-option {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
        }

        .export-option:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
        }

        /* Alert Config Styles */
        .alert-config {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .alert-config h4 {
          margin-bottom: 0.75rem;
          color: hsl(270, 70%, 60%);
        }

        .alert-setting {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .input-group input {
          width: 100px;
        }

        .notification-methods {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        /* Schedule Modal Styles */
        .frequency-options,
        .format-options {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .freq-option {
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .freq-option:hover,
        .freq-option.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: hsl(270, 70%, 50%);
          color: white;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}