import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.login({ email, password });
      console.log('Login result:', result);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        window.location.href = '/';
      } else {
        setError('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: '#000000', margin: 0, padding: 0 }}>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="glow-card fade-up" style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <div className="text-center">
            <span className="logo">EstateFlow</span>
          </div>
          <h1 className="heading">Welcome back</h1>
          <p className="subheading">Sign in to your account</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modern-input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modern-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? <div className="spinner"></div> : 'Sign in'}
            </button>
          </form>

          <div className="footer-text">
            Don't have an account?
            <a href="/register" className="footer-link">Sign up</a>
          </div>

          <div className="bottom-nav">
            <button className={`nav-btn ${window.location.pathname === '/login' ? 'active' : ''}`} onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="nav-btn" onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;