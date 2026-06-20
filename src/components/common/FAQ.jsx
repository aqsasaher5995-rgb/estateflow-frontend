// src/components/common/FAQ.jsx

import React, { useState, useEffect } from 'react';
import { X, ChevronDown, HelpCircle, Search, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const FAQ = ({ isOpen, onClose }) => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  // ===== REAL-TIME DATA FETCH =====
  useEffect(() => {
    if (isOpen) {
      fetchFAQData();
    }
  }, [isOpen]);

  const fetchFAQData = async () => {
    try {
      setLoading(true);
      
      // Simulate API call - Replace with your actual API
      // const response = await fetch('https://your-api.com/faqs');
      // const data = await response.json();
      
      // Real-time data with dynamic timestamps
      const realTimeData = [
        { 
          id: 1,
          q: "What is EstateFlow?", 
          a: "EstateFlow is Pakistan's leading real estate platform connecting property buyers, sellers, and investors with verified listings and expert guidance. 🏡",
          category: "General",
          votes: 245,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 2,
          q: "How do I search for properties?", 
          a: "Use the search bar on our homepage or properties page. You can filter by city, property type, price range, and number of bedrooms. 🔍",
          category: "Search",
          votes: 189,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 3,
          q: "How can I contact an agent?", 
          a: "Each property listing has a 'Contact Agent' button. You can also reach us at 0300-1234567 or email info@estateflow.com. 📞",
          category: "Contact",
          votes: 156,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 4,
          q: "Are the property listings verified?", 
          a: "Yes, all properties on EstateFlow are verified by our team to ensure authenticity and accuracy. ✅",
          category: "Trust",
          votes: 312,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 5,
          q: "Can I schedule a property tour?", 
          a: "Absolutely! Click the 'Schedule Tour' button on any property listing to book a viewing with our team. 📅",
          category: "Tours",
          votes: 98,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 6,
          q: "Is EstateFlow free to use?", 
          a: "Yes, EstateFlow is completely free for property seekers. We charge a commission only from sellers upon successful transactions. 💰",
          category: "Pricing",
          votes: 267,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 7,
          q: "How do I list my property?", 
          a: "Contact our team at 0300-1234567 or visit our office to list your property. We'll guide you through the entire process. 📝",
          category: "Selling",
          votes: 134,
          lastUpdated: new Date().toLocaleDateString()
        },
        { 
          id: 8,
          q: "What payment methods are accepted?", 
          a: "We accept bank transfers, online payments, and installment plans. Contact us for more details. 💳",
          category: "Payment",
          votes: 76,
          lastUpdated: new Date().toLocaleDateString()
        }
      ];
      
      setFaqData(realTimeData);
      setFilteredFaqs(realTimeData);
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      toast.error('Failed to load FAQ data');
    } finally {
      setLoading(false);
    }
  };

  // ===== SEARCH FILTER =====
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFaqs(faqData);
    } else {
      const filtered = faqData.filter(item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm, faqData]);

  // ===== VOTE HELPER (Simulated Real-time) =====
  const handleVote = (id) => {
    setFaqData(prev => prev.map(item =>
      item.id === id ? { ...item, votes: item.votes + 1 } : item
    ));
    toast.success('👍 Thank you for your feedback!');
  };

  // ===== GET CATEGORIES =====
  const categories = [...new Set(faqData.map(item => item.category))];

  if (!isOpen) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: 'rgba(0,0,0,0.85)', 
        zIndex: 9999, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px',
        backdropFilter: 'blur(8px)',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          maxWidth: '800px', 
          width: '100%', 
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0b0f19', 
          borderRadius: '24px', 
          padding: '40px',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(99,102,241,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={20} style={{ color: '#6366f1' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                {faqData.length} FAQs • {categories.length} Categories • Real-time Data
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '8px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '20px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          padding: '4px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <Search size={18} style={{ color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setSearchTerm('')}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            Search
          </button>
        </div>

        {/* Category Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSearchTerm(category)}
              style={{
                padding: '4px 14px',
                borderRadius: '20px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.15)',
                color: '#818cf8',
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <HelpCircle size={48} style={{ color: '#6b7280', margin: '0 auto 16px', display: 'block' }} />
            <p style={{ color: '#9ca3af', fontSize: '16px' }}>No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              style={{ marginTop: '12px', padding: '8px 24px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '30px', color: '#818cf8', cursor: 'pointer' }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredFaqs.map((item, index) => (
              <div key={item.id} style={{ 
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '16px 20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span style={{ 
                      fontSize: '10px', 
                      color: '#818cf8', 
                      background: 'rgba(99,102,241,0.1)',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontWeight: '500'
                    }}>
                      {item.category}
                    </span>
                    <span>{item.q}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>
                      👍 {item.votes}
                    </span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        color: '#6366f1',
                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                        flexShrink: 0
                      }} 
                    />
                  </div>
                </button>
                <div style={{
                  maxHeight: openIndex === index ? '300px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  <div style={{
                    padding: '0 20px 16px 20px',
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    paddingTop: '12px'
                  }}>
                    {item.a}
                    <div style={{ marginTop: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button
                        onClick={() => handleVote(item.id)}
                        style={{
                          fontSize: '12px',
                          color: '#818cf8',
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.15)',
                          borderRadius: '20px',
                          padding: '4px 14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                      >
                        👍 Helpful
                      </button>
                      <span style={{ fontSize: '11px', color: '#6b7280' }}>
                        Updated: {item.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '24px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MessageCircle size={16} style={{ color: '#6b7280' }} />
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
              Still have questions? <a href="/contact" style={{ color: '#818cf8', textDecoration: 'none' }}>Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;