import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const PageLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        background: '#0a0a0a', 
        borderBottom: '1px solid #1f2937',
        zIndex: 100,
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '18px' }}>🏠</span>
            </div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>EstateFlow</span>
          </div>
          <button onClick={() => navigate('/')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #3b82f6', borderRadius: '30px', color: '#3b82f6', cursor: 'pointer', fontSize: '14px' }}>
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>{title}</h1>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>{subtitle}</p>
        </div>
        {children}
      </div>

      {/* Footer */}
      <footer style={{ background: '#0a0a0a', padding: '60px 32px 30px', borderTop: '1px solid #1f2937' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '50px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>🏠</span>
                </div>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>EstateFlow</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Your trusted partner in real estate. Find your dream home with us.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none' }}>Properties</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none' }}>Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Blog</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>FAQs</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af', fontSize: '14px' }}>
                <li>📍 123 Business Ave, NY</li>
                <li>📞 (555) 123-4567</li>
                <li>✉️ info@estateflow.com</li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #1f2937', color: '#6b7280', fontSize: '13px' }}>
            <p>© 2024 EstateFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;