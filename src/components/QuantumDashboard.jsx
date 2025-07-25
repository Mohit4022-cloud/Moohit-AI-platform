import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Radio, MessageSquare, TrendingUp, Settings, Sparkles, Phone, Mail, Clock, ChevronRight, Activity, Target, Zap, Brain, Eye, Mic, Command, AlertCircle, CheckCircle, ArrowUp, ArrowDown, TrendingDown, Calendar, Shield, Headphones, Volume2, Keyboard } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Enhanced Quantum Constants
const QUANTUM_CONSTANTS = {
  PHI: 1.618033988749,
  FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  EMOTION_WAVELENGTHS: {
    joy: { hue: 45, saturation: 85, lightness: 60 },
    trust: { hue: 210, saturation: 70, lightness: 55 },
    calm: { hue: 180, saturation: 40, lightness: 70 },
    energy: { hue: 15, saturation: 90, lightness: 55 },
    focus: { hue: 270, saturation: 60, lightness: 50 },
    success: { hue: 120, saturation: 70, lightness: 50 },
    warning: { hue: 35, saturation: 90, lightness: 55 },
    danger: { hue: 0, saturation: 85, lightness: 55 }
  },
  COGNITIVE_STATES: {
    flow: { load: 0.3, description: 'Optimal performance state' },
    focused: { load: 0.5, description: 'High concentration' },
    overwhelmed: { load: 0.8, description: 'Reduce complexity' },
    fatigue: { load: 0.9, description: 'Take a break' }
  }
};

// AI Prediction Engine
class AIInsightEngine {
  constructor() {
    this.patterns = new Map();
    this.predictions = new Map();
  }

  analyzeBehavior(interactions) {
    // Simulate AI analysis
    const timeOfDay = new Date().getHours();
    const isBusinessHours = timeOfDay >= 9 && timeOfDay <= 17;
    const dayOfWeek = new Date().getDay();
    
    return {
      peakTime: isBusinessHours,
      suggestedAction: this.getSuggestedAction(timeOfDay, dayOfWeek),
      predictedLeads: this.predictLeadVolume(timeOfDay),
      anomalies: this.detectAnomalies(interactions),
      opportunities: this.identifyOpportunities(interactions)
    };
  }

  getSuggestedAction(hour, day) {
    if (hour === 9) return { type: 'prepare', message: 'High volume hour ahead. Enable auto-qualification?' };
    if (hour === 12) return { type: 'optimize', message: 'Lunch hour - prioritize quick responses' };
    if (hour === 16) return { type: 'follow-up', message: '5 leads need follow-up before EOD' };
    if (day === 1) return { type: 'weekly', message: 'Review last week\'s conversion patterns' };
    return null;
  }

  predictLeadVolume(hour) {
    const baseVolume = 50;
    const hourlyMultiplier = {
      9: 1.8, 10: 2.2, 11: 2.0, 12: 1.2, 13: 1.4, 14: 1.8, 15: 1.9, 16: 1.5, 17: 1.0
    };
    return Math.round(baseVolume * (hourlyMultiplier[hour] || 0.5));
  }

  detectAnomalies(interactions) {
    // Simulate anomaly detection
    return [
      { type: 'positive', message: 'Response time 40% faster than average' },
      { type: 'attention', message: '3 high-value leads waiting > 5 min' }
    ];
  }

  identifyOpportunities(interactions) {
    return [
      { score: 92, lead: 'Sarah Johnson', reason: 'Multiple site visits + downloaded whitepaper' },
      { score: 87, lead: 'Mike Chen', reason: 'C-level + budget authority confirmed' }
    ];
  }
}

