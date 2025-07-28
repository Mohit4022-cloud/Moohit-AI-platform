import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Download, Upload, Star, Filter, ChevronDown, ChevronRight, 
  Brain, Zap, Phone, Mail, MessageSquare, Calendar, Clock, TrendingUp, 
  AlertCircle, CheckCircle, Target, Users, Activity, Sparkles, Command,
  BarChart3, Eye, EyeOff, Mic, Volume2, Settings, Share2, BookOpen,
  PieChart, Layers, Timer, Award, Shield, RefreshCw, GitBranch,
  Headphones, Video, Globe, Linkedin, Twitter, ArrowUpRight, ArrowDownRight,
  ArrowLeft
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RePieChart, 
  Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Scatter, ScatterChart
} from 'recharts';

// Quantum Constants
const QUANTUM_CONSTANTS = {
  PHI: 1.618033988749,
  FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  LEAD_STAGES: {
    new: { color: 'hsl(210, 70%, 50%)', label: 'NEW', icon: Sparkles },
    qualified: { color: 'hsl(120, 70%, 50%)', label: 'QUALIFIED', icon: CheckCircle },
    contacted: { color: 'hsl(45, 70%, 50%)', label: 'CONTACTED', icon: Phone },
    engaged: { color: 'hsl(270, 70%, 50%)', label: 'ENGAGED', icon: MessageSquare },
    opportunity: { color: 'hsl(15, 70%, 50%)', label: 'OPPORTUNITY', icon: Target },
    closed: { color: 'hsl(0, 70%, 50%)', label: 'CLOSED', icon: Award }
  }
};

// Enhanced AI Engine for Lead Scoring
class LeadScoringEngine {
  calculateLeadScore(lead) {
    const factors = {
      behavioral: this.getBehavioralScore(lead),
      demographic: this.getDemographicScore(lead),
      engagement: this.getEngagementScore(lead),
      timing: this.getTimingScore(lead),
      intent: this.getIntentScore(lead)
    };
    
    const weightedScore = 
      factors.behavioral * 0.3 +
      factors.demographic * 0.2 +
      factors.engagement * 0.25 +
      factors.timing * 0.15 +
      factors.intent * 0.1;
    
    return {
      total: Math.round(weightedScore),
      factors,
      recommendation: this.getRecommendation(weightedScore, factors),
      nextBestAction: this.getNextBestAction(lead, factors),
      conversionProbability: this.getConversionProbability(weightedScore, factors)
    };
  }
  
  getBehavioralScore(lead) {
    // Simulate behavioral scoring based on actions
    const actions = lead.recentActions || [];
    const score = actions.reduce((acc, action) => {
      const actionScores = {
        'visited_pricing': 20,
        'downloaded_whitepaper': 15,
        'attended_webinar': 25,
        'requested_demo': 30,
        'multiple_sessions': 10
      };
      return acc + (actionScores[action] || 0);
    }, 0);
    return Math.min(score, 100);
  }
  
  getDemographicScore(lead) {
    let score = 50; // Base score
    if (lead.title?.includes('Director') || lead.title?.includes('VP')) score += 20;
    if (lead.title?.includes('C-')) score += 30;
    if (lead.companySize > 1000) score += 15;
    if (lead.industry === 'Technology') score += 10;
    return Math.min(score, 100);
  }
  
  getEngagementScore(lead) {
    const engagements = lead.engagements || 0;
    const recency = lead.lastEngagement || 30; // days ago
    const frequency = lead.engagementFrequency || 0;
    
    let score = engagements * 5;
    if (recency < 1) score += 30;
    else if (recency < 7) score += 20;
    else if (recency < 14) score += 10;
    
    score += frequency * 10;
    return Math.min(score, 100);
  }
  
  getTimingScore(lead) {
    const timeInPipeline = lead.daysInPipeline || 0;
    const optimalWindow = 14; // days
    const deviation = Math.abs(timeInPipeline - optimalWindow);
    return Math.max(100 - deviation * 5, 0);
  }
  
  getIntentScore(lead) {
    const intentSignals = lead.intentSignals || [];
    const signalScores = {
      'competitor_research': 25,
      'implementation_timeline': 30,
      'budget_discussion': 35,
      'decision_criteria': 20
    };
    const score = intentSignals.reduce((acc, signal) => 
      acc + (signalScores[signal] || 0), 0
    );
    return Math.min(score, 100);
  }
  
  getRecommendation(score, factors) {
    if (score > 85) return 'Hot Lead - Immediate Action Required';
    if (score > 70) return 'Warm Lead - Schedule Follow-up';
    if (score > 50) return 'Nurture - Targeted Content';
    return 'Cold Lead - Long-term Nurture';
  }
  
  getNextBestAction(lead, factors) {
    if (factors.intent > 80) return { action: 'schedule_demo', urgency: 'high' };
    if (factors.engagement > 70) return { action: 'personalized_outreach', urgency: 'medium' };
    if (factors.behavioral > 60) return { action: 'send_case_study', urgency: 'medium' };
    return { action: 'nurture_campaign', urgency: 'low' };
  }
  
  getConversionProbability(score, factors) {
    const base = score / 100;
    const modifier = (factors.intent / 100) * 0.2 + (factors.timing / 100) * 0.1;
    return Math.min(base + modifier, 0.95);
  }
}

