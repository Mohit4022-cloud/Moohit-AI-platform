import React from 'react';

// Calendar Icon with Time Vortex Effect
export const QuantumCalendar = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <linearGradient id="calendarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
      <filter id="calendarGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g className="calendar-base" filter="url(#calendarGlow)">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="url(#calendarGrad)" strokeWidth="1.5" fill="none" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="url(#calendarGrad)" strokeWidth="1.5" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="url(#calendarGrad)" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="url(#calendarGrad)" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="time-vortex">
      <circle cx="12" cy="15" r="3" fill="none" stroke="url(#calendarGrad)" strokeWidth="1" opacity="0.6">
        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="12" cy="15" r="1.5" fill="currentColor" opacity="0.8" />
    </g>
  </svg>
);

// Download Icon with Data Stream Effect
export const QuantumDownload = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <linearGradient id="downloadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g className="download-base">
      <path d="M12 2v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g className="data-stream">
      <rect x="11" y="2" width="2" height="4" fill="url(#downloadGrad)" opacity="0">
        <animate attributeName="y" values="2;12;2" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <rect x="11" y="2" width="2" height="4" fill="url(#downloadGrad)" opacity="0">
        <animate attributeName="y" values="2;12;2" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);

// Plus Icon with Quantum Expansion Effect
export const QuantumPlus = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <filter id="plusGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g className="plus-base" filter="url(#plusGlow)">
      <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="quantum-particles">
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0">
        <animate attributeName="r" values="1;8;1" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// Share Icon with Network Pulse Effect
export const QuantumShare = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <linearGradient id="shareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <g className="share-nodes">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>
    <g className="network-links">
      <path d="M8.6 10.8l6.8-3.9M8.6 13.2l6.8 3.9" stroke="url(#shareGrad)" strokeWidth="1.5" />
    </g>
    <g className="pulse-effect">
      <circle cx="18" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="3;6;3" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="18" cy="19" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="3;6;3" dur="3s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin="2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// Bell Icon with Resonance Waves
export const QuantumBell = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <radialGradient id="bellGrad" cx="50%" cy="30%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    <g className="bell-base">
      <path d="M12 2a6 6 0 00-6 6v3.5c0 .5-.2 1-.6 1.4l-1.1 1.1c-.6.6-.2 1.5.6 1.5h14.2c.8 0 1.2-.9.6-1.5l-1.1-1.1c-.4-.4-.6-.9-.6-1.4V8a6 6 0 00-6-6z" 
            stroke="url(#bellGrad)" strokeWidth="1.5" fill="none" />
      <path d="M10 20a2 2 0 104 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g className="resonance-waves">
      <path d="M12 2v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0">
        <animate attributeName="d" values="M12 2v0;M12 0v4;M12 2v0" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="12" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

// Chevron with Quantum Fold Effect
export const QuantumChevron = ({ size = 16, className = '', direction = 'down' }) => {
  const rotations = {
    down: 0,
    up: 180,
    left: 90,
    right: -90
  };
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}
         style={{ transform: `rotate(${rotations[direction]}deg)` }}>
      <defs>
        <linearGradient id="chevronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g className="chevron-base">
        <path d="M6 9l6 6 6-6" stroke="url(#chevronGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="quantum-fold">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1" opacity="0" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="d" values="M6 9l6 6 6-6;M8 11l4 4 4-4;M6 9l6 6 6-6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
};

// Export Icon with Dimensional Shift
export const QuantumExport = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`quantum-icon ${className}`}>
    <defs>
      <linearGradient id="exportGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <g className="export-base">
      <path d="M12 14V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <g className="dimensional-shift">
      <rect x="11" y="14" width="2" height="4" fill="url(#exportGrad)" opacity="0">
        <animate attributeName="y" values="14;4;14" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);