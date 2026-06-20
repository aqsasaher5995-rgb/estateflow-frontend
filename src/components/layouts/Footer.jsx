import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  // Social Media Links - Working URLs
  const socialLinks = {
    facebook: "https://facebook.com/estateflow",
    twitter: "https://twitter.com/estateflow",
    instagram: "https://instagram.com/estateflow",
    linkedin: "https://linkedin.com/company/estateflow"
  };

  return (
    <footer
      style={{
        background: '#05070a',
        padding: '60px 24px 30px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>🏠</span>
              </div>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '18px' }}>EstateFlow</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Pakistan's #1 premium real estate platform with 31+ properties and 1250+ happy clients.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Facebook */}
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1877f2'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Facebook size={14} />
              </a>
              {/* Twitter/X */}
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Twitter size={14} />
              </a>
              {/* Instagram */}
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#bc1888'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Instagram size={14} />
              </a>
              {/* LinkedIn */}
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '34px', 
                  height: '34px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#9ca3af', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a66c2'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#0a66c2'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links - No Arrows */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[['Home', '/'], ['Browse Properties', '/properties'], ['Our Services', '/services'], ['Meet Our Agents', '/agents'], ['Testimonials', '/testimonials']].map(([label, path]) => (
                <li key={path}>
                  <a href={path} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.target.style.color = '#818cf8'; }}
                    onMouseLeave={e => { e.target.style.color = '#9ca3af'; }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - No Arrows */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQ', 'Blog'].map(item => (
                <li key={item}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.target.style.color = '#818cf8'; }}
                    onMouseLeave={e => { e.target.style.color = '#9ca3af'; }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={15} style={{ color: '#6366f1', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5' }}>DHA Phase 6, Karachi, Pakistan</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={15} style={{ color: '#6366f1', flexShrink: 0 }} />
                <a href="tel:+923001234567" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>+92-300-1234567</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={15} style={{ color: '#6366f1', flexShrink: 0 }} />
                <a href="mailto:info@estateflow.com" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>info@estateflow.com</a>
              </li>
            </ul>
            <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🏆</span>
              <div>
                <p style={{ color: '#818cf8', fontSize: '11px', fontWeight: '700', margin: 0 }}>AWARD WINNER</p>
                <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>Best PropTech 2025 — Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>© 2026 EstateFlow. All rights reserved. Crafted with ❤️ in Pakistan.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms', 'Sitemap'].map(item => (
              <a key={item} href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.target.style.color = '#9ca3af'; }}
                onMouseLeave={e => { e.target.style.color = '#6b7280'; }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
};

export default Footer;