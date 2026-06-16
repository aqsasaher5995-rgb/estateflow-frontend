import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '../components/common/Avatar';

// ============= GLOBAL STYLES =============
const GlobalStyles = () => (
  <style>{`
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    @media (max-width: 1000px) {
      .desktop-nav { display: none !important; }
      .mobile-btn { display: flex !important; }
    }
    @media (min-width: 1001px) {
      .mobile-btn { display: none !important; }
    }
    
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
    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    button:focus-visible, a:focus-visible, input:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    @media (max-width: 768px) {
      .agents-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
      .hero-section h1 { font-size: 32px !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .profile-modal-content { padding: 60px 20px 30px !important; }
    }
    
    @media print {
      .agents-header, .agent-actions, .agent-social, .modal-overlay, footer, .agent-filters {
        display: none !important;
      }
    }
  `}</style>
);

// ============= AGENTS DATA =============
const AGENTS_DATA = [
  { 
    id: 1, name: "Sarah Johnson", role: "Senior Agent", specialty: "Residential",
    experience: "12 years", sales: "150+ homes", rating: "4.9", clients: "280+", awards: "12",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "sarah.johnson@estateflow.com", phone: "+1 (555) 123-4567", location: "New York & New Jersey",
    languages: ["English", "French"], 
    expertise: ["Luxury Homes", "First-Time Buyers", "Property Valuation", "Negotiation"],
    fullBio: "Sarah is a top-performing real estate agent with over a decade of experience in the New York market. She has been recognized as a 'Top 10 Agent' by Real Estate Magazine.",
    availableSlots: ["Mon 10 AM", "Tue 2 PM", "Wed 11 AM", "Thu 3 PM", "Fri 1 PM"]
  },
  { 
    id: 2, name: "Michael Chen", role: "Luxury Specialist", specialty: "Luxury",
    experience: "8 years", sales: "95+ homes", rating: "4.8", clients: "160+", awards: "8",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "michael.chen@estateflow.com", phone: "+1 (555) 234-5678", location: "California",
    languages: ["English", "Mandarin", "Cantonese"], 
    expertise: ["Luxury Properties", "International Buyers", "Investment Properties"],
    fullBio: "Michael specializes in luxury real estate and has helped numerous high-net-worth individuals find their perfect homes.",
    availableSlots: ["Mon 11 AM", "Tue 1 PM", "Wed 2 PM", "Thu 10 AM", "Fri 3 PM"]
  },
  { 
    id: 3, name: "Emily Rodriguez", role: "Property Manager", specialty: "Management",
    experience: "10 years", sales: "200+ properties", rating: "4.9", clients: "350+", awards: "10",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "emily.rodriguez@estateflow.com", phone: "+1 (555) 345-6789", location: "Texas",
    languages: ["English", "Spanish"], 
    expertise: ["Property Management", "Tenant Relations", "Maintenance Coordination"],
    fullBio: "Emily is an expert in property management with a track record of maximizing returns for property owners.",
    availableSlots: ["Mon 9 AM", "Tue 11 AM", "Wed 1 PM", "Thu 2 PM", "Fri 10 AM"]
  },
  { 
    id: 4, name: "David Kim", role: "Commercial Expert", specialty: "Commercial",
    experience: "15 years", sales: "120+ deals", rating: "5.0", clients: "200+", awards: "18",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    email: "david.kim@estateflow.com", phone: "+1 (555) 456-7890", location: "Illinois",
    languages: ["English", "Korean"], 
    expertise: ["Commercial Leasing", "Investment Analysis", "Market Research"],
    fullBio: "David is a commercial real estate expert with 15 years of experience in office, retail, and industrial properties.",
    availableSlots: ["Mon 2 PM", "Tue 10 AM", "Wed 3 PM", "Thu 1 PM", "Fri 11 AM"]
  },
  { 
    id: 5, name: "Lisa Wong", role: "Residential Agent", specialty: "Residential",
    experience: "7 years", sales: "180+ homes", rating: "4.7", clients: "250+", awards: "6",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "lisa.wong@estateflow.com", phone: "+1 (555) 567-8901", location: "Washington",
    languages: ["English", "Cantonese"], 
    expertise: ["Family Homes", "Relocation Services", "Neighborhood Analysis"],
    fullBio: "Lisa specializes in helping families find their perfect homes. Her deep knowledge of school districts and community amenities ensures clients make informed decisions.",
    availableSlots: ["Mon 1 PM", "Tue 3 PM", "Wed 10 AM", "Thu 11 AM", "Fri 2 PM"]
  },
  { 
    id: 6, name: "Marcus Brown", role: "Investment Advisor", specialty: "Investment",
    experience: "11 years", sales: "250+ units", rating: "4.9", clients: "320+", awards: "14",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    email: "marcus.brown@estateflow.com", phone: "+1 (555) 678-9012", location: "Florida",
    languages: ["English"], 
    expertise: ["Real Estate Investment", "Portfolio Management", "ROI Analysis"],
    fullBio: "Marcus is a real estate investment specialist who has helped numerous investors build profitable portfolios.",
    availableSlots: ["Mon 10 AM", "Tue 1 PM", "Wed 2 PM", "Thu 3 PM", "Fri 9 AM"]
  },
  { 
    id: 7, name: "Jennifer Taylor", role: "First-Time Buyer Specialist", specialty: "Residential",
    experience: "6 years", sales: "130+ homes", rating: "4.8", clients: "180+", awards: "5",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    email: "jennifer.taylor@estateflow.com", phone: "+1 (555) 789-0123", location: "Arizona",
    languages: ["English"], 
    expertise: ["First-Time Buyers", "Mortgage Guidance", "Down Payment Assistance"],
    fullBio: "Jennifer is passionate about helping first-time homebuyers navigate the complex process of purchasing their first home.",
    availableSlots: ["Mon 11 AM", "Tue 2 PM", "Wed 1 PM", "Thu 10 AM", "Fri 3 PM"]
  },
  { 
    id: 8, name: "Robert Wilson", role: "Real Estate Consultant", specialty: "Investment",
    experience: "14 years", sales: "300+ deals", rating: "5.0", clients: "450+", awards: "22",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "robert.wilson@estateflow.com", phone: "+1 (555) 890-1234", location: "Nationwide",
    languages: ["English", "German"], 
    expertise: ["Strategic Consulting", "Market Analysis", "Investment Strategy"],
    fullBio: "Robert is a veteran real estate consultant who has advised Fortune 500 companies and individual investors alike.",
    availableSlots: ["Mon 9 AM", "Tue 11 AM", "Wed 2 PM", "Thu 1 PM", "Fri 10 AM"]
  }
];

