import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Play, Layers,
  Github, Chrome, AlertCircle
} from 'lucide-react';

// Particle Component
const ParticleSystem = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particlesRef.current.appendChild(particle);
    }
  }, []);

  return <div ref={particlesRef} className="particles" />;
};

// Neural Network Component
const NeuralNetwork = () => {
  const neuralRef = useRef(null);

  useEffect(() => {
    if (!neuralRef.current) return;
    
    const lineCount = 10;
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.className = 'neural-line';
      line.style.top = Math.random() * 100 + '%';
      line.style.width = (Math.random() * 200 + 100) + 'px';
      line.style.animationDelay = Math.random() * 4 + 's';
      line.style.animationDuration = (Math.random() * 2 + 3) + 's';
      neuralRef.current.appendChild(line);
    }
  }, []);

  return <div ref={neuralRef} className="neural-network" />;
};

// Main Login Component
export default function QuantumLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      // For demo purposes, accept any email/password
      if (formData.email && formData.password) {
        // Store auth state (in real app, use proper auth)
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 2000);
  };

  // Explore demo
  const exploreDemo = () => {
    navigate('/dashboard');
  };

  // Social login handlers
  const socialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic
  };

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.querySelectorAll('.orb').forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="quantum-login">
      {/* Quantum Background */}
      <div className="quantum-bg">
        <div className="grid-layer"></div>
        <ParticleSystem />
        <NeuralNetwork />
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Login Container */}
      <div className="login-container">
        <div className="login-card">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo">
              <Layers className="logo-icon" size={40} />
            </div>
            <h1 className="logo-title">Mohit AI</h1>
            <p className="logo-subtitle">Welcome to the future of AI</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="form-input" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Mail className="input-icon" size={20} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Lock className="input-icon" size={20} />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="remember" 
                  name="remember"
                  className="checkbox"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                <label htmlFor="remember" className="checkbox-label">Remember me</label>
              </div>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <button type="button" className="btn btn-demo" onClick={exploreDemo}>
              <Play size={20} />
              <span className="gradient-text">Explore Platform Without Login</span>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or continue with</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn" onClick={() => socialLogin('google')}>
              <Chrome className="social-icon" size={20} />
              Google
            </button>
            <button className="social-btn" onClick={() => socialLogin('github')}>
              <Github className="social-icon" size={20} />
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            Don't have an account? <a href="#">Sign up for free</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .quantum-login {
          min-height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          overflow: hidden;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Quantum Background */
        .quantum-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        /* Animated Grid */
        .grid-layer {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Floating Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: float 20s infinite ease-in-out;
          transition: transform 0.1s ease;
        }

        .orb1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
          top: -150px;
          left: -150px;
          animation-duration: 25s;
        }

        .orb2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
          bottom: -200px;
          right: -200px;
          animation-duration: 30s;
          animation-delay: -5s;
        }

        .orb3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 35s;
          animation-delay: -10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(100px, -100px) scale(1.1);
          }
          66% {
            transform: translate(-100px, 100px) scale(0.9);
          }
        }

        /* Particle System */
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        :global(.particle) {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #8b5cf6;
          border-radius: 50%;
          animation: particle-float 15s linear infinite;
        }

        @keyframes particle-float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        /* Neural Network Lines */
        .neural-network {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0.3;
        }

        :global(.neural-line) {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          animation: neural-pulse 4s infinite;
        }

        @keyframes neural-pulse {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        /* Main Container */
        .login-container {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* Login Card */
        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.5),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          animation: cardEntry 0.8s ease-out;
          position: relative;
          overflow: hidden;
        }

        @keyframes cardEntry {
          0% {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* Glow Effect */
        .login-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #8b5cf6, #06b6d4, #ec4899);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
          animation: glow-rotate 3s linear infinite;
        }

        .login-card:hover::before {
          opacity: 0.5;
        }

        @keyframes glow-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Logo Section */
        .logo-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          animation: logo-float 3s ease-in-out infinite;
        }

        @keyframes logo-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .logo-icon {
          color: white;
        }

        .logo-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .logo-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Form Styles */
        .login-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.3s ease;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 0.9375rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .form-input:focus ~ .input-icon {
          color: #8b5cf6;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.3s ease;
        }

        /* Password Toggle */
        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Remember & Forgot */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox {
          width: 18px;
          height: 18px;
          appearance: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .checkbox:checked {
          background: #8b5cf6;
          border-color: #8b5cf6;
        }

        .checkbox:checked::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }

        .forgot-link {
          font-size: 0.875rem;
          color: #a78bfa;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #8b5cf6;
          text-decoration: underline;
        }

        /* Buttons */
        .btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .btn-demo {
          background: transparent;
          border: 2px solid #06b6d4;
          color: #06b6d4;
          position: relative;
          overflow: hidden;
        }

        .btn-demo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: rgba(6, 182, 212, 0.1);
          transition: width 0.3s ease;
        }

        .btn-demo:hover::before {
          width: 100%;
        }

        .btn-demo:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.3);
        }

        /* Loading State */
        .btn-loading {
          color: transparent;
        }

        .spinner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Error Message */
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: shake 0.5s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          margin: 2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider-text {
          padding: 0 1rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Social Login */
        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .social-btn {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .social-icon {
          color: rgba(255, 255, 255, 0.8);
        }

        /* Sign Up Link */
        .signup-link {
          text-align: center;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .signup-link a {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .signup-link a:hover {
          color: #8b5cf6;
          text-decoration: underline;
        }

        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(270deg, #8b5cf6, #06b6d4, #ec4899);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 2rem;
          }
          
          .social-login {
            grid-template-columns: 1fr;
          }
          
          .logo {
            width: 60px;
            height: 60px;
          }
          
          .logo-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}