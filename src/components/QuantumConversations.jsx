import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Phone, Mail, Search, Plus, Filter, ChevronRight, ChevronDown,
  Brain, Sparkles, Activity, TrendingUp, Clock, Users, Star, Award, Target,
  Mic, Volume2, Eye, EyeOff, RefreshCw, Settings, Download, Upload, Share2,
  Zap, AlertCircle, CheckCircle, Info, User, Building, Calendar, Hash,
  BarChart3, PieChart, Shield, Headphones, Video, Send, ThumbsUp, ThumbsDown,
  Heart, Smile, Frown, Meh, ArrowUp, ArrowDown, GitBranch, Layers, Command,
  FileText, Link, Globe, Linkedin, Twitter, MessageCircle, PhoneCall,
  Bot, Gauge, Lightbulb, BookOpen, Flag, Timer, Repeat, Archive
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, 
  Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter, ScatterChart
} from 'recharts';

// Quantum Constants
const QUANTUM_CONSTANTS = {
  PHI: 1.618033988749,
  CONVERSATION_STATES: {
    active: { color: 'hsl(120, 70%, 50%)', icon: MessageCircle, label: 'Active' },
    pending: { color: 'hsl(45, 85%, 55%)', icon: Clock, label: 'Pending' },
    resolved: { color: 'hsl(210, 70%, 50%)', icon: CheckCircle, label: 'Resolved' },
    escalated: { color: 'hsl(0, 85%, 55%)', icon: AlertCircle, label: 'Escalated' },
    archived: { color: 'hsl(0, 0%, 50%)', icon: Archive, label: 'Archived' }
  },
  SENTIMENT_LEVELS: {
    positive: { color: 'hsl(120, 70%, 50%)', icon: Smile, label: 'Positive' },
    neutral: { color: 'hsl(210, 70%, 50%)', icon: Meh, label: 'Neutral' },
    negative: { color: 'hsl(0, 85%, 55%)', icon: Frown, label: 'Negative' },
    mixed: { color: 'hsl(45, 85%, 55%)', icon: Activity, label: 'Mixed' }
  },
  QUALITY_THRESHOLDS: {
    excellent: { min: 90, color: 'hsl(120, 70%, 50%)' },
    good: { min: 70, color: 'hsl(210, 70%, 50%)' },
    fair: { min: 50, color: 'hsl(45, 85%, 55%)' },
    poor: { min: 0, color: 'hsl(0, 85%, 55%)' }
  }
};

// AI Conversation Analysis Engine
class ConversationIntelligenceEngine {
  constructor() {
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.patternRecognizer = new PatternRecognizer();
    this.responsePredictor = new ResponsePredictor();
  }

  analyzeConversation(conversation) {
    const analysis = {
      sentiment: this.analyzeSentiment(conversation),
      quality: this.calculateQualityScore(conversation),
      risk: this.assessRisk(conversation),
      nextBestAction: this.predictNextAction(conversation),
      suggestions: this.generateSuggestions(conversation),
      keywords: this.extractKeywords(conversation),
      emotionalJourney: this.mapEmotionalJourney(conversation),
      predictedOutcome: this.predictOutcome(conversation)
    };

    return analysis;
  }

  analyzeSentiment(conversation) {
    // Simulate sentiment analysis
    const messages = conversation.messages || [];
    const sentiments = messages.map(msg => ({
      score: Math.random() * 2 - 1, // -1 to 1
      magnitude: Math.random()
    }));

    const avgSentiment = sentiments.reduce((acc, s) => acc + s.score, 0) / sentiments.length;
    
    if (avgSentiment > 0.3) return 'positive';
    if (avgSentiment < -0.3) return 'negative';
    if (sentiments.some(s => s.score > 0.5) && sentiments.some(s => s.score < -0.5)) return 'mixed';
    return 'neutral';
  }

  calculateQualityScore(conversation) {
    const factors = {
      responseTime: this.getResponseTimeScore(conversation),
      resolution: this.getResolutionScore(conversation),
      customerSatisfaction: this.getCustomerSatisfactionScore(conversation),
      agentPerformance: this.getAgentPerformanceScore(conversation),
      clarity: this.getClarityScore(conversation)
    };

    const weights = {
      responseTime: 0.2,
      resolution: 0.3,
      customerSatisfaction: 0.25,
      agentPerformance: 0.15,
      clarity: 0.1
    };

    const qualityScore = Object.entries(factors).reduce((acc, [key, value]) => 
      acc + (value * weights[key]), 0
    );

    return Math.round(qualityScore * 100);
  }

