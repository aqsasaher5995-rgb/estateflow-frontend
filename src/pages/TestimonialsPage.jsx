import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .testimonial-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: fadeInScale 0.5s ease both;
    }
    
    .testimonial-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
    }
    
    .quote-icon {
      transition: all 0.3s ease;
    }
    
    .testimonial-card:hover .quote-icon {
      transform: scale(1.1);
      opacity: 1;
    }
    
    button:focus-visible, a:focus-visible {
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
    
    @media (max-width: 768px) {
      .testimonials-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    }
    
    @media print {
      .testimonial-card { break-inside: avoid; page-break-inside: avoid; }
      .testimonials-header, .filter-section { display: none !important; }
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

// ============= TESTIMONIALS DATA =============
const TESTIMONIALS_DATA = [
  { 
    id: 1,
    name: "David Miller", 
    role: "Homeowner", 
    text: "The team helped me find my dream home within a week! Exceptional service and attention to detail. I couldn't be happier with my new home.", 
    rating: 5,
    date: "2024-02-15",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    location: "New York, NY"
  },
  { 
    id: 2,
    name: "Lisa Thompson", 
    role: "Investor", 
    text: "Professional, responsive, and knowledgeable. Best real estate experience I've had in 10 years of investing. They truly understand the market.", 
    rating: 5,
    date: "2024-02-10",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    location: "Los Angeles, CA"
  },
  { 
    id: 3,
    name: "James Wilson", 
    role: "Property Seller", 
    text: "Sold my property above asking price within 2 weeks! Highly recommend their services to anyone looking to sell quickly and profitably.", 
    rating: 5,
    date: "2024-02-05",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: true,
    location: "Chicago, IL"
  },
  { 
    id: 4,
    name: "Maria Garcia", 
    role: "First-time Buyer", 
    text: "Made the home buying process so easy and stress-free. As first-time buyers, we had many questions and they answered every single one patiently.", 
    rating: 5,
    date: "2024-01-28",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    location: "Miami, FL"
  },
  { 
    id: 5,
    name: "Robert Taylor", 
    role: "Landlord", 
    text: "Great property management services. Very professional team that handles everything efficiently. My properties are always in good hands.", 
    rating: 5,
    date: "2024-01-20",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    location: "Austin, TX"
  },
  { 
    id: 6,
    name: "Jennifer Lee", 
    role: "Investor", 
    text: "Found amazing investment properties through them. Their market analysis and property recommendations have generated excellent returns for my portfolio.", 
    rating: 5,
    date: "2024-01-15",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    verified: true,
    location: "Seattle, WA"
  },
  { 
    id: 7,
    name: "Michael Brown", 
    role: "Homeowner", 
    text: "Outstanding service from start to finish. The team went above and beyond to ensure we found the perfect home for our family.", 
    rating: 5,
    date: "2024-01-10",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    verified: true,
    location: "Denver, CO"
  },
  { 
    id: 8,
    name: "Amanda White", 
    role: "Real Estate Agent", 
    text: "As a fellow real estate professional, I was thoroughly impressed with their expertise and client-first approach.", 
    rating: 5,
    date: "2024-01-05",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    verified: true,
    location: "Boston, MA"
  },
  { 
    id: 9,
    name: "Thomas Anderson", 
    role: "Commercial Investor", 
    text: "Their commercial real estate team is second to none. They helped me acquire a prime retail space at an excellent value.", 
    rating: 5,
    date: "2023-12-28",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    verified: true,
    location: "Dallas, TX"
  }
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

// ============= FILTER SECTION - Header ke bilkul neeche, no extra space =============
const FilterSection = ({ selectedFilter, onFilterChange, categories }) => {
  return (
    <div className="filter-section" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '0',
      background: 'transparent'
    }}>
      <button
        onClick={() => onFilterChange('all')}
        style={{
          padding: '8px 20px',
          background: selectedFilter === 'all' ? '#3b82f6' : 'transparent',
          border: `1px solid ${selectedFilter === 'all' ? '#3b82f6' : '#334155'}`,
          borderRadius: '30px',
          color: selectedFilter === 'all' ? 'white' : '#94a3b8',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '14px',
          transition: 'all 0.2s ease'
        }}
      >
        All Testimonials
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onFilterChange(category.toLowerCase())}
          style={{
            padding: '8px 20px',
            background: selectedFilter === category.toLowerCase() ? '#3b82f6' : 'transparent',
            border: `1px solid ${selectedFilter === category.toLowerCase() ? '#3b82f6' : '#334155'}`,
            borderRadius: '30px',
            color: selectedFilter === category.toLowerCase() ? 'white' : '#94a3b8',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// ============= TESTIMONIAL CARD COMPONENT =============
const TestimonialCard = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const displayText = expanded ? testimonial.text : testimonial.text.slice(0, 120) + (testimonial.text.length > 120 ? '...' : '');

  return (
    <div 
      className="testimonial-card"
      style={{ 
        background: 'linear-gradient(145deg, #1e293b, #0f172a)',
        borderRadius: '24px',
        padding: '28px',
        border: `1px solid ${isHovered ? '#3b82f640' : '#334155'}`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        animationDelay: `${Math.min(index * 0.1, 0.5)}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease'
      }} />

      {/* Quote Icon */}
      <div className="quote-icon" style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '48px',
        opacity: 0.1,
        color: 'white',
        fontFamily: 'Georgia, serif'
      }}>
        "
      </div>

      {/* Verified Badge */}
      {testimonial.verified && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '16px',
          fontSize: '12px',
          color: '#10b981'
        }}>
          <span>✓</span> Verified Review
        </div>
      )}

      {/* Rating Stars */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        {[...Array(testimonial.rating)].map((_, j) => (
          <span key={j} style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
        ))}
      </div>

      {/* Testimonial Text */}
      <p style={{ 
        color: '#94a3b8', 
        marginBottom: '20px', 
        lineHeight: '1.7',
        fontSize: '15px',
        fontStyle: 'italic'
      }}>
        "{displayText}"
      </p>

      {testimonial.text.length > 120 && (
        <button
          onClick={toggleExpand}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#3b82f6',
            cursor: 'pointer',
            fontSize: '13px',
            marginBottom: '20px',
            padding: 0
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Author Section with Avatar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        borderTop: '1px solid #334155',
        paddingTop: '20px',
        marginTop: '8px'
      }}>
        {/* Avatar */}
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#0f172a',
          border: `2px solid ${isHovered ? '#3b82f6' : '#334155'}`,
          transition: 'all 0.3s ease'
        }}>
          {!imageLoaded && !imageError && (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }} />
          )}
          {imageError ? (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              background: '#334155'
            }}>👤</div>
          ) : (
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Author Info */}
        <div>
          <p style={{ fontWeight: '700', color: 'white', marginBottom: '2px' }}>
            {testimonial.name}
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>
            {testimonial.role}
          </p>
          <p style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
            📍 {testimonial.location}
          </p>
        </div>
      </div>

      {/* Date */}
      <div style={{
        marginTop: '12px',
        fontSize: '11px',
        color: '#4b5563',
        textAlign: 'right'
      }}>
        {new Date(testimonial.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
};

// ============= RESULTS COUNT =============
const ResultsCount = ({ count, total }) => (
  <div style={{
    textAlign: 'center',
    marginBottom: '30px',
    color: '#94a3b8',
    fontSize: '14px'
  }}>
    Showing {count} of {total} testimonials
  </div>
);

// ============= EMPTY STATE =============
const EmptyState = () => (
  <div style={{
    textAlign: 'center',
    padding: '60px',
    background: 'linear-gradient(145deg, #1e293b, #0f172a)',
    borderRadius: '24px',
    border: '1px solid #334155'
  }}>
    <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
    <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>No Testimonials Found</h3>
    <p style={{ color: '#94a3b8' }}>Try adjusting your filters to see more reviews.</p>
  </div>
);

// ============= FOOTER =============
const Footer = () => (
  <footer style={{ background: '#0a0a0a', padding: '40px 32px 30px', borderTop: '1px solid #1f2937', marginTop: 'auto' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>🏠</span>
            </div>
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
            <li><a href="/testimonials" style={{ color: '#9ca3af', textDecoration: 'none' }}>Testimonials</a></li>
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
);

// ============= MAIN TESTIMONIALS PAGE =============
const TestimonialsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = useMemo(() => {
    const cats = [...new Set(TESTIMONIALS_DATA.map(t => t.role))];
    return cats;
  }, []);

  const filteredTestimonials = useMemo(() => {
    let result = selectedFilter === 'all' 
      ? TESTIMONIALS_DATA 
      : TESTIMONIALS_DATA.filter(t => t.role.toLowerCase() === selectedFilter);
    return result;
  }, [selectedFilter]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/services', label: 'Services' },
    { path: '/agents', label: 'Agents' },
    { path: '/testimonials', label: 'Testimonials', active: true },
    { path: '/contact', label: 'Contact' }
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

        {/* Main Content - Header ke bilkul neeche se start */}
        <div style={{ 
          maxWidth: '1280px', 
          margin: '80px auto 0 auto', 
          padding: '20px 24px 60px', 
          flex: 1, 
          width: '100%' 
        }}>
          
          {/* Filter Section - Directly after header, no extra space */}
          <FilterSection 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            categories={categories}
          />

          {/* Results Count */}
          <ResultsCount count={filteredTestimonials.length} total={TESTIMONIALS_DATA.length} />

          {/* Testimonials Grid */}
          {filteredTestimonials.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="testimonials-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
              gap: '30px'
            }}>
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TestimonialsPage;