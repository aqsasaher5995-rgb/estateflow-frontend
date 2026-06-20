import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import Avatar from '../common/Avatar';

// ===== IMPORT LOGO =====
import Logo from '../../public/logo.png';  // Try this first
// OR
// import Logo from '../public/logo.png';  // Try this if above doesn't work

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Services', path: '/services' },
  { label: 'Agents', path: '/agents' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="glass-header"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '12px 0', background: 'rgba(8, 11, 23, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* ===== LOGO WITH IMAGE ===== */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          {/* ===== ACTUAL LOGO.PNG ===== */}
          <img 
            src={Logo} 
            alt="EstateFlow Logo" 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              objectFit: 'contain',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              padding: '4px'
            }}
          />
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'white', letterSpacing: '-0.3px' }}>
            EstateFlow
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              style={{
                color: isActive(link.path) ? '#6366f1' : '#9ca3af',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive(link.path) ? '600' : '400',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isActive(link.path)) e.target.style.color = 'white'; }}
              onMouseLeave={e => { if (!isActive(link.path)) e.target.style.color = '#9ca3af'; }}
            >
              {link.label}
              {isActive(link.path) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#6366f1',
                    borderRadius: '2px',
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="desktop-nav">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '8px 20px',
                  background: 'transparent',
                  border: '1px solid #6366f1',
                  color: '#6366f1',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.1)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                Dashboard
              </button>
              <Avatar />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '8px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '8px 20px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { e.target.style.transform = 'scale(1)'; }}
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '4px' }}
          className="mobile-btn"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            background: 'rgba(8,11,17,0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 24px 24px',
            animation: 'fadeInDown 0.2s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              style={{
                display: 'block',
                padding: '12px 0',
                color: isActive(link.path) ? '#6366f1' : '#9ca3af',
                textDecoration: 'none',
                fontWeight: isActive(link.path) ? '600' : '400',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                fontSize: '15px',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '40px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '40px',
                    cursor: 'pointer',
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '40px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1000px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 1001px) {
          .mobile-btn { display: none !important; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;