  getResponseTimeScore(conversation) {
    const avgResponseTime = conversation.avgResponseTime || 30; // seconds
    if (avgResponseTime < 30) return 1;
    if (avgResponseTime < 60) return 0.8;
    if (avgResponseTime < 120) return 0.6;
    if (avgResponseTime < 300) return 0.4;
    return 0.2;
  }

  getResolutionScore(conversation) {
    if (conversation.status === 'resolved') return 1;
    if (conversation.status === 'active' && conversation.duration < 10) return 0.7;
    if (conversation.status === 'pending') return 0.5;
    return 0.3;
  }

  getCustomerSatisfactionScore(conversation) {
    // Simulate based on sentiment and keywords
    const sentiment = this.analyzeSentiment(conversation);
    const positiveKeywords = ['thank you', 'great', 'excellent', 'perfect', 'amazing'];
    const negativeKeywords = ['problem', 'issue', 'frustrated', 'disappointed', 'angry'];
    
    let score = 0.5;
    if (sentiment === 'positive') score += 0.3;
    if (sentiment === 'negative') score -= 0.3;
    
    // Check for keywords in messages
    const hasPositive = conversation.lastMessage?.toLowerCase().match(
      new RegExp(positiveKeywords.join('|'))
    );
    const hasNegative = conversation.lastMessage?.toLowerCase().match(
      new RegExp(negativeKeywords.join('|'))
    );
    
    if (hasPositive) score += 0.2;
    if (hasNegative) score -= 0.2;
    
    return Math.max(0, Math.min(1, score));
  }

  getAgentPerformanceScore(conversation) {
    // Simulate agent performance metrics
    return 0.75 + Math.random() * 0.25;
  }

  getClarityScore(conversation) {
    // Simulate message clarity analysis
    return 0.7 + Math.random() * 0.3;
  }

  assessRisk(conversation) {
    const riskFactors = {
      sentiment: this.analyzeSentiment(conversation) === 'negative' ? 0.3 : 0,
      duration: conversation.duration > 30 ? 0.2 : 0,
      escalation: conversation.status === 'escalated' ? 0.4 : 0,
      customerValue: conversation.customerValue === 'high' ? 0.1 : 0
    };

    const riskScore = Object.values(riskFactors).reduce((acc, val) => acc + val, 0);

    if (riskScore > 0.6) return 'high';
    if (riskScore > 0.3) return 'medium';
    return 'low';
  }

  predictNextAction(conversation) {
    const sentiment = this.analyzeSentiment(conversation);
    const risk = this.assessRisk(conversation);
    
    if (risk === 'high') {
      return { action: 'escalate_to_manager', confidence: 0.85 };
    }
    if (sentiment === 'negative') {
      return { action: 'offer_compensation', confidence: 0.7 };
    }
    if (conversation.status === 'pending' && conversation.duration > 10) {
      return { action: 'follow_up', confidence: 0.9 };
    }
    return { action: 'continue_monitoring', confidence: 0.6 };
  }

  generateSuggestions(conversation) {
    const sentiment = this.analyzeSentiment(conversation);
    const context = conversation.context || 'general';
    
    const suggestions = [
      {
        type: 'response',
        text: this.generateResponseSuggestion(sentiment, context),
        confidence: 0.85 + Math.random() * 0.15
      },
      {
        type: 'action',
        text: this.generateActionSuggestion(conversation),
        confidence: 0.8 + Math.random() * 0.2
      },
      {
        type: 'resource',
        text: 'Share product documentation link',
        confidence: 0.75
      }
    ];

    return suggestions;
  }

  generateResponseSuggestion(sentiment, context) {
    const responses = {
      positive: "I'm glad to hear you're having a great experience! Is there anything else I can help you with?",
      negative: "I understand your frustration and I'm here to help resolve this issue as quickly as possible.",
      neutral: "Thank you for reaching out. I'm here to assist you with any questions or concerns."
    };
    
    return responses[sentiment] || responses.neutral;
  }

