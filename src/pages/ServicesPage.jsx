import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../components/common/Avatar';

const ServicesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: '',
    propertyType: 'residential'
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { 
      id: 1,
      icon: "🏠", 
      title: "Property Sales", 
      desc: "Buy and sell properties with expert guidance from our experienced agents. We ensure the best market price for your property with complete legal support.",
      features: ["Free property valuation", "Legal documentation", "Best market price", "Fast processing"],
      price: "Free Consultation",
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 2,
      icon: "🔑", 
      title: "Property Rentals", 
      desc: "Find the perfect rental property that matches your budget and preferences. Wide range of apartments, houses, and commercial spaces available.",
      features: ["Verified properties", "Flexible contracts", "Maintenance support", "Tenant verification"],
      price: "1 Month Rent",
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 3,
      icon: "📊", 
      title: "Property Valuation", 
      desc: "Get accurate property valuation reports from our certified experts. Know the true worth of your property before buying or selling.",
      features: ["Market analysis", "Comparable sales", "Investment advice", "Detailed reports"],
      price: "PKR 5,000",
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 4,
      icon: "🤝", 
      title: "Property Management", 
      desc: "Full-service property management for landlords and investors. We handle tenants, maintenance, and rent collection professionally.",
      features: ["Tenant management", "Maintenance services", "Rent collection", "24/7 support"],
      price: "8% of Rent",
      color: "#8b5cf6",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 5,
      icon: "🔍", 
      title: "Market Analysis", 
      desc: "In-depth market analysis to help you make informed decisions. Stay ahead of real estate trends with our expert insights.",
      features: ["Price trends", "Area analysis", "Investment opportunities", "ROI calculations"],
      price: "PKR 10,000",
      color: "#06b6d4",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 6,
      icon: "📝", 
      title: "Legal Support", 
      desc: "Professional legal support for all your property transactions. Documentation and registration assistance from experts.",
      features: ["Contract drafting", "Property registration", "Dispute resolution", "Legal consultation"],
      price: "PKR 15,000",
      color: "#ef4444",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 7,
      icon: "🏗️", 
      title: "Construction & Renovation", 
      desc: "Quality construction and renovation services for residential and commercial properties. Turn your dream home into reality.",
      features: ["New construction", "Interior design", "Renovation", "Project management"],
      price: "Free Quote",
      color: "#22c55e",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
    { 
      id: 8,
      icon: "📈", 
      title: "Investment Consulting", 
      desc: "Expert investment consulting for real estate investors. Maximize your returns with our strategic guidance.",
      features: ["Portfolio management", "Risk assessment", "Market timing", "Exit strategies"],
      price: "PKR 20,000",
      color: "#ec4899",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)"
    },
  ];

  const handleGetService = (service) => {
    setSelectedService(service);
    setShowModal(true);
    setSubmitted(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      message: `I am interested in ${service.title} service. Please contact me for more details.`,
      propertyType: 'residential'
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      alert(`Thank you ${formData.name}! Our team will contact you soon regarding ${selectedService?.title}.`);
    }, 1500);
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
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
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
              <a href="/" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Home</a>
              <a href="/properties" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Properties</a>
              <a href="/services" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Services</a>
              <a href="/agents" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Agents</a>
              <a href="/testimonials" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Testimonials</a>
              <a href="/contact" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
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

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }} className="mobile-btn">
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <a href="/" style={{ display: 'block', padding: '10px 0', color: 'white', textDecoration: 'none' }}>Home</a>
              <a href="/properties" style={{ display: 'block', padding: '10px 0', color: '#ccc', textDecoration: 'none' }}>Properties</a>
              <a href="/services" style={{ display: 'block', padding: '10px 0', color: '#3b82f6', textDecoration: 'none' }}>Services</a>
              <a href="/agents" style={{ display: 'block', padding: '10px 0', color: '#ccc', textDecoration: 'none' }}>Agents</a>
              <a href="/testimonials" style={{ display: 'block', padding: '10px 0', color: '#ccc', textDecoration: 'none' }}>Testimonials</a>
              <a href="/contact" style={{ display: 'block', padding: '10px 0', color: '#ccc', textDecoration: 'none' }}>Contact</a>
              {isAuthenticated ? (
                <button onClick={() => navigate('/dashboard')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px' }}>Dashboard</button>
              ) : (
                <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px' }}>Sign In</button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 60px 24px', flex: 1, width: '100%' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeInUp 0.6s ease' }}>
          <div style={{ display: 'inline-block', marginBottom: '16px', padding: '4px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: '50px' }}>
            <span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '500' }}>✨ What We Offer</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
            Our Services
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive real estate solutions tailored to your needs. 
            We provide end-to-end services for property buyers, sellers, and investors.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          {services.map((service, index) => (
            <div 
              key={service.id} 
              style={{ 
                background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
                borderRadius: '24px', 
                padding: '32px',
                border: '1px solid #334155',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 40px -15px rgba(0,0,0,0.5)';
                e.currentTarget.style.borderColor = service.color + '40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              {/* Glowing Line on Top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${service.color}, transparent)` }}></div>
              
              {/* Icon with Glow */}
              <div style={{ 
                fontSize: '56px', 
                marginBottom: '20px',
                display: 'inline-block',
                filter: `drop-shadow(0 0 10px ${service.color}40)`
              }}>
                {service.icon}
              </div>
              
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{service.desc}</p>
              
              {/* Price Badge */}
              <div style={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                border: `1px solid ${service.color}40`,
                borderRadius: '30px',
                padding: '4px 16px',
                marginBottom: '20px'
              }}>
                <span style={{ color: service.color, fontSize: '13px', fontWeight: '600' }}>{service.price}</span>
              </div>
              
              {/* Features List */}
              <div style={{ borderTop: '1px solid #334155', paddingTop: '20px', marginBottom: '24px' }}>
                <p style={{ color: service.color, fontSize: '13px', fontWeight: '600', marginBottom: '12px', letterSpacing: '1px' }}>✓ WHAT WE OFFER</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {service.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }}>
                      <span style={{ color: '#22c55e', fontSize: '14px' }}>✓</span>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleGetService(service)}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '14px',
                  background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                  border: 'none',
                  borderRadius: '14px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 10px 20px -5px ${service.color}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get This Service →
              </button>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div style={{ 
          background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
          borderRadius: '28px', 
          padding: '60px 40px',
          border: '1px solid #334155',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Why Choose EstateFlow?</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            We are committed to providing the best real estate services in Pakistan with transparency and professionalism.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
            {[
              { icon: "⭐", number: "500+", label: "Happy Clients", color: "#fbbf24" },
              { icon: "🏠", number: "1000+", label: "Properties Sold", color: "#3b82f6" },
              { icon: "👥", number: "50+", label: "Expert Agents", color: "#10b981" },
              { icon: "🏆", number: "10+", label: "Years Experience", color: "#8b5cf6" }
            ].map((stat, idx) => (
              <div key={idx} style={{ 
                padding: '24px', 
                background: '#0f172a', 
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
                animation: `fadeInUp 0.5s ease ${idx * 0.1}s both`
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{stat.icon}</div>
                <h4 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{stat.number}</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GET SERVICE MODAL */}
      {showModal && selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.3s ease'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
            borderRadius: '28px',
            width: '520px',
            maxWidth: '90%',
            maxHeight: '85vh',
            overflow: 'auto',
            padding: '32px',
            border: `1px solid ${selectedService.color}40`,
            animation: 'scaleIn 0.3s ease'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '48px' }}>{selectedService.icon}</div>
                <h2 style={{ fontSize: '26px', fontWeight: '700', color: 'white', marginTop: '8px' }}>{selectedService.title}</h2>
                <div style={{ 
                  display: 'inline-block',
                  background: `linear-gradient(135deg, ${selectedService.color}20, ${selectedService.color}05)`,
                  border: `1px solid ${selectedService.color}40`,
                  borderRadius: '30px',
                  padding: '4px 16px',
                  marginTop: '8px'
                }}>
                  <span style={{ color: selectedService.color, fontSize: '13px', fontWeight: '600' }}>{selectedService.price}</span>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px', animation: 'bounce 0.5s' }}>✅</div>
                <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '8px' }}>Request Sent!</h3>
                <p style={{ color: '#94a3b8' }}>Our team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land / Plot</option>
                    <option value="investment">Investment Property</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Additional Message</label>
                  <textarea name="message" rows="3" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white', resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${selectedService.color}, ${selectedService.color}cc)`, border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Submit Request</button>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '14px', background: '#4b5563', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: '#0a0a0a', padding: '50px 32px 30px', borderTop: '1px solid #1f2937', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>🏠</span></div>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>EstateFlow</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Your trusted partner in real estate. Find your dream home with us.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none' }}>Properties</a></li>
                <li><a href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</a></li>
                <li><a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none' }}>Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Blog</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>FAQs</a></li>
                <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>Contact</h4>
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

      <style>{`
        @media (max-width: 1000px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 1001px) {
          .mobile-btn { display: none !important; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;