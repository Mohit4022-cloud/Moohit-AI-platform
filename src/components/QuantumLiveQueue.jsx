import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
    slaWarning: { color: 'hsl(45, 85%, 55%)', label: 'SLA Warning' },
    slaBreach: { color: 'hsl(0, 85%, 55%)', label: 'SLA Breach' },
    escalated: { color: 'hsl(270, 70%, 50%)', label: 'Escalated' }
  }
};

// AI Queue Optimization Engine
class QueueOptimizationEngine {
  constructor() {
    this.historicalData = new Map();
    this.patterns = new Map();
  }

  calculatePriority(lead) {
    const factors = {
      waitTime: this.getWaitTimeScore(lead.waitTime),
      leadScore: lead.score / 100,
      slaRisk: this.getSLARiskScore(lead),
      businessValue: this.getBusinessValueScore(lead),
      engagementLevel: this.getEngagementScore(lead),
      timeZone: this.getTimeZoneScore(lead),
      availability: this.getAvailabilityScore(lead)
    };

    const weights = {
      waitTime: 0.2,
      leadScore: 0.25,
      slaRisk: 0.2,
      businessValue: 0.15,
      engagementLevel: 0.1,
      timeZone: 0.05,
      availability: 0.05
    };

    const priorityScore = Object.entries(factors).reduce((acc, [key, value]) => 
      acc + (value * weights[key]), 0
    );

    return {
      score: Math.round(priorityScore * 100),
      factors,
      level: this.getPriorityLevel(priorityScore),
      recommendation: this.getRecommendation(lead, factors)
    };
  }

  getWaitTimeScore(waitTime) {
    // Convert wait time to minutes
    const minutes = parseInt(waitTime);
    if (minutes > 60) return 1;
    if (minutes > 30) return 0.8;
    if (minutes > 15) return 0.6;
    if (minutes > 5) return 0.4;
    return 0.2;
  }

  getSLARiskScore(lead) {
    const slaMinutes = lead.sla || 60;
    const waitMinutes = parseInt(lead.waitTime);
    const remaining = slaMinutes - waitMinutes;
    
    if (remaining < 0) return 1; // Breached
    if (remaining < 5) return 0.9;
    if (remaining < 15) return 0.7;
    if (remaining < 30) return 0.5;
    return 0.3;
  }

  getBusinessValueScore(lead) {
    let score = 0.5;
    if (lead.tags?.includes('Enterprise')) score += 0.3;
    if (lead.tags?.includes('Hot Lead')) score += 0.2;
    if (lead.companySize > 1000) score += 0.2;
    if (lead.dealSize > 100000) score += 0.3;
    return Math.min(score, 1);
  }

  getEngagementScore(lead) {
    const actions = lead.recentActions || 0;
    const emails = lead.emailsSent || 0;
    const calls = lead.callsMade || 0;
    
    const score = (actions * 0.1 + emails * 0.15 + calls * 0.2);
    return Math.min(score, 1);
  }

  getTimeZoneScore(lead) {
    const now = new Date();
    const leadHour = lead.timezone ? 
      new Date().toLocaleString('en-US', { timeZone: lead.timezone, hour: 'numeric', hour12: false }) : 
      now.getHours();
    
    // Business hours: 9 AM - 5 PM
    if (leadHour >= 9 && leadHour < 17) return 1;
    if (leadHour >= 8 && leadHour < 18) return 0.7;
    return 0.3;
  }

  getAvailabilityScore(lead) {
    if (lead.status === 'online') return 1;
    if (lead.lastSeen < 30) return 0.7; // minutes
    if (lead.lastSeen < 120) return 0.5;
    return 0.3;
  }

  getPriorityLevel(score) {
    if (score > 0.8) return 'critical';
    if (score > 0.6) return 'high';
    if (score > 0.4) return 'medium';
    if (score > 0.2) return 'normal';
    return 'low';
  }

