import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Download, Layers, Shield, Sun, Moon, Monitor, Save, RotateCcw,
  FileText, Check, ChevronDown, Activity, HardDrive, Link2, Sparkles,
  User, Lock, Bell, Building, CreditCard, Eye, AlertCircle, Info,
  Globe, Calendar, DollarSign, Clock, Zap, Database, Code, GitBranch
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

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
    }
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
      
      // Add other tab content here
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
          <button className="btn btn-primary" onClick={handleExportSettings}>
            <Download size={16} />
            Export Settings
          </button>
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
            onClick={() => setActiveTab(tab.id)}
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
            <button className="quick-action-btn" onClick={showSaveStatus}>
              <Save size={16} />
              Save All Changes
            </button>
            <button className="quick-action-btn" onClick={handleResetToDefaults}>
              <RotateCcw size={16} />
              Reset to Defaults
            </button>
            <button className="quick-action-btn">
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
      `}</style>
    </div>
  );
}