// Enhanced Neuro-Responsive Hook
const useNeuroResponsive = () => {
  const [cognitiveLoad, setCognitiveLoad] = useState(0.4);
  const [emotionalState, setEmotionalState] = useState('focus');
  const [interactionVelocity, setInteractionVelocity] = useState(0);
  const [userContext, setUserContext] = useState({
    timeSpent: 0,
    actionsPerMinute: 0,
    errorRate: 0,
    currentTask: 'monitoring',
    cognitiveState: 'flow'
  });
  
  const aiEngine = useMemo(() => new AIInsightEngine(), []);

  useEffect(() => {
    let startTime = Date.now();
    let actionCount = 0;
    let errorCount = 0;

    const updateContext = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const minutes = timeSpent / 60;
      const apm = minutes > 0 ? Math.round(actionCount / minutes) : 0;
      
      // Determine cognitive state based on metrics
      let cognitiveState = 'flow';
      if (apm > 30) cognitiveState = 'overwhelmed';
      else if (apm < 5 && timeSpent > 300) cognitiveState = 'fatigue';
      else if (apm > 15) cognitiveState = 'focused';
      
      setUserContext({
        timeSpent,
        actionsPerMinute: apm,
        errorRate: actionCount > 0 ? errorCount / actionCount : 0,
        currentTask: 'monitoring',
        cognitiveState
      });
      
      // Adjust cognitive load based on state
      const stateLoad = QUANTUM_CONSTANTS.COGNITIVE_STATES[cognitiveState].load;
      setCognitiveLoad(stateLoad);
    }, 5000);

    const handleAction = (e) => {
      actionCount++;
      if (e.type === 'error') errorCount++;
    };

    window.addEventListener('click', handleAction);
    window.addEventListener('keydown', handleAction);
    window.addEventListener('error', handleAction);

    return () => {
      clearInterval(updateContext);
      window.removeEventListener('click', handleAction);
      window.removeEventListener('keydown', handleAction);
      window.removeEventListener('error', handleAction);
    };
  }, []);

  const adaptiveStyles = useMemo(() => {
    const emotion = QUANTUM_CONSTANTS.EMOTION_WAVELENGTHS[emotionalState] || QUANTUM_CONSTANTS.EMOTION_WAVELENGTHS.focus;
    const isOverloaded = cognitiveLoad > 0.7;
    
    return {
      '--cognitive-load': cognitiveLoad,
      '--primary-hue': emotion.hue,
      '--primary-saturation': `${emotion.saturation}%`,
      '--primary-lightness': `${emotion.lightness}%`,
      '--spacing-unit': `${isOverloaded ? 1.5 : 1}rem`,
      '--animation-speed': `${isOverloaded ? 2 : 1}`,
      '--complexity-level': isOverloaded ? 'simple' : 'full',
      '--font-size-multiplier': isOverloaded ? 1.1 : 1,
      '--contrast-boost': userContext.timeSpent > 3600 ? 1.2 : 1
    };
  }, [cognitiveLoad, emotionalState, userContext]);

  return { 
    cognitiveLoad, 
    emotionalState, 
    interactionVelocity, 
    userContext,
    adaptiveStyles, 
    setEmotionalState,
    aiEngine 
  };
};

