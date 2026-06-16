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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await authService.register(formData);
      console.log('Register result:', result);
      
      if (result.success) {
        // CHANGE THIS LINE - Dashboard se Home page pe
        window.location.href = '/';
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: '#000000' }}>
      <div className="bg-property"></div>
      <div className="glow-card fade-up">
        <div className="text-center">
          <span className="logo">EstateFlow</span>
        </div>
        <h1 className="heading">Create account</h1>
        <p className="subheading">Join the future of property management</p>

        {error && <div className="error-msg">{error}</div>}

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
  );
};

export default Register;