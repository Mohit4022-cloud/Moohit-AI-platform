import React from 'react';
import { Activity } from 'lucide-react';

// Quantum Icon Component with advanced visual effects
export const QuantumIcon = ({ 
  icon: Icon, 
  size = 24, 
  color, 
  modifier, 
  className = '',
  style = {}
}) => {
  const getModifierElements = () => {
    switch (modifier) {
      case 'neural':
        return (
          <div className="icon-overlay">
            <Activity size={size * 0.6} className="icon-secondary" />
            <div className="neural-connections">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        );
      
      case 'quantum':
        return (
          <div className="icon-particles">
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      
      case 'electric':
        return (
          <div className="electric-field">
            <div className="electric-ring"></div>
            <div className="electric-bolts">
              <span></span>
              <span></span>
            </div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className="pulse-rings">
            <span></span>
            <span></span>
          </div>
        );
      
      case 'shield':
        return (
          <div className="shield-effect">
            <div className="shield-scan"></div>
            <div className="shield-corners">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        );
      
      case 'sparkle':
        return (
          <div className="icon-sparkles">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        );
      
      default:
        return null;
    }
  };

  const modifierClass = modifier ? `icon-${modifier}` : '';
  
  return (
    <div 
      className={`quantum-icon-wrapper ${modifierClass} ${className}`}
      style={{
        '--icon-color': color,
        '--icon-size': `${size}px`,
        ...style
      }}
    >
      <Icon size={size} />
      {getModifierElements()}
    </div>
  );
};

// Pre-configured quantum icons for common use cases
export const QuantumActivityIcon = (props) => (
  <QuantumIcon {...props} modifier="pulse" />
);

export const QuantumBrainIcon = (props) => (
  <QuantumIcon {...props} modifier="neural" />
);

export const QuantumZapIcon = (props) => (
  <QuantumIcon {...props} modifier="electric" />
);

export const QuantumSparklesIcon = (props) => (
  <QuantumIcon {...props} modifier="sparkle" />
);

export const QuantumShieldIcon = (props) => (
  <QuantumIcon {...props} modifier="shield" />
);

export default QuantumIcon;