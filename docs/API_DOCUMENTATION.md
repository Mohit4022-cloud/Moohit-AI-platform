# Moohit AI Platform - API Documentation

## Table of Contents

1. [QuantumDashboard Component](#quantumdashboard-component)
2. [AI Insight Engine](#ai-insight-engine)
3. [Hooks](#hooks)
4. [Sub-Components](#sub-components)
5. [Constants and Types](#constants-and-types)
6. [Events and Callbacks](#events-and-callbacks)

---

## QuantumDashboard Component

The main dashboard component that orchestrates all features of the Moohit AI Platform.

### Import

```jsx
import QuantumDashboard from './components/QuantumDashboard';
```

### Props

The QuantumDashboard component currently doesn't accept any props, operating as a self-contained dashboard system.

### State Management

| State Variable | Type | Default | Description |
|----------------|------|---------|-------------|
| `selectedNav` | string | 'dashboard' | Currently selected navigation item |
| `commandPaletteOpen` | boolean | false | Command palette visibility state |
| `aiInsights` | object \| null | null | AI-generated insights data |
| `focusMode` | boolean | false | Focus mode toggle state |
| `voiceEnabled` | boolean | false | Voice control activation state |

### Usage Example

```jsx
import React from 'react';
import QuantumDashboard from './components/QuantumDashboard';

function App() {
  return <QuantumDashboard />;
}
```

---

## AI Insight Engine

The core AI analysis engine that powers intelligent features throughout the dashboard.

### Class: AIInsightEngine

```javascript
class AIInsightEngine {
  constructor()
  analyzeBehavior(interactions)
  getSuggestedAction(hour, day)
  predictLeadVolume(hour)
  detectAnomalies(interactions)
  identifyOpportunities(interactions)
}
```

### Methods

#### `analyzeBehavior(interactions)`

Analyzes user interaction patterns and generates comprehensive insights.

**Parameters:**
- `interactions` (Array): Array of user interaction data

**Returns:**
```javascript
{
  peakTime: boolean,              // Whether current time is peak hours
  suggestedAction: object | null, // Recommended action based on time/day
  predictedLeads: number,         // Expected lead volume for next hour
  anomalies: Array,               // Detected anomalies in patterns
  opportunities: Array            // High-value lead opportunities
}
```

#### `getSuggestedAction(hour, day)`

Generates contextual action suggestions based on time and day.

**Parameters:**
- `hour` (number): Current hour (0-23)
- `day` (number): Day of week (0-6, where 0 is Sunday)

**Returns:**
```javascript
{
  type: string,    // Action type: 'prepare', 'optimize', 'follow-up', 'weekly'
  message: string  // Human-readable action description
}
```

#### `predictLeadVolume(hour)`

Predicts lead volume based on historical patterns and time of day.

**Parameters:**
- `hour` (number): Hour to predict for (0-23)

**Returns:**
- `number`: Predicted lead count

#### `detectAnomalies(interactions)`

Identifies unusual patterns in user interactions.

**Returns:**
```javascript
[
  {
    type: string,    // 'positive' or 'attention'
    message: string  // Description of the anomaly
  }
]
```

#### `identifyOpportunities(interactions)`

Identifies high-value lead opportunities based on behavior patterns.

**Returns:**
```javascript
[
  {
    score: number,   // Conversion probability (0-100)
    lead: string,    // Lead name
    reason: string   // Explanation for high score
  }
]
```

### Usage Example

```javascript
const aiEngine = new AIInsightEngine();
const insights = aiEngine.analyzeBehavior(userInteractions);

// Access predictions
console.log(`Expected leads: ${insights.predictedLeads}`);

// Check for opportunities
insights.opportunities.forEach(opp => {
  console.log(`${opp.lead}: ${opp.score}% - ${opp.reason}`);
});
```

---

## Hooks

### useNeuroResponsive

A custom React hook that implements neuro-responsive design by tracking cognitive load and adapting the UI accordingly.

#### Import

```javascript
const { 
  cognitiveLoad, 
  emotionalState, 
  interactionVelocity, 
  userContext,
  adaptiveStyles, 
  setEmotionalState,
  aiEngine 
} = useNeuroResponsive();
```

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `cognitiveLoad` | number | Current cognitive load (0-1) |
| `emotionalState` | string | Current emotional state identifier |
| `interactionVelocity` | number | Rate of user interactions |
| `userContext` | object | Comprehensive user context data |
| `adaptiveStyles` | object | CSS variables for adaptive styling |
| `setEmotionalState` | function | Update emotional state |
| `aiEngine` | AIInsightEngine | Instance of AI engine |

#### userContext Object Structure

```javascript
{
  timeSpent: number,           // Seconds spent in session
  actionsPerMinute: number,    // User activity rate
  errorRate: number,           // Error frequency (0-1)
  currentTask: string,         // Current user task
  cognitiveState: string       // 'flow', 'focused', 'overwhelmed', 'fatigue'
}
```

#### adaptiveStyles Object

Dynamic CSS variables that adapt based on cognitive load:

```javascript
{
  '--cognitive-load': number,
  '--primary-hue': number,
  '--primary-saturation': string,
  '--primary-lightness': string,
  '--spacing-unit': string,
  '--animation-speed': string,
  '--complexity-level': string,
  '--font-size-multiplier': number,
  '--contrast-boost': number
}
```

---

## Sub-Components

### CommandPalette

Quick command interface for keyboard-driven navigation.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Visibility state |
| `onClose` | function | Yes | Close handler |
| `onCommand` | function | Yes | Command execution handler |

#### Available Commands

```javascript
[
  { id: 'quick-response', label: 'Enable Quick Response Mode', shortcut: '⌘Q' },
  { id: 'ai-suggest', label: 'Get AI Suggestions', shortcut: '⌘S' },
  { id: 'focus-mode', label: 'Enter Focus Mode', shortcut: '⌘F' },
  { id: 'voice-control', label: 'Start Voice Control', shortcut: '⌘V' },
  { id: 'auto-qualify', label: 'Auto-Qualify Leads', shortcut: '⌘A' },
  { id: 'break-reminder', label: 'Set Break Reminder', shortcut: '⌘B' }
]
```

### AIInsightCard

Displays AI-generated insights and recommendations.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `insights` | object | Yes | AI insights data |
| `onAction` | function | Yes | Action handler for suggestions |

### SmartMetricCard

Displays key performance indicators with predictions.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | Component | Yes | Lucide icon component |
| `value` | string/number | Yes | Metric value |
| `label` | string | Yes | Metric label |
| `change` | string | No | Change percentage |
| `color` | number | Yes | HSL hue value |
| `trend` | string | No | 'up' or 'down' |
| `prediction` | number | No | Predicted change |
| `context` | object | No | Additional context data |

### VoiceControl

Voice command interface component.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onCommand` | function | Yes | Voice command handler |

### EnhancedLeadCard

Interactive lead display with AI scoring.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `lead` | object | Yes | Lead data object |
| `index` | number | Yes | Card index for animation |
| `aiScore` | number | No | AI conversion score (0-100) |

#### Lead Object Structure

```javascript
{
  id: number,
  initials: string,
  name: string,
  company: string,
  status: string,
  channel: string,
  time: string,
  aiScore: number,
  context: string
}
```

### CognitiveLoadIndicator

Visual indicator for current cognitive load state.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `load` | number | Yes | Cognitive load value (0-1) |
| `state` | string | Yes | Cognitive state identifier |

---

## Constants and Types

### QUANTUM_CONSTANTS

Core constants that drive the quantum-inspired design system.

```javascript
{
  PHI: 1.618033988749,  // Golden ratio
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
}
```

---

## Events and Callbacks

### Command Execution

```javascript
const handleCommand = (command) => {
  switch(command.id) {
    case 'focus-mode':
      setFocusMode(true);
      break;
    case 'voice-control':
      setVoiceEnabled(true);
      break;
    // ... other commands
  }
};
```

### Voice Command Handler

```javascript
const handleVoiceCommand = (command) => {
  // command.type: 'voice'
  // command.command: specific voice command identifier
};
```

### AI Action Handler

```javascript
const handleAIAction = (action) => {
  // action.type: action type
  // action.message: action description
};
```

---

## Performance Considerations

1. **Cognitive Load Monitoring**: Updates every 5 seconds to prevent excessive re-renders
2. **AI Insights**: Refreshes every 10 seconds to balance real-time updates with performance
3. **Animation Performance**: Uses CSS transforms and `will-change` for smooth animations
4. **Memoization**: Critical calculations are memoized using `useMemo`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Keyboard navigation fully supported
- ARIA labels on interactive elements
- High contrast mode support via `--contrast-boost` variable
- Focus indicators on all interactive elements