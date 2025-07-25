import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  BarChart3, TrendingUp, Clock, Users, Target, DollarSign, Shield, Zap,
  Brain, Activity, Calendar, Download, Upload, Plus, Filter, ChevronDown,
  ChevronRight, Eye, Settings, RefreshCw, Sparkles, AlertCircle, Info,
  ArrowUp, ArrowDown, Bell, Gauge, Layers, GitBranch, PieChart, LineChart,
  Share2, BookOpen, Play, Pause, SkipForward, Command, Search, Star,
  Award, Flame, Timer, TrendingDown, CheckCircle, XCircle, AlertTriangle,
  Bot, Lightbulb, Compass, Map, Repeat, Archive, ChevronLeft, Maximize2,
  Grid, List, MoreVertical, Copy, ExternalLink, HelpCircle, Moon, Sun, FileText
} from 'lucide-react';
import { 
  LineChart as ReLineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ComposedChart, Scatter, ScatterChart, Treemap,
  Sankey, Funnel, FunnelChart, RadialBarChart, RadialBar
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
    optimization: { icon: Lightbulb, color: 'hsl(45, 85%, 55%)' },
    milestone: { icon: Award, color: 'hsl(210, 70%, 50%)' }
  }
};

// AI Analytics Engine
class AnalyticsIntelligenceEngine {
  constructor() {
    this.predictiveModels = new Map();
    this.anomalyDetector = new AnomalyDetector();
    this.trendAnalyzer = new TrendAnalyzer();
    this.optimizer = new PerformanceOptimizer();
  }

  analyzeMetrics(data) {
    return {
      insights: this.generateInsights(data),
      predictions: this.generatePredictions(data),
      anomalies: this.detectAnomalies(data),
      recommendations: this.generateRecommendations(data),
      trends: this.analyzeTrends(data),
      correlations: this.findCorrelations(data),
      forecast: this.generateForecast(data)
    };
  }

  generateInsights(data) {
    const insights = [];
    
    // Response time insight
    if (data.avgResponseTime < 30) {
      insights.push({
        type: 'milestone',
        priority: 'high',
        title: 'Excellent Response Time',
        message: 'Your team is responding 40% faster than industry average',
        impact: '+15% customer satisfaction',
        timestamp: new Date()
      });
    }

    // Conversion trend
    if (data.conversionTrend > 0) {
      insights.push({
        type: 'trend',
        priority: 'medium',
        title: 'Conversion Rate Improving',
        message: `${data.conversionTrend}% increase over last 30 days`,
        impact: `+${(data.conversionTrend * 5000).toLocaleString()} potential revenue`,
        timestamp: new Date()
      });
    }

    // Anomaly detection
    if (data.hasAnomaly) {
      insights.push({
        type: 'anomaly',
        priority: 'critical',
        title: 'Unusual Activity Detected',
        message: 'Lead volume spike detected in last 2 hours',
        impact: 'Response time may increase',
        action: 'Scale up resources',
        timestamp: new Date()
      });
    }

    return insights;
  }

  generatePredictions(data) {
    return {
      nextHourLeads: Math.round(data.currentLeads * 1.15),
      endOfDayRevenue: data.currentRevenue * 1.8,
      weeklyConversion: 26.5,
      monthlyGrowth: 12.3,
      resourceNeeds: {
        agents: Math.ceil(data.currentLeads / 50),
        peakHour: '2:00 PM - 4:00 PM',
        bottleneck: 'Email responses'
      }
    };
  }

  detectAnomalies(data) {
    // Simulate anomaly detection
    const anomalies = [];
    
    if (Math.random() > 0.7) {
      anomalies.push({
        metric: 'response_time',
        severity: 'medium',
        deviation: '+2.3σ',
        timestamp: new Date(Date.now() - 3600000),
        possibleCause: 'High complexity inquiries'
      });
    }

    return anomalies;
  }

