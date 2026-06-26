import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

const Footer = () => {
  const defaultData = {
    companyName: 'EstateFlow',
    tagline: "Pakistan's leading real estate platform",
    email: 'info@estateflow.com',
    phone: '0300-1234567',
    address: 'DHA Phase 6, Karachi, Pakistan',
    socialLinks: {
      facebook: 'https://facebook.com/estateflow',
      twitter: 'https://twitter.com/estateflow',
      instagram: 'https://instagram.com/estateflow',
      linkedin: 'https://linkedin.com/company/estateflow'
    },
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'Properties', path: '/properties' },
      { label: 'Services', path: '/services' },
      { label: 'Agents', path: '/agents' },
      { label: 'Contact', path: '/contact' }
    ],
    resources: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Blog', path: '/blog' }
    ],
    copyright: '© 2024 EstateFlow. All rights reserved.'
  };

  const [footerData, setFooterData] = useState(defaultData);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get(`${API_URL}/footer`);
        if (response.data) setFooterData(response.data);
      } catch (error) {
        console.log('Using default footer data');
      }
    };
    fetchFooter();
  }, []);

  const socialLinks = [
    { name: 'Facebook', url: footerData.socialLinks?.facebook || '#', color: '#1877f2',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: 'Twitter', url: footerData.socialLinks?.twitter || '#', color: '#000000',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { name: 'Instagram', url: footerData.socialLinks?.instagram || '#', color: '#bc1888',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    { name: 'LinkedIn', url: footerData.socialLinks?.linkedin || '#', color: '#0a66c2',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }
  ];

  return (
    <footer style={{ background: '#05070a', padding: '60px 24px 30px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>🏠</span></div>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '18px' }}>{footerData.companyName}</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>{footerData.tagline}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" 
                  style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = social.color; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = social.color; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerData.quickLinks?.map((link, index) => (
                <li key={index}><Link to={link.path} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerData.resources?.map((link, index) => (
                <li key={index}><Link to={link.path} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#818cf8'} onMouseLeave={e => e.target.style.color = '#9ca3af'}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '20px', fontWeight: '700', fontSize: '15px' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}><MapPin size={15} style={{ color: '#6366f1', marginTop: '2px', flexShrink: 0 }} /><span style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5' }}>{footerData.address}</span></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={15} style={{ color: '#6366f1', flexShrink: 0 }} /><a href={`tel:${footerData.phone}`} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>{footerData.phone}</a></li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={15} style={{ color: '#6366f1', flexShrink: 0 }} /><a href={`mailto:${footerData.email}`} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>{footerData.email}</a></li>
            </ul>
            <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🏆</span>
              <div><p style={{ color: '#818cf8', fontSize: '11px', fontWeight: '700', margin: 0 }}>AWARD WINNER</p><p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>Best PropTech 2025 — Pakistan</p></div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{footerData.copyright}</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#9ca3af'} onMouseLeave={e => e.target.style.color = '#6b7280'}>Privacy</Link>
            <Link to="/terms" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#9ca3af'} onMouseLeave={e => e.target.style.color = '#6b7280'}>Terms</Link>
            <Link to="/sitemap" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#9ca3af'} onMouseLeave={e => e.target.style.color = '#6b7280'}>Sitemap</Link>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } } @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
};

export default Footer;