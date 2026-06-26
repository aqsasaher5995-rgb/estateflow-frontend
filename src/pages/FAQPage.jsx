import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, MessageCircle, X, ThumbsUp, Filter } from 'lucide-react';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import toast from 'react-hot-toast';

const FAQPage = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const data = [
      {
        id: 1,
        q: 'What is EstateFlow?',
        a: "EstateFlow is a modern real estate property management platform connecting property owners, agents, and tenants. Owners can list and manage properties, agents can assist with transactions, and tenants can discover and apply for rentals — all in one place.",
        category: 'General',
        votes: 245,
        date: '2024-01-15',
      },
      {
        id: 2,
        q: 'How do I search for properties?',
        a: 'Use the search bar on the Properties page. You can filter by city, property type, price range, number of bedrooms, and furnishing status. Results update in real time as you adjust your filters.',
        category: 'Search',
        votes: 189,
        date: '2024-01-20',
      },
      {
        id: 3,
        q: 'How can I contact an agent or owner?',
        a: "Each property listing shows the owner or agent contact details. You can also use the Contact page to send us a message directly and we'll connect you with the right person.",
        category: 'Contact',
        votes: 156,
        date: '2024-01-18',
      },
      {
        id: 4,
        q: 'Are the property listings verified?',
        a: 'Yes. All properties on EstateFlow are reviewed to ensure authenticity and accuracy. Verified badges appear on listings that have passed our quality checks.',
        category: 'Trust',
        votes: 312,
        date: '2024-01-10',
      },
      {
        id: 5,
        q: 'Can I schedule a property tour?',
        a: "Absolutely! Click the 'Contact Owner' button on any property listing to request a viewing. Our team will coordinate and confirm a time that works for you.",
        category: 'Tours',
        votes: 98,
        date: '2024-01-22',
      },
      {
        id: 6,
        q: 'Is EstateFlow free to use?',
        a: 'Browsing listings and creating an account are completely free. Owners and agents may be subject to commission or listing fees for premium placement — contact us for details.',
        category: 'Pricing',
        votes: 267,
        date: '2024-01-05',
      },
      {
        id: 7,
        q: 'How do I list my property?',
        a: "Register or log in as an Owner or Agent, then go to your Dashboard and click 'Add Property'. Fill in the details, upload images, and your listing will be live immediately.",
        category: 'Selling',
        votes: 134,
        date: '2024-01-25',
      },
      {
        id: 8,
        q: 'What is the difference between Owner, Agent, and Tenant roles?',
        a: 'Owners can list and manage their own properties. Agents can manage properties on behalf of owners. Tenants can browse listings and contact owners or agents. Each role gets a dedicated dashboard tailored to their workflow.',
        category: 'Accounts',
        votes: 201,
        date: '2024-01-12',
      },
      {
        id: 9,
        q: 'How is my password stored securely?',
        a: 'Passwords are never stored in plain text. We use bcrypt hashing with a salt factor of 10, so your password is cryptographically secured before it ever reaches our database.',
        category: 'Security',
        votes: 176,
        date: '2024-01-08',
      },
      {
        id: 10,
        q: 'How does authentication work?',
        a: 'EstateFlow uses JSON Web Tokens (JWT). When you log in, you receive a signed token stored in your browser. This token is sent with every request to verify your identity. Tokens expire after 7 days.',
        category: 'Security',
        votes: 143,
        date: '2024-01-09',
      },
      {
        id: 11,
        q: 'Can I update my profile information?',
        a: 'Yes. Go to the Profile page from the navigation menu. You can update your name, email, and phone number. Changes are saved immediately.',
        category: 'Accounts',
        votes: 89,
        date: '2024-01-30',
      },
      {
        id: 12,
        q: 'Is there a mobile version?',
        a: 'The EstateFlow web app is fully responsive and works seamlessly on mobile browsers. A dedicated native mobile app is planned for a future release.',
        category: 'General',
        votes: 112,
        date: '2024-02-01',
      },
    ];
    setFaqData(data);
    setFilteredFaqs(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = faqData;
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    setFilteredFaqs(filtered);
    setOpenIndex(null);
  }, [searchTerm, faqData, selectedCategory]);

  const categories = ['All', ...new Set(faqData.map((item) => item.category))];

  const handleVote = (id) => {
    setFaqData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );
    toast.success('Thank you for your feedback! 👍');
  };

  const handleShare = (question) => {
    navigator.clipboard?.writeText(`Check out this FAQ: ${question}`);
    toast.success('Copied to clipboard!');
  };

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '120px 24px 60px',
          flex: 1,
          width: '100%',
        }}
      >
        {/* ── Hero ── */}
        <div
          style={{
            marginBottom: '48px',
            padding: '60px 40px',
            borderRadius: '24px',
            background:
              'linear-gradient(145deg, rgba(99,102,241,0.10), rgba(139,92,246,0.03))',
            border: '1px solid rgba(99,102,241,0.12)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '20px',
              fontSize: '13px',
              color: '#a5b4fc',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <HelpCircle size={14} /> Help Center
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #f3f4f6 0%, #818cf8 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
              lineHeight: 1.15,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>
            {faqData.length} FAQs across {categories.length - 1} categories
          </p>
        </div>

        {/* ── Search & Filter Row ── */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: '240px',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '0 16px',
              border: '1px solid rgba(255,255,255,0.07)',
              transition: 'border-color 0.2s',
            }}
          >
            <Search size={17} style={{ color: '#6b7280', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '13px 12px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontSize: '14px',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', lineHeight: 0 }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '11px 20px',
              borderRadius: '30px',
              background: showFilters
                ? 'rgba(99,102,241,0.2)'
                : 'rgba(99,102,241,0.08)',
              border: `1px solid ${showFilters ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.18)'}`,
              color: '#818cf8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            <Filter size={14} /> Filters
            {selectedCategory !== 'All' && (
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  background: '#6366f1',
                  borderRadius: '50%',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                1
              </span>
            )}
          </button>
        </div>

        {/* ── Category Pills ── */}
        {showFilters && (
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '24px',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background:
                    selectedCategory === category
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(255,255,255,0.05)',
                  border:
                    selectedCategory === category
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.08)',
                  color: selectedCategory === category ? 'white' : '#9ca3af',
                  fontSize: '12px',
                  fontWeight: selectedCategory === category ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
              >
                {category}
                {category !== 'All' && (
                  <span style={{ opacity: 0.65 }}>
                    {faqData.filter((item) => item.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Result count ── */}
        {(searchTerm || selectedCategory !== 'All') && (
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
            {filteredFaqs.length === 0
              ? 'No results found.'
              : `${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}

        {/* ── FAQ List ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                border: '3px solid rgba(99,102,241,0.12)',
                borderTopColor: '#6366f1',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto',
              }}
            />
            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
            <p style={{ color: '#6b7280', marginTop: '16px', fontSize: '14px' }}>Loading FAQs…</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '72px 24px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
            }}
          >
            <HelpCircle size={52} style={{ color: '#4b5563', margin: '0 auto 16px', display: 'block' }} />
            <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '20px' }}>No FAQs match your search.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              style={{
                padding: '10px 28px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '30px',
                color: '#818cf8',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  style={{
                    background: isOpen
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(139,92,246,0.05))'
                      : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${isOpen ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      padding: '18px 22px',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          flexShrink: 0,
                          fontSize: '10px',
                          color: '#818cf8',
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          padding: '3px 11px',
                          borderRadius: '20px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          color: isOpen ? '#c4b5fd' : '#f3f4f6',
                          transition: 'color 0.2s',
                        }}
                      >
                        {item.q}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#6b7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <ThumbsUp size={12} /> {item.votes}
                      </span>
                      <ChevronDown
                        size={18}
                        style={{
                          color: '#6366f1',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 22px 20px',
                        borderTop: '1px solid rgba(99,102,241,0.12)',
                      }}
                    >
                      <p
                        style={{
                          color: '#9ca3af',
                          fontSize: '14px',
                          lineHeight: 1.8,
                          paddingTop: '16px',
                          marginBottom: '16px',
                        }}
                      >
                        {item.a}
                      </p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVote(item.id); }}
                          style={{
                            fontSize: '12px',
                            color: '#818cf8',
                            background: 'rgba(99,102,241,0.08)',
                            border: '1px solid rgba(99,102,241,0.18)',
                            borderRadius: '20px',
                            padding: '5px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.18)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.08)')}
                        >
                          <ThumbsUp size={12} /> Helpful
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare(item.q); }}
                          style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '20px',
                            padding: '5px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        >
                          📋 Share
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div
          style={{
            marginTop: '60px',
            padding: '48px 40px',
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))',
            borderRadius: '24px',
            border: '1px solid rgba(99,102,241,0.12)',
            textAlign: 'center',
          }}
        >
          <MessageCircle size={36} style={{ color: '#6366f1', marginBottom: '14px' }} />
          <h3
            style={{
              color: 'white',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Still have questions?
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: '28px', fontSize: '14px', lineHeight: 1.6 }}>
            Our support team is here to help. We typically respond within 24 hours.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '12px 36px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 28px rgba(99,102,241,0.35)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Contact Support
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