  generateRecommendations(data) {
    return [
      {
        category: 'efficiency',
        title: 'Optimize Response Templates',
        description: '23% of responses follow similar patterns. Implement smart templates.',
        impact: 'Save 2.5 hours daily',
        effort: 'low',
        priority: 'high'
      },
      {
        category: 'revenue',
        title: 'Target High-Value Segments',
        description: 'Enterprise leads convert 3x better. Increase focus on this segment.',
        impact: '+$45K monthly revenue',
        effort: 'medium',
        priority: 'high'
      },
      {
        category: 'quality',
        title: 'Implement Quality Scoring',
        description: 'AI-powered conversation quality analysis can improve CSAT by 18%',
        impact: '+4.2 NPS points',
        effort: 'medium',
        priority: 'medium'
      }
    ];
  }

  analyzeTrends(data) {
    return {
      responseTime: { direction: 'improving', change: -12.5 },
      conversion: { direction: 'stable', change: +0.8 },
      revenue: { direction: 'growing', change: +18.3 },
      satisfaction: { direction: 'improving', change: +2.1 }
    };
  }

  findCorrelations(data) {
    return [
      { metrics: ['response_time', 'conversion_rate'], correlation: -0.73, strength: 'strong' },
      { metrics: ['lead_quality', 'revenue'], correlation: 0.89, strength: 'very_strong' },
      { metrics: ['agent_experience', 'satisfaction'], correlation: 0.65, strength: 'moderate' }
    ];
  }

  generateForecast(data) {
    const days = 30;
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() + i * 86400000),
      revenue: data.currentRevenue * (1 + (i * 0.01) + Math.random() * 0.1),
      leads: Math.round(data.currentLeads * (1 + Math.sin(i * 0.2) * 0.2)),
      conversion: 24.3 + Math.sin(i * 0.1) * 2 + Math.random() * 1
    }));
  }
}

// Helper classes
class AnomalyDetector {
  detect(timeseries) {
    // Simplified anomaly detection
    return timeseries.filter(point => Math.abs(point.zscore) > 2);
  }
}

class TrendAnalyzer {
  analyze(data) {
    // Simplified trend analysis
    return { slope: 0.05, r2: 0.85, forecast: 'positive' };
  }
}

class PerformanceOptimizer {
  optimize(metrics) {
    // Simplified optimization suggestions
    return { potential: 0.15, areas: ['response_time', 'conversion'] };
  }
}

