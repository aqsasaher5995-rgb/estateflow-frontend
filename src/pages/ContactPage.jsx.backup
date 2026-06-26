import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../components/common/Avatar';

// ============= GLOBAL STYLES =============
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .contact-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-card:hover {
      transform: translateY(-5px);
      border-color: #3b82f640;
    }
    
    button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    @media (max-width: 1000px) {
      .desktop-nav { display: none !important; }
      .mobile-btn { display: flex !important; }
    }
    @media (min-width: 1001px) {
      .mobile-btn { display: none !important; }
    }
    
    @media (max-width: 968px) {
      .contact-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
      .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    
    @media (max-width: 640px) {
      .contact-info-grid { grid-template-columns: 1fr !important; }
      .hero-section h1 { font-size: 32px !important; }
    }
    
    @media print {
      .contact-header, .contact-footer, .map-section { display: none !important; }
    }
    
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #0f172a; border-radius: 10px; }
    ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
  `}</style>
);

// ============= CONTACT DATA =============
const CONTACT_INFO = {
  address: {
    main: "123 Main Boulevard, Gulberg III",
    city: "Lahore, Punjab 54000",
    landmark: "Near Liberty Chowk",
    country: "Pakistan"
  },
  phone: {
    main: "+92 42 3578 1234",
    tollFree: "0800-12345",
    whatsapp: "+92 300 1234567"
  },
  email: {
    info: "info@estateflow.pk",
    support: "support@estateflow.pk",
    careers: "careers@estateflow.pk"
  },
  hours: {
    weekdays: "9:00 AM - 9:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed (Online support available)"
  },
  social: {
    facebook: "https://facebook.com/estateflow",
    instagram: "https://instagram.com/estateflow",
    twitter: "https://twitter.com/estateflow",
    linkedin: "https://linkedin.com/company/estateflow"
  }
};

const OFFICES = [
  { city: "Lahore", address: "Gulberg III, Main Boulevard", phone: "+92 42 3578 1234" },
  { city: "Karachi", address: "Clifton, Block 5", phone: "+92 21 3589 5678" },
  { city: "Islamabad", address: "F-7, Jinnah Super", phone: "+92 51 2345 6789" }
];

// ============= HEADER COMPONENT =============
const Header = ({ isAuthenticated, navigate, isMenuOpen, setIsMenuOpen, navItems }) => (
  <header style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    background: 'rgba(0,0,0,0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    zIndex: 1000,
    padding: '12px 0'
  }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px' }}>🏠</span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>EstateFlow</span>
          <span style={{ fontSize: '10px', background: '#10b981', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px' }}>PK</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navItems.map(item => (
            <a 
              key={item.path}
              href={item.path} 
              style={{ 
                color: item.active ? '#3b82f6' : '#ccc', 
                textDecoration: 'none', 
                fontSize: '14px',
                fontWeight: item.active ? '500' : '400'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="desktop-nav">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                Dashboard
              </button>
              <Avatar />
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                Sign In
              </button>
              <button onClick={() => navigate('/register')} style={{ padding: '8px 20px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                Get Started
              </button>
            </>
          )}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
          <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navItems.map(item => (
            <a key={item.path} href={item.path} style={{ display: 'block', padding: '10px 0', color: item.active ? '#3b82f6' : 'white', textDecoration: 'none' }}>
              {item.label}
            </a>
          ))}
          {isAuthenticated ? (
            <button onClick={() => navigate('/dashboard')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Dashboard</button>
          ) : (
            <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Sign In</button>
          )}
        </div>
      )}
    </div>
  </header>
);

// ============= HERO SECTION =============
const HeroSection = () => (
  <div style={{ textAlign: 'center', marginBottom: '40px', animation: 'fadeInUp 0.6s ease' }}>
    <div style={{ display: 'inline-block', marginBottom: '16px', padding: '4px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: '50px' }}>
      <span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '500' }}>📞 Get in Touch</span>
    </div>
    <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
      Contact Our Team
    </h1>
    <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
      Have questions about buying, selling, or renting? Our expert team is here to help you 
      every step of the way. Reach out to us through any channel below.
    </p>
  </div>
);

// ============= CONTACT INFO CARD =============
const ContactInfoCard = ({ icon, title, details, link, linkText }) => (
  <div className="contact-card" style={{ 
    background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
    borderRadius: '20px', 
    padding: '24px', 
    border: '1px solid #334155',
    transition: 'all 0.3s ease'
  }}>
    <div style={{ fontSize: '40px', marginBottom: '16px' }}>{icon}</div>
    <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{title}</h3>
    {details.map((detail, idx) => (
      <p key={idx} style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px', lineHeight: '1.5' }}>{detail}</p>
    ))}
    {link && (
      <a href={link} style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '13px', marginTop: '12px', display: 'inline-block' }}>
        {linkText} →
      </a>
    )}
  </div>
);

// ============= OFFICE LOCATION CARD =============
const OfficeCard = ({ office, index }) => (
  <div style={{ 
    background: '#0f172a', 
    borderRadius: '16px', 
    padding: '20px',
    border: '1px solid #334155',
    transition: 'all 0.3s ease',
    animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
  }}>
    <div style={{ fontSize: '28px', marginBottom: '12px' }}>🏢</div>
    <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{office.city}</h4>
    <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px' }}>{office.address}</p>
    <p style={{ color: '#3b82f6', fontSize: '13px' }}>📞 {office.phone}</p>
  </div>
);

// ============= SOCIAL MEDIA BUTTON =============
const SocialButton = ({ platform, icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      background: '#0f172a',
      borderRadius: '12px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: '1px solid #334155'
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
    onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}
  >
    <span style={{ fontSize: '24px' }}>{icon}</span>
    <span style={{ color: 'white', fontWeight: '500' }}>{platform}</span>
  </a>
);

// ============= FAQ SECTION =============
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ 
      background: '#0f172a', 
      borderRadius: '16px', 
      marginBottom: '12px',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <span style={{ color: 'white', fontWeight: '600' }}>{question}</span>
        <span style={{ color: '#3b82f6', fontSize: '20px' }}>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 20px 20px 20px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { question: "What are your office hours?", answer: "Our office hours are Monday to Friday 9:00 AM - 9:00 PM, Saturday 10:00 AM - 6:00 PM. We're closed on Sundays, but online support is available via email and WhatsApp." },
    { question: "How quickly do you respond to inquiries?", answer: "We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please call our helpline directly." },
    { question: "Do you offer property consultations?", answer: "Yes, we offer free initial consultations for buyers and sellers. You can book an appointment through our website or by calling our office." },
    { question: "What areas do you serve in Pakistan?", answer: "We currently serve Lahore, Karachi, Islamabad, Rawalpindi, and surrounding areas. We're expanding to more cities soon!" }
  ];

  return (
    <div style={{ marginTop: '50px' }}>
      <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
        Frequently Asked Questions
      </h3>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

// ============= CONTACT FORM =============
const ContactForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div style={{ 
      background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
      borderRadius: '24px', 
      padding: '32px', 
      border: '1px solid #334155'
    }}>
      <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
        Send us a message
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
        We'll get back to you within 24 hours
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', background: '#0f172a', border: `1px solid ${errors.name ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white', outline: 'none' }}
            />
            {errors.name && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', background: '#0f172a', border: `1px solid ${errors.email ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white', outline: 'none' }}
            />
            {errors.email && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white', outline: 'none' }}
            />
          </div>
          <div>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white', outline: 'none', cursor: 'pointer' }}
            >
              <option value="general">General Inquiry</option>
              <option value="buying">Buying Property</option>
              <option value="selling">Selling Property</option>
              <option value="renting">Renting Property</option>
              <option value="investment">Investment Advice</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <textarea
            name="message"
            placeholder="Your Message *"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px', background: '#0f172a', border: `1px solid ${errors.message ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
          />
          {errors.message && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, transition: 'all 0.3s ease' }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

// ============= MAP SECTION =============
const MapSection = () => (
  <div style={{ marginTop: '50px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
      Find Us Here
    </h3>
    <div style={{ 
      background: '#0f172a', 
      borderRadius: '20px', 
      overflow: 'hidden',
      border: '1px solid #334155',
      height: '300px',
      position: 'relative'
    }}>
      {/* Embedded Google Map - Lahore, Pakistan */}
      <iframe
        title="Office Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217183.6393246054!2d74.19851235!3d31.48299985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107c9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
);

// ============= FOOTER =============
const Footer = () => (
  <footer style={{ background: '#0a0a0a', padding: '50px 32px 30px', borderTop: '1px solid #1f2937', marginTop: 'auto' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>🏠</span>
            </div>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>EstateFlow <span style={{ fontSize: '10px', background: '#10b981', padding: '2px 6px', borderRadius: '10px' }}>PK</span></span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Pakistan's trusted real estate platform. Find your dream home with us.</p>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Home</a></li>
            <li><a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Properties</a></li>
            <li><a href="/services" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Services</a></li>
            <li><a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Agents</a></li>
            <li><a href="/testimonials" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: '16px' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Blog</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>FAQs</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: '16px' }}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af', fontSize: '14px' }}>
            <li>📍 Lahore, Pakistan</li>
            <li>📞 +92 42 3578 1234</li>
            <li>✉️ info@estateflow.pk</li>
            <li>⏰ Mon-Sat: 9AM - 9PM</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #1f2937', color: '#6b7280', fontSize: '13px' }}>
        <p>© 2024 EstateFlow Pakistan. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// ============= MAIN CONTACT PAGE =============
const ContactPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/services', label: 'Services' },
    { path: '/agents', label: 'Agents' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact', active: true }
  ];

  const contactDetails = [
    { icon: "📍", title: "Visit Us", details: [CONTACT_INFO.address.main, CONTACT_INFO.address.city, CONTACT_INFO.address.landmark] },
    { icon: "📞", title: "Call Us", details: [`Main: ${CONTACT_INFO.phone.main}`, `Toll Free: ${CONTACT_INFO.phone.tollFree}`, `WhatsApp: ${CONTACT_INFO.phone.whatsapp}`], link: `tel:${CONTACT_INFO.phone.main}`, linkText: "Call Now" },
    { icon: "✉️", title: "Email Us", details: [`Info: ${CONTACT_INFO.email.info}`, `Support: ${CONTACT_INFO.email.support}`, `Careers: ${CONTACT_INFO.email.careers}`], link: `mailto:${CONTACT_INFO.email.info}`, linkText: "Send Email" },
    { icon: "⏰", title: "Business Hours", details: [`Weekdays: ${CONTACT_INFO.hours.weekdays}`, `Saturday: ${CONTACT_INFO.hours.saturday}`, `Sunday: ${CONTACT_INFO.hours.sunday}`] }
  ];

  return (
    <>
      <GlobalStyles />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header 
          isAuthenticated={isAuthenticated}
          navigate={navigate}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navItems={navItems}
        />

        <div style={{ maxWidth: '1280px', margin: '80px auto 0', padding: '20px 24px 60px', flex: 1, width: '100%' }}>
          
          {/* Hero Section */}
          <HeroSection />

          {/* Success Message */}
          {showSuccess && (
            <div style={{ 
              background: '#10b981', 
              padding: '16px', 
              borderRadius: '12px', 
              marginBottom: '30px', 
              color: 'white', 
              textAlign: 'center',
              animation: 'fadeInUp 0.3s ease'
            }}>
              ✅ Thank you for reaching out! We'll get back to you within 24 hours.
            </div>
          )}

          {/* Contact Info Grid */}
          <div className="contact-info-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '20px',
            marginBottom: '40px'
          }}>
            {contactDetails.map((detail, idx) => (
              <ContactInfoCard key={idx} {...detail} />
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="contact-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '40px',
            marginBottom: '50px'
          }}>
            {/* Contact Form */}
            <ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

            {/* Office Locations & Social Media */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
                Our Office Locations
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                {OFFICES.map((office, idx) => (
                  <OfficeCard key={idx} office={office} index={idx} />
                ))}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>
                Connect With Us
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <SocialButton platform="Facebook" icon="📘" link={CONTACT_INFO.social.facebook} />
                <SocialButton platform="Instagram" icon="📷" link={CONTACT_INFO.social.instagram} />
                <SocialButton platform="Twitter" icon="🐦" link={CONTACT_INFO.social.twitter} />
                <SocialButton platform="LinkedIn" icon="🔗" link={CONTACT_INFO.social.linkedin} />
              </div>
            </div>
          </div>

          {/* Map Section */}
          <MapSection />

          {/* FAQ Section */}
          <FAQSection />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;