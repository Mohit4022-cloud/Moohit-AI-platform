import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Users, AlertTriangle, TrendingUp, Phone, Mail, MessageSquare, 
  Calendar, ChevronUp, ChevronDown, MoreVertical, Zap, Brain, Activity,
  Mic, Volume2, Eye, EyeOff, Shield, Award, Target, Timer, Headphones,
  Video, Play, Pause, SkipForward, RefreshCw, Settings, Filter, Bell,
  ArrowUp, ArrowDown, Flame, Star, CheckCircle, AlertCircle, Info,
  GitBranch, BarChart3, Sparkles, Command, X, ChevronRight, Globe,
  Linkedin, Twitter, Send, PhoneCall, PhoneOff, UserPlus, FileText,
  Search, Download, Plus, Layers
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart,
  RadialBar, Scatter, ScatterChart, ComposedChart
} from 'recharts';
import './QuantumLiveQueue.css';

// Quantum Constants
const QUANTUM_CONSTANTS = {
  PHI: 1.618033988749,
  PRIORITY_LEVELS: {
    critical: { color: 'hsl(0, 85%, 55%)', glow: 'hsl(0, 85%, 55%)', label: 'CRITICAL', icon: Flame },
    high: { color: 'hsl(15, 90%, 55%)', glow: 'hsl(15, 90%, 55%)', label: 'HIGH', icon: AlertTriangle },
    medium: { color: 'hsl(45, 85%, 55%)', glow: 'hsl(45, 85%, 55%)', label: 'MEDIUM', icon: Clock },
    normal: { color: 'hsl(210, 70%, 50%)', glow: 'hsl(210, 70%, 50%)', label: 'NORMAL', icon: Users },
    low: { color: 'hsl(120, 60%, 50%)', glow: 'hsl(120, 60%, 50%)', label: 'LOW', icon: CheckCircle }
  },
  QUEUE_STATES: {
    waiting: { color: 'hsl(210, 70%, 50%)', label: 'Waiting' },
    inProgress: { color: 'hsl(120, 70%, 50%)', label: 'In Progress' },
    escalated: { color: 'hsl(0, 70%, 50%)', label: 'Escalated' },
    resolved: { color: 'hsl(150, 70%, 50%)', label: 'Resolved' }
  }
};

// Mock Data Generator
const generateMockQueueData = () => {
  const firstNames = ['Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'Ethan', 'Ava', 'Mason'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const companies = ['TechCorp', 'InnovateCo', 'DataDrive', 'CloudNet', 'FinanceHub', 'HealthTech'];
  const topics = ['Technical Support', 'Billing Issue', 'Feature Request', 'Bug Report', 'Account Access'];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `lead-${i + 1}`,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    priority: Object.keys(QUANTUM_CONSTANTS.PRIORITY_LEVELS)[Math.floor(Math.random() * 5)],
    waitTime: Math.floor(Math.random() * 300),
    topic: topics[Math.floor(Math.random() * topics.length)],
    channel: ['email', 'phone', 'chat'][Math.floor(Math.random() * 3)],
    sentiment: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 50000) + 10000,
    lastMessage: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    aiScore: Math.floor(Math.random() * 100),
    responseTime: Math.floor(Math.random() * 60) + 10,
    status: Object.keys(QUANTUM_CONSTANTS.QUEUE_STATES)[Math.floor(Math.random() * 4)]
  }));
};