  getRecommendation(lead, factors) {
    if (factors.slaRisk > 0.8) {
      return { action: 'immediate_call', message: 'SLA at risk - Call immediately' };
    }
    if (factors.businessValue > 0.8 && factors.availability > 0.7) {
      return { action: 'priority_engage', message: 'High-value lead online - Engage now' };
    }
    if (factors.waitTime > 0.7) {
      return { action: 'apologize_engage', message: 'Long wait time - Apologize and engage' };
    }
    return { action: 'standard_engage', message: 'Follow standard engagement protocol' };
  }

  predictOptimalAgent(lead) {
    // Simulate agent matching based on skills and availability
    const agents = [
      { id: 1, name: 'Alex Thompson', skills: ['Enterprise', 'Technical'], availability: 0.8 },
      { id: 2, name: 'Sarah Miller', skills: ['SMB', 'Finance'], availability: 0.6 },
      { id: 3, name: 'Mike Chen', skills: ['Enterprise', 'Healthcare'], availability: 0.9 }
    ];

    const scores = agents.map(agent => {
      let score = agent.availability;
      
      // Skill matching
      lead.tags?.forEach(tag => {
        if (agent.skills.includes(tag)) score += 0.2;
      });
      
      return { ...agent, matchScore: score };
    });

    return scores.sort((a, b) => b.matchScore - a.matchScore)[0];
  }
}