  generateActionSuggestion(conversation) {
    if (conversation.duration > 20) {
      return 'Consider scheduling a call to resolve this more efficiently';
    }
    if (conversation.messages?.length > 10) {
      return 'Summarize the conversation and confirm next steps';
    }
    return 'Continue providing excellent support';
  }

  extractKeywords(conversation) {
    // Simulate keyword extraction
    const commonKeywords = [
      'product', 'feature', 'pricing', 'support', 'issue', 
      'help', 'account', 'billing', 'technical', 'upgrade'
    ];
    
    const selectedKeywords = commonKeywords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 3));
    
    return selectedKeywords.map(keyword => ({
      word: keyword,
      relevance: 0.6 + Math.random() * 0.4
    }));
  }

  mapEmotionalJourney(conversation) {
    // Simulate emotional journey mapping
    const points = Array.from({ length: 8 }, (_, i) => ({
      time: i,
      sentiment: Math.sin(i * 0.5) * 0.5 + Math.random() * 0.3
    }));
    
    return points;
  }

  predictOutcome(conversation) {
    const quality = this.calculateQualityScore(conversation);
    const sentiment = this.analyzeSentiment(conversation);
    
    if (quality > 80 && sentiment === 'positive') {
      return { outcome: 'positive_resolution', probability: 0.9 };
    }
    if (quality < 50 || sentiment === 'negative') {
      return { outcome: 'escalation_needed', probability: 0.7 };
    }
    return { outcome: 'standard_resolution', probability: 0.8 };
  }
}

// Helper classes (simplified)
class SentimentAnalyzer {
  analyze(text) {
    return { score: Math.random() * 2 - 1, magnitude: Math.random() };
  }
}

class PatternRecognizer {
  recognize(messages) {
    return ['greeting', 'inquiry', 'complaint', 'resolution'];
  }
}

class ResponsePredictor {
  predict(context) {
    return { response: 'Predicted response', confidence: 0.85 };
  }
}

// Conversation Quality Indicator
const QualityIndicator = ({ quality }) => {
  const getQualityConfig = (score) => {
    for (const [key, config] of Object.entries(QUANTUM_CONSTANTS.QUALITY_THRESHOLDS)) {
      if (score >= config.min) {
        return { ...config, label: key };
      }
    }
    return QUANTUM_CONSTANTS.QUALITY_THRESHOLDS.poor;
  };

  const config = getQualityConfig(quality);
  
  return (
    <div className="quality-indicator">
      <div className="quality-ring">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke={config.color}
            strokeWidth="2"
            strokeDasharray={`${(quality / 100) * 113} 113`}
            transform="rotate(-90 20 20)"
            style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className="quality-value">{quality}%</div>
      </div>
      <div className="quality-label">{config.label}</div>
    </div>
  );
};