// AI Insights Component
const AIInsightsPanel = ({ leads, onAction }) => {
  const [insights, setInsights] = useState([]);
  const scoringEngine = useMemo(() => new LeadScoringEngine(), []);
  
  useEffect(() => {
    // Generate insights
    const newInsights = [
      {
        type: 'opportunity',
        priority: 'high',
        message: '3 leads showing high buying intent - schedule demos today',
        action: 'view_hot_leads',
        leads: leads.filter(l => l.score > 85).slice(0, 3)
      },
      {
        type: 'timing',
        priority: 'medium',
        message: '5 leads haven\'t been contacted in 7+ days',
        action: 'view_stale_leads',
        count: 5
      },
      {
        type: 'pattern',
        priority: 'low',
        message: 'Tech companies converting 40% higher this month',
        action: 'filter_tech'
      }
    ];
    setInsights(newInsights);
  }, [leads]);
  
  return (
    <div className="ai-insights-panel">
      <div className="insights-header">
        <Brain className="insights-icon" />
        <h3>AI Insights</h3>
        <span className="insights-badge">LIVE</span>
      </div>
      
      <div className="insights-list">
        {insights.map((insight, i) => (
          <div key={i} className={`insight-card priority-${insight.priority}`}>
            <div className="insight-content">
              <div className="insight-message">{insight.message}</div>
              {insight.leads && (
                <div className="insight-leads">
                  {insight.leads.map(lead => (
                    <div key={lead.id} className="mini-lead">
                      <span className="mini-avatar">{lead.initials}</span>
                      <span className="mini-name">{lead.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="insight-action"
              onClick={() => onAction(insight.action)}
            >
              <Zap size={14} />
              Act Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lead Score Visualizer
const LeadScoreVisualizer = ({ score, factors }) => {
  const radarData = [
    { metric: 'Behavioral', value: factors.behavioral },
    { metric: 'Demographic', value: factors.demographic },
    { metric: 'Engagement', value: factors.engagement },
    { metric: 'Timing', value: factors.timing },
    { metric: 'Intent', value: factors.intent }
  ];
  
  return (
    <div className="lead-score-visualizer">
      <div className="score-header">
        <div className="score-main">
          <div className="score-value">{score.total}</div>
          <div className="score-label">Lead Score</div>
        </div>
        <div className="conversion-probability">
          <div className="probability-value">
            {Math.round(score.conversionProbability * 100)}%
          </div>
          <div className="probability-label">Conversion Probability</div>
        </div>
      </div>
      
      <div className="score-radar">
        <ResponsiveContainer width="100%" height={150}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} />
            <Radar
              dataKey="value"
              stroke="hsl(270, 70%, 50%)"
              fill="hsl(270, 70%, 50%)"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="score-recommendation">
        <AlertCircle size={14} />
        {score.recommendation}
      </div>
    </div>
  );
};

// Enhanced Lead Card
const QuantumLeadCard = ({ lead, isSelected, onSelect, onAction, showDetails, showToast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scoringEngine = useMemo(() => new LeadScoringEngine(), []);
  const score = useMemo(() => scoringEngine.calculateLeadScore(lead), [lead, scoringEngine]);
  
  const statusConfig = QUANTUM_CONSTANTS.LEAD_STAGES[lead.status.toLowerCase()] || 
    QUANTUM_CONSTANTS.LEAD_STAGES.new;
  const StatusIcon = statusConfig.icon;
  
  const getUrgencyGlow = (score) => {
    if (score > 85) return 'hsl(120, 70%, 50%)';
    if (score > 70) return 'hsl(45, 70%, 50%)';
    if (score > 50) return 'hsl(270, 70%, 50%)';
    return 'hsl(210, 70%, 50%)';
  };
  
  return (
    <div 
      className={`quantum-lead-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--urgency-color': getUrgencyGlow(lead.score)
      }}
    >
      <div className="lead-main" onClick={() => onSelect(lead.id)}>
        <div className="lead-select">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(lead.id);
            }}
          />
        </div>
        
        <div className="lead-identity">
          <div className="lead-avatar-container">
            <div className="lead-avatar">{lead.initials}</div>
            {lead.score > 85 && <div className="hot-badge">🔥</div>}
            {lead.isOnline && <div className="online-indicator"></div>}
          </div>
          
          <div className="lead-info">
            <div className="lead-name-row">
              <h4 className="lead-name">{lead.name}</h4>
              {lead.verified && <Shield size={14} className="verified-icon" />}
            </div>
            <div className="lead-contact">{lead.email}</div>
            <div className="lead-company-info">
              <span className="company-name">{lead.company}</span>
              {lead.companySize && (
                <span className="company-size">• {lead.companySize} employees</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="lead-status-container">
          <div 
            className="status-badge"
            style={{ 
              backgroundColor: `${statusConfig.color}20`,
              color: statusConfig.color 
            }}
          >
            <StatusIcon size={12} />
            {statusConfig.label}
          </div>
          {lead.tags?.map(tag => (
            <span key={tag} className="lead-tag">{tag}</span>
          ))}
        </div>
        
        <div className="lead-metrics">
          <div className="metric-item">
            <div className="metric-value">{lead.score}</div>
            <div className="metric-label">Score</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{lead.engagements || 0}</div>
            <div className="metric-label">Engagements</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{lead.daysInPipeline || 0}d</div>
            <div className="metric-label">In Pipeline</div>
          </div>
        </div>
        
        <div className="lead-assignment">
          {lead.assignedTo ? (
            <div className="assigned-user">
              <div className="user-avatar">{lead.assignedTo.initials}</div>
              <span>{lead.assignedTo.name}</span>
            </div>
          ) : (
            <span className="unassigned">Unassigned</span>
          )}
        </div>
        
        <div className="lead-source">
          <SourceIcon source={lead.source} />
          <span>{lead.source}</span>
        </div>
        
        <div className="lead-activity">
          <Clock size={14} />
          <span>{lead.lastActivity}</span>
        </div>
        
        <div className="lead-actions">
          <button 
            className="expand-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          <QuickActions 
            lead={lead}
            onAction={onAction}
            showLabels={isHovered}
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="lead-expanded-content">
          <div className="expanded-grid">
            <LeadScoreVisualizer score={score} factors={score.factors} />
            
            <div className="lead-timeline">
              <h4>Recent Activity</h4>
              <div className="timeline-items">
                {lead.timeline?.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-icon">
                      <TimelineIcon type={item.type} />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{item.title}</div>
                      <div className="timeline-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lead-insights">
              <h4>AI Recommendations</h4>
              <div className="recommendation-card">
                <Target size={16} />
                <div>
                  <div className="recommendation-title">Next Best Action</div>
                  <div className="recommendation-text">
                    {score.nextBestAction.action.replace('_', ' ')}
                  </div>
                </div>
                <button className="recommendation-action" onClick={() => {
                  onAction(score.nextBestAction.action, lead);
                  showToast(`Executing: ${score.nextBestAction.action.replace('_', ' ')}`, 'info');
                }}>
                  Execute
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Quick Actions Component
const QuickActions = ({ lead, onAction, showLabels }) => {
  const actions = [
    { icon: Phone, action: 'call', label: 'Call', color: 'hsl(120, 70%, 50%)' },
    { icon: Mail, action: 'email', label: 'Email', color: 'hsl(210, 70%, 50%)' },
    { icon: MessageSquare, action: 'chat', label: 'Chat', color: 'hsl(270, 70%, 50%)' },
    { icon: Calendar, action: 'schedule', label: 'Schedule', color: 'hsl(45, 70%, 50%)' }
  ];
  
  return (
    <div className={`quick-actions ${showLabels ? 'show-labels' : ''}`}>
      {actions.map(({ icon: Icon, action, label, color }) => (
        <button
          key={action}
          className="quick-action"
          onClick={(e) => {
            e.stopPropagation();
            onAction(action, lead);
          }}
          style={{ '--action-color': color }}
          title={label}
        >
          <Icon size={14} />
          {showLabels && <span className="action-label">{label}</span>}
        </button>
      ))}
    </div>
  );
};

// Source Icon Component
const SourceIcon = ({ source }) => {
  const icons = {
    'LinkedIn': Linkedin,
    'Website': Globe,
    'Demo': Video,
    'Webinar': Users,
    'Twitter': Twitter,
    'Referral': Share2,
    'Direct': Mail
  };
  const Icon = icons[source] || Globe;
  return <Icon size={14} />;
};

// Timeline Icon Component
const TimelineIcon = ({ type }) => {
  const icons = {
    'call': Phone,
    'email': Mail,
    'meeting': Calendar,
    'note': BookOpen,
    'status_change': GitBranch,
    'document': Download
  };
  const Icon = icons[type] || Activity;
  return <Icon size={12} />;
};

// Bulk Actions Bar
const BulkActionsBar = ({ selectedCount, onAction, onClear }) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="bulk-actions-bar">
      <div className="bulk-info">
        <CheckCircle size={16} />
        <span>{selectedCount} leads selected</span>
        <button className="clear-selection" onClick={onClear}>
          Clear
        </button>
      </div>
      
      <div className="bulk-actions">
        <button className="bulk-action" onClick={() => onAction('assign')}>
          <Users size={14} />
          Assign
        </button>
        <button className="bulk-action" onClick={() => onAction('tag')}>
          <Layers size={14} />
          Tag
        </button>
        <button className="bulk-action" onClick={() => onAction('status')}>
          <GitBranch size={14} />
          Change Status
        </button>
        <button className="bulk-action" onClick={() => onAction('export')}>
          <Download size={14} />
          Export
        </button>
        <button className="bulk-action primary" onClick={() => onAction('sequence')}>
          <Zap size={14} />
          Add to Sequence
        </button>
      </div>
    </div>
  );
};

// Advanced Filters Component
const AdvancedFilters = ({ onApply, isOpen }) => {
  const [filters, setFilters] = useState({
    scoreRange: [0, 100],
    status: [],
    source: [],
    assigned: 'all',
    dateRange: 'all',
    tags: [],
    engagement: 'all'
  });
  
  if (!isOpen) return null;
  
  return (
    <div className="advanced-filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Score Range</label>
          <div className="range-inputs">
            <input
              type="number"
              value={filters.scoreRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                scoreRange: [parseInt(e.target.value), filters.scoreRange[1]]
              })}
            />
            <span>to</span>
            <input
              type="number"
              value={filters.scoreRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                scoreRange: [filters.scoreRange[0], parseInt(e.target.value)]
              })}
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label>Status</label>
          <div className="checkbox-group">
            {Object.entries(QUANTUM_CONSTANTS.LEAD_STAGES).map(([key, config]) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.status.includes(key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, status: [...filters.status, key] });
                    } else {
                      setFilters({ ...filters, status: filters.status.filter(s => s !== key) });
                    }
                  }}
                />
                <span style={{ color: config.color }}>{config.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-group">
          <label>Date Range</label>
          <select 
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Engagement Level</label>
          <select 
            value={filters.engagement}
            onChange={(e) => setFilters({ ...filters, engagement: e.target.value })}
          >
            <option value="all">All Levels</option>
            <option value="high">High (10+ interactions)</option>
            <option value="medium">Medium (5-9 interactions)</option>
            <option value="low">Low (1-4 interactions)</option>
            <option value="none">No Engagement</option>
          </select>
        </div>
      </div>
      
      <div className="filter-actions">
        <button className="filter-reset" onClick={() => setFilters({
          scoreRange: [0, 100],
          status: [],
          source: [],
          assigned: 'all',
          dateRange: 'all',
          tags: [],
          engagement: 'all'
        })}>
          Reset Filters
        </button>
        <button className="filter-apply" onClick={() => onApply(filters)}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Main Leads Page Component
export default function QuantumLeadsPage() {
  const navigate = useNavigate();
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showSaveViewModal, setShowSaveViewModal] = useState(false);
  const [showRoutingModal, setShowRoutingModal] = useState(false);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [showBulkTagModal, setShowBulkTagModal] = useState(false);
  const [showBulkStatusModal, setShowBulkStatusModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  
  // Toast helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const [leads, setLeads] = useState([
    {
      id: 1,
      initials: 'SJ',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Solutions',
      companySize: 500,
      title: 'VP of Sales',
      status: 'qualified',
      score: 95,
      engagements: 12,
      daysInPipeline: 8,
      assignedTo: { name: 'You', initials: 'YO' },
      source: 'LinkedIn',
      lastActivity: 'about 1 hour ago',
      verified: true,
      isOnline: true,
      tags: ['Enterprise', 'High Value'],
      recentActions: ['visited_pricing', 'downloaded_whitepaper', 'attended_webinar'],
      timeline: [
        { type: 'call', title: 'Discovery call completed', time: '2 hours ago' },
        { type: 'email', title: 'Sent follow-up proposal', time: '1 day ago' },
        { type: 'meeting', title: 'Demo scheduled', time: '3 days ago' }
      ]
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      email: 'mchen@innovate.io',
      company: 'Innovate.io',
      companySize: 150,
      title: 'CTO',
      status: 'contacted',
      score: 78,
      engagements: 6,
      daysInPipeline: 15,
      assignedTo: null,
      source: 'Website Demo',
      lastActivity: 'about 2 hours ago',
      verified: false,
      isOnline: false,
      tags: ['Startup', 'Technical'],
      recentActions: ['requested_demo', 'multiple_sessions'],
      timeline: [
        { type: 'note', title: 'Interested in API integration', time: '4 hours ago' },
        { type: 'email', title: 'Initial outreach sent', time: '2 days ago' }
      ]
    }
  ]);
  
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSearchEnabled, setAiSearchEnabled] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // list, kanban, map
  const [sortBy, setSortBy] = useState('score_desc');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setCommandPaletteOpen(true);
        } else if (e.key === 'a' && e.shiftKey) {
          e.preventDefault();
          // Select all
          setSelectedLeads(new Set(leads.map(l => l.id)));
        } else if (e.key === 'n') {
          e.preventDefault();
          // Add new lead
          console.log('Add new lead');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [leads]);
  
  const handleSelectLead = (leadId) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };
  
  const handleBulkAction = (action) => {
    switch(action) {
      case 'assign':
        setShowBulkAssignModal(true);
        showToast(`Assigning ${selectedLeads.size} leads...`, 'info');
        break;
      case 'tag':
        setShowBulkTagModal(true);
        showToast(`Tagging ${selectedLeads.size} leads...`, 'info');
        break;
      case 'status':
        setShowBulkStatusModal(true);
        showToast(`Updating status for ${selectedLeads.size} leads...`, 'info');
        break;
      case 'export':
        showToast(`Exporting ${selectedLeads.size} leads...`, 'info');
        setTimeout(() => showToast('Export completed!', 'success'), 1500);
        break;
      case 'sequence':
        setShowSequenceModal(true);
        showToast(`Adding ${selectedLeads.size} leads to sequence...`, 'info');
        break;
    }
  };
  
  const handleLeadAction = (action, lead) => {
    switch(action) {
      case 'call':
        showToast(`Initiating call to ${lead.name}...`, 'info');
        setTimeout(() => showToast('Call connected!', 'success'), 1500);
        break;
      case 'email':
        showToast(`Opening email composer for ${lead.name}...`, 'info');
        break;
      case 'chat':
        showToast(`Starting chat with ${lead.name}...`, 'info');
        break;
      case 'schedule':
        showToast(`Opening calendar for ${lead.name}...`, 'info');
        break;
    }
  };
  
  const handleAIAction = (action) => {
    switch(action) {
      case 'view_hot_leads':
        showToast('Filtering hot leads...', 'info');
        setSortBy('score_desc');
        break;
      case 'view_stale_leads':
        showToast('Finding stale leads...', 'info');
        break;
      case 'filter_tech':
        showToast('Filtering tech companies...', 'info');
        break;
    }
  };
  
  // Header button handlers
  const handleSaveView = () => {
    setShowSaveViewModal(true);
    showToast('Opening save view dialog...', 'info');
  };
  
  const handleImport = () => {
    setShowImportModal(true);
    showToast('Opening import wizard...', 'info');
  };
  
  const handleExport = () => {
    setShowExportModal(true);
    showToast('Preparing export...', 'info');
  };
  
  const handleAddLead = () => {
    setShowAddLeadModal(true);
    showToast('Opening lead creation form...', 'info');
  };
  
  const handleLeadRouting = () => {
    setShowRoutingModal(true);
    showToast('Configuring lead routing rules...', 'info');
  };
  
  const handleBehavioralScoring = () => {
    showToast('Analyzing behavioral patterns...', 'info');
    setTimeout(() => showToast('Behavioral scoring updated!', 'success'), 2000);
  };
  
  const handleRefresh = () => {
    showToast('Refreshing leads...', 'info');
    setTimeout(() => {
      showToast('Leads refreshed!', 'success');
      // Could trigger actual data refresh here
    }, 1000);
  };
  
  const handleSettings = () => {
    showToast('Opening lead settings...', 'info');
    navigate('/settings?tab=leads');
  };
  
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query)
      );
    }
    
    // Sort
    if (sortBy === 'score_desc') {
      filtered.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'score_asc') {
      filtered.sort((a, b) => a.score - b.score);
    } else if (sortBy === 'recent') {
      // Sort by last activity
    }
    
    return filtered;
  }, [leads, searchQuery, sortBy]);
  
  return (
    <div className="quantum-leads-page">
      {/* Background Effects */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-orbs"></div>
      </div>
      
      {/* Header */}
      <header className="leads-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigate('/dashboard')}
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="header-text">
              <h1 className="page-title">Leads</h1>
              <p className="page-subtitle">Manage your inbound leads with AI-powered insights</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="header-button secondary" onClick={handleSaveView}>
              <Star size={16} />
              Save View
            </button>
            <button className="header-button secondary" onClick={handleImport}>
              <Upload size={16} />
              Import
            </button>
            <button className="header-button secondary" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
            <button className="header-button primary" onClick={handleAddLead}>
              <Plus size={16} />
              Add Lead
            </button>
          </div>
        </div>
      </header>
      
      {/* Search and Filters Bar */}
      <div className="search-filters-bar">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={aiSearchEnabled ? "AI Search: Try 'hot leads from tech companies'" : "Search leads..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {voiceSearchActive && (
            <div className="voice-indicator">
              <Volume2 size={16} className="voice-icon" />
              <span>Listening...</span>
            </div>
          )}
          <button 
            className={`ai-toggle ${aiSearchEnabled ? 'active' : ''}`}
            onClick={() => setAiSearchEnabled(!aiSearchEnabled)}
          >
            <Brain size={16} />
            AI Search
          </button>
          <button 
            className="voice-search"
            onClick={() => setVoiceSearchActive(!voiceSearchActive)}
          >
            <Mic size={16} />
          </button>
        </div>
        
        <div className="filter-controls">
          <button 
            className={`filter-button ${showAdvancedFilters ? 'active' : ''}`}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter size={16} />
            Filters
            {showAdvancedFilters && <span className="filter-count">2</span>}
          </button>
          
          <div className="view-toggles">
            <button 
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <BarChart3 size={16} />
            </button>
            <button 
              className={`view-toggle ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
            >
              <Layers size={16} />
            </button>
            <button 
              className={`view-toggle ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <PieChart size={16} />
            </button>
          </div>
          
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score_desc">Score (High to Low)</option>
            <option value="score_asc">Score (Low to High)</option>
            <option value="recent">Most Recent Activity</option>
            <option value="engagement">Engagement Level</option>
            <option value="probability">Conversion Probability</option>
          </select>
          
          <button className="routing-button" onClick={handleLeadRouting}>
            <GitBranch size={16} />
            Lead Routing
          </button>
        </div>
      </div>
      
      {/* Advanced Filters */}
      <AdvancedFilters isOpen={showAdvancedFilters} onApply={console.log} />
      
      {/* Bulk Actions */}
      <BulkActionsBar 
        selectedCount={selectedLeads.size}
        onAction={handleBulkAction}
        onClear={() => setSelectedLeads(new Set())}
      />
      
      {/* Main Content Area */}
      <div className="leads-content">
        {/* AI Insights Sidebar */}
        <AIInsightsPanel leads={filteredLeads} onAction={handleAIAction} />
        
        {/* Leads List */}
        <div className="leads-list-container">
          <div className="list-header">
            <div className="list-title">
              All Leads
              <span className="lead-count">{filteredLeads.length} leads found</span>
            </div>
            
            <div className="list-actions">
              <button className="behavioral-scoring-toggle" onClick={handleBehavioralScoring}>
                <Activity size={16} />
                Behavioral Scoring
              </button>
              <button className="refresh-button" onClick={handleRefresh}>
                <RefreshCw size={16} />
              </button>
              <button className="settings-button" onClick={handleSettings}>
                <Settings size={16} />
              </button>
            </div>
          </div>
          
          {/* Column Headers */}
          <div className="leads-columns">
            <div className="column-header checkbox-column">
              <input
                type="checkbox"
                checked={selectedLeads.size === filteredLeads.length && filteredLeads.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
                  } else {
                    setSelectedLeads(new Set());
                  }
                }}
              />
            </div>
            <div className="column-header lead-column">Lead</div>
            <div className="column-header status-column">Status</div>
            <div className="column-header metrics-column">Metrics</div>
            <div className="column-header assigned-column">Assigned To</div>
            <div className="column-header source-column">Source</div>
            <div className="column-header activity-column">Last Activity</div>
            <div className="column-header actions-column">Actions</div>
          </div>
          
          {/* Leads */}
          <div className="leads-list">
            {filteredLeads.map((lead) => (
              <QuantumLeadCard
                key={lead.id}
                lead={lead}
                isSelected={selectedLeads.has(lead.id)}
                onSelect={handleSelectLead}
                onAction={handleLeadAction}
                showDetails={true}
                showToast={showToast}
              />
            ))}
          </div>
        </div>
        
        {/* Right Sidebar - Lead Intelligence */}
        <div className="lead-intelligence-panel">
          <h3>Lead Intelligence</h3>
          
          <div className="intelligence-section">
            <h4>Conversion Trends</h4>
            <div className="mini-chart">
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={[
                  { day: 'Mon', rate: 22 },
                  { day: 'Tue', rate: 28 },
                  { day: 'Wed', rate: 25 },
                  { day: 'Thu', rate: 32 },
                  { day: 'Fri', rate: 30 },
                  { day: 'Sat', rate: 18 },
                  { day: 'Sun', rate: 15 }
                ]}>
                  <defs>
                    <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(120, 70%, 50%)" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="hsl(120, 70%, 50%)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(120, 70%, 50%)"
                    fill="url(#conversionGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="intelligence-section">
            <h4>Top Performing Sources</h4>
            <div className="source-performance">
              <div className="source-item">
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <span className="source-value">42%</span>
              </div>
              <div className="source-item">
                <Globe size={16} />
                <span>Website</span>
                <span className="source-value">28%</span>
              </div>
              <div className="source-item">
                <Users size={16} />
                <span>Webinar</span>
                <span className="source-value">18%</span>
              </div>
            </div>
          </div>
          
          <div className="intelligence-section">
            <h4>AI Predictions</h4>
            <div className="prediction-cards">
              <div className="prediction-card">
                <TrendingUp size={16} />
                <div>
                  <div className="prediction-value">+23%</div>
                  <div className="prediction-label">Expected conversion lift this week</div>
                </div>
              </div>
              <div className="prediction-card">
                <Clock size={16} />
                <div>
                  <div className="prediction-value">2-3 PM</div>
                  <div className="prediction-label">Best time to contact leads today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .quantum-leads-page {
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

        .quantum-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: quantumGrid 25s linear infinite;
        }

        @keyframes quantumGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .quantum-orbs {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 10% 20%, hsla(270, 70%, 50%, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, hsla(120, 70%, 50%, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 40% 80%, hsla(210, 70%, 50%, 0.06) 0%, transparent 40%);
          animation: orbFloat 30s ease-in-out infinite;
        }

        @keyframes orbFloat {
          0%, 100% { transform: scale(1) translateZ(0); }
          33% { transform: scale(1.1) translateZ(0); }
          66% { transform: scale(0.9) translateZ(0); }
        }

        /* Header */
        .leads-header {
          position: relative;
          z-index: 10;
          padding: 2rem 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          margin: 0 auto;
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
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateX(-2px);
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

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .header-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-button.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-button.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .header-button.primary {
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          color: white;
          box-shadow: 0 4px 12px hsla(270, 70%, 50%, 0.3);
        }

        .header-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px hsla(270, 70%, 50%, 0.4);
        }

        /* Search and Filters Bar */
        .search-filters-bar {
          position: sticky;
          top: 0;
          z-index: 20;
          padding: 1rem 2rem;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .search-input {
          flex: 1;
          padding: 0.875rem 1rem 0.875rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
          box-shadow: 0 0 0 3px hsla(270, 70%, 50%, 0.2);
        }

        .voice-indicator {
          position: absolute;
          right: 200px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 20px;
          font-size: 0.75rem;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .voice-icon {
          color: #ef4444;
          animation: soundWave 1s ease-in-out infinite;
        }

        @keyframes soundWave {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .ai-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ai-toggle.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
          color: hsl(270, 70%, 70%);
        }

        .voice-search {
          width: 40px;
          height: 40px;
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

        .voice-search:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.05);
        }

        /* Filter Controls */
        .filter-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .filter-button:hover,
        .filter-button.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .filter-count {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(270, 70%, 50%);
          border-radius: 9px;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0 4px;
        }

        .view-toggles {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .view-toggle {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-toggle:not(:last-child) {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .view-toggle:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .view-toggle.active {
          background: rgba(139, 92, 246, 0.2);
          color: hsl(270, 70%, 70%);
        }

        .sort-select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .routing-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-left: auto;
        }

        .routing-button:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
          color: hsl(270, 70%, 70%);
        }

        /* Advanced Filters */
        .advanced-filters {
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .filter-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .range-inputs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .range-inputs input {
          width: 80px;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: white;
          font-size: 0.875rem;
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .filter-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .filter-reset {
          padding: 0.75rem 1.5rem;
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-apply {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 8px;
          color: hsl(270, 70%, 70%);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Bulk Actions Bar */
        .bulk-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(139, 92, 246, 0.1);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bulk-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .clear-selection {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .clear-selection:hover {
          color: white;
        }

        .bulk-actions {
          display: flex;
          gap: 0.5rem;
        }

        .bulk-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .bulk-action:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .bulk-action.primary {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          border-color: rgba(139, 92, 246, 0.4);
          color: hsl(270, 70%, 70%);
        }

        /* Main Content Area */
        .leads-content {
          display: grid;
          grid-template-columns: 280px 1fr 320px;
          gap: 1.5rem;
          padding: 1.5rem 2rem;
          max-width: 1800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* AI Insights Panel */
        .ai-insights-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .insights-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .insights-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .insights-icon {
          color: hsl(270, 70%, 60%);
          animation: rotate 4s linear infinite;
        }

        .insights-badge {
          margin-left: auto;
          padding: 0.125rem 0.5rem;
          background: #ff3366;
          border-radius: 4px;
          font-size: 0.625rem;
          font-weight: 700;
          animation: pulse 2s ease-in-out infinite;
        }

        .insights-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .insight-card {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .insight-card:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .insight-card.priority-high {
          border-left: 3px solid hsl(0, 70%, 50%);
        }

        .insight-card.priority-medium {
          border-left: 3px solid hsl(45, 70%, 50%);
        }

        .insight-card.priority-low {
          border-left: 3px solid hsl(210, 70%, 50%);
        }

        .insight-message {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .insight-leads {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .mini-lead {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .mini-avatar {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: hsl(270, 70%, 50%);
          border-radius: 50%;
          font-size: 0.625rem;
          font-weight: 600;
        }

        .insight-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
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

        .insight-action:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-1px);
        }

        /* Leads List Container */
        .leads-list-container {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
        }

        .list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .list-title {
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .lead-count {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
        }

        .list-actions {
          display: flex;
          gap: 0.5rem;
        }

        .behavioral-scoring-toggle,
        .refresh-button,
        .settings-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .behavioral-scoring-toggle:hover,
        .refresh-button:hover,
        .settings-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        /* Column Headers */
        .leads-columns {
          display: grid;
          grid-template-columns: 40px 2.5fr 1fr 1.5fr 1.2fr 1fr 1.2fr 1fr;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.6);
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Lead Card */
        .quantum-lead-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin: 0.5rem 1rem;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quantum-lead-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .quantum-lead-card.selected {
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .lead-main {
          display: grid;
          grid-template-columns: 40px 2.5fr 1fr 1.5fr 1.2fr 1fr 1.2fr 1fr;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
        }

        .lead-select {
          display: flex;
          align-items: center;
        }

        .lead-identity {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .lead-avatar-container {
          position: relative;
        }

        .lead-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .hot-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          font-size: 0.875rem;
          animation: bounce 1s ease-in-out infinite;
        }

        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #10b981;
          border: 2px solid #0a0a0f;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .lead-name-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.125rem;
        }

        .lead-name {
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0;
        }

        .verified-icon {
          color: hsl(120, 70%, 50%);
        }

        .lead-contact {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.125rem;
        }

        .lead-company-info {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lead-tag {
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .lead-metrics {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .metric-item {
          text-align: center;
        }

        .metric-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--urgency-color);
          margin-bottom: 0.125rem;
        }

        .metric-label {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .assigned-user {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .user-avatar {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          font-size: 0.625rem;
          font-weight: 600;
        }

        .unassigned {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .lead-source {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .lead-activity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .lead-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .expand-button {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .expand-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        /* Quick Actions */
        .quick-actions {
          display: flex;
          gap: 0.375rem;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .quantum-lead-card:hover .quick-actions {
          opacity: 1;
        }

        .quick-actions.show-labels {
          gap: 0.5rem;
        }

        .quick-action {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .quick-action:hover {
          background: var(--action-color, rgba(255, 255, 255, 0.1));
          border-color: var(--action-color);
          color: white;
          transform: scale(1.05);
        }

        .action-label {
          font-size: 0.75rem;
          white-space: nowrap;
          max-width: 0;
          overflow: hidden;
          transition: max-width 0.3s ease;
        }

        .show-labels .action-label {
          max-width: 60px;
          margin-left: 0.25rem;
        }

        /* Expanded Content */
        .lead-expanded-content {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          animation: expandDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .expanded-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        /* Score Visualizer */
        .lead-score-visualizer {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .score-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .score-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: hsl(270, 70%, 60%);
        }

        .score-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .conversion-probability {
          text-align: right;
        }

        .probability-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(120, 70%, 50%);
        }

        .probability-label {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .score-recommendation {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
          font-size: 0.8125rem;
          color: hsl(270, 70%, 70%);
          margin-top: 0.5rem;
        }

        /* Lead Timeline */
        .lead-timeline h4 {
          font-size: 0.875rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .timeline-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .timeline-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .timeline-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
        }

        .timeline-title {
          font-size: 0.8125rem;
          margin-bottom: 0.125rem;
        }

        .timeline-time {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Lead Insights */
        .lead-insights h4 {
          font-size: 0.875rem;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .recommendation-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
        }

        .recommendation-title {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.125rem;
        }

        .recommendation-text {
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .recommendation-action {
          margin-left: auto;
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

        .recommendation-action:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-1px);
        }

        /* Lead Intelligence Panel */
        .lead-intelligence-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .lead-intelligence-panel h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .intelligence-section {
          margin-bottom: 2rem;
        }

        .intelligence-section h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .mini-chart {
          margin: -0.5rem;
        }

        .source-performance {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .source-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
        }

        .source-value {
          margin-left: auto;
          font-weight: 600;
          color: hsl(270, 70%, 60%);
        }

        .prediction-cards {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .prediction-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .prediction-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: hsl(120, 70%, 60%);
        }

        .prediction-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Animations */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`quantum-toast toast-${toastMessage.type}`}>
          {toastMessage.type === 'success' && <CheckCircle size={16} />}
          {toastMessage.type === 'info' && <AlertCircle size={16} />}
          {toastMessage.type === 'error' && <AlertCircle size={16} />}
          <span>{toastMessage.message}</span>
        </div>
      )}
      
      {/* Add Lead Modal */}
      {showAddLeadModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowAddLeadModal(false)}>
          <div className="quantum-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><Plus size={24} /> Add New Lead</h3>
              <button className="modal-close" onClick={() => setShowAddLeadModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter lead name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              <div className="form-actions">
                <button className="modal-button secondary" onClick={() => setShowAddLeadModal(false)}>
                  Cancel
                </button>
                <button className="modal-button primary" onClick={() => {
                  showToast('Lead created successfully!', 'success');
                  setShowAddLeadModal(false);
                }}>
                  Create Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Import Modal */}
      {showImportModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="quantum-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><Upload size={24} /> Import Leads</h3>
              <button className="modal-close" onClick={() => setShowImportModal(false)}>
                ×
              </button>
            </div>
            <div className="import-zone">
              <Upload size={48} />
              <h4>Drop your CSV file here</h4>
              <p>or click to browse</p>
              <button className="browse-button">Choose File</button>
            </div>
            <div className="import-info">
              <p>Supported formats: CSV, Excel</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Export Modal */}
      {showExportModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="quantum-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><Download size={24} /> Export Leads</h3>
              <button className="modal-close" onClick={() => setShowExportModal(false)}>
                ×
              </button>
            </div>
            <div className="export-options">
              <button className="export-option" onClick={() => {
                showToast('Exporting as CSV...', 'info');
                setTimeout(() => {
                  showToast('Export completed!', 'success');
                  setShowExportModal(false);
                }, 1500);
              }}>
                <Download size={24} />
                <span>Export as CSV</span>
              </button>
              <button className="export-option" onClick={() => {
                showToast('Exporting as Excel...', 'info');
                setTimeout(() => {
                  showToast('Export completed!', 'success');
                  setShowExportModal(false);
                }, 1500);
              }}>
                <Download size={24} />
                <span>Export as Excel</span>
              </button>
              <button className="export-option" onClick={() => {
                showToast('Generating PDF...', 'info');
                setTimeout(() => {
                  showToast('PDF generated!', 'success');
                  setShowExportModal(false);
                }, 2000);
              }}>
                <Download size={24} />
                <span>Export as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Save View Modal */}
      {showSaveViewModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowSaveViewModal(false)}>
          <div className="quantum-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><Star size={24} /> Save Current View</h3>
              <button className="modal-close" onClick={() => setShowSaveViewModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label>View Name</label>
                <input type="text" placeholder="Enter view name" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Optional description"></textarea>
              </div>
              <div className="save-options">
                <label>
                  <input type="checkbox" defaultChecked />
                  Save current filters
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  Save sort preferences
                </label>
                <label>
                  <input type="checkbox" />
                  Make default view
                </label>
              </div>
              <div className="form-actions">
                <button className="modal-button secondary" onClick={() => setShowSaveViewModal(false)}>
                  Cancel
                </button>
                <button className="modal-button primary" onClick={() => {
                  showToast('View saved successfully!', 'success');
                  setShowSaveViewModal(false);
                }}>
                  Save View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lead Routing Modal */}
      {showRoutingModal && (
        <div className="quantum-modal-overlay" onClick={() => setShowRoutingModal(false)}>
          <div className="quantum-modal-content routing-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><GitBranch size={24} /> Lead Routing Rules</h3>
              <button className="modal-close" onClick={() => setShowRoutingModal(false)}>
                ×
              </button>
            </div>
            <div className="routing-rules">
              <div className="rule-item">
                <div className="rule-header">
                  <h4>High-Value Leads</h4>
                  <span className="rule-status active">Active</span>
                </div>
                <p>Score &gt; 85 → Route to Senior Sales Team</p>
              </div>
              <div className="rule-item">
                <div className="rule-header">
                  <h4>Enterprise Leads</h4>
                  <span className="rule-status active">Active</span>
                </div>
                <p>Company Size &gt; 1000 → Route to Enterprise Team</p>
              </div>
              <div className="rule-item">
                <div className="rule-header">
                  <h4>Technical Leads</h4>
                  <span className="rule-status">Inactive</span>
                </div>
                <p>Title contains "CTO" or "Engineer" → Route to Technical Sales</p>
              </div>
            </div>
            <button className="add-rule-button">
              <Plus size={16} />
              Add New Rule
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        /* Toast Styles */
        .quantum-toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(16, 16, 30, 0.95) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(139, 92, 246, 0.1);
          animation: toastSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10000;
          backdrop-filter: blur(10px);
        }
        
        .quantum-toast.toast-success {
          border-left: 4px solid #10b981;
        }
        
        .quantum-toast.toast-info {
          border-left: 4px solid #3b82f6;
        }
        
        .quantum-toast.toast-error {
          border-left: 4px solid #ef4444;
        }
        
        @keyframes toastSlideIn {
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
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(20px);
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .quantum-modal-content {
          background: linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(16, 16, 30, 0.98) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(139, 92, 246, 0.1),
            inset 0 0 60px rgba(139, 92, 246, 0.05);
          animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .quantum-modal-content::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6, #8b5cf6);
          border-radius: 24px;
          opacity: 0.5;
          z-index: -1;
          animation: modalGlow 3s ease-in-out infinite;
        }
        
        @keyframes modalGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes modalSlideIn {
          from {
            transform: translateY(-50px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .modal-header h3 {
          margin: 0;
          color: white;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
        
        .modal-close {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 2rem;
          line-height: 1;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.3s;
        }
        
        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: rotate(90deg);
        }
        
        /* Form Styles */
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        
        .modal-button {
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }
        
        .modal-button.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-button.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        
        .modal-button.primary {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%);
          color: white;
          border: 1px solid rgba(139, 92, 246, 0.4);
          position: relative;
          overflow: hidden;
        }
        
        .modal-button.primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .modal-button.primary:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
        }
        
        .modal-button.primary:hover::before {
          left: 100%;
        }
        
        /* Import Zone */
        .import-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .import-zone:hover {
          background: rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        .import-zone h4 {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
        }
        
        .import-zone p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .browse-button {
          margin-top: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .browse-button:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
        }
        
        .import-info {
          margin-top: 1rem;
          text-align: center;
        }
        
        .import-info p {
          margin: 0.25rem 0;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }
        
        /* Export Options */
        .export-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        
        .export-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .export-option:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.2);
        }
        
        .export-option span {
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        /* Save Options */
        .save-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }
        
        .save-options label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
        }
        
        .save-options input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        
        /* Routing Modal */
        .routing-modal {
          max-width: 700px;
        }
        
        .routing-rules {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .rule-item {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: all 0.3s;
        }
        
        .rule-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.2);
        }
        
        .rule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .rule-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .rule-status {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .rule-status.active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .rule-item p {
          margin: 0;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .add-rule-button {
          width: 100%;
          padding: 1rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          color: hsl(270, 70%, 70%);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .add-rule-button:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}