// Real-time Queue Monitor
const QueueMonitor = ({ queueData, onUpdate }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    avgWaitTime: 26,
    queueVelocity: 3.2,
    slaCompliance: 85,
    agentUtilization: 78
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setLiveMetrics(prev => ({
        avgWaitTime: Math.max(0, prev.avgWaitTime + (Math.random() - 0.5) * 2),
        queueVelocity: Math.max(0, prev.queueVelocity + (Math.random() - 0.5) * 0.5),
        slaCompliance: Math.min(100, Math.max(0, prev.slaCompliance + (Math.random() - 0.5) * 3)),
        agentUtilization: Math.min(100, Math.max(0, prev.agentUtilization + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const velocityData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: i,
      velocity: 3 + Math.sin(i * 0.5) * 2 + Math.random()
    }));
  }, []);

  return (
    <div className="queue-monitor">
      <div className="monitor-header">
        <h3>Queue Analytics</h3>
        <span className="live-badge">
          <span className="live-dot"></span>
          LIVE
        </span>
      </div>

      <div className="monitor-metrics">
        <div className="metric-card">
          <div className="metric-icon">
            <Clock size={16} />
          </div>
          <div className="metric-details">
            <div className="metric-value">{Math.round(liveMetrics.avgWaitTime)}m</div>
            <div className="metric-label">Avg Wait Time</div>
            <div className="metric-trend">
              {liveMetrics.avgWaitTime > 30 ? 
                <ArrowUp size={12} className="trend-up" /> : 
                <ArrowDown size={12} className="trend-down" />
              }
              <span>{liveMetrics.avgWaitTime > 30 ? '+2.3m' : '-1.5m'}</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Activity size={16} />
          </div>
          <div className="metric-details">
            <div className="metric-value">{liveMetrics.queueVelocity.toFixed(1)}</div>
            <div className="metric-label">Queue Velocity</div>
            <div className="metric-trend">
              <span className="velocity-indicator">leads/min</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Shield size={16} />
          </div>
          <div className="metric-details">
            <div className="metric-value">{Math.round(liveMetrics.slaCompliance)}%</div>
            <div className="metric-label">SLA Compliance</div>
            <div className="metric-bar">
              <div 
                className="metric-bar-fill"
                style={{ 
                  width: `${liveMetrics.slaCompliance}%`,
                  backgroundColor: liveMetrics.slaCompliance > 80 ? 'hsl(120, 70%, 50%)' : 'hsl(45, 85%, 55%)'
                }}
              />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Users size={16} />
          </div>
          <div className="metric-details">
            <div className="metric-value">{Math.round(liveMetrics.agentUtilization)}%</div>
            <div className="metric-label">Agent Utilization</div>
            <div className="agent-dots">
              {[...Array(8)].map((_, i) => (
                <span 
                  key={i} 
                  className={`agent-dot ${i < Math.floor(liveMetrics.agentUtilization / 12.5) ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="velocity-chart">
        <h4>Queue Velocity Trend</h4>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={velocityData}>
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="velocity"
              stroke="hsl(270, 70%, 50%)"
              fill="url(#velocityGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// AI Assistant Panel
const AIAssistantPanel = ({ currentLead, onSuggestion }) => {
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (currentLead) {
      // Generate AI suggestions based on lead context
      setSuggestions([
        {
          type: 'opening',
          text: `Hi ${currentLead.name.split(' ')[0]}, I apologize for the wait. I see you're interested in our Enterprise solution...`,
          confidence: 92
        },
        {
          type: 'question',
          text: 'What specific challenges are you looking to solve with our platform?',
          confidence: 88
        },
        {
          type: 'value_prop',
          text: `Based on ${currentLead.company}'s size, you could save approximately 40% on operational costs.`,
          confidence: 85
        }
      ]);
    }
  }, [currentLead]);

  return (
    <div className="ai-assistant-panel">
      <div className="assistant-header">
        <Brain className="assistant-icon" />
        <h3>AI Assistant</h3>
        <button 
          className={`voice-toggle ${isListening ? 'active' : ''}`}
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? <Volume2 size={16} /> : <Mic size={16} />}
        </button>
      </div>

      {currentLead && (
        <>
          <div className="lead-context">
            <h4>Lead Context</h4>
            <div className="context-items">
              <div className="context-item">
                <FileText size={14} />
                <span>Downloaded pricing guide 2 days ago</span>
              </div>
              <div className="context-item">
                <Globe size={14} />
                <span>Visited product demo page 5 times</span>
              </div>
              <div className="context-item">
                <Users size={14} />
                <span>Company grew 200% last year</span>
              </div>
            </div>
          </div>

          <div className="ai-suggestions">
            <h4>Suggested Responses</h4>
            {suggestions.map((suggestion, i) => (
              <div key={i} className="suggestion-card">
                <div className="suggestion-header">
                  <span className="suggestion-type">{suggestion.type}</span>
                  <span className="confidence">{suggestion.confidence}% match</span>
                </div>
                <p className="suggestion-text">{suggestion.text}</p>
                <button 
                  className="use-suggestion"
                  onClick={() => onSuggestion(suggestion)}
                >
                  <Send size={14} />
                  Use
                </button>
              </div>
            ))}
          </div>

          <div className="conversation-tips">
            <h4>Quick Tips</h4>
            <div className="tip-item">
              <Zap size={14} />
              <span>Lead prefers technical discussions</span>
            </div>
            <div className="tip-item">
              <Target size={14} />
              <span>Decision maker - has budget authority</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Enhanced Queue Lead Card
const QueueLeadCard = ({ lead, priority, onAction, isExpanded, onExpand }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState(null);
  
  const priorityConfig = QUANTUM_CONSTANTS.PRIORITY_LEVELS[priority.level];
  const PriorityIcon = priorityConfig.icon;

  useEffect(() => {
    if (lead.sla) {
      const timer = setInterval(() => {
        const waitMinutes = parseInt(lead.waitTime);
        const remaining = lead.sla - waitMinutes;
        setCountdown(remaining);
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [lead]);

  const getWaitTimeColor = (minutes) => {
    const mins = parseInt(minutes);
    if (mins > 45) return 'hsl(0, 85%, 55%)';
    if (mins > 30) return 'hsl(15, 90%, 55%)';
    if (mins > 15) return 'hsl(45, 85%, 55%)';
    return 'hsl(120, 60%, 50%)';
  };

  return (
    <div 
      className={`queue-lead-card ${isExpanded ? 'expanded' : ''} priority-${priority.level}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--priority-color': priorityConfig.color,
        '--priority-glow': priorityConfig.glow
      }}
    >
      <div className="card-priority-indicator">
        <PriorityIcon size={16} />
        <span>{priorityConfig.label}</span>
      </div>

      <div className="card-main">
        <div className="lead-header">
          <div className="lead-identity">
            <div className="lead-avatar">
              {lead.initials}
              {lead.isOnline && <span className="online-dot"></span>}
            </div>
            <div className="lead-details">
              <h3 className="lead-name">{lead.name}</h3>
              <div className="lead-company">
                <Globe size={12} />
                {lead.company}
              </div>
            </div>
          </div>

          <div className="wait-time-container">
            <div 
              className="wait-time"
              style={{ color: getWaitTimeColor(lead.waitTime) }}
            >
              {lead.waitTime} wait
            </div>
            {countdown !== null && countdown < 15 && (
              <div className="sla-warning">
                <AlertTriangle size={14} />
                {countdown}m to SLA
              </div>
            )}
          </div>
        </div>

        <div className="lead-metadata">
          <div className="contact-info">
            <Mail size={14} />
            <span>{lead.email}</span>
          </div>
          <div className="contact-info">
            <Phone size={14} />
            <span>{lead.phone}</span>
          </div>
          <div className="lead-score">
            <Target size={14} />
            <span>Score: {lead.score}</span>
          </div>
        </div>

        <div className="lead-tags">
          {lead.tags?.map(tag => (
            <span key={tag} className={`tag ${tag.toLowerCase().replace(' ', '-')}`}>
              {tag}
            </span>
          ))}
        </div>

        {lead.nextAction && (
          <div className="next-action">
            <Calendar size={14} />
            <span>Next: {lead.nextAction}</span>
          </div>
        )}

        <div className="card-actions">
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={() => onAction('call', lead)}
            >
              <PhoneCall size={16} />
              Call Now
            </button>
            <button 
              className="action-btn"
              onClick={() => onAction('chat', lead)}
            >
              <MessageSquare size={16} />
              Chat
            </button>
            <button 
              className="action-btn"
              onClick={() => onAction('email', lead)}
            >
              <Mail size={16} />
              Email
            </button>
          </div>
          
          <button 
            className="expand-btn"
            onClick={() => onExpand(lead.id)}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <button className="more-btn">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="card-expanded">
          <div className="expanded-content">
            <div className="ai-recommendation">
              <h4>AI Recommendation</h4>
              <div className="recommendation-box">
                <Sparkles size={16} />
                <p>{priority.recommendation.message}</p>
              </div>
            </div>

            <div className="engagement-history">
              <h4>Recent Engagement</h4>
              <div className="history-items">
                <div className="history-item">
                  <Activity size={14} />
                  <span>Viewed pricing page</span>
                  <span className="time">2h ago</span>
                </div>
                <div className="history-item">
                  <Download size={14} />
                  <span>Downloaded whitepaper</span>
                  <span className="time">1d ago</span>
                </div>
              </div>
            </div>

            <div className="priority-breakdown">
              <h4>Priority Factors</h4>
              <div className="factor-bars">
                {Object.entries(priority.factors).map(([factor, score]) => (
                  <div key={factor} className="factor-bar">
                    <span className="factor-name">{factor}</span>
                    <div className="factor-progress">
                      <div 
                        className="factor-fill"
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className="factor-score">{Math.round(score * 100)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Escalation Rules Component
const EscalationRulesModal = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState([
    { id: 1, name: 'High-Value SLA', condition: 'Enterprise + Wait > 15m', action: 'Escalate to Senior SDR', active: true },
    { id: 2, name: 'Hot Lead Priority', condition: 'Score > 90 + Wait > 5m', action: 'Alert Manager', active: true },
    { id: 3, name: 'Time Zone Optimization', condition: 'Outside Business Hours', action: 'Route to Global Team', active: false }
  ]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="escalation-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Escalation Rules</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="rules-list">
            {rules.map(rule => (
              <div key={rule.id} className="rule-item">
                <div className="rule-info">
                  <h4>{rule.name}</h4>
                  <p className="rule-condition">When: {rule.condition}</p>
                  <p className="rule-action">Then: {rule.action}</p>
                </div>
                <label className="rule-toggle">
                  <input
                    type="checkbox"
                    checked={rule.active}
                    onChange={(e) => {
                      setRules(rules.map(r => 
                        r.id === rule.id ? { ...r, active: e.target.checked } : r
                      ));
                    }}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>

          <button className="add-rule-btn">
            <Plus size={16} />
            Add New Rule
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Live Queue Component
export default function QuantumLiveQueue() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-415-555-0123',
      score: 95,
      waitTime: '45m',
      sla: 60,
      isOnline: true,
      tags: ['Enterprise', 'Hot Lead'],
      nextAction: 'Demo call scheduled',
      timezone: 'America/Los_Angeles',
      companySize: 5000,
      dealSize: 150000,
      recentActions: 8,
      emailsSent: 3,
      callsMade: 1
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      company: 'Innovate.io',
      email: 'mchen@innovate.io',
      phone: '+1-408-555-0456',
      score: 78,
      waitTime: '32m',
      sla: 45,
      isOnline: false,
      tags: ['High Priority', 'Decision Maker'],
      timezone: 'America/New_York',
      companySize: 200,
      dealSize: 50000,
      recentActions: 5,
      emailsSent: 2,
      callsMade: 0
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [expandedLeads, setExpandedLeads] = useState(new Set());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAdvancedView, setShowAdvancedView] = useState(false);
  const [showEscalationRules, setShowEscalationRules] = useState(false);
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');
  
  const queueEngine = useMemo(() => new QueueOptimizationEngine(), []);

  // Calculate priorities for all leads
  const leadsWithPriority = useMemo(() => {
    return leads.map(lead => ({
      ...lead,
      priority: queueEngine.calculatePriority(lead),
      optimalAgent: queueEngine.predictOptimalAgent(lead)
    }));
  }, [leads, queueEngine]);

  // Sort leads based on selected criteria
  const sortedLeads = useMemo(() => {
    let sorted = [...leadsWithPriority];
    
    if (sortBy === 'priority') {
      sorted.sort((a, b) => b.priority.score - a.priority.score);
    } else if (sortBy === 'waitTime') {
      sorted.sort((a, b) => parseInt(b.waitTime) - parseInt(a.waitTime));
    } else if (sortBy === 'score') {
      sorted.sort((a, b) => b.score - a.score);
    }

    if (filterBy !== 'all') {
      sorted = sorted.filter(lead => lead.priority.level === filterBy);
    }

    return sorted;
  }, [leadsWithPriority, sortBy, filterBy]);

  // Queue statistics
  const queueStats = useMemo(() => {
    const stats = {
      total: leads.length,
      avgWaitTime: leads.reduce((acc, lead) => acc + parseInt(lead.waitTime), 0) / leads.length,
      slaAtRisk: leads.filter(lead => {
        const wait = parseInt(lead.waitTime);
        return lead.sla && (lead.sla - wait) < 15;
      }).length,
      escalatedToday: 5, // Mock data
      byPriority: {}
    };

    Object.keys(QUANTUM_CONSTANTS.PRIORITY_LEVELS).forEach(level => {
      stats.byPriority[level] = sortedLeads.filter(lead => lead.priority.level === level).length;
    });

    return stats;
  }, [leads, sortedLeads]);

  const handleLeadAction = (action, lead) => {
    console.log(`Action: ${action} on lead:`, lead);
    setSelectedLead(lead);
  };

  const handleExpandLead = (leadId) => {
    const newExpanded = new Set(expandedLeads);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    setExpandedLeads(newExpanded);
  };

  const handleAISuggestion = (suggestion) => {
    console.log('Using AI suggestion:', suggestion);
  };

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Update wait times
        setLeads(prevLeads => 
          prevLeads.map(lead => ({
            ...lead,
            waitTime: `${parseInt(lead.waitTime) + 1}m`
          }))
        );
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <div className="quantum-live-queue">
      {/* Quantum Background */}
      <div className="quantum-background">
        <div className="quantum-mesh"></div>
        <div className="quantum-particles"></div>
        <div className="pulse-rings"></div>
      </div>

      {/* Header */}
      <header className="queue-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Lead Queue</h1>
            <p className="page-subtitle">Manage and prioritize your lead queue with automated escalation</p>
          </div>

          <div className="header-controls">
            <div className="status-indicator">
              <span className={`status-dot ${autoRefresh ? 'active' : 'inactive'}`}></span>
              <span>Real-time updates</span>
            </div>

            <button 
              className={`advanced-view-toggle ${showAdvancedView ? 'active' : ''}`}
              onClick={() => setShowAdvancedView(!showAdvancedView)}
            >
              <Eye size={16} />
              Advanced View
            </button>

            <button 
              className={`auto-refresh-toggle ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw size={16} className={autoRefresh ? 'spinning' : ''} />
              Auto-refresh
            </button>

            <button 
              className="escalation-rules-btn"
              onClick={() => setShowEscalationRules(true)}
            >
              <GitBranch size={16} />
              Escalation Rules
            </button>
          </div>
        </div>
      </header>

      {/* Queue Statistics */}
      <section className="queue-statistics">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{queueStats.total}</div>
            <div className="stat-label">Total in Queue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(queueStats.avgWaitTime)}m</div>
            <div className="stat-label">Avg Wait Time</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{queueStats.slaAtRisk}</div>
            <div className="stat-label">SLA At Risk</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{queueStats.escalatedToday}</div>
            <div className="stat-label">Escalated Today</div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="priority-breakdown-card">
          <h4>Priority Distribution</h4>
          <div className="priority-bars">
            {Object.entries(queueStats.byPriority).map(([level, count]) => {
              const config = QUANTUM_CONSTANTS.PRIORITY_LEVELS[level];
              return (
                <div key={level} className="priority-bar">
                  <span className="priority-label" style={{ color: config.color }}>
                    {config.label}
                  </span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{ 
                        width: `${(count / queueStats.total) * 100}%`,
                        backgroundColor: config.color
                      }}
                    />
                  </div>
                  <span className="priority-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Queue Management Section */}
      <section className="queue-management">
        <div className="management-header">
          <h2>Queue Management</h2>
          
          <div className="management-controls">
            <div className="search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search leads..."
                className="search-input"
              />
            </div>

            <select 
              className="filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>

            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Priority Score</option>
              <option value="waitTime">Wait Time</option>
              <option value="score">Lead Score</option>
            </select>

            <button className="bulk-actions-btn">
              <Layers size={16} />
              Bulk Actions
            </button>
          </div>
        </div>

        <div className="queue-container">
          {/* Queue Monitor - Left Panel */}
          {showAdvancedView && (
            <QueueMonitor queueData={sortedLeads} onUpdate={console.log} />
          )}

          {/* Lead Cards - Center */}
          <div className="queue-leads">
            {sortedLeads.map((lead) => (
              <QueueLeadCard
                key={lead.id}
                lead={lead}
                priority={lead.priority}
                onAction={handleLeadAction}
                isExpanded={expandedLeads.has(lead.id)}
                onExpand={handleExpandLead}
              />
            ))}
          </div>

          {/* AI Assistant - Right Panel */}
          {showAdvancedView && (
            <AIAssistantPanel 
              currentLead={selectedLead} 
              onSuggestion={handleAISuggestion}
            />
          )}
        </div>
      </section>

      {/* Escalation Rules Modal */}
      <EscalationRulesModal 
        isOpen={showEscalationRules}
        onClose={() => setShowEscalationRules(false)}
      />

      <style jsx>{`
        .quantum-live-queue {
          min-height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Quantum Background */
        .quantum-background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .quantum-mesh {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: meshMove 40s linear infinite;
        }

        @keyframes meshMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }

        .quantum-particles {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, hsla(0, 85%, 55%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(270, 70%, 50%, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, hsla(120, 60%, 50%, 0.06) 0%, transparent 50%);
          animation: particleFloat 25s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.1) rotate(120deg); }
          66% { transform: scale(0.9) rotate(240deg); }
        }

        .pulse-rings {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .pulse-rings::before,
        .pulse-rings::after {
          content: '';
          position: absolute;
          border: 1px solid hsla(270, 70%, 50%, 0.1);
          border-radius: 50%;
          animation: pulseRing 4s ease-out infinite;
        }

        .pulse-rings::before {
          top: 10%;
          left: 20%;
          width: 300px;
          height: 300px;
        }

        .pulse-rings::after {
          bottom: 20%;
          right: 10%;
          width: 400px;
          height: 400px;
          animation-delay: 2s;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Header */
        .queue-header {
          position: relative;
          z-index: 10;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.875rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: statusPulse 2s ease-in-out infinite;
        }

        .status-dot.inactive {
          background: #6b7280;
          animation: none;
        }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        }

        .advanced-view-toggle,
        .auto-refresh-toggle,
        .escalation-rules-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .advanced-view-toggle:hover,
        .auto-refresh-toggle:hover,
        .escalation-rules-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .advanced-view-toggle.active,
        .auto-refresh-toggle.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
          color: hsl(270, 70%, 70%);
        }

        .spinning {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Queue Statistics */
        .queue-statistics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .stat-card.warning {
          border-color: hsla(45, 85%, 55%, 0.3);
          background: hsla(45, 85%, 55%, 0.05);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          color: hsl(270, 70%, 60%);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .priority-breakdown-card {
          grid-column: span 2;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .priority-breakdown-card h4 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .priority-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .priority-bar {
          display: grid;
          grid-template-columns: 80px 1fr 40px;
          align-items: center;
          gap: 1rem;
        }

        .priority-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .bar-container {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .priority-count {
          text-align: right;
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Queue Management */
        .queue-management {
          padding: 0 2rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .management-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .management-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .management-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .search-input {
          padding: 0.625rem 0.75rem 0.625rem 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          width: 250px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
          box-shadow: 0 0 0 3px hsla(270, 70%, 50%, 0.2);
        }

        .filter-select,
        .sort-select {
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .bulk-actions-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bulk-actions-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        /* Queue Container */
        .queue-container {
          display: grid;
          grid-template-columns: ${props => props.showAdvancedView ? '320px 1fr 320px' : '1fr'};
          gap: 1.5rem;
        }

        /* Queue Monitor */
        .queue-monitor {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .monitor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .monitor-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .live-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          animation: livePulse 2s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        .monitor-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .metric-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 8px;
          color: hsl(270, 70%, 60%);
        }

        .metric-details {
          flex: 1;
        }

        .metric-value {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.125rem;
        }

        .metric-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .metric-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .trend-up {
          color: #ef4444;
        }

        .trend-down {
          color: #10b981;
        }

        .velocity-indicator {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.625rem;
        }

        .metric-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .metric-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        .agent-dots {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .agent-dot {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .agent-dot.active {
          background: #10b981;
          box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
        }

        .velocity-chart {
          margin-top: 1.5rem;
        }

        .velocity-chart h4 {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Queue Leads */
        .queue-leads {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Queue Lead Card */
        .queue-lead-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .queue-lead-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .queue-lead-card.priority-critical {
          border-color: hsla(0, 85%, 55%, 0.3);
          box-shadow: 0 0 20px hsla(0, 85%, 55%, 0.1);
        }

        .queue-lead-card.priority-high {
          border-color: hsla(15, 90%, 55%, 0.3);
        }

        .card-priority-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--priority-color);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .card-priority-indicator::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 1rem;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          background: var(--priority-color);
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 0 0 6px 6px;
        }

        .card-main {
          padding: 1.25rem;
        }

        .lead-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .lead-identity {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .lead-avatar {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border-radius: 50%;
          font-weight: 600;
          font-size: 1rem;
          position: relative;
        }

        .online-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #10b981;
          border: 2px solid #0a0a0f;
          border-radius: 50%;
        }

        .lead-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }

        .lead-company {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .wait-time-container {
          text-align: right;
        }

        .wait-time {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .sla-warning {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.5rem;
          background: hsla(45, 85%, 55%, 0.2);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: hsl(45, 85%, 55%);
          animation: warningPulse 2s ease-in-out infinite;
        }

        @keyframes warningPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .lead-metadata {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .contact-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .lead-score {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: hsl(270, 70%, 60%);
          font-weight: 600;
        }

        .lead-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag {
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tag.enterprise {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
          color: hsl(270, 70%, 70%);
        }

        .tag.hot-lead {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .tag.decision-maker {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .next-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(120, 70%, 50%, 0.1);
          border-radius: 6px;
          font-size: 0.8125rem;
          color: hsl(120, 70%, 60%);
          margin-bottom: 1rem;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .quick-actions {
          display: flex;
          gap: 0.5rem;
          flex: 1;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .action-btn.primary {
          background: linear-gradient(135deg, hsla(120, 70%, 50%, 0.2), hsla(140, 70%, 50%, 0.2));
          border-color: hsla(120, 70%, 50%, 0.4);
          color: hsl(120, 70%, 70%);
        }

        .action-btn.primary:hover {
          background: linear-gradient(135deg, hsla(120, 70%, 50%, 0.3), hsla(140, 70%, 50%, 0.3));
          box-shadow: 0 4px 20px hsla(120, 70%, 50%, 0.3);
        }

        .expand-btn,
        .more-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .expand-btn:hover,
        .more-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        /* Expanded Content */
        .card-expanded {
          padding: 0 1.25rem 1.25rem;
          animation: expandDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .expanded-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .ai-recommendation,
        .engagement-history,
        .priority-breakdown {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }

        .ai-recommendation h4,
        .engagement-history h4,
        .priority-breakdown h4 {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .recommendation-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        .recommendation-box svg {
          flex-shrink: 0;
          color: hsl(270, 70%, 60%);
        }

        .history-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .history-item .time {
          margin-left: auto;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .factor-bars {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .factor-bar {
          display: grid;
          grid-template-columns: 100px 1fr 30px;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
        }

        .factor-name {
          color: rgba(255, 255, 255, 0.7);
          text-transform: capitalize;
        }

        .factor-progress {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .factor-fill {
          height: 100%;
          background: linear-gradient(90deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .factor-score {
          text-align: right;
          font-weight: 600;
        }

        /* AI Assistant Panel */
        .ai-assistant-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .assistant-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .assistant-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          flex: 1;
        }

        .assistant-icon {
          color: hsl(270, 70%, 60%);
          animation: brainPulse 3s ease-in-out infinite;
        }

        @keyframes brainPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .voice-toggle {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .voice-toggle.active {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          color: #ef4444;
          animation: voicePulse 1.5s ease-in-out infinite;
        }

        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
        }

        .lead-context,
        .ai-suggestions,
        .conversation-tips {
          margin-bottom: 1.5rem;
        }

        .lead-context h4,
        .ai-suggestions h4,
        .conversation-tips h4 {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .context-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .context-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .suggestion-card {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .suggestion-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .suggestion-type {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: hsl(270, 70%, 60%);
        }

        .confidence {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .suggestion-text {
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 0.75rem 0;
        }

        .use-suggestion {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.75rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 6px;
          color: hsl(270, 70%, 70%);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .use-suggestion:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-1px);
        }

        .tip-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 6px;
          font-size: 0.8125rem;
          margin-bottom: 0.5rem;
        }

        .tip-item svg {
          color: hsl(45, 85%, 55%);
        }

        /* Escalation Rules Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .escalation-modal {
          width: 90%;
          max-width: 600px;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .modal-content {
          padding: 1.5rem;
        }

        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .rule-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .rule-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .rule-info h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .rule-condition,
        .rule-action {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.25rem;
        }

        .rule-toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }

        .rule-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          transition: all 0.4s ease;
        }

        .toggle-slider::before {
          position: absolute;
          content: '';
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background: white;
          border-radius: 50%;
          transition: all 0.4s ease;
        }

        .rule-toggle input:checked + .toggle-slider {
          background: hsl(270, 70%, 50%);
        }

        .rule-toggle input:checked + .toggle-slider::before {
          transform: translateX(24px);
        }

        .add-rule-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.875rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 8px;
          color: hsl(270, 70%, 70%);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-rule-btn:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .queue-container {
            grid-template-columns: 1fr;
          }
          
          .queue-monitor,
          .ai-assistant-panel {
            position: static;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .queue-statistics {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .priority-breakdown-card {
            grid-column: span 2;
          }
          
          .management-controls {
            flex-wrap: wrap;
          }
          
          .search-input {
            width: 100%;
          }
          
          .expanded-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}