// ============= SCHEDULE MODAL =============
const ScheduleModal = ({ agent, isOpen, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setSelectedSlot('');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', borderRadius: '28px', width: '550px', maxWidth: '90%', maxHeight: '85vh', overflow: 'auto', padding: '32px', border: '1px solid #3b82f640' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div><h2 style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>Schedule with {agent.name}</h2><p style={{ color: '#94a3b8', fontSize: '14px' }}>Choose a time that works for you</p></div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>
        
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px', animation: 'bounce 0.5s' }}>📅</div>
            <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '8px' }}>Appointment Scheduled!</h3>
            <p style={{ color: '#94a3b8' }}>Confirmation sent. Meeting at {selectedSlot}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Select Time Slot <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {agent.availableSlots?.map(slot => (
                  <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} style={{ padding: '10px', background: selectedSlot === slot ? '#3b82f6' : '#0f172a', border: `1px solid ${selectedSlot === slot ? '#3b82f6' : '#334155'}`, borderRadius: '10px', color: selectedSlot === slot ? 'white' : '#94a3b8', cursor: 'pointer' }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <input type="text" placeholder="Your Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} required />
            <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} required />
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} />
            <textarea rows="3" placeholder="Additional notes..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '24px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={isSubmitting || !selectedSlot} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: (isSubmitting || !selectedSlot) ? 'not-allowed' : 'pointer', opacity: (isSubmitting || !selectedSlot) ? 0.6 : 1 }}>{isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}</button>
              <button type="button" onClick={onClose} style={{ padding: '14px 24px', background: '#4b5563', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ============= HELPER COMPONENTS =============
const StatBox = ({ icon, value, label }) => (
  <div style={{ textAlign: 'center', padding: '8px', borderRadius: '12px' }}>
    <div style={{ fontSize: '28px', marginBottom: '4px' }}>{icon}</div>
    <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</div>
  </div>
);

const ContactInfo = ({ icon, text, link }) => (
  link ? <a href={link} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', padding: '8px', borderRadius: '12px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><span style={{ fontSize: '20px' }}>{icon}</span><span style={{ color: '#94a3b8' }}>{text}</span></a>
    : <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '12px' }}><span style={{ fontSize: '20px' }}>{icon}</span><span style={{ color: '#94a3b8' }}>{text}</span></div>
);

const SkillTag = ({ skill }) => <span style={{ padding: '6px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: '20px', color: '#3b82f6', fontSize: '13px', cursor: 'default' }}>{skill}</span>;
const LanguageTag = ({ language }) => <span style={{ padding: '6px 16px', background: '#0f172a', borderRadius: '20px', color: '#94a3b8', fontSize: '13px', border: '1px solid #334155' }}>{language}</span>;

const ReviewCard = ({ review }) => (
  <div style={{ padding: '16px', background: '#0f172a', borderRadius: '16px', marginBottom: '12px', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
      <div><span style={{ color: 'white', fontWeight: '600' }}>{review.name}</span><div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: i < review.rating ? '#fbbf24' : '#334155', fontSize: '12px' }}>★</span>)}</div></div>
      <span style={{ color: '#94a3b8', fontSize: '11px' }}>{review.date}</span>
    </div>
    <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>"{review.comment}"</p>
  </div>
);

const PropertyCard = ({ property }) => (
  <div style={{ padding: '16px', background: '#0f172a', borderRadius: '16px', border: '1px solid #334155', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏠</div>
    <h4 style={{ color: 'white', fontSize: '16px', marginBottom: '4px' }}>{property.title}</h4>
    <p style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{property.price}</p>
    <p style={{ color: '#94a3b8', fontSize: '12px' }}>{property.location}</p>
    <span style={{ display: 'inline-block', padding: '2px 8px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: '#3b82f6', fontSize: '11px', marginTop: '8px' }}>{property.type}</span>
  </div>
);

const defaultReviews = [
  { name: "John D.", rating: 5, comment: "Excellent service! Helped me find my dream home within budget.", date: "2024-02-15" },
  { name: "Sarah M.", rating: 5, comment: "Very professional and knowledgeable. Highly recommended!", date: "2024-02-10" },
  { name: "Michael R.", rating: 4, comment: "Great experience working with this agent. Very responsive.", date: "2024-02-05" }
];

const defaultProperties = [
  { title: "Luxury Villa", price: "PKR 5.5 Cr", location: "DHA Phase 8", type: "Residential" },
  { title: "Commercial Plaza", price: "PKR 12 Cr", location: "Gulberg", type: "Commercial" },
  { title: "Modern Apartment", price: "PKR 2.2 Cr", location: "Bahria Town", type: "Residential" }
];

// ============= AGENT CARD COMPONENT =============
const AgentCard = ({ agent, index, onContact, onViewProfile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', border: `1px solid ${isHovered ? '#3b82f640' : '#334155'}`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', animation: `fadeInUp 0.5s ease ${Math.min(index * 0.1, 0.5)}s both`, transform: isHovered ? 'translateY(-8px)' : 'translateY(0)', boxShadow: isHovered ? '0 20px 40px -15px rgba(0,0,0,0.4)' : 'none', cursor: 'pointer', position: 'relative' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onViewProfile(agent)}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)', transform: isHovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
      <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#10b981', color: 'white', fontSize: '12px', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 1 }}><span>✓</span> Verified</div>
      
      {/* CIRCULAR IMAGE - CENTERED */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
        {!imageLoaded && !imageError && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(90deg, #1e293b, #334155, #1e293b)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />}
        {imageError ? <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: `3px solid ${isHovered ? '#3b82f6' : '#334155'}` }}>👤</div>
          : <img src={agent.image} alt={agent.name} loading={index < 4 ? "eager" : "lazy"} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${isHovered ? '#3b82f6' : '#334155'}`, transition: 'all 0.3s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)', opacity: imageLoaded ? 1 : 0 }} onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />}
      </div>

      <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>{agent.name}</h3>
      <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(59,130,246,0.1)', borderRadius: '20px', marginBottom: '16px' }}><p style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '500' }}>{agent.role}</p></div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '24px', padding: '12px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155' }}>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', marginBottom: '4px' }}>📅</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>Experience</div><div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{agent.experience}</div></div>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', marginBottom: '4px' }}>🏠</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>Properties</div><div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{agent.sales}</div></div>
        <div style={{ textAlign: 'center' }}><div style={{ fontSize: '20px', marginBottom: '4px' }}>⭐</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>Rating</div><div style={{ color: '#fbbf24', fontSize: '14px', fontWeight: '600' }}>{agent.rating}</div></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
        <a href={`mailto:${agent.email}`} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '20px' }} onClick={e => e.stopPropagation()} aria-label={`Email ${agent.name}`}>📧</a>
        <a href={`tel:${agent.phone}`} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '20px' }} onClick={e => e.stopPropagation()} aria-label={`Call ${agent.name}`}>📱</a>
        <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '20px' }} onClick={e => e.stopPropagation()} aria-label={`${agent.name}'s LinkedIn`}>💼</a>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={e => { e.stopPropagation(); onContact(agent); }} style={{ flex: 1, padding: '12px 20px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '30px', color: 'white', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.3s ease' }}>Contact Agent</button>
        <button onClick={e => { e.stopPropagation(); onViewProfile(agent); }} style={{ padding: '12px 16px', background: 'transparent', border: '1px solid #3b82f6', borderRadius: '30px', color: '#3b82f6', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.3s ease' }}>View Profile</button>
      </div>
    </div>
  );
};

// ============= FILTER COMPONENT =============
const AgentFilters = ({ filters, onFilterChange, specialties, onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = useCallback((e) => { setSearchValue(e.target.value); onSearchChange(e.target.value); }, [onSearchChange]);

  return (
    <div className="agent-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
      <button onClick={() => onFilterChange('all')} style={{ padding: '8px 20px', background: filters.specialty === 'all' ? '#3b82f6' : 'transparent', border: `1px solid ${filters.specialty === 'all' ? '#3b82f6' : '#334155'}`, borderRadius: '30px', color: filters.specialty === 'all' ? 'white' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s ease' }}>All Agents</button>
      {specialties.map(s => <button key={s} onClick={() => onFilterChange(s.toLowerCase())} style={{ padding: '8px 20px', background: filters.specialty === s.toLowerCase() ? '#3b82f6' : 'transparent', border: `1px solid ${filters.specialty === s.toLowerCase() ? '#3b82f6' : '#334155'}`, borderRadius: '30px', color: filters.specialty === s.toLowerCase() ? 'white' : '#94a3b8', cursor: 'pointer', transition: 'all 0.2s ease' }}>{s}</button>)}
      <input type="text" placeholder="Search agents..." value={searchValue} onChange={handleSearch} style={{ padding: '8px 20px', background: '#1e293b', border: '1px solid #334155', borderRadius: '30px', color: 'white', outline: 'none', minWidth: '200px' }} />
    </div>
  );
};

// ============= CONTACT MODAL =============
const ContactModal = ({ agent, isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => { const newErrors = {}; if (!formData.name.trim()) newErrors.name = 'Name required'; if (!formData.email.trim()) newErrors.email = 'Email required'; else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid'; if (!formData.message.trim()) newErrors.message = 'Message required'; return newErrors; };
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const newErrors = validateForm(); 
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; } 
    setIsSubmitting(true); 
    await new Promise(r => setTimeout(r, 1500)); 
    setIsSubmitted(true); 
    setIsSubmitting(false); 
    setTimeout(() => { 
      onClose(); 
      setIsSubmitted(false); 
      setFormData({ name: '', email: '', phone: '', message: '' }); 
      setErrors({}); 
    }, 2000); 
  };
  
  useEffect(() => { 
    if (!isOpen) { 
      setFormData({ name: '', email: '', phone: '', message: '' }); 
      setErrors({}); 
      setIsSubmitted(false); 
    } 
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(8px)', animation: 'fadeIn 0.3s ease' }} onClick={onClose}>
      <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', borderRadius: '28px', width: '500px', maxWidth: '90%', maxHeight: '85vh', overflow: 'auto', padding: '32px', border: '1px solid #3b82f640', animation: 'scaleIn 0.3s ease' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div><h2 style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>Contact {agent?.name}</h2><p style={{ color: '#94a3b8', fontSize: '14px' }}>{agent?.role} at EstateFlow</p></div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#94a3b8', fontSize: '20px', cursor: 'pointer', transition: 'all 0.2s ease' }}>✕</button>
        </div>
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px' }}><div style={{ fontSize: '64px', marginBottom: '16px', animation: 'bounce 0.5s' }}>✅</div><h3 style={{ color: 'white', fontSize: '22px', marginBottom: '8px' }}>Message Sent!</h3><p style={{ color: '#94a3b8' }}>{agent?.name} will respond within 24 hours.</p></div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: `1px solid ${errors.name ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white' }} />
            {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-12px', marginBottom: '12px' }}>{errors.name}</p>}
            <input type="email" placeholder="Email Address *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: `1px solid ${errors.email ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white' }} />
            {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-12px', marginBottom: '12px' }}>{errors.email}</p>}
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: 'white' }} />
            <textarea rows="4" placeholder="Your Message *" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '24px', background: '#0f172a', border: `1px solid ${errors.message ? '#ef4444' : '#334155'}`, borderRadius: '12px', color: 'white', resize: 'vertical' }} />
            {errors.message && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-20px', marginBottom: '16px' }}>{errors.message}</p>}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={isSubmitting} style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
              <button type="button" onClick={onClose} style={{ padding: '14px', background: '#4b5563', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', flex: 1 }}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ============= PROFILE MODAL - WITH WORKING CONTACT BUTTON =============
const ProfileModal = ({ agent, isOpen, onClose, onOpenContactModal }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  useEffect(() => { if (!isOpen) setActiveTab('about'); }, [isOpen]);
  
  if (!isOpen || !agent) return null;

  // DIRECT CONTACT - No setTimeout issues
  const handleContactClick = () => {
    // First close profile modal
    onClose();
    // Then immediately open contact modal
    // Using setTimeout with 0 to ensure profile modal state updates first
    setTimeout(() => {
      if (onOpenContactModal) {
        onOpenContactModal(agent);
      }
    }, 50);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(10px)', animation: 'fadeIn 0.3s ease', overflow: 'auto', padding: '20px' }} onClick={onClose}>
        <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', borderRadius: '32px', width: '900px', maxWidth: '100%', maxHeight: '90vh', overflow: 'auto', border: '1px solid #3b82f640', animation: 'scaleIn 0.3s ease', position: 'relative' }} onClick={e => e.stopPropagation()}>
          
          {/* CLOSE BUTTON */}
          <button onClick={onClose} style={{ position: 'sticky', top: '20px', right: '20px', float: 'right', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: 'white', fontSize: '20px', cursor: 'pointer', zIndex: 10, margin: '20px' }}>✕</button>
          
          <div style={{ clear: 'both' }} />

          {/* CIRCULAR IMAGE - CENTER TOP (NO COVER/BLANK COLOR) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '24px' }}>
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '4px solid #3b82f6', overflow: 'hidden', background: '#0f172a', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
              <img 
                src={agent.image} 
                alt={agent.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }} 
                onLoad={() => setImageLoaded(true)} 
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="profile-modal-content" style={{ padding: '0 40px 40px 40px' }}>
            {/* HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>{agent.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={{ padding: '4px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: '20px', color: '#3b82f6', fontSize: '14px', fontWeight: '500' }}>{agent.role}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '13px' }}><span>✓</span> Verified Professional</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '13px' }}><span>⭐</span> {agent.rating} Rating</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>{agent.fullBio}</p>
            </div>

            {/* STATS */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '30px', padding: '20px', background: '#0f172a', borderRadius: '20px' }}>
              <StatBox icon="📅" value={agent.experience} label="Experience" />
              <StatBox icon="🏠" value={agent.sales} label="Properties Sold" />
              <StatBox icon="👥" value={agent.clients} label="Happy Clients" />
              <StatBox icon="🏆" value={agent.awards} label="Awards" />
            </div>

            {/* TABS */}
            <div className="profile-tabs" style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #334155', marginBottom: '24px', overflowX: 'auto', justifyContent: 'center' }}>
              {['about', 'expertise', 'reviews', 'properties'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 24px', background: 'transparent', border: 'none', color: activeTab === tab ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === tab ? '600' : '400', borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div style={{ marginBottom: '30px', minHeight: '200px' }}>
              {activeTab === 'about' && (
                <div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '12px' }}>Biography</h3>
                  <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>{agent.fullBio}</p>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '12px' }}>Contact Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ContactInfo icon="📧" text={agent.email} link={`mailto:${agent.email}`} />
                    <ContactInfo icon="📱" text={agent.phone} link={`tel:${agent.phone}`} />
                    <ContactInfo icon="📍" text={`Serving ${agent.location}`} />
                  </div>
                </div>
              )}
              {activeTab === 'expertise' && (
                <div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>Areas of Expertise</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>{agent.expertise.map((s, i) => <SkillTag key={i} skill={s} />)}</div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>Languages Spoken</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>{agent.languages.map((l, i) => <LanguageTag key={i} language={l} />)}</div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>{agent.rating}</div>
                      <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: i < Math.floor(agent.rating) ? '#fbbf24' : '#334155', fontSize: '16px' }}>★</span>)}</div>
                      <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>Based on {agent.reviewCount || '128'} reviews</div>
                    </div>
                  </div>
                  {defaultReviews.map((r, i) => <ReviewCard key={i} review={r} />)}
                </div>
              )}
              {activeTab === 'properties' && (
                <div>
                  <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>Recent Properties</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>{defaultProperties.map((p, i) => <PropertyCard key={i} property={p} />)}</div>
                </div>
              )}
            </div>

            {/* BUTTONS - WORKING CONTACT BUTTON */}
            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #334155', paddingTop: '24px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleContactClick}
                style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Contact {agent.name.split(' ')[0]}
              </button>
              <button 
                onClick={() => setIsScheduleModalOpen(true)} 
                style={{ flex: 1, padding: '14px', background: 'transparent', border: '1px solid #3b82f6', borderRadius: '12px', color: '#3b82f6', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                📅 Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScheduleModal agent={agent} isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} />
    </>
  );
};

// ============= HEADER =============
const Header = ({ isAuthenticated, navigate, isMenuOpen, setIsMenuOpen, navItems }) => (
  <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 1000, padding: '12px 0' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '18px' }}>🏠</span></div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>EstateFlow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navItems.map(item => <a key={item.path} href={item.path} style={{ color: item.active ? '#3b82f6' : '#ccc', textDecoration: 'none', fontSize: '14px', fontWeight: item.active ? '500' : '400' }}>{item.label}</a>)}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="desktop-nav">
          {isAuthenticated ? (
            <><button onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Dashboard</button><Avatar /></>
          ) : (
            <><button onClick={() => navigate('/login')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Sign In</button><button onClick={() => navigate('/register')} style={{ padding: '8px 20px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Get Started</button></>
          )}
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {isMenuOpen && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navItems.map(item => <a key={item.path} href={item.path} style={{ display: 'block', padding: '10px 0', color: item.active ? '#3b82f6' : 'white', textDecoration: 'none' }}>{item.label}</a>)}
          {isAuthenticated ? <button onClick={() => navigate('/dashboard')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Dashboard</button> : <button onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#2563eb', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Sign In</button>}
        </div>
      )}
    </div>
  </header>
);

const HeroSection = () => (
  <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeInUp 0.6s ease' }}>
    <div style={{ display: 'inline-block', marginBottom: '16px', padding: '4px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: '50px' }}><span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '500' }}>👥 Meet Our Team</span></div>
    <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Our Expert Agents</h1>
    <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>Meet our team of professional real estate agents dedicated to helping you find your perfect property with personalized service and expert guidance.</p>
  </div>
);

const ResultsCount = ({ count }) => <div style={{ textAlign: 'center', marginBottom: '24px', color: '#94a3b8' }}>Showing {count} agent{count !== 1 ? 's' : ''}</div>;

const AgentsGrid = ({ agents, onContact, onViewProfile }) => (
  <div className="agents-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px', marginBottom: '40px' }}>
    {agents.map((agent, index) => <AgentCard key={agent.id} agent={agent} index={index} onContact={onContact} onViewProfile={onViewProfile} />)}
  </div>
);

const EmptyState = () => (
  <div style={{ textAlign: 'center', padding: '60px', background: 'linear-gradient(145deg, #1e293b, #0f172a)', borderRadius: '24px', border: '1px solid #334155' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
    <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '8px' }}>No Agents Found</h3>
    <p style={{ color: '#94a3b8' }}>Try adjusting your filters to find more agents.</p>
  </div>
);

const Footer = () => (
  <footer style={{ background: '#0a0a0a', padding: '50px 32px 30px', borderTop: '1px solid #1f2937', marginTop: 'auto' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}><div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>🏠</span></div><span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>EstateFlow</span></div><p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>Your trusted partner in real estate. Find your dream home with us.</p></div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Quick Links</h4><ul style={{ listStyle: 'none', padding: 0 }}><li><a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a></li><li><a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none' }}>Properties</a></li><li><a href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</a></li><li><a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none' }}>Agents</a></li></ul></div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Resources</h4><ul style={{ listStyle: 'none', padding: 0 }}><li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Blog</a></li><li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>FAQs</a></li><li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li></ul></div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Contact</h4><ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af', fontSize: '14px' }}><li>📍 123 Business Ave, NY</li><li>📞 (555) 123-4567</li><li>✉️ info@estateflow.com</li></ul></div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #1f2937', color: '#6b7280', fontSize: '13px' }}><p>© 2024 EstateFlow. All rights reserved.</p></div>
    </div>
  </footer>
);

// ============= MAIN AGENTS PAGE =============
const AgentsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [filters, setFilters] = useState({ specialty: 'all' });
  const [searchQuery, setSearchQuery] = useState('');

  const agents = useMemo(() => AGENTS_DATA, []);
  const specialties = useMemo(() => [...new Set(agents.map(a => a.specialty))], [agents]);
  const filteredAgents = useMemo(() => {
    let result = filters.specialty === 'all' ? agents : agents.filter(a => a.specialty.toLowerCase() === filters.specialty.toLowerCase());
    if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); result = result.filter(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.specialty.toLowerCase().includes(q)); }
    return result;
  }, [agents, filters.specialty, searchQuery]);

  // Function to open contact modal directly
  const handleOpenContactModal = useCallback((agent) => {
    setSelectedAgent(agent);
    setIsContactModalOpen(true);
  }, []);

  const handleContact = useCallback((agent) => { 
    if (!isAuthenticated) { 
      if (window.confirm('Please login to contact our agents. Go to login?')) navigate('/login'); 
      return; 
    } 
    handleOpenContactModal(agent);
  }, [isAuthenticated, navigate, handleOpenContactModal]);
  
  const handleViewProfile = useCallback((agent) => { 
    setSelectedAgent(agent); 
    setIsProfileModalOpen(true); 
  }, []);
  
  const navItems = [{ path: '/', label: 'Home' }, { path: '/properties', label: 'Properties' }, { path: '/services', label: 'Services' }, { path: '/agents', label: 'Agents', active: true }, { path: '/testimonials', label: 'Testimonials' }, { path: '/contact', label: 'Contact' }];

  return (
    <>
      <GlobalStyles />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header isAuthenticated={isAuthenticated} navigate={navigate} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navItems={navItems} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 60px', flex: 1, width: '100%' }}>
          <HeroSection />
          <AgentFilters filters={filters} onFilterChange={setFilters} specialties={specialties} onSearchChange={setSearchQuery} />
          {filteredAgents.length === 0 ? <EmptyState /> : <><ResultsCount count={filteredAgents.length} /><AgentsGrid agents={filteredAgents} onContact={handleContact} onViewProfile={handleViewProfile} /></>}
        </div>
        <ContactModal 
          agent={selectedAgent} 
          isOpen={isContactModalOpen} 
          onClose={() => { 
            setIsContactModalOpen(false); 
            setTimeout(() => setSelectedAgent(null), 300); 
          }} 
        />
        <ProfileModal 
          agent={selectedAgent} 
          isOpen={isProfileModalOpen} 
          onClose={() => { 
            setIsProfileModalOpen(false); 
            setTimeout(() => setSelectedAgent(null), 300); 
          }} 
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer />
      </div>
    </>
  );
};

export default AgentsPage;