// Quantum Metric Card Component
const QuantumMetricCard = ({ icon: Icon, title, value, change, trend, subtitle, color, onClick, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    // Animate value on mount
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
      className={`quantum-metric-card ${isLoading ? 'loading' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
      
      {isHovered && (
        <div className="metric-hover-effect">
          <Sparkles className="sparkle-1" />
          <Sparkles className="sparkle-2" />
          <Sparkles className="sparkle-3" />
        </div>
      )}
    </div>
  );
};

// AI Insights Panel
const AIInsightsPanel = ({ insights, onInsightAction }) => {
  const [expandedInsight, setExpandedInsight] = useState(null);
  
  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'hsl(0, 85%, 55%)',
      high: 'hsl(15, 90%, 55%)',
      medium: 'hsl(45, 85%, 55%)',
      low: 'hsl(210, 70%, 50%)'
    };
    return colors[priority] || colors.medium;
  };

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
              className={`insight-card ${insight.priority} ${isExpanded ? 'expanded' : ''}`}
              style={{ '--priority-color': getPriorityColor(insight.priority) }}
            >
              <div 
                className="insight-main"
                onClick={() => setExpandedInsight(isExpanded ? null : index)}
              >
                <div className="insight-icon-wrapper">
                  <InsightIcon size={16} />
                </div>
                <div className="insight-content">
                  <h4 className="insight-title">{insight.title}</h4>
                  <p className="insight-message">{insight.message}</p>
                  {insight.impact && (
                    <div className="insight-impact">
                      <Target size={12} />
                      <span>{insight.impact}</span>
                    </div>
                  )}
                </div>
                <ChevronDown 
                  size={16} 
                  className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
                />
              </div>
              
              {isExpanded && insight.action && (
                <div className="insight-actions">
                  <button 
                    className="insight-action-btn primary"
                    onClick={() => onInsightAction(insight)}
                  >
                    <Zap size={14} />
                    {insight.action}
                  </button>
                  <button className="insight-action-btn secondary">
                    <Info size={14} />
                    Learn More
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Advanced Chart Components
const ResponseTimeChart = ({ data, timeRange }) => {
  const chartData = useMemo(() => {
    // Generate time series data based on timeRange
    const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
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
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot actual"></span>
            <span>Actual</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot predicted"></span>
            <span>Predicted</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot benchmark"></span>
            <span>Benchmark</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(210, 70%, 50%)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.05} />
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
            dataKey="predicted"
            stroke="hsl(270, 70%, 50%)"
            fill="url(#predictedGradient)"
            strokeWidth={2}
            strokeDasharray="3 3"
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

const ActivityHeatmap = ({ data }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const heatmapData = useMemo(() => {
    return days.flatMap((day, dayIndex) => 
      hours.map(hour => ({
        day,
        hour,
        value: Math.random() * 100,
        dayIndex,
        formatted: `${hour}:00`
      }))
    );
  }, []);

  const getColor = (value) => {
    const intensity = value / 100;
    return `hsla(270, 70%, ${50 + intensity * 20}%, ${0.2 + intensity * 0.8})`;
  };

  return (
    <div className="heatmap-container">
      <div className="chart-header">
        <h3>Lead Activity Heatmap</h3>
        <p className="chart-subtitle">Identify peak hours for inbound leads</p>
      </div>
      
      <div className="heatmap-grid">
        <div className="heatmap-labels-y">
          {days.map(day => (
            <div key={day} className="heatmap-label-y">{day}</div>
          ))}
        </div>
        
        <div className="heatmap-content">
          <div className="heatmap-labels-x">
            {hours.filter((_, i) => i % 3 === 0).map(hour => (
              <div key={hour} className="heatmap-label-x">{hour}:00</div>
            ))}
          </div>
          
          <div className="heatmap-cells">
            {heatmapData.map((cell, index) => (
              <div
                key={index}
                className="heatmap-cell"
                style={{
                  backgroundColor: getColor(cell.value),
                  gridColumn: cell.hour + 1,
                  gridRow: cell.dayIndex + 1
                }}
                title={`${cell.day} ${cell.formatted}: ${Math.round(cell.value)} leads`}
              >
                <span className="heatmap-value">
                  {cell.value > 80 ? Math.round(cell.value) : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="heatmap-scale">
        <span>Low Activity</span>
        <div className="scale-gradient"></div>
        <span>High Activity</span>
      </div>
    </div>
  );
};

const ConversionFunnel = ({ data }) => {
  const funnelData = [
    { stage: 'Visitors', value: 10000, color: 'hsl(210, 70%, 50%)' },
    { stage: 'Leads', value: 3500, color: 'hsl(190, 70%, 50%)' },
    { stage: 'Qualified', value: 1200, color: 'hsl(170, 70%, 50%)' },
    { stage: 'Opportunities', value: 450, color: 'hsl(150, 70%, 50%)' },
    { stage: 'Customers', value: 120, color: 'hsl(130, 70%, 50%)' }
  ];

  return (
    <div className="funnel-container">
      <div className="chart-header">
        <h3>Conversion Funnel</h3>
        <button className="chart-action">
          <Settings size={16} />
        </button>
      </div>
      
      <div className="funnel-chart">
        {funnelData.map((stage, index) => {
          const width = (stage.value / funnelData[0].value) * 100;
          const conversionRate = index > 0 
            ? ((stage.value / funnelData[index - 1].value) * 100).toFixed(1)
            : '100';
          
          return (
            <div key={stage.stage} className="funnel-stage">
              <div className="stage-info">
                <span className="stage-name">{stage.stage}</span>
                <span className="stage-value">{stage.value.toLocaleString()}</span>
              </div>
              <div className="stage-bar-container">
                <div 
                  className="stage-bar"
                  style={{
                    width: `${width}%`,
                    backgroundColor: stage.color
                  }}
                />
              </div>
              {index > 0 && (
                <div className="conversion-rate">
                  <ArrowDown size={12} />
                  {conversionRate}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Predictive Analytics Component
const PredictiveAnalytics = ({ predictions, forecast }) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  
  const forecastData = useMemo(() => {
    return forecast.map(point => ({
      date: point.date.toLocaleDateString(),
      revenue: point.revenue,
      leads: point.leads,
      conversion: point.conversion,
      confidence: 0.85 + Math.random() * 0.1
    }));
  }, [forecast]);

  return (
    <div className="predictive-analytics">
      <div className="chart-header">
        <h3>30-Day Forecast</h3>
        <div className="metric-selector">
          <button 
            className={`metric-btn ${selectedMetric === 'revenue' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('revenue')}
          >
            Revenue
          </button>
          <button 
            className={`metric-btn ${selectedMetric === 'leads' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('leads')}
          >
            Leads
          </button>
          <button 
            className={`metric-btn ${selectedMetric === 'conversion' ? 'active' : ''}`}
            onClick={() => setSelectedMetric('conversion')}
          >
            Conversion
          </button>
        </div>
      </div>
      
      <div className="predictions-summary">
        <div className="prediction-card">
          <h4>Next Hour</h4>
          <div className="prediction-value">{predictions.nextHourLeads} leads</div>
          <div className="prediction-confidence">
            <Gauge size={12} />
            92% confidence
          </div>
        </div>
        <div className="prediction-card">
          <h4>End of Day</h4>
          <div className="prediction-value">${predictions.endOfDayRevenue.toLocaleString()}</div>
          <div className="prediction-confidence">
            <Gauge size={12} />
            87% confidence
          </div>
        </div>
        <div className="prediction-card">
          <h4>Resource Needs</h4>
          <div className="prediction-value">{predictions.resourceNeeds.agents} agents</div>
          <div className="prediction-subtitle">Peak: {predictions.resourceNeeds.peakHour}</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={forecastData}>
          <defs>
            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(270, 70%, 50%)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(120, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(120, 70%, 50%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey={selectedMetric}
            stroke="hsl(270, 70%, 50%)"
            fill="url(#forecastGradient)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="confidence"
            stroke="none"
            fill="url(#confidenceGradient)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Performance Recommendations
const PerformanceRecommendations = ({ recommendations, onImplement }) => {
  const getEffortColor = (effort) => {
    const colors = {
      low: 'hsl(120, 70%, 50%)',
      medium: 'hsl(45, 85%, 55%)',
      high: 'hsl(0, 70%, 50%)'
    };
    return colors[effort] || colors.medium;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      efficiency: Zap,
      revenue: DollarSign,
      quality: Star,
      automation: Bot
    };
    return icons[category] || Lightbulb;
  };

  return (
    <div className="performance-recommendations">
      <div className="recommendations-header">
        <h3>AI Recommendations</h3>
        <button className="refresh-recommendations">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
      
      <div className="recommendations-list">
        {recommendations.map((rec, index) => {
          const CategoryIcon = getCategoryIcon(rec.category);
          
          return (
            <div 
              key={index}
              className={`recommendation-card priority-${rec.priority}`}
              style={{ '--effort-color': getEffortColor(rec.effort) }}
            >
              <div className="rec-icon">
                <CategoryIcon size={20} />
              </div>
              
              <div className="rec-content">
                <h4 className="rec-title">{rec.title}</h4>
                <p className="rec-description">{rec.description}</p>
                
                <div className="rec-meta">
                  <div className="rec-impact">
                    <TrendingUp size={14} />
                    <span>{rec.impact}</span>
                  </div>
                  <div className="rec-effort">
                    <span className="effort-dot"></span>
                    <span>{rec.effort} effort</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="implement-btn"
                onClick={() => onImplement(rec)}
              >
                Implement
                <ArrowUp size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Analytics Dashboard
export default function QuantumAnalytics() {
  const [timeRange, setTimeRange] = useState('Last 7 days');
  const [activeTab, setActiveTab] = useState('performance');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(new Set(['all']));
  const [isExporting, setIsExporting] = useState(false);
  
  const intelligenceEngine = useMemo(() => new AnalyticsIntelligenceEngine(), []);
  
  // Mock data
  const metricsData = {
    avgResponseTime: 47,
    conversionRate: 24.3,
    revenue: 487230,
    activeLeads: 1832,
    slaCompliance: 96.7,
    costPerLead: 12.40,
    conversionTrend: 2.3,
    currentRevenue: 487230,
    currentLeads: 1832,
    hasAnomaly: Math.random() > 0.7
  };

  const analysis = useMemo(() => 
    intelligenceEngine.analyzeMetrics(metricsData),
    [intelligenceEngine, metricsData]
  );

  const tabs = [
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
    { id: 'conversion', label: 'Conversion', icon: Target },
    { id: 'channels', label: 'Channels', icon: Share2 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'predictive', label: 'Predictive', icon: Brain },
    { id: 'custom', label: 'Custom Reports', icon: FileText },
    { id: 'automated', label: 'Automated', icon: Bot }
  ];

  const handleCreateReport = () => {
    console.log('Creating report...');
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const handleInsightAction = (insight) => {
    console.log('Acting on insight:', insight);
  };

  const handleImplementRecommendation = (recommendation) => {
    console.log('Implementing recommendation:', recommendation);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setShowCommandPalette(true);
        } else if (e.key === 'e') {
          e.preventDefault();
          handleExport();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Comprehensive performance insights and custom reporting</p>
        </div>

        <div className="header-controls">
          <button className="date-range-btn">
            <Calendar size={16} />
            {timeRange}
            <ChevronDown size={16} />
          </button>
          
          <button 
            className="create-report-btn"
            onClick={handleCreateReport}
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
        <AIInsightsPanel 
          insights={analysis.insights}
          onInsightAction={handleInsightAction}
        />

        {/* Center - Charts */}
        <div className="charts-container">
          {activeTab === 'performance' && (
            <>
              <ResponseTimeChart data={[]} timeRange="24h" />
              <ActivityHeatmap data={[]} />
              <ConversionFunnel data={[]} />
            </>
          )}
          
          {activeTab === 'predictive' && (
            <>
              <PredictiveAnalytics 
                predictions={analysis.predictions}
                forecast={analysis.forecast}
              />
              <PerformanceRecommendations
                recommendations={analysis.recommendations}
                onImplement={handleImplementRecommendation}
              />
            </>
          )}
        </div>

        {/* Right Panel - Correlations & Insights */}
        <div className="insights-sidebar">
          <div className="correlations-panel">
            <h3>Key Correlations</h3>
            <div className="correlations-list">
              {analysis.correlations.map((corr, index) => (
                <div key={index} className="correlation-item">
                  <div className="correlation-metrics">
                    <span>{corr.metrics[0].replace(/_/g, ' ')}</span>
                    <ArrowDown size={14} />
                    <span>{corr.metrics[1].replace(/_/g, ' ')}</span>
                  </div>
                  <div className={`correlation-strength ${corr.strength}`}>
                    {Math.abs(corr.correlation * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="trends-panel">
            <h3>Current Trends</h3>
            <div className="trends-list">
              {Object.entries(analysis.trends).map(([metric, trend]) => (
                <div key={metric} className="trend-item">
                  <span className="trend-metric">{metric}</span>
                  <div className={`trend-indicator ${trend.direction}`}>
                    {trend.direction === 'improving' ? (
                      <TrendingUp size={14} />
                    ) : trend.direction === 'declining' ? (
                      <TrendingDown size={14} />
                    ) : (
                      <Activity size={14} />
                    )}
                    <span>{Math.abs(trend.change)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

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