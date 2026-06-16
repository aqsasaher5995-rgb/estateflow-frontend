import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'owner'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on typing
    setSuccessMsg(''); // Clear success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      console.log('Submitting registration:', formData);
      const result = await authService.register(formData);
      console.log('Register result:', result);
      
      if (result.success) {
        setSuccessMsg('✅ Registration successful! Redirecting...');
        // Store token if needed
        if (result.data?.token) {
          localStorage.setItem('token', result.data.token);
        }
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Register error:', err);
      
      // Better error handling
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        // Server responded with error
        const serverMessage = err.response.data?.message;
        console.log('Server error message:', serverMessage);
        
        if (serverMessage?.toLowerCase().includes('already exists')) {
          errorMessage = '❌ This email is already registered. Please login instead.';
        } else if (serverMessage?.toLowerCase().includes('duplicate')) {
          errorMessage = '❌ This email is already registered. Please login instead.';
        } else if (serverMessage) {
          errorMessage = `❌ ${serverMessage}`;
        }
      } else if (err.message) {
        errorMessage = `❌ ${err.message}`;
      }
      
      setError(errorMessage);
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
          <h1 className="heading">Create account</h1>
          <p className="subheading">Join the future of property management</p>

          {successMsg && (
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '14px',
              textAlign: 'center'
            }}>{successMsg}</div>
          )}

          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '16px',
              fontSize: '14px',
              textAlign: 'center'
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="modern-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="modern-input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="modern-input"
                placeholder="+92 98765 43210"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="modern-input"
                placeholder="Create a password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="primary-btn">
              {loading ? <div className="spinner"></div> : 'Create account'}
            </button>
          </form>

          <div className="footer-text">
            Already have an account?
            <a href="/login" className="footer-link">Sign in</a>
          </div>

          <div className="bottom-nav">
            <button className="nav-btn" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className={`nav-btn ${window.location.pathname === '/register' ? 'active' : ''}`} onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;