export default function QuantumLiveQueue() {
  const navigate = useNavigate();
  const [queueData, setQueueData] = useState(generateMockQueueData());
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [showAI, setShowAI] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  
  // Stats calculation
  const queueStats = useMemo(() => ({
    total: queueData.length,
    waiting: queueData.filter(l => l.status === 'waiting').length,
    inProgress: queueData.filter(l => l.status === 'inProgress').length,
    avgWaitTime: Math.round(queueData.reduce((acc, l) => acc + l.waitTime, 0) / queueData.length),
    criticalCount: queueData.filter(l => l.priority === 'critical').length
  }), [queueData]);

  // Auto-update wait times
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData(prev => prev.map(lead => ({
        ...lead,
        waitTime: lead.status === 'waiting' ? lead.waitTime + 1 : lead.waitTime
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleQueueSettings = () => {
    setShowSettingsModal(true);
    showToast('Opening queue settings...', 'info');
  };

  const handleAddLead = () => {
    setShowAddLeadModal(true);
    showToast('Add new lead to queue', 'info');
  };

  const handleFilter = () => {
    setShowFilterModal(true);
    showToast('Opening filter options...', 'info');
  };

  const handleSort = () => {
    setShowSortModal(true);
    showToast('Opening sort options...', 'info');
  };

  const handleAssignLead = (lead) => {
    setQueueData(prev => prev.map(l => 
      l.id === lead.id ? { ...l, status: 'inProgress' } : l
    ));
    showToast(`Assigning ${lead.name} to available agent...`, 'success');
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
    showToast(`Viewing details for ${lead.name}`, 'info');
  };

  const handleLeadOptions = (lead) => {
    showToast(`More options for ${lead.name}`, 'info');
  };

  const applySortBy = (type) => {
    setSortBy(type);
    const sorted = [...queueData].sort((a, b) => {
      switch(type) {
        case 'priority':
          const priorityOrder = ['critical', 'high', 'medium', 'normal', 'low'];
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        case 'waitTime':
          return b.waitTime - a.waitTime;
        case 'value':
          return b.value - a.value;
        case 'sentiment':
          return a.sentiment - b.sentiment;
        default:
          return 0;
      }
    });
    setQueueData(sorted);
    setShowSortModal(false);
    showToast(`Sorted by ${type}`, 'success');
  };

  const applyFilter = (type) => {
    setFilter(type);
    setShowFilterModal(false);
    showToast(`Filtered to show ${type} leads`, 'success');
  };

  // Filtered queue data
  const filteredQueueData = useMemo(() => {
    if (filter === 'all') return queueData;
    if (filter === 'critical') return queueData.filter(l => l.priority === 'critical');
    if (filter === 'waiting') return queueData.filter(l => l.status === 'waiting');
    if (filter === 'inProgress') return queueData.filter(l => l.status === 'inProgress');
    return queueData;
  }, [queueData, filter]);

  return (
    <div className="quantum-live-queue">
      {/* Background Effects */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-orbs"></div>
      </div>

      {/* Header */}
      <header className="queue-header">
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
              <h1 className="page-title">Live Queue</h1>
              <p className="page-subtitle">Real-time lead management with AI prioritization</p>
            </div>
          </div>
          <div className="header-controls">
            <button className="control-btn" onClick={handleQueueSettings}>
              <Settings size={16} />
              Queue Settings
            </button>
            <button className="control-btn primary" onClick={handleAddLead}>
              <UserPlus size={16} />
              Add Lead
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="queue-stats">
        <div className="stat-card">
          <div className="stat-value">{queueStats.total}</div>
          <div className="stat-label">Total in Queue</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{queueStats.waiting}</div>
          <div className="stat-label">Waiting</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{queueStats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{queueStats.avgWaitTime}s</div>
          <div className="stat-label">Avg Wait Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{queueStats.criticalCount}</div>
          <div className="stat-label">Critical</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="queue-content">
        {/* Queue List */}
        <div className="queue-section">
          <div className="section-header">
            <h2 className="section-title">Active Queue</h2>
            <div className="queue-controls">
              <button className="control-btn" onClick={handleFilter}>
                <Filter size={16} />
                Filter
              </button>
              <button className="control-btn" onClick={handleSort}>
                <BarChart3 size={16} />
                Sort
              </button>
            </div>
          </div>

          <div className="queue-list">
            {filteredQueueData.map(lead => {
              const priorityConfig = QUANTUM_CONSTANTS.PRIORITY_LEVELS[lead.priority];
              const PriorityIcon = priorityConfig.icon;
              
              return (
                <div 
                  key={lead.id} 
                  className={`queue-item ${selectedLead?.id === lead.id ? 'selected' : ''}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="queue-item-header">
                    <div className="lead-info">
                      <div className="lead-avatar">{lead.name.charAt(0)}</div>
                      <div className="lead-details">
                        <h4>{lead.name}</h4>
                        <span className="lead-company">{lead.company}</span>
                      </div>
                    </div>
                    <div 
                      className="priority-badge"
                      style={{ 
                        background: priorityConfig.color,
                        color: 'white'
                      }}
                    >
                      <PriorityIcon size={12} />
                      {priorityConfig.label}
                    </div>
                  </div>

                  <div className="queue-item-details">
                    <div className="detail-item">
                      <Clock size={14} />
                      <span>{Math.floor(lead.waitTime / 60)}:{(lead.waitTime % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="detail-item">
                      <MessageSquare size={14} />
                      <span>{lead.topic}</span>
                    </div>
                    <div className="detail-item">
                      <TrendingUp size={14} />
                      <span>${lead.value.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="queue-item-actions">
                    <button 
                      className="action-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignLead(lead);
                      }}
                    >
                      <PhoneCall size={14} />
                      Assign
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewLead(lead);
                      }}
                    >
                      <Eye size={14} />
                      View
                    </button>
                    <button 
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLeadOptions(lead);
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <aside className="ai-insights">
          <div className="ai-header">
            <Brain size={20} />
            <h3>AI Insights</h3>
            <span className="ai-badge">LIVE</span>
          </div>

          <div className="insight-section">
            <h4>Queue Predictions</h4>
            <div className="prediction-item">
              <span>Next hour volume:</span>
              <strong>+23 leads</strong>
            </div>
            <div className="prediction-item">
              <span>Escalation risk:</span>
              <strong>3 leads</strong>
            </div>
            <div className="prediction-item">
              <span>Optimal agents:</span>
              <strong>5 agents</strong>
            </div>
          </div>

          <div className="insight-section">
            <h4>Smart Routing</h4>
            <div className="routing-stats">
              <div className="routing-item">
                <span>Auto-assigned:</span>
                <strong>87%</strong>
              </div>
              <div className="routing-item">
                <span>Accuracy:</span>
                <strong>94%</strong>
              </div>
            </div>
          </div>

          <div className="insight-section">
            <h4>Performance</h4>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={[
                { time: '10:00', value: 20 },
                { time: '11:00', value: 35 },
                { time: '12:00', value: 45 },
                { time: '1:00', value: 30 },
                { time: '2:00', value: 40 },
                { time: '3:00', value: 55 }
              ]}>
                <defs>
                  <linearGradient id="queueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  fill="url(#queueGradient)" 
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </aside>
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

      {/* Queue Settings Modal */}
      {showSettingsModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Queue Settings</h3>
              <button onClick={() => setShowSettingsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="settings-section">
                <h4>Auto-Assignment</h4>
                <label className="toggle-setting">
                  <input 
                    type="checkbox" 
                    checked={autoAssign} 
                    onChange={(e) => {
                      setAutoAssign(e.target.checked);
                      showToast(`Auto-assignment ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
                    }} 
                  />
                  <span>Enable automatic lead assignment</span>
                </label>
              </div>
              <div className="settings-section">
                <h4>Priority Thresholds</h4>
                <div className="threshold-setting">
                  <label>Critical wait time (seconds)</label>
                  <input type="number" defaultValue="300" />
                </div>
                <div className="threshold-setting">
                  <label>High priority value</label>
                  <input type="number" defaultValue="25000" />
                </div>
              </div>
              <div className="settings-section">
                <h4>AI Settings</h4>
                <label className="toggle-setting">
                  <input 
                    type="checkbox" 
                    checked={showAI} 
                    onChange={(e) => {
                      setShowAI(e.target.checked);
                      showToast(`AI insights ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
                    }} 
                  />
                  <span>Show AI predictions</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowAddLeadModal(false)}>
          <div className="quantum-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Lead to Queue</h3>
              <button onClick={() => setShowAddLeadModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter lead name" />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Topic</label>
                <input type="text" placeholder="Enter topic" />
              </div>
              <div className="form-group">
                <label>Value</label>
                <input type="number" placeholder="Enter estimated value" />
              </div>
              <button 
                className="quantum-button primary"
                onClick={() => {
                  setShowAddLeadModal(false);
                  showToast('Lead added to queue successfully', 'success');
                }}
              >
                Add to Queue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="quantum-modal compact" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filter Queue</h3>
              <button onClick={() => setShowFilterModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="filter-options">
                <button 
                  className={`filter-option ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => applyFilter('all')}
                >
                  All Leads
                </button>
                <button 
                  className={`filter-option ${filter === 'critical' ? 'active' : ''}`}
                  onClick={() => applyFilter('critical')}
                >
                  Critical Only
                </button>
                <button 
                  className={`filter-option ${filter === 'waiting' ? 'active' : ''}`}
                  onClick={() => applyFilter('waiting')}
                >
                  Waiting
                </button>
                <button 
                  className={`filter-option ${filter === 'inProgress' ? 'active' : ''}`}
                  onClick={() => applyFilter('inProgress')}
                >
                  In Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {showSortModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowSortModal(false)}>
          <div className="quantum-modal compact" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Sort Queue</h3>
              <button onClick={() => setShowSortModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="sort-options">
                <button 
                  className={`sort-option ${sortBy === 'priority' ? 'active' : ''}`}
                  onClick={() => applySortBy('priority')}
                >
                  <ArrowUp size={16} />
                  Priority
                </button>
                <button 
                  className={`sort-option ${sortBy === 'waitTime' ? 'active' : ''}`}
                  onClick={() => applySortBy('waitTime')}
                >
                  <Clock size={16} />
                  Wait Time
                </button>
                <button 
                  className={`sort-option ${sortBy === 'value' ? 'active' : ''}`}
                  onClick={() => applySortBy('value')}
                >
                  <TrendingUp size={16} />
                  Value
                </button>
                <button 
                  className={`sort-option ${sortBy === 'sentiment' ? 'active' : ''}`}
                  onClick={() => applySortBy('sentiment')}
                >
                  <Activity size={16} />
                  Sentiment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Details Modal */}
      {showLeadDetails && selectedLead && (
        <div className="quantum-modal-overlay" onClick={() => setShowLeadDetails(false)}>
          <div className="quantum-modal large" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Lead Details - {selectedLead.name}</h3>
              <button onClick={() => setShowLeadDetails(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="lead-detail-grid">
                <div className="detail-card">
                  <h4>Contact Information</h4>
                  <p><strong>Name:</strong> {selectedLead.name}</p>
                  <p><strong>Company:</strong> {selectedLead.company}</p>
                  <p><strong>Channel:</strong> {selectedLead.channel}</p>
                </div>
                <div className="detail-card">
                  <h4>Queue Status</h4>
                  <p><strong>Priority:</strong> {selectedLead.priority}</p>
                  <p><strong>Status:</strong> {selectedLead.status}</p>
                  <p><strong>Wait Time:</strong> {Math.floor(selectedLead.waitTime / 60)}:{(selectedLead.waitTime % 60).toString().padStart(2, '0')}</p>
                </div>
                <div className="detail-card">
                  <h4>Business Value</h4>
                  <p><strong>Value:</strong> ${selectedLead.value.toLocaleString()}</p>
                  <p><strong>AI Score:</strong> {selectedLead.aiScore}%</p>
                  <p><strong>Sentiment:</strong> {selectedLead.sentiment}%</p>
                </div>
              </div>
              <div className="lead-actions">
                <button 
                  className="quantum-button primary"
                  onClick={() => {
                    handleAssignLead(selectedLead);
                    setShowLeadDetails(false);
                  }}
                >
                  <PhoneCall size={16} />
                  Assign to Agent
                </button>
                <button className="quantum-button">
                  <MessageSquare size={16} />
                  View Conversation
                </button>
                <button className="quantum-button">
                  <FileText size={16} />
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles */}
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

        .quantum-modal.compact {
          max-width: 400px;
        }

        .quantum-modal.large {
          max-width: 800px;
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
          border-color: #8b5cf6;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Button Styles */
        .quantum-button {
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
          gap: 0.5rem;
        }

        .quantum-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .quantum-button.primary {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border: none;
          color: white;
        }

        .quantum-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        /* Settings Styles */
        .settings-section {
          margin-bottom: 2rem;
        }

        .settings-section h4 {
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .toggle-setting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .toggle-setting input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .threshold-setting {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .threshold-setting input {
          width: 100px;
        }

        /* Filter/Sort Options */
        .filter-options,
        .sort-options {
          display: grid;
          gap: 0.75rem;
        }

        .filter-option,
        .sort-option {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-option:hover,
        .sort-option:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .filter-option.active,
        .sort-option.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: white;
        }

        /* Lead Details */
        .lead-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .detail-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .detail-card h4 {
          margin-bottom: 1rem;
          color: #8b5cf6;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-card p {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
        }

        .detail-card p strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .lead-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
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