// Intelligent Command Palette
const CommandPalette = ({ isOpen, onClose, onCommand }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const commands = [
    { id: 'quick-response', label: 'Enable Quick Response Mode', icon: Zap, shortcut: '⌘Q' },
    { id: 'ai-suggest', label: 'Get AI Suggestions', icon: Brain, shortcut: '⌘S' },
    { id: 'focus-mode', label: 'Enter Focus Mode', icon: Eye, shortcut: '⌘F' },
    { id: 'voice-control', label: 'Start Voice Control', icon: Mic, shortcut: '⌘V' },
    { id: 'auto-qualify', label: 'Auto-Qualify Leads', icon: Target, shortcut: '⌘A' },
    { id: 'break-reminder', label: 'Set Break Reminder', icon: Clock, shortcut: '⌘B' }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onCommand(filteredCommands[selectedIndex]);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="command-search">
          <Command size={16} />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="command-list">
          {filteredCommands.map((cmd, index) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                className={`command-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => {
                  onCommand(cmd);
                  onClose();
                }}
              >
                <Icon size={16} />
                <span>{cmd.label}</span>
                <kbd>{cmd.shortcut}</kbd>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// AI Insight Card Component
const AIInsightCard = ({ insights, onAction }) => {
  const { suggestedAction, anomalies, opportunities } = insights;
  
  return (
    <div className="ai-insight-card quantum-card">
      <div className="insight-header">
        <Brain className="insight-icon" />
        <span>AI Insights</span>
        <span className="insight-badge">LIVE</span>
      </div>
      
      {suggestedAction && (
        <div className="suggested-action">
          <div className="action-content">
            <AlertCircle size={16} />
            <span>{suggestedAction.message}</span>
          </div>
          <button 
            className="action-button"
            onClick={() => onAction(suggestedAction)}
          >
            Enable
          </button>
        </div>
      )}
      
      {anomalies.length > 0 && (
        <div className="anomalies">
          {anomalies.map((anomaly, i) => (
            <div key={i} className={`anomaly-item ${anomaly.type}`}>
              {anomaly.type === 'positive' ? <TrendingUp size={14} /> : <AlertCircle size={14} />}
              <span>{anomaly.message}</span>
            </div>
          ))}
        </div>
      )}
      
      {opportunities.length > 0 && (
        <div className="opportunities">
          <h4>Hot Opportunities</h4>
          {opportunities.map((opp, i) => (
            <div key={i} className="opportunity-item">
              <div className="opportunity-score">{opp.score}%</div>
              <div className="opportunity-details">
                <div className="opportunity-lead">{opp.lead}</div>
                <div className="opportunity-reason">{opp.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Smart Metric Card with Predictions
const SmartMetricCard = ({ icon: Icon, value, label, change, color, trend, prediction, context }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className="smart-metric-card quantum-card"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="metric-main">
        <div className="metric-icon" style={{ backgroundColor: `hsla(${color}, 70%, 50%, 0.1)` }}>
          <Icon size={24} style={{ color: `hsl(${color}, 70%, 50%)` }} />
        </div>
        <div className="metric-content">
          <div className="metric-value">
            {value}
            {prediction && (
              <span className="prediction-indicator">
                {prediction > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              </span>
            )}
          </div>
          <div className="metric-label">{label}</div>
          {change && (
            <div className={`metric-change ${trend}`}>
              {trend === 'up' ? '+' : ''}{change}
            </div>
          )}
        </div>
      </div>
      
      {showDetails && context && (
        <div className="metric-details">
          <div className="detail-item">
            <span className="detail-label">Peak Hour:</span>
            <span className="detail-value">{context.peakHour}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Prediction:</span>
            <span className="detail-value">{context.prediction}</span>
          </div>
          {context.suggestion && (
            <div className="detail-suggestion">
              <Sparkles size={12} />
              {context.suggestion}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Voice Control Component
const VoiceControl = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTranscript('');
    } else {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('Show me today\'s best leads');
        setTimeout(() => {
          onCommand({ type: 'voice', command: 'filter-best-leads' });
          setIsListening(false);
          setTranscript('');
        }, 1000);
      }, 2000);
    }
  };
  
  return (
    <div className={`voice-control ${isListening ? 'listening' : ''}`}>
      <button onClick={toggleListening} className="voice-button">
        {isListening ? <Volume2 size={20} /> : <Mic size={20} />}
      </button>
      {isListening && (
        <div className="voice-feedback">
          <div className="voice-wave">
            <span></span><span></span><span></span><span></span>
          </div>
          {transcript && <div className="voice-transcript">{transcript}</div>}
        </div>
      )}
    </div>
  );
};

// Enhanced Lead Card with AI Scoring
const EnhancedLeadCard = ({ lead, index, aiScore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickActions, setQuickActions] = useState(false);
  
  const getUrgencyColor = (score) => {
    if (score > 85) return 'hsl(120, 70%, 50%)';
    if (score > 70) return 'hsl(45, 90%, 55%)';
    return 'hsl(210, 70%, 50%)';
  };
  
  return (
    <div 
      className={`enhanced-lead-card ${isExpanded ? 'expanded' : ''}`}
      style={{ '--lead-index': index }}
    >
      <div className="lead-primary" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="lead-avatar">
          {lead.initials}
          {aiScore > 85 && <div className="hot-indicator">🔥</div>}
        </div>
        
        <div className="lead-core">
          <div className="lead-header">
            <div className="lead-name">{lead.name}</div>
            {aiScore && (
              <div 
                className="ai-score"
                style={{ backgroundColor: `${getUrgencyColor(aiScore)}20`, color: getUrgencyColor(aiScore) }}
              >
                <Brain size={12} />
                {aiScore}%
              </div>
            )}
          </div>
          <div className="lead-company">{lead.company}</div>
          <div className="lead-context">
            {lead.context}
          </div>
        </div>
        
        <div className="lead-actions">
          <button 
            className="quick-action-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setQuickActions(!quickActions);
            }}
          >
            <Zap size={16} />
          </button>
          {quickActions && (
            <div className="quick-actions">
              <button className="quick-action" title="Call">
                <Phone size={14} />
              </button>
              <button className="quick-action" title="Email">
                <Mail size={14} />
              </button>
              <button className="quick-action" title="Chat">
                <MessageSquare size={14} />
              </button>
            </div>
          )}
        </div>
        
        <div className="lead-metadata">
          <span className="lead-time">{lead.time}</span>
          <span className="lead-channel">{lead.channel}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="lead-expanded">
          <div className="lead-timeline">
            <div className="timeline-item">
              <Clock size={12} />
              <span>Visited pricing page 3 times</span>
              <span className="timeline-time">2h ago</span>
            </div>
            <div className="timeline-item">
              <Activity size={12} />
              <span>Downloaded comparison guide</span>
              <span className="timeline-time">1d ago</span>
            </div>
            <div className="timeline-item">
              <MessageSquare size={12} />
              <span>Engaged with chatbot</span>
              <span className="timeline-time">3d ago</span>
            </div>
          </div>
          <div className="lead-actions-bar">
            <button className="primary-action">
              <Phone size={14} />
              Call Now
            </button>
            <button className="secondary-action">
              <Calendar size={14} />
              Schedule
            </button>
            <button className="secondary-action">
              <Shield size={14} />
              Qualify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Cognitive Load Indicator
const CognitiveLoadIndicator = ({ load, state }) => {
  const stateInfo = QUANTUM_CONSTANTS.COGNITIVE_STATES[state];
  
  return (
    <div className="cognitive-indicator">
      <div className="cognitive-bar">
        <div 
          className="cognitive-fill"
          style={{ 
            width: `${load * 100}%`,
            backgroundColor: load > 0.7 ? 'hsl(0, 70%, 50%)' : load > 0.5 ? 'hsl(45, 70%, 50%)' : 'hsl(120, 70%, 50%)'
          }}
        />
      </div>
      <div className="cognitive-label">
        <Brain size={14} />
        <span>{stateInfo.description}</span>
      </div>
    </div>
  );
};

// Main Enhanced Dashboard
export default function QuantumDashboard() {
  const navigate = useNavigate();
  const { cognitiveLoad, emotionalState, userContext, adaptiveStyles, setEmotionalState, aiEngine } = useNeuroResponsive();
  const [selectedNav, setSelectedNav] = useState('dashboard');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setCommandPaletteOpen(true);
        } else if (e.key === 'f') {
          e.preventDefault();
          setFocusMode(!focusMode);
        } else if (e.key === 'v') {
          e.preventDefault();
          setVoiceEnabled(!voiceEnabled);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode, voiceEnabled]);
  
  // Generate AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      const insights = aiEngine.analyzeBehavior([]);
      setAiInsights(insights);
    }, 10000);
    
    // Initial insights
    setAiInsights(aiEngine.analyzeBehavior([]));
    
    return () => clearInterval(interval);
  }, [aiEngine]);
  
  // Enhanced response data with predictions
  const responseData = [
    { time: '9am', value: 35, predicted: 38 },
    { time: '10am', value: 45, predicted: 48 },
    { time: '11am', value: 42, predicted: 44 },
    { time: '12pm', value: 38, predicted: 35 },
    { time: '1pm', value: 48, predicted: 50 },
    { time: '2pm', value: 52, predicted: 55 },
    { time: '3pm', value: 46, predicted: 48 },
    { time: '4pm', value: null, predicted: 42 },
    { time: '5pm', value: null, predicted: 35 }
  ];
  
  // Enhanced leads with AI scoring
  const enhancedLeads = [
    { 
      id: 1, 
      initials: 'SJ', 
      name: 'Sarah Johnson', 
      company: 'TechCorp',
      status: 'QUALIFYING',
      channel: 'voice',
      time: '2m ago',
      aiScore: 92,
      context: 'Multiple site visits • Downloaded whitepaper'
    },
    { 
      id: 2, 
      initials: 'MC', 
      name: 'Mike Chen', 
      company: 'StartupXYZ',
      status: 'CONTACTED',
      channel: 'chat',
      time: '5m ago',
      aiScore: 87,
      context: 'C-level executive • Budget confirmed'
    },
    { 
      id: 3, 
      initials: 'ED', 
      name: 'Emily Davis', 
      company: 'Enterprise Co',
      status: 'NEW',
      channel: 'email',
      time: '8m ago',
      aiScore: 73,
      context: 'First interaction • High company value'
    }
  ];
  
  const handleCommand = (command) => {
    console.log('Executing command:', command);
    // Handle different commands
    if (command.id === 'focus-mode') {
      setFocusMode(true);
    } else if (command.id === 'voice-control') {
      setVoiceEnabled(true);
    }
  };
  
  const handleVoiceCommand = (command) => {
    console.log('Voice command:', command);
  };
  
  const handleAIAction = (action) => {
    console.log('AI action:', action);
  };
  
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3, badge: null },
    { id: 'leads', label: 'LEADS', icon: Users, badge: '23' },
    { id: 'queue', label: 'LIVE QUEUE', icon: Radio, badge: '5' },
    { id: 'conversations', label: 'CONVERSATIONS', icon: MessageSquare, badge: null },
    { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp, badge: null },
    { id: 'campaigns', label: 'CAMPAIGNS', icon: Target, badge: null },
    { id: 'settings', label: 'SETTINGS', icon: Settings, badge: null }
  ];

  return (
    <div className={`quantum-dashboard ${focusMode ? 'focus-mode' : ''}`} style={adaptiveStyles}>
      {/* Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onCommand={handleCommand}
      />
      
      {/* Quantum Background */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-particles"></div>
      </div>
      
      {/* Sidebar */}
      <aside className="quantum-sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">
            <Sparkles className="brand-icon" />
            <span>Mohit AI</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${selectedNav === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNav(item.id);
                  if (item.id === 'leads') {
                    navigate('/leads');
                  }
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <CognitiveLoadIndicator load={cognitiveLoad} state={userContext.cognitiveState} />
          
          <button className="quantum-button quantum-button--secondary">
            <Sparkles />
            Try AI
            <span className="live-indicator">LIVE</span>
          </button>
          
          <div className="system-status">
            <div className="status-indicator active"></div>
            <div>
              <div className="status-label">System Status</div>
              <div className="status-value">All systems active</div>
              <div className="status-meta">
                Response: 47s • APM: {userContext.actionsPerMinute}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="quantum-main">
        <header className="main-header">
          <div className="search-container">
            <Command size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search or press ⌘K for commands..."
              className="quantum-search"
              onFocus={() => setCommandPaletteOpen(true)}
            />
          </div>
          
          <div className="header-actions">
            {voiceEnabled && <VoiceControl onCommand={handleVoiceCommand} />}
            
            <button className="icon-button" title="Keyboard Shortcuts">
              <Keyboard size={20} />
            </button>
            
            <button className="icon-button notification-button">
              <Activity size={20} />
              <span className="notification-dot"></span>
            </button>
            
            <div className="user-menu">
              <div className="user-avatar">MA</div>
              <div className="user-status">
                <div className="status-dot"></div>
                <span>Active</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* AI Insights Bar */}
          {aiInsights && !focusMode && (
            <AIInsightCard insights={aiInsights} onAction={handleAIAction} />
          )}
          
          <section className="performance-section">
            <div className="section-header-enhanced">
              <div>
                <h1 className="section-title">Performance Dashboard</h1>
                <p className="section-subtitle">
                  Real-time lead analytics with AI predictions
                  {aiInsights?.predictedLeads && (
                    <span className="prediction-badge">
                      <TrendingUp size={12} />
                      {aiInsights.predictedLeads} leads expected next hour
                    </span>
                  )}
                </p>
              </div>
              <div className="header-controls">
                <button className="control-button">
                  <Calendar size={16} />
                  Today
                </button>
                <button className="control-button primary">
                  <Zap size={16} />
                  Quick Actions
                </button>
              </div>
            </div>

            <div className="metrics-grid">
              <SmartMetricCard
                icon={Clock}
                value="47s"
                label="AVG RESPONSE TIME"
                change="-23% vs last week"
                color={45}
                trend="down"
                prediction={-5}
                context={{
                  peakHour: '10-11 AM',
                  prediction: '42s by EOD',
                  suggestion: 'Enable auto-response for FAQs'
                }}
              />
              <SmartMetricCard
                icon={Users}
                value="1,234"
                label="LEADS CONTACTED"
                change="+12% this month"
                color={210}
                trend="up"
                prediction={8}
                context={{
                  peakHour: '2-3 PM',
                  prediction: '+47 today',
                  suggestion: 'Prepare for afternoon surge'
                }}
              />
              <SmartMetricCard
                icon={Target}
                value="68%"
                label="QUALIFICATION RATE"
                change="+5% qualified leads"
                color={120}
                trend="up"
                prediction={2}
                context={{
                  peakHour: 'Consistent',
                  prediction: '70% possible',
                  suggestion: 'Focus on tech industry leads'
                }}
              />
              <SmartMetricCard
                icon={TrendingUp}
                value="24%"
                label="CONVERSION RATE"
                change="+8% to opportunities"
                color={15}
                trend="up"
                prediction={3}
                context={{
                  peakHour: '11 AM',
                  prediction: 'Trending up',
                  suggestion: 'Follow up on yesterday\'s calls'
                }}
              />
            </div>
          </section>

          <div className="analytics-grid">
            {/* Enhanced Response Metrics with Predictions */}
            <div className="quantum-card response-metrics-card">
              <div className="card-header">
                <h3>Response Metrics</h3>
                <span className="card-subtitle">Real-time & predicted</span>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={responseData}>
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="hsl(210, 70%, 50%)"
                      fill="url(#predictedGradient)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(270, 70%, 50%)"
                      fill="url(#actualGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot actual"></span>
                  <span>Actual</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot predicted"></span>
                  <span>AI Predicted</span>
                </div>
              </div>
            </div>

            {/* Team Performance Radar */}
            <div className="quantum-card team-performance-card">
              <div className="card-header">
                <h3>Team Performance</h3>
                <span className="card-subtitle">Multi-dimensional analysis</span>
              </div>
              <div className="radar-container">
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={[
                    { metric: 'Speed', value: 85, benchmark: 70 },
                    { metric: 'Quality', value: 92, benchmark: 80 },
                    { metric: 'Volume', value: 78, benchmark: 75 },
                    { metric: 'Conversion', value: 88, benchmark: 65 },
                    { metric: 'Satisfaction', value: 94, benchmark: 85 }
                  ]}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.3)" />
                    <Radar name="Current" dataKey="value" stroke="hsl(270, 70%, 50%)" fill="hsl(270, 70%, 50%)" fillOpacity={0.6} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke="hsl(45, 70%, 50%)" fill="hsl(45, 70%, 50%)" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="performance-insights">
                <div className="insight-pill positive">
                  <CheckCircle size={12} />
                  Exceeding in Quality & Satisfaction
                </div>
                <div className="insight-pill warning">
                  <AlertCircle size={12} />
                  Volume below target
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Leads Section */}
          <section className="leads-section">
            <div className="section-header">
              <h3>Priority Lead Queue</h3>
              <span className="section-subtitle">AI-ranked by conversion probability</span>
              <div className="section-actions">
                <button className="filter-button">
                  <Headphones size={16} />
                  Available to Call
                </button>
                <button className="filter-button active">
                  <Zap size={16} />
                  Hot Leads
                </button>
                <button className="view-all-btn">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="leads-container">
              {enhancedLeads.map((lead, index) => (
                <EnhancedLeadCard 
                  key={lead.id} 
                  lead={lead} 
                  index={index}
                  aiScore={lead.aiScore}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .quantum-dashboard {
          display: flex;
          height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
          font-size: calc(14px * var(--font-size-multiplier, 1));
        }

        /* Quantum Background Effects */
        .quantum-background {
          position: absolute;
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
          animation: quantumGrid 20s linear infinite;
        }

        @keyframes quantumGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .quantum-particles {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, hsla(270, 70%, 50%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsla(210, 70%, 50%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, hsla(120, 70%, 50%, 0.05) 0%, transparent 50%);
          animation: quantumFloat 30s ease-in-out infinite;
        }

        @keyframes quantumFloat {
          0%, 100% { transform: rotate(0deg) scale(1) translateZ(0); }
          25% { transform: rotate(90deg) scale(1.1) translateZ(0); }
          50% { transform: rotate(180deg) scale(1) translateZ(0); }
          75% { transform: rotate(270deg) scale(1.1) translateZ(0); }
        }

        /* Focus Mode */
        .focus-mode .quantum-grid,
        .focus-mode .quantum-particles {
          opacity: 0.3;
        }

        .focus-mode .quantum-card {
          border-color: rgba(255, 255, 255, 0.05);
        }

        .focus-mode .ai-insight-card,
        .focus-mode .nav-badge {
          display: none;
        }

        /* Command Palette */
        .command-palette-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 20vh;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .command-palette {
          width: 90%;
          max-width: 600px;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .command-search {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .command-search input {
          flex: 1;
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          outline: none;
        }

        .command-search input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .command-list {
          max-height: 400px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .command-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.9);
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .command-item:hover,
        .command-item.selected {
          background: rgba(139, 92, 246, 0.2);
          color: white;
        }

        .command-item kbd {
          margin-left: auto;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.75rem;
          font-family: monospace;
        }

        /* AI Insights Card */
        .ai-insight-card {
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.3);
          animation: pulseGlow 4s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.4); }
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .insight-icon {
          color: hsl(270, 70%, 60%);
          animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .insight-badge {
          margin-left: auto;
          padding: 0.125rem 0.5rem;
          background: #ff3366;
          border-radius: 4px;
          font-size: 0.625rem;
          font-weight: 700;
          animation: livePulse 2s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .suggested-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .action-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: hsl(45, 70%, 60%);
        }

        .action-button {
          padding: 0.5rem 1rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 6px;
          color: hsl(270, 70%, 70%);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-button:hover {
          background: rgba(139, 92, 246, 0.3);
          transform: translateY(-1px);
        }

        .anomalies {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .anomaly-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          font-size: 0.875rem;
        }

        .anomaly-item.positive {
          color: hsl(120, 70%, 60%);
        }

        .anomaly-item.attention {
          color: hsl(45, 70%, 60%);
        }

        .opportunities h4 {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .opportunity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          transition: all 0.2s ease;
        }

        .opportunity-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .opportunity-score {
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(120, 70%, 60%);
          min-width: 60px;
        }

        .opportunity-lead {
          font-weight: 600;
          margin-bottom: 0.125rem;
        }

        .opportunity-reason {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Enhanced Sidebar */
        .quantum-sidebar {
          width: 260px;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .brand-icon {
          color: hsl(270, 70%, 50%);
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          50% { transform: scale(1.1) rotate(180deg); filter: brightness(1.2); }
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: hsl(270, 70%, 50%);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .nav-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-item:hover::after {
          transform: translateX(100%);
        }

        .nav-item.active {
          color: #ffffff;
          background: rgba(139, 92, 246, 0.1);
        }

        .nav-item.active::before {
          transform: translateX(0);
        }

        .nav-badge {
          margin-left: auto;
          padding: 0.125rem 0.5rem;
          background: rgba(139, 92, 246, 0.3);
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Cognitive Load Indicator */
        .cognitive-indicator {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .cognitive-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .cognitive-fill {
          height: 100%;
          transition: all 0.6s ease;
          border-radius: 2px;
        }

        .cognitive-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Enhanced Main Content */
        .quantum-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .main-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }

        .search-container {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .quantum-search {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quantum-search::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .quantum-search:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
          box-shadow: 0 0 0 3px hsla(270, 70%, 50%, 0.2);
        }

        /* Voice Control */
        .voice-control {
          position: relative;
        }

        .voice-button {
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

        .voice-control.listening .voice-button {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
          animation: voicePulse 1.5s ease-in-out infinite;
        }

        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }

        .voice-feedback {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          padding: 1rem;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          min-width: 200px;
          animation: slideDown 0.3s ease;
        }

        .voice-wave {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 30px;
          margin-bottom: 0.5rem;
        }

        .voice-wave span {
          display: block;
          width: 3px;
          height: 100%;
          background: hsl(270, 70%, 50%);
          border-radius: 3px;
          animation: wave 1s ease-in-out infinite;
        }

        .voice-wave span:nth-child(2) { animation-delay: 0.1s; }
        .voice-wave span:nth-child(3) { animation-delay: 0.2s; }
        .voice-wave span:nth-child(4) { animation-delay: 0.3s; }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }

        .voice-transcript {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-button {
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
          position: relative;
        }

        .icon-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .notification-button {
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #0a0a0f;
          animation: notificationPulse 2s ease-in-out infinite;
        }

        @keyframes notificationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .user-menu:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        /* Dashboard Content */
        .dashboard-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        /* Enhanced Section Headers */
        .section-header-enhanced {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .prediction-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: hsl(270, 70%, 70%);
        }

        .header-controls {
          display: flex;
          gap: 0.75rem;
        }

        .control-button {
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
          transition: all 0.3s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .control-button.primary {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          border-color: rgba(139, 92, 246, 0.4);
          color: hsl(270, 70%, 70%);
        }

        .control-button.primary:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
        }

        /* Smart Metric Cards */
        .smart-metric-card {
          position: relative;
          overflow: visible;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .smart-metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
        }

        .metric-main {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .prediction-indicator {
          display: inline-flex;
          margin-left: 0.5rem;
          color: hsl(120, 70%, 50%);
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .metric-details {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.5rem;
          padding: 1rem;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
        }

        .detail-label {
          color: rgba(255, 255, 255, 0.6);
        }

        .detail-value {
          font-weight: 600;
        }

        .detail-suggestion {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          margin-top: 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
          font-size: 0.75rem;
          color: hsl(270, 70%, 70%);
        }

        /* Enhanced Analytics Grid */
        .analytics-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .response-metrics-card {
          position: relative;
        }

        .chart-legend {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-dot.actual {
          background: hsl(270, 70%, 50%);
        }

        .legend-dot.predicted {
          background: hsl(210, 70%, 50%);
          opacity: 0.6;
        }

        /* Team Performance Radar */
        .team-performance-card {
          position: relative;
        }

        .radar-container {
          margin: -1rem;
        }

        .performance-insights {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .insight-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .insight-pill.positive {
          color: hsl(120, 70%, 60%);
          border: 1px solid hsla(120, 70%, 60%, 0.3);
        }

        .insight-pill.warning {
          color: hsl(45, 70%, 60%);
          border: 1px solid hsla(45, 70%, 60%, 0.3);
        }

        /* Enhanced Leads Section */
        .leads-section {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-actions {
          display: flex;
          gap: 0.5rem;
          margin-left: auto;
        }

        .filter-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-button:hover,
        .filter-button.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
          color: white;
        }

        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          color: hsl(270, 70%, 60%);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          transform: translateX(4px);
        }

        .leads-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Enhanced Lead Cards */
        .enhanced-lead-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: calc(var(--lead-index) * 100ms);
        }

        .enhanced-lead-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateX(4px);
        }

        .enhanced-lead-card.expanded {
          background: rgba(255, 255, 255, 0.05);
        }

        .lead-primary {
          display: flex;
          align-items: center;
          padding: 1.25rem;
          cursor: pointer;
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
          margin-right: 1rem;
          position: relative;
        }

        .hot-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          font-size: 1rem;
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .lead-core {
          flex: 1;
        }

        .lead-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .lead-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .ai-score {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .lead-company {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.25rem;
        }

        .lead-context {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .lead-actions {
          position: relative;
          margin-right: 1rem;
        }

        .quick-action-trigger {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 8px;
          color: hsl(270, 70%, 60%);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-action-trigger:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: scale(1.05);
        }

        .quick-actions {
          position: absolute;
          top: 0;
          right: 100%;
          margin-right: 0.5rem;
          display: flex;
          gap: 0.5rem;
          padding: 0.25rem;
          background: rgba(20, 20, 30, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          animation: slideLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .quick-action {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-action:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: scale(1.1);
        }

        .lead-metadata {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .lead-expanded {
          padding: 0 1.25rem 1.25rem;
          animation: expandDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 200px; }
        }

        .lead-timeline {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .timeline-time {
          margin-left: auto;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .lead-actions-bar {
          display: flex;
          gap: 0.5rem;
        }

        .primary-action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 8px;
          color: hsl(270, 70%, 70%);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .primary-action:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .secondary-action {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-action:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        /* Quantum Card Base */
        .quantum-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quantum-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* Quantum Button Base */
        .quantum-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quantum-button--secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
        }

        /* System Status */
        .system-status {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 0.25rem;
        }

        .status-indicator.active {
          background: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.1); }
        }

        .status-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .status-value {
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.125rem;
        }

        .status-meta {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.25rem;
        }

        /* Scrollbar Styling */
        .dashboard-content::-webkit-scrollbar {
          width: 8px;
        }

        .dashboard-content::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        .dashboard-content::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .dashboard-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 1400px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1200px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .quantum-sidebar {
            transform: translateX(-100%);
          }
          
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .section-header-enhanced {
            flex-direction: column;
            gap: 1rem;
          }
          
          .header-controls {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}