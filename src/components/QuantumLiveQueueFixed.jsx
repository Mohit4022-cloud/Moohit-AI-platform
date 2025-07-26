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
            <button className="control-btn">
              <Settings size={16} />
              Queue Settings
            </button>
            <button className="control-btn primary">
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
              <button className="control-btn">
                <Filter size={16} />
                Filter
              </button>
              <button className="control-btn">
                <BarChart3 size={16} />
                Sort
              </button>
            </div>
          </div>

          <div className="queue-list">
            {queueData.map(lead => {
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
                    <button className="action-btn primary">
                      <PhoneCall size={14} />
                      Assign
                    </button>
                    <button className="action-btn">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="action-btn">
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
    </div>
  );
}