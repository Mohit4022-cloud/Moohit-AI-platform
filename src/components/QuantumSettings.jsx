import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Download, Layers, Shield, Sun, Moon, Monitor, Save, RotateCcw,
  FileText, Check, ChevronDown, Activity, HardDrive, Link2, Sparkles,
  User, Lock, Bell, Building, CreditCard, Eye, AlertCircle, Info,
  Globe, Calendar, DollarSign, Clock, Zap, Database, Code, GitBranch,
  Upload, X
} from 'lucide-react';

// Tab configuration
const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'users', label: 'Users', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'compliance', label: 'Compliance', icon: FileText },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'whitelabel', label: 'White Label', icon: Building },
  { id: 'audit', label: 'Audit', icon: Eye },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'billing', label: 'Billing', icon: CreditCard }
];

// Settings Section Component
const SettingsSection = ({ title, description, children }) => (
  <section className="settings-section">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
    </div>
    {children}
  </section>
);

// Theme Selector Component
const ThemeSelector = ({ value, onChange }) => {
  const themes = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Monitor }
  ];

  return (
    <div className="theme-selector">
      {themes.map(theme => {
        const Icon = theme.icon;
        return (
          <div key={theme.id} className="theme-option">
            <input
              type="radio"
              name="theme"
              id={theme.id}
              checked={value === theme.id}
              onChange={() => onChange(theme.id)}
            />
            <label htmlFor={theme.id} className="theme-label">
              <Icon className="theme-icon" size={24} />
              <span className="theme-name">{theme.name}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

// Switch Component
const Switch = ({ checked, onChange, label }) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  </div>
);

// Main Settings Component
export default function QuantumSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showChangelogModal, setShowChangelogModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'TechCorp Inc',
    timezone: 'Eastern Time (ET)',
    dateFormat: 'MM/DD/YYYY',
    language: 'English',
    currency: 'USD ($)',
    theme: 'dark',
    compactMode: false,
    animations: true,
    betaFeatures: false,
    apiRateLimit: 1000,
    dataRetention: 90
  });

  // Auto-save functionality
  const saveTimeout = useRef(null);
  
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Clear existing timeout
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    
    // Set new timeout for auto-save
    saveTimeout.current = setTimeout(() => {
      showSaveStatus();
    }, 1000);
  };

  const showSaveStatus = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  // Toast helper
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('Settings exported successfully', 'success');
  };

  const handleImportSettings = () => {
    setShowImportModal(true);
    showToast('Upload your settings file', 'info');
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings({
        companyName: 'TechCorp Inc',
        timezone: 'Eastern Time (ET)',
        dateFormat: 'MM/DD/YYYY',
        language: 'English',
        currency: 'USD ($)',
        theme: 'dark',
        compactMode: false,
        animations: true,
        betaFeatures: false,
        apiRateLimit: 1000,
        dataRetention: 90
      });
      showSaveStatus();
      showToast('Settings reset to defaults', 'success');
    }
  };

  const handleViewChangelog = () => {
    setShowChangelogModal(true);
    showToast('Loading changelog...', 'info');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    showToast(`Switched to ${TABS.find(t => t.id === tabId)?.label} settings`, 'info');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        showSaveStatus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <SettingsSection
              title="Company Information"
              description="Basic information about your organization"
            >
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="label">Company Name</label>
                  <input
                    type="text"
                    className="input"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Timezone</label>
                  <select
                    className="select"
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  >
                    <option>Eastern Time (ET)</option>
                    <option>Pacific Time (PT)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Date Format</label>
                  <select
                    className="select"
                    value={settings.dateFormat}
                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Language</label>
                  <select
                    className="select"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Currency</label>
                  <select
                    className="select"
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>
              </div>

              <div 
                className="advanced-toggle"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <div className="advanced-toggle-label">
                  <Settings size={20} />
                  Advanced Settings
                </div>
                <ChevronDown 
                  size={16} 
                  style={{ 
                    transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </div>

              <div className={`advanced-content ${showAdvanced ? 'show' : ''}`}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="label">API Rate Limit</label>
                    <input
                      type="number"
                      className="input"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Data Retention (days)</label>
                    <input
                      type="number"
                      className="input"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    />
                  </div>
                  <Switch
                    label="Enable Beta Features"
                    checked={settings.betaFeatures}
                    onChange={(value) => handleSettingChange('betaFeatures', value)}
                  />
                </div>
              </div>
            </SettingsSection>

            <SettingsSection
              title="Display Preferences"
              description="Customize your interface appearance"
            >
              <div className="form-group">
                <label className="label">Theme</label>
                <ThemeSelector
                  value={settings.theme}
                  onChange={(value) => handleSettingChange('theme', value)}
                />
              </div>

              <div className="form-grid" style={{ marginTop: '1.5rem' }}>
                <Switch
                  label="Compact Mode"
                  checked={settings.compactMode}
                  onChange={(value) => handleSettingChange('compactMode', value)}
                />
                <Switch
                  label="Animations"
                  checked={settings.animations}
                  onChange={(value) => handleSettingChange('animations', value)}
                />
              </div>
            </SettingsSection>
          </>
        );
      
      case 'users':
        return (
          <>
            <SettingsSection
              title="User Management"
              description="Manage users, roles, and permissions"
            >
              <div className="users-grid">
                <div className="user-card">
                  <div className="user-avatar">JD</div>
                  <div className="user-info">
                    <h4>John Doe</h4>
                    <p>john.doe@techcorp.com</p>
                    <span className="user-role">Admin</span>
                  </div>
                  <button className="user-action">Edit</button>
                </div>
                <div className="user-card">
                  <div className="user-avatar">SM</div>
                  <div className="user-info">
                    <h4>Sarah Miller</h4>
                    <p>sarah.miller@techcorp.com</p>
                    <span className="user-role">Manager</span>
                  </div>
                  <button className="user-action">Edit</button>
                </div>
              </div>
              <button className="add-user-btn">
                <User size={16} />
                Add New User
              </button>
            </SettingsSection>
            <SettingsSection
              title="Roles & Permissions"
              description="Define user roles and access levels"
            >
              <div className="roles-list">
                <div className="role-item">
                  <h4>Admin</h4>
                  <p>Full system access</p>
                  <span className="user-count">2 users</span>
                </div>
                <div className="role-item">
                  <h4>Manager</h4>
                  <p>Manage campaigns and view analytics</p>
                  <span className="user-count">5 users</span>
                </div>
                <div className="role-item">
                  <h4>Agent</h4>
                  <p>Handle customer interactions</p>
                  <span className="user-count">12 users</span>
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'security':
        return (
          <>
            <SettingsSection
              title="Authentication"
              description="Configure authentication and access control"
            >
              <div className="form-grid">
                <Switch
                  label="Require Two-Factor Authentication"
                  checked={settings.require2FA || false}
                  onChange={(value) => handleSettingChange('require2FA', value)}
                />
                <Switch
                  label="Single Sign-On (SSO)"
                  checked={settings.sso || false}
                  onChange={(value) => handleSettingChange('sso', value)}
                />
                <div className="form-group">
                  <label className="label">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    className="input"
                    defaultValue="30"
                    onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Password Policy</label>
                  <select className="select">
                    <option>Strong (12+ chars, mixed case, numbers, symbols)</option>
                    <option>Medium (8+ chars, mixed case, numbers)</option>
                    <option>Basic (8+ chars)</option>
                  </select>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="Security Settings"
              description="Advanced security configurations"
            >
              <div className="form-grid">
                <Switch
                  label="IP Whitelist"
                  checked={settings.ipWhitelist || false}
                  onChange={(value) => handleSettingChange('ipWhitelist', value)}
                />
                <Switch
                  label="Audit Failed Login Attempts"
                  checked={settings.auditFailedLogins || true}
                  onChange={(value) => handleSettingChange('auditFailedLogins', value)}
                />
                <div className="form-group full-width">
                  <label className="label">Allowed IP Addresses</label>
                  <textarea 
                    className="input" 
                    rows="3" 
                    placeholder="Enter one IP address per line"
                  />
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'compliance':
        return (
          <>
            <SettingsSection
              title="Data Protection"
              description="GDPR, CCPA, and privacy compliance settings"
            >
              <div className="form-grid">
                <Switch
                  label="GDPR Compliance Mode"
                  checked={settings.gdpr || true}
                  onChange={(value) => handleSettingChange('gdpr', value)}
                />
                <Switch
                  label="CCPA Compliance Mode"
                  checked={settings.ccpa || true}
                  onChange={(value) => handleSettingChange('ccpa', value)}
                />
                <Switch
                  label="Right to be Forgotten"
                  checked={settings.rightToForget || true}
                  onChange={(value) => handleSettingChange('rightToForget', value)}
                />
                <Switch
                  label="Data Portability"
                  checked={settings.dataPortability || true}
                  onChange={(value) => handleSettingChange('dataPortability', value)}
                />
              </div>
            </SettingsSection>
            <SettingsSection
              title="Compliance Reports"
              description="Generate and download compliance documentation"
            >
              <div className="compliance-actions">
                <button className="compliance-btn">
                  <FileText size={16} />
                  Generate GDPR Report
                </button>
                <button className="compliance-btn">
                  <FileText size={16} />
                  Generate CCPA Report
                </button>
                <button className="compliance-btn">
                  <FileText size={16} />
                  Data Processing Agreement
                </button>
                <button className="compliance-btn">
                  <FileText size={16} />
                  Privacy Policy Template
                </button>
              </div>
            </SettingsSection>
          </>
        );

      case 'notifications':
        return (
          <>
            <SettingsSection
              title="Email Notifications"
              description="Configure email notification preferences"
            >
              <div className="notification-list">
                <div className="notification-item">
                  <div>
                    <h4>System Alerts</h4>
                    <p>Critical system events and downtime</p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="notification-item">
                  <div>
                    <h4>Campaign Performance</h4>
                    <p>Daily campaign metrics and insights</p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="notification-item">
                  <div>
                    <h4>Lead Alerts</h4>
                    <p>High-value lead notifications</p>
                  </div>
                  <Switch
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="notification-item">
                  <div>
                    <h4>Weekly Reports</h4>
                    <p>Summary of weekly performance</p>
                  </div>
                  <Switch
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="In-App Notifications"
              description="Configure in-app notification behavior"
            >
              <div className="form-grid">
                <Switch
                  label="Desktop Notifications"
                  checked={settings.desktopNotifications || true}
                  onChange={(value) => handleSettingChange('desktopNotifications', value)}
                />
                <Switch
                  label="Sound Alerts"
                  checked={settings.soundAlerts || false}
                  onChange={(value) => handleSettingChange('soundAlerts', value)}
                />
                <div className="form-group">
                  <label className="label">Notification Position</label>
                  <select className="select">
                    <option>Top Right</option>
                    <option>Top Left</option>
                    <option>Bottom Right</option>
                    <option>Bottom Left</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Auto-dismiss (seconds)</label>
                  <input type="number" className="input" defaultValue="5" />
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'integrations':
        return (
          <>
            <SettingsSection
              title="Connected Integrations"
              description="Manage your third-party integrations"
            >
              <div className="integrations-grid">
                <div className="integration-card connected">
                  <div className="integration-icon">
                    <Mail size={24} />
                  </div>
                  <h4>Gmail</h4>
                  <p>Email sync enabled</p>
                  <button className="integration-btn">Configure</button>
                </div>
                <div className="integration-card connected">
                  <div className="integration-icon">
                    <MessageSquare size={24} />
                  </div>
                  <h4>Slack</h4>
                  <p>Real-time notifications</p>
                  <button className="integration-btn">Configure</button>
                </div>
                <div className="integration-card">
                  <div className="integration-icon">
                    <Database size={24} />
                  </div>
                  <h4>Salesforce</h4>
                  <p>Not connected</p>
                  <button className="integration-btn primary">Connect</button>
                </div>
                <div className="integration-card">
                  <div className="integration-icon">
                    <Zap size={24} />
                  </div>
                  <h4>Zapier</h4>
                  <p>Not connected</p>
                  <button className="integration-btn primary">Connect</button>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="API Configuration"
              description="Manage API keys and webhooks"
            >
              <div className="api-section">
                <div className="api-key-item">
                  <div>
                    <h4>Production API Key</h4>
                    <p className="api-key">sk_live_****************************7a9b</p>
                  </div>
                  <button className="api-action">Regenerate</button>
                </div>
                <div className="api-key-item">
                  <div>
                    <h4>Test API Key</h4>
                    <p className="api-key">sk_test_****************************4c2d</p>
                  </div>
                  <button className="api-action">Regenerate</button>
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'whitelabel':
        return (
          <>
            <SettingsSection
              title="Branding"
              description="Customize the platform with your brand"
            >
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="label">Brand Name</label>
                  <input
                    type="text"
                    className="input"
                    defaultValue="TechCorp CRM"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Primary Color</label>
                  <input
                    type="color"
                    className="color-input"
                    defaultValue="#8b5cf6"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Secondary Color</label>
                  <input
                    type="color"
                    className="color-input"
                    defaultValue="#6366f1"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="label">Logo</label>
                  <div className="upload-area">
                    <Upload size={24} />
                    <p>Upload your logo (PNG, SVG)</p>
                  </div>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="Custom Domain"
              description="Use your own domain for the platform"
            >
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="label">Custom Domain</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="app.yourdomain.com"
                  />
                </div>
                <div className="domain-status">
                  <AlertCircle size={16} />
                  <span>Add CNAME record: app.yourdomain.com → platform.techcorp.com</span>
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'audit':
        return (
          <>
            <SettingsSection
              title="Audit Log Settings"
              description="Configure audit logging and retention"
            >
              <div className="form-grid">
                <Switch
                  label="Enable Audit Logging"
                  checked={settings.auditLogging || true}
                  onChange={(value) => handleSettingChange('auditLogging', value)}
                />
                <Switch
                  label="Log API Calls"
                  checked={settings.logApiCalls || true}
                  onChange={(value) => handleSettingChange('logApiCalls', value)}
                />
                <div className="form-group">
                  <label className="label">Log Retention (days)</label>
                  <select className="select">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                    <option>180 days</option>
                    <option>365 days</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Export Format</label>
                  <select className="select">
                    <option>JSON</option>
                    <option>CSV</option>
                    <option>XML</option>
                  </select>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="Recent Activity"
              description="View recent system activity"
            >
              <div className="audit-log">
                <div className="log-entry">
                  <div className="log-icon success"><Check size={16} /></div>
                  <div className="log-details">
                    <h4>Settings Updated</h4>
                    <p>John Doe updated system settings</p>
                    <span className="log-time">2 minutes ago</span>
                  </div>
                </div>
                <div className="log-entry">
                  <div className="log-icon info"><Info size={16} /></div>
                  <div className="log-details">
                    <h4>User Login</h4>
                    <p>Sarah Miller logged in from 192.168.1.1</p>
                    <span className="log-time">15 minutes ago</span>
                  </div>
                </div>
                <div className="log-entry">
                  <div className="log-icon warning"><AlertCircle size={16} /></div>
                  <div className="log-details">
                    <h4>Failed Login Attempt</h4>
                    <p>3 failed attempts from unknown IP</p>
                    <span className="log-time">1 hour ago</span>
                  </div>
                </div>
              </div>
              <button className="view-all-btn">View All Logs</button>
            </SettingsSection>
          </>
        );

      case 'monitoring':
        return (
          <>
            <SettingsSection
              title="System Monitoring"
              description="Configure monitoring and alerting"
            >
              <div className="monitoring-grid">
                <div className="monitor-card">
                  <div className="monitor-header">
                    <Activity size={20} />
                    <h4>Uptime</h4>
                  </div>
                  <div className="monitor-value">99.98%</div>
                  <div className="monitor-detail">Last 30 days</div>
                </div>
                <div className="monitor-card">
                  <div className="monitor-header">
                    <Zap size={20} />
                    <h4>Response Time</h4>
                  </div>
                  <div className="monitor-value">124ms</div>
                  <div className="monitor-detail">Average</div>
                </div>
                <div className="monitor-card">
                  <div className="monitor-header">
                    <Database size={20} />
                    <h4>Database</h4>
                  </div>
                  <div className="monitor-value">Healthy</div>
                  <div className="monitor-detail">All systems operational</div>
                </div>
                <div className="monitor-card">
                  <div className="monitor-header">
                    <HardDrive size={20} />
                    <h4>Storage</h4>
                  </div>
                  <div className="monitor-value">42%</div>
                  <div className="monitor-detail">125GB / 300GB used</div>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="Alert Configuration"
              description="Set up monitoring alerts"
            >
              <div className="alert-list">
                <div className="alert-item">
                  <div>
                    <h4>High Response Time</h4>
                    <p>Alert when response time exceeds 500ms</p>
                  </div>
                  <Switch checked={true} onChange={() => {}} />
                </div>
                <div className="alert-item">
                  <div>
                    <h4>Low Storage</h4>
                    <p>Alert when storage exceeds 80%</p>
                  </div>
                  <Switch checked={true} onChange={() => {}} />
                </div>
                <div className="alert-item">
                  <div>
                    <h4>Error Rate</h4>
                    <p>Alert when error rate exceeds 5%</p>
                  </div>
                  <Switch checked={false} onChange={() => {}} />
                </div>
              </div>
            </SettingsSection>
          </>
        );

      case 'billing':
        return (
          <>
            <SettingsSection
              title="Current Plan"
              description="Your subscription and usage details"
            >
              <div className="billing-plan">
                <div className="plan-header">
                  <h3>Enterprise Plan</h3>
                  <span className="plan-price">$499/month</span>
                </div>
                <div className="plan-features">
                  <div className="feature-item">
                    <Check size={16} />
                    <span>Unlimited users</span>
                  </div>
                  <div className="feature-item">
                    <Check size={16} />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="feature-item">
                    <Check size={16} />
                    <span>Priority support</span>
                  </div>
                  <div className="feature-item">
                    <Check size={16} />
                    <span>Custom integrations</span>
                  </div>
                </div>
                <div className="usage-stats">
                  <div className="usage-item">
                    <span>Contacts</span>
                    <strong>45,231 / Unlimited</strong>
                  </div>
                  <div className="usage-item">
                    <span>Emails Sent</span>
                    <strong>892,451 / Unlimited</strong>
                  </div>
                  <div className="usage-item">
                    <span>API Calls</span>
                    <strong>1.2M / 5M</strong>
                  </div>
                </div>
              </div>
            </SettingsSection>
            <SettingsSection
              title="Payment Method"
              description="Manage your payment information"
            >
              <div className="payment-method">
                <div className="card-info">
                  <CreditCard size={20} />
                  <div>
                    <h4>•••• •••• •••• 4242</h4>
                    <p>Expires 12/25</p>
                  </div>
                </div>
                <button className="update-payment-btn">Update Payment Method</button>
              </div>
              <div className="billing-actions">
                <button className="billing-btn">
                  <Download size={16} />
                  Download Invoices
                </button>
                <button className="billing-btn">
                  <FileText size={16} />
                  Billing History
                </button>
              </div>
            </SettingsSection>
          </>
        );

      default:
        return (
          <SettingsSection
            title={TABS.find(t => t.id === activeTab)?.label}
            description={`Configure ${activeTab} settings for your organization`}
          >
            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              Coming soon...
            </div>
          </SettingsSection>
        );
    }
  };

  return (
    <div className="quantum-settings">
      {/* Background */}
      <div className="quantum-background">
        <div className="quantum-grid"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Header */}
      <header className="settings-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigate('/dashboard')}
            >
              ←
            </button>
            <div>
              <h1>Settings</h1>
              <p className="header-subtitle">Manage your account and application preferences</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn" onClick={handleImportSettings}>
              <Upload size={16} />
              Import
            </button>
            <button className="btn btn-primary" onClick={handleExportSettings}>
              <Download size={16} />
              Export Settings
            </button>
          </div>
        </div>
      </header>

      {/* AI Status Bar */}
      <div className="ai-status">
        <div className="ai-status-content">
          <div className="ai-status-icon">
            <Layers size={16} />
          </div>
          <div>
            <div className="ai-status-text">AI Optimization: All systems are optimized and running smoothly</div>
          </div>
        </div>
        <div className="ai-status-badge">OPTIMAL</div>
      </div>

      {/* Tabs */}
      <nav className="settings-tabs">
        {TABS.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </nav>

      {/* Content */}
      <div className="settings-content">
        <div className="settings-main">
          {renderTabContent()}
        </div>

        {/* Sidebar */}
        <aside className="settings-sidebar">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <button className="quick-action-btn" onClick={() => {
              showSaveStatus();
              showToast('All changes saved successfully', 'success');
            }}>
              <Save size={16} />
              Save All Changes
            </button>
            <button className="quick-action-btn" onClick={handleResetToDefaults}>
              <RotateCcw size={16} />
              Reset to Defaults
            </button>
            <button className="quick-action-btn" onClick={handleViewChangelog}>
              <FileText size={16} />
              View Changelog
            </button>
          </div>

          {/* System Health */}
          <div className="system-health">
            <div className="system-health-title">
              System Health
              <span className="health-status">HEALTHY</span>
            </div>
            <div className="health-metrics">
              <div className="health-metric">
                <span className="health-metric-label">API Performance</span>
                <span className="health-metric-value">98%</span>
              </div>
              <div className="health-bar">
                <div className="health-bar-fill" style={{ width: '98%' }}></div>
              </div>
              
              <div className="health-metric" style={{ marginTop: '0.75rem' }}>
                <span className="health-metric-label">Storage Used</span>
                <span className="health-metric-value">42%</span>
              </div>
              <div className="health-bar">
                <div className="health-bar-fill" style={{ width: '42%' }}></div>
              </div>
              
              <div className="health-metric" style={{ marginTop: '0.75rem' }}>
                <span className="health-metric-label">Active Integrations</span>
                <span className="health-metric-value">7/10</span>
              </div>
              <div className="health-bar">
                <div className="health-bar-fill" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="quick-actions">
            <h3 className="quick-actions-title">AI Recommendations</h3>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
              <p style={{ marginBottom: '0.75rem' }}>• Enable 2FA for enhanced security</p>
              <p style={{ marginBottom: '0.75rem' }}>• Update timezone to match team location</p>
              <p>• Consider enabling audit logs for compliance</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Save Status Notification */}
      <div className={`save-status ${saveStatus ? 'show' : ''}`}>
        <div className="save-status-icon">
          <Check size={12} />
        </div>
        <span className="save-status-text">Settings saved successfully</span>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`settings-toast ${toastMessage.type}`}>
          <div className="toast-content">
            {toastMessage.type === 'success' && <Check size={18} />}
            {toastMessage.type === 'error' && <AlertCircle size={18} />}
            {toastMessage.type === 'info' && <Info size={18} />}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {showChangelogModal && (
        <div className="settings-modal-overlay" onClick={() => setShowChangelogModal(false)}>
          <div className="settings-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Changelog</h3>
              <button onClick={() => setShowChangelogModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="changelog-entry">
                <h4>Version 2.4.0</h4>
                <p className="changelog-date">Released on December 15, 2024</p>
                <ul className="changelog-list">
                  <li>Added Quantum UI design system</li>
                  <li>Improved AI predictions accuracy by 34%</li>
                  <li>New campaign templates library</li>
                  <li>Enhanced security with 2FA support</li>
                </ul>
              </div>
              <div className="changelog-entry">
                <h4>Version 2.3.0</h4>
                <p className="changelog-date">Released on November 28, 2024</p>
                <ul className="changelog-list">
                  <li>Multi-channel campaign support</li>
                  <li>Advanced analytics dashboard</li>
                  <li>API rate limit configuration</li>
                  <li>Performance improvements</li>
                </ul>
              </div>
              <div className="changelog-entry">
                <h4>Version 2.2.0</h4>
                <p className="changelog-date">Released on October 15, 2024</p>
                <ul className="changelog-list">
                  <li>White label customization</li>
                  <li>Audit logging system</li>
                  <li>New integrations added</li>
                  <li>Bug fixes and stability improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Settings Modal */}
      {showImportModal && (
        <div className="settings-modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="settings-modal compact" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Import Settings</h3>
              <button onClick={() => setShowImportModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="import-area">
                <Upload size={48} />
                <h4>Drop your settings file here</h4>
                <p>or click to browse</p>
                <input 
                  type="file" 
                  accept=".json" 
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // In a real app, you'd parse and apply the settings
                      setShowImportModal(false);
                      showToast('Settings imported successfully', 'success');
                    }
                  }}
                />
              </div>
              <button 
                className="settings-button primary"
                onClick={() => {
                  const input = document.querySelector('input[type="file"]');
                  input?.click();
                }}
              >
                <Upload size={16} />
                Select File
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .quantum-settings {
          min-height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        /* Background */
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
          animation: gridMove 20s linear infinite;
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
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
        }

        /* Header */
        .settings-header {
          position: relative;
          z-index: 10;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-content {
          max-width: 1200px;
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

        /* AI Status */
        .ai-status {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          margin: 0 2rem 1.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .ai-status-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ai-status-icon {
          width: 32px;
          height: 32px;
          background: #8b5cf6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s ease-in-out infinite;
          color: white;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .ai-status-text {
          font-size: 0.875rem;
        }

        .ai-status-badge {
          padding: 0.25rem 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 4px;
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 500;
        }

        /* Tabs */
        .settings-tabs {
          display: flex;
          gap: 2rem;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
          position: relative;
          z-index: 1;
        }

        .tab {
          position: relative;
          padding: 1rem 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          transition: color 0.2s ease;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }

        .tab:hover {
          color: white;
        }

        .tab.active {
          color: white;
          border-bottom-color: #8b5cf6;
        }

        /* Content */
        .settings-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }

        /* Settings Sections */
        .settings-section {
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 1.5rem;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .section-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Form Elements */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .label {
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
        }

        .input,
        .select {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .input:focus,
        .select:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.05);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
        }

        .select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ffffff60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        /* Theme Selector */
        .theme-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .theme-option {
          position: relative;
          cursor: pointer;
        }

        .theme-option input {
          position: absolute;
          opacity: 0;
        }

        .theme-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .theme-option input:checked ~ .theme-label {
          background: rgba(139, 92, 246, 0.1);
          border-color: #8b5cf6;
        }

        .theme-label:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .theme-icon {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .theme-name {
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: 0.2s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: rgba(255, 255, 255, 0.6);
          transition: 0.2s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #8b5cf6;
          border-color: #8b5cf6;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
          background-color: white;
        }

        /* Advanced Settings */
        .advanced-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          margin-top: 2rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .advanced-toggle:hover {
          background: rgba(139, 92, 246, 0.08);
        }

        .advanced-toggle-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
        }

        .advanced-content {
          display: none;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .advanced-content.show {
          display: block;
        }

        /* Sidebar */
        .settings-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Quick Actions */
        .quick-actions {
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .quick-actions-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .quick-action-btn {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.75rem;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .quick-action-btn:last-child {
          margin-bottom: 0;
        }

        .quick-action-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* System Health */
        .system-health {
          background: rgba(26, 26, 46, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .system-health-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .health-status {
          padding: 0.125rem 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 4px;
          font-size: 0.625rem;
          color: #10b981;
          font-weight: 600;
          text-transform: uppercase;
        }

        .health-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .health-metric {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .health-metric-label {
          color: rgba(255, 255, 255, 0.6);
        }

        .health-metric-value {
          font-weight: 500;
        }

        .health-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 0.25rem;
        }

        .health-bar-fill {
          height: 100%;
          background: #10b981;
          border-radius: 2px;
          transition: width 1s ease;
        }

        /* Save Status */
        .save-status {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #1a1a2e;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          display: none;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          z-index: 100;
        }

        .save-status.show {
          display: flex;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .save-status-icon {
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .save-status-text {
          font-size: 0.875rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .settings-content {
            grid-template-columns: 1fr;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .settings-tabs {
            overflow-x: auto;
            gap: 1rem;
          }
          
          .theme-selector {
            grid-template-columns: 1fr;
          }
          
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .header-left {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* Toast Styles */
        .settings-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          animation: slideUp 0.3s ease;
          z-index: 1000;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
        }

        .settings-toast.success {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.1);
        }

        .settings-toast.error {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.1);
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        /* Modal Styles */
        .settings-modal-overlay {
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

        .settings-modal {
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }

        .settings-modal.compact {
          max-width: 400px;
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

        /* Changelog Styles */
        .changelog-entry {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .changelog-entry:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .changelog-entry h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #8b5cf6;
        }

        .changelog-date {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 1rem;
        }

        .changelog-list {
          list-style: none;
          padding: 0;
        }

        .changelog-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .changelog-list li:before {
          content: '•';
          position: absolute;
          left: 0;
          color: #8b5cf6;
        }

        /* Import Area */
        .import-area {
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 3rem;
          text-align: center;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .import-area:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .import-area svg {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1rem;
        }

        .import-area h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .import-area p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .settings-button {
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

        .settings-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .settings-button.primary {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border: none;
          color: white;
          width: 100%;
          justify-content: center;
        }

        .settings-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
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

        /* Users Section */
        .users-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .user-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
        }

        .user-info {
          flex: 1;
        }

        .user-info h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .user-info p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.25rem;
        }

        .user-role {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 4px;
          font-size: 0.75rem;
          color: #a78bfa;
        }

        .user-action {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-action:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .add-user-btn {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .add-user-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-color: rgba(139, 92, 246, 0.3);
        }

        .roles-list {
          display: grid;
          gap: 1rem;
        }

        .role-item {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.2s;
        }

        .role-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .role-item h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .role-item p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
        }

        .user-count {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* Compliance Section */
        .compliance-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .compliance-btn {
          padding: 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .compliance-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        /* Notifications Section */
        .notification-list {
          display: grid;
          gap: 1rem;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
        }

        .notification-item h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .notification-item p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Integrations Section */
        .integrations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .integration-card {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          text-align: center;
          transition: all 0.2s;
        }

        .integration-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .integration-card.connected {
          border-color: rgba(16, 185, 129, 0.3);
        }

        .integration-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .integration-card h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .integration-card p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.75rem;
        }

        .integration-btn {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .integration-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .integration-btn.primary {
          background: #8b5cf6;
          border-color: #8b5cf6;
          color: white;
        }

        .api-section {
          display: grid;
          gap: 1rem;
        }

        .api-key-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
        }

        .api-key-item h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .api-key {
          font-family: monospace;
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .api-action {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        /* White Label Section */
        .color-input {
          width: 100%;
          height: 40px;
          padding: 0.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          cursor: pointer;
        }

        .upload-area {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-area:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .upload-area svg {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 0.5rem;
        }

        .upload-area p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .domain-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 6px;
          color: #f59e0b;
          font-size: 0.8125rem;
        }

        /* Audit Section */
        .audit-log {
          display: grid;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .log-entry {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
        }

        .log-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .log-icon.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .log-icon.info {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .log-icon.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .log-details h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .log-details p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.25rem;
        }

        .log-time {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .view-all-btn {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        /* Monitoring Section */
        .monitoring-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .monitor-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          text-align: center;
        }

        .monitor-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .monitor-header h4 {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .monitor-value {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #10b981;
        }

        .monitor-detail {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .alert-list {
          display: grid;
          gap: 0.75rem;
        }

        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
        }

        .alert-item h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .alert-item p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Billing Section */
        .billing-plan {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .plan-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .plan-price {
          font-size: 1.5rem;
          font-weight: 600;
          color: #8b5cf6;
        }

        .plan-features {
          display: grid;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .feature-item svg {
          color: #10b981;
        }

        .usage-stats {
          display: grid;
          gap: 0.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .usage-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .usage-item span {
          color: rgba(255, 255, 255, 0.6);
        }

        .usage-item strong {
          color: white;
        }

        .payment-method {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .card-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .card-info h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .card-info p {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .update-payment-btn {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .billing-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .billing-btn {
          padding: 0.75rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .billing-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
      `}</style>
    </div>
  );
}