// Enhanced Conversation Card
const ConversationCard = ({ conversation, analysis, isSelected, onSelect, onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = QUANTUM_CONSTANTS.CONVERSATION_STATES[conversation.status] || 
    QUANTUM_CONSTANTS.CONVERSATION_STATES.active;
  const sentimentConfig = QUANTUM_CONSTANTS.SENTIMENT_LEVELS[analysis.sentiment];
  const StatusIcon = statusConfig.icon;
  const SentimentIcon = sentimentConfig.icon;

  const getChannelIcon = (channel) => {
    const icons = {
      phone: Phone,
      email: Mail,
      chat: MessageSquare,
      video: Video,
      social: Globe
    };
    return icons[channel] || MessageSquare;
  };

  const ChannelIcon = getChannelIcon(conversation.channel);

  return (
    <div 
      className={`conversation-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(conversation.id)}
    >
      <div className="card-header">
        <div className="customer-info">
          <div className="customer-avatar">
            {conversation.customerInitials}
            {conversation.isOnline && <span className="online-indicator"></span>}
          </div>
          <div className="customer-details">
            <h3 className="customer-name">{conversation.customerName}</h3>
            <div className="company-info">
              <Building size={12} />
              <span>{conversation.company}</span>
            </div>
          </div>
        </div>

        <div className="conversation-meta">
          <div className="status-badge" style={{ backgroundColor: `${statusConfig.color}20`, color: statusConfig.color }}>
            <StatusIcon size={12} />
            <span>{statusConfig.label}</span>
          </div>
          <div className="time-info">
            <Clock size={12} />
            <span>{conversation.lastUpdate}</span>
          </div>
        </div>
      </div>

      <div className="card-content">
        <div className="message-preview">
          <p>{conversation.lastMessage}</p>
        </div>

        <div className="conversation-metrics">
          <div className="metric-item">
            <ChannelIcon size={14} />
            <span>{conversation.channel}</span>
          </div>
          <div className="metric-item">
            <MessageCircle size={14} />
            <span>{conversation.messageCount} messages</span>
          </div>
          <div className="metric-item">
            <Timer size={14} />
            <span>{conversation.duration}m</span>
          </div>
        </div>

        <div className="analysis-summary">
          <div className="sentiment-indicator" style={{ color: sentimentConfig.color }}>
            <SentimentIcon size={16} />
            <span>{sentimentConfig.label}</span>
          </div>
          <QualityIndicator quality={analysis.quality} />
          {analysis.risk === 'high' && (
            <div className="risk-indicator">
              <AlertCircle size={14} />
              <span>At Risk</span>
            </div>
          )}
        </div>

        {conversation.tags && conversation.tags.length > 0 && (
          <div className="conversation-tags">
            {conversation.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          className="action-btn primary"
          onClick={(e) => {
            e.stopPropagation();
            onAction('respond', conversation);
          }}
        >
          <MessageSquare size={14} />
          Respond
        </button>
        <button 
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAction('call', conversation);
          }}
        >
          <Phone size={14} />
          Call
        </button>
        <button 
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {isExpanded && (
        <div className="card-expanded">
          <div className="emotional-journey">
            <h4>Emotional Journey</h4>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={analysis.emotionalJourney}>
                <defs>
                  <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sentimentConfig.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={sentimentConfig.color} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="sentiment"
                  stroke={sentimentConfig.color}
                  fill="url(#sentimentGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="ai-insights">
            <h4>AI Insights</h4>
            <div className="insight-item">
              <Target size={14} />
              <span>Next Action: {analysis.nextBestAction.action.replace(/_/g, ' ')}</span>
              <span className="confidence">{Math.round(analysis.nextBestAction.confidence * 100)}%</span>
            </div>
            <div className="insight-item">
              <TrendingUp size={14} />
              <span>Predicted: {analysis.predictedOutcome.outcome.replace(/_/g, ' ')}</span>
              <span className="confidence">{Math.round(analysis.predictedOutcome.probability * 100)}%</span>
            </div>
          </div>

          <div className="keywords-section">
            <h4>Key Topics</h4>
            <div className="keywords">
              {analysis.keywords.map(keyword => (
                <span 
                  key={keyword.word} 
                  className="keyword"
                  style={{ opacity: 0.5 + keyword.relevance * 0.5 }}
                >
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AI Conversation Assistant Panel
const AIAssistantPanel = ({ selectedConversation, analysis, onRefresh, onSuggestionUse }) => {
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRefresh = () => {
    setIsGenerating(true);
    onRefresh();
    setTimeout(() => setIsGenerating(false), 1500);
  };

  return (
    <div className="ai-assistant-panel">
      <div className="assistant-header">
        <h2>
          <Bot className="assistant-icon" />
          AI Conversation Assistant
        </h2>
        <button 
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={isGenerating}
        >
          <RefreshCw size={16} className={isGenerating ? 'spinning' : ''} />
          Refresh Analysis
        </button>
      </div>

      <div className="assistant-description">
        Real-time conversation analysis with smart suggestions and insights
      </div>

      {selectedConversation ? (
        <>
          <div className="conversation-overview">
            <h3>Conversation Analysis</h3>
            <div className="overview-metrics">
              <div className="overview-metric">
                <Gauge size={20} />
                <div>
                  <div className="metric-value">{analysis.quality}%</div>
                  <div className="metric-label">Quality Score</div>
                </div>
              </div>
              <div className="overview-metric">
                <Activity size={20} />
                <div>
                  <div className="metric-value">{analysis.sentiment}</div>
                  <div className="metric-label">Sentiment</div>
                </div>
              </div>
              <div className="overview-metric">
                <Shield size={20} />
                <div>
                  <div className="metric-value">{analysis.risk}</div>
                  <div className="metric-label">Risk Level</div>
                </div>
              </div>
            </div>
          </div>

          <div className="smart-suggestions">
            <h3>Smart Suggestions</h3>
            {analysis.suggestions.map((suggestion, i) => (
              <div key={i} className="suggestion-card">
                <div className="suggestion-header">
                  <Lightbulb size={14} />
                  <span className="suggestion-type">{suggestion.type}</span>
                  <span className="suggestion-confidence">
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="suggestion-text">{suggestion.text}</p>
                <button 
                  className="use-suggestion-btn"
                  onClick={() => onSuggestionUse(suggestion)}
                >
                  <Send size={14} />
                  Use Suggestion
                </button>
              </div>
            ))}
          </div>

          <div className="keywords-analysis">
            <h3>Keywords</h3>
            <div className="keyword-cloud">
              {analysis.keywords.map(keyword => (
                <span 
                  key={keyword.word}
                  className="keyword-tag"
                  style={{ 
                    fontSize: `${0.8 + keyword.relevance * 0.6}rem`,
                    opacity: 0.6 + keyword.relevance * 0.4
                  }}
                >
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>

          <div className="auto-suggest-toggle">
            <label className="toggle-label">
              <span>Auto-suggest responses</span>
              <input
                type="checkbox"
                checked={autoSuggest}
                onChange={(e) => setAutoSuggest(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
            <p className="toggle-description">
              Suggestions will appear here as the conversation progresses
            </p>
          </div>
        </>
      ) : (
        <div className="no-selection">
          <MessageSquare size={48} />
          <p>Select a conversation to view analysis</p>
        </div>
      )}
    </div>
  );
};

// Conversation Analytics Dashboard
const ConversationAnalytics = ({ conversations }) => {
  const volumeData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      volume: Math.floor(Math.random() * 50 + 20),
      resolved: Math.floor(Math.random() * 40 + 10)
    }));
  }, []);

  const channelData = [
    { name: 'Chat', value: 45, color: 'hsl(270, 70%, 50%)' },
    { name: 'Email', value: 30, color: 'hsl(210, 70%, 50%)' },
    { name: 'Phone', value: 20, color: 'hsl(120, 70%, 50%)' },
    { name: 'Social', value: 5, color: 'hsl(45, 85%, 55%)' }
  ];

  return (
    <div className="conversation-analytics">
      <h3>Conversation Analytics</h3>
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>Weekly Volume</h4>
          <ResponsiveContainer width="100%" height={150}>
            <ComposedChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="volume" fill="hsl(270, 70%, 50%)" opacity={0.8} />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="hsl(120, 70%, 50%)" 
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card">
          <h4>Channel Distribution</h4>
          <ResponsiveContainer width="100%" height={150}>
            <RePieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="channel-legend">
            {channelData.map(channel => (
              <div key={channel.name} className="legend-item">
                <span 
                  className="legend-dot" 
                  style={{ backgroundColor: channel.color }}
                />
                <span>{channel.name}</span>
                <span className="legend-value">{channel.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="performance-metrics">
        <div className="metric-card">
          <TrendingUp size={20} />
          <div>
            <div className="metric-value">87%</div>
            <div className="metric-label">Resolution Rate</div>
          </div>
        </div>
        <div className="metric-card">
          <Clock size={20} />
          <div>
            <div className="metric-value">4.2m</div>
            <div className="metric-label">Avg Response Time</div>
          </div>
        </div>
        <div className="metric-card">
          <Star size={20} />
          <div>
            <div className="metric-value">4.8</div>
            <div className="metric-label">CSAT Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Conversations Component
export default function QuantumConversations() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([
    {
      id: 1,
      customerName: 'Sarah Johnson',
      customerInitials: 'SJ',
      company: 'TechCorp Solutions',
      status: 'active',
      channel: 'chat',
      lastMessage: "I'm interested in upgrading our plan to Enterprise. Can you help me understand the benefits?",
      lastUpdate: '8 minutes ago',
      messageCount: 12,
      duration: 15,
      isOnline: true,
      tags: ['Sales', 'Enterprise'],
      avgResponseTime: 45,
      customerValue: 'high'
    },
    {
      id: 2,
      customerName: 'Michael Chen',
      customerInitials: 'MC',
      company: 'Innovate.io',
      status: 'pending',
      channel: 'email',
      lastMessage: 'Following up on our previous discussion about the API integration...',
      lastUpdate: 'about 2 hours ago',
      messageCount: 8,
      duration: 48,
      isOnline: false,
      tags: ['Technical', 'Integration'],
      avgResponseTime: 120,
      customerValue: 'medium'
    },
    {
      id: 3,
      customerName: 'Jessica Williams',
      customerInitials: 'JW',
      company: 'StartupX',
      status: 'active',
      channel: 'phone',
      lastMessage: 'Just had a great call about implementation timeline',
      lastUpdate: '20 minutes ago',
      messageCount: 5,
      duration: 25,
      isOnline: true,
      tags: ['Onboarding'],
      avgResponseTime: 30,
      customerValue: 'medium'
    },
    {
      id: 4,
      customerName: 'Robert Martinez',
      customerInitials: 'RM',
      company: 'Enterprise Solutions',
      status: 'resolved',
      channel: 'chat',
      lastMessage: 'Thank you for resolving the billing issue so quickly!',
      lastUpdate: '15 minutes ago',
      messageCount: 15,
      duration: 35,
      isOnline: false,
      tags: ['Support', 'Billing'],
      avgResponseTime: 60,
      customerValue: 'high'
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);
  
  const intelligenceEngine = useMemo(() => new ConversationIntelligenceEngine(), []);

  // Analyze all conversations
  const conversationsWithAnalysis = useMemo(() => {
    return conversations.map(conv => ({
      ...conv,
      analysis: intelligenceEngine.analyzeConversation(conv)
    }));
  }, [conversations, intelligenceEngine]);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    let filtered = conversationsWithAnalysis;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(conv => 
        conv.customerName.toLowerCase().includes(query) ||
        conv.company.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(conv => conv.status === filterStatus);
    }

    return filtered;
  }, [conversationsWithAnalysis, searchQuery, filterStatus]);

  const handleConversationSelect = (convId) => {
    const selected = conversationsWithAnalysis.find(c => c.id === convId);
    setSelectedConversation(selected);
  };

  const handleConversationAction = (action, conversation) => {
    console.log(`Action: ${action} on conversation:`, conversation);
  };

  const handleRefreshAnalysis = () => {
    // Refresh analysis for selected conversation
    if (selectedConversation) {
      const updated = {
        ...selectedConversation,
        analysis: intelligenceEngine.analyzeConversation(selectedConversation)
      };
      setSelectedConversation(updated);
    }
  };

  const handleSuggestionUse = (suggestion) => {
    console.log('Using suggestion:', suggestion);
  };

  return (
    <div className="quantum-conversations">
      {/* Quantum Background */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-waves"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Header */}
      <header className="conversations-header">
        <div className="header-wrapper">
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
                <h1 className="page-title">Conversations</h1>
                <p className="page-subtitle">Manage all your customer conversations</p>
              </div>
            </div>

            <div className="header-actions">
              <button className="manage-channels-btn">
                <Settings size={16} />
                Manage Channels
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="conversations-main-content">
        <div className="conversations-container">
        {/* Left Panel - Conversations List */}
        <div className="conversations-panel">
          <div className="panel-header">
            <h2>Conversations</h2>
            <button className="new-conversation-btn">
              <Plus size={16} />
              New
            </button>
          </div>

          <div className="search-filter-bar">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>

          {showAnalytics && (
            <ConversationAnalytics conversations={filteredConversations} />
          )}

          <div className="conversations-list">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  analysis={conversation.analysis}
                  isSelected={selectedConversation?.id === conversation.id}
                  onSelect={handleConversationSelect}
                  onAction={handleConversationAction}
                />
              ))
            ) : (
              <div className="no-conversations">
                <MessageSquare size={48} />
                <p>No conversations found</p>
                <span>Try adjusting your search or filters</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <AIAssistantPanel
          selectedConversation={selectedConversation}
          analysis={selectedConversation?.analysis}
          onRefresh={handleRefreshAnalysis}
          onSuggestionUse={handleSuggestionUse}
        />
      </div>

      <style jsx>{`
        .quantum-conversations {
          min-height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
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
          background-size: 30px 30px;
          animation: gridFloat 20s linear infinite;
        }

        @keyframes gridFloat {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }

        .quantum-waves {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, hsla(270, 70%, 50%, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 70%, hsla(210, 70%, 50%, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, hsla(120, 70%, 50%, 0.08) 0%, transparent 60%);
          animation: waveMotion 20s ease-in-out infinite;
        }

        @keyframes waveMotion {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.05) rotate(1deg); }
          66% { transform: scale(0.95) rotate(-1deg); }
        }

        .quantum-particles {
          position: absolute;
          inset: 0;
        }

        .quantum-particles::before,
        .quantum-particles::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          background: hsla(270, 70%, 70%, 0.5);
          border-radius: 50%;
          box-shadow: 
            20px 50px 0 hsla(270, 70%, 70%, 0.3),
            100px 100px 0 hsla(210, 70%, 70%, 0.3),
            180px 150px 0 hsla(120, 70%, 70%, 0.3),
            250px 200px 0 hsla(45, 85%, 70%, 0.3);
          animation: particleFloat 15s infinite;
        }

        @keyframes particleFloat {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(300px, -300px); opacity: 0; }
        }

        /* Header */
        .conversations-header {
          position: relative;
          z-index: 10;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          margin: 0 auto;
          width: 100%;
        }

        .header-content {
          flex: 1;
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
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

        .manage-channels-btn {
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

        .manage-channels-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* Main Container */
        .conversations-main-content {
          flex: 1;
          overflow-y: auto;
          position: relative;
        }

        .conversations-container {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 1.5rem;
          padding: 1.5rem;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Conversations Panel */
        .conversations-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .panel-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .new-conversation-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .new-conversation-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px hsla(270, 70%, 50%, 0.4);
        }

        /* Search and Filter */
        .search-filter-bar {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .search-box {
          flex: 1;
          position: relative;
        }

        .search-box svg {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input {
          width: 100%;
          padding: 0.625rem 0.75rem 0.625rem 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: hsl(270, 70%, 50%);
          box-shadow: 0 0 0 3px hsla(270, 70%, 50%, 0.2);
        }

        .filter-select {
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
        }

        /* Conversation Analytics */
        .conversation-analytics {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .conversation-analytics h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .analytics-card {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .analytics-card h4 {
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .channel-legend {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-value {
          margin-left: auto;
          font-weight: 600;
        }

        .performance-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .metric-card svg {
          color: hsl(270, 70%, 60%);
        }

        .metric-value {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1;
        }

        .metric-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Conversations List */
        .conversations-list {
          padding: 1rem;
          max-height: calc(100vh - 400px);
          overflow-y: auto;
        }

        .conversations-list::-webkit-scrollbar {
          width: 6px;
        }

        .conversations-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        .conversations-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .conversations-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Conversation Card */
        .conversation-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          margin-bottom: 0.75rem;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .conversation-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, hsl(270, 70%, 50%), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .conversation-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateX(4px);
        }

        .conversation-card:hover::before {
          transform: translateX(100%);
        }

        .conversation-card.selected {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .customer-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .customer-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, hsl(270, 70%, 50%), hsl(280, 70%, 60%));
          border-radius: 50%;
          font-weight: 600;
          font-size: 0.875rem;
          position: relative;
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
          animation: onlinePulse 2s ease-in-out infinite;
        }

        @keyframes onlinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0); }
        }

        .customer-name {
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0 0 0.125rem 0;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .conversation-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.625rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .time-info {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message-preview {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .conversation-metrics {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .analysis-summary {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sentiment-indicator {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .quality-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quality-ring {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .quality-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.75rem;
          font-weight: 700;
        }

        .quality-label {
          font-size: 0.75rem;
          text-transform: capitalize;
          color: rgba(255, 255, 255, 0.7);
        }

        .risk-indicator {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.5rem;
          background: hsla(0, 85%, 55%, 0.2);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: hsl(0, 85%, 55%);
          animation: riskPulse 2s ease-in-out infinite;
        }

        @keyframes riskPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .conversation-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .tag {
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .action-btn.primary {
          background: linear-gradient(135deg, hsla(270, 70%, 50%, 0.2), hsla(280, 70%, 60%, 0.2));
          border-color: hsla(270, 70%, 50%, 0.4);
          color: hsl(270, 70%, 70%);
        }

        .action-btn.primary:hover {
          background: linear-gradient(135deg, hsla(270, 70%, 50%, 0.3), hsla(280, 70%, 60%, 0.3));
          box-shadow: 0 4px 12px hsla(270, 70%, 50%, 0.2);
        }

        /* Expanded Content */
        .card-expanded {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
          animation: expandDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes expandDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 200px; }
        }

        .emotional-journey,
        .ai-insights,
        .keywords-section {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 6px;
        }

        .emotional-journey h4,
        .ai-insights h4,
        .keywords-section h4 {
          font-size: 0.8125rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .insight-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0;
          font-size: 0.75rem;
        }

        .insight-item svg {
          color: hsl(270, 70%, 60%);
        }

        .confidence {
          margin-left: auto;
          font-weight: 600;
          color: hsl(270, 70%, 60%);
        }

        .keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .keyword {
          padding: 0.25rem 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
          font-size: 0.75rem;
          color: hsl(270, 70%, 70%);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        /* No Conversations */
        .no-conversations {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .no-conversations svg {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1rem;
        }

        .no-conversations p {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .no-conversations span {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* AI Assistant Panel */
        .ai-assistant-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
          position: sticky;
          top: 20px;
          height: fit-content;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
        }

        .assistant-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .assistant-header h2 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .assistant-icon {
          color: hsl(270, 70%, 60%);
          animation: botPulse 3s ease-in-out infinite;
        }

        @keyframes botPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        .refresh-btn {
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

        .refresh-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .assistant-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Conversation Overview */
        .conversation-overview {
          margin-bottom: 1.5rem;
        }

        .conversation-overview h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .overview-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .overview-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          text-align: center;
        }

        .overview-metric svg {
          color: hsl(270, 70%, 60%);
          margin-bottom: 0.5rem;
        }

        /* Smart Suggestions */
        .smart-suggestions {
          margin-bottom: 1.5rem;
        }

        .smart-suggestions h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .suggestion-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .suggestion-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .suggestion-header svg {
          color: hsl(45, 85%, 55%);
        }

        .suggestion-type {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: hsl(270, 70%, 60%);
        }

        .suggestion-confidence {
          margin-left: auto;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .suggestion-text {
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 0.75rem 0;
        }

        .use-suggestion-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: linear-gradient(135deg, hsla(270, 70%, 50%, 0.2), hsla(280, 70%, 60%, 0.2));
          border: 1px solid hsla(270, 70%, 50%, 0.4);
          border-radius: 6px;
          color: hsl(270, 70%, 70%);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .use-suggestion-btn:hover {
          background: linear-gradient(135deg, hsla(270, 70%, 50%, 0.3), hsla(280, 70%, 60%, 0.3));
          transform: translateY(-1px);
          box-shadow: 0 4px 12px hsla(270, 70%, 50%, 0.2);
        }

        /* Keywords Analysis */
        .keywords-analysis {
          margin-bottom: 1.5rem;
        }

        .keywords-analysis h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .keyword-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .keyword-tag {
          padding: 0.375rem 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          color: hsl(270, 70%, 70%);
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .keyword-tag:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: scale(1.05);
        }

        /* Auto-suggest Toggle */
        .auto-suggest-toggle {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .toggle-label input {
          display: none;
        }

        .toggle-slider {
          position: relative;
          width: 44px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          left: 3px;
          top: 3px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .toggle-label input:checked + .toggle-slider {
          background: hsl(270, 70%, 50%);
        }

        .toggle-label input:checked + .toggle-slider::before {
          transform: translateX(20px);
        }

        .toggle-description {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.5rem;
        }

        /* No Selection */
        .no-selection {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
        }

        .no-selection svg {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1rem;
        }

        .no-selection p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .conversations-container {
            grid-template-columns: 1fr;
          }
          
          .ai-assistant-panel {
            position: static;
            margin-top: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .performance-metrics {
            grid-template-columns: 1fr;
          }
          
          .card-expanded {
            grid-template-columns: 1fr;
          }
          
          .overview-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      </div>
    </div>
  );
}