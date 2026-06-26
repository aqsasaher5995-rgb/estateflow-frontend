// src/pages/FAQPage.jsx

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
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    try {
      setLoading(true);
      
      // Real FAQ Data - Replace with API call
      const data = [
        { 
          id: 1,
          q: "What is EstateFlow?", 
          a: "EstateFlow is Pakistan's leading real estate platform connecting property buyers, sellers, and investors with verified listings and expert guidance. We provide transparent, secure, and efficient property transactions across all major cities.",
          category: "General",
          votes: 245,
          date: "2024-01-15"
        },
        { 
          id: 2,
          q: "How do I search for properties?", 
          a: "Use the search bar on our homepage or properties page. You can filter by city, property type, price range, and number of bedrooms. Our advanced search algorithm helps you find the perfect property match.",
          category: "Search",
          votes: 189,
          date: "2024-01-20"
        },
        { 
          id: 3,
          q: "How can I contact an agent?", 
          a: "Each property listing has a 'Contact Agent' button. You can also reach us at 0300-1234567 or email info@estateflow.com. Our team is available 24/7 to assist you.",
          category: "Contact",
          votes: 156,
          date: "2024-01-18"
        },
        { 
          id: 4,
          q: "Are the property listings verified?", 
          a: "Yes, all properties on EstateFlow are verified by our team to ensure authenticity and accuracy. We conduct thorough background checks and property inspections before listing.",
          category: "Trust",
          votes: 312,
          date: "2024-01-10"
        },
        { 
          id: 5,
          q: "Can I schedule a property tour?", 
          a: "Absolutely! Click the 'Schedule Tour' button on any property listing to book a viewing with our team. We offer both virtual and in-person tours based on your preference.",
          category: "Tours",
          votes: 98,
          date: "2024-01-22"
        },
        { 
          id: 6,
          q: "Is EstateFlow free to use?", 
          a: "Yes, EstateFlow is completely free for property seekers. We charge a commission only from sellers upon successful transactions. There are no hidden fees or charges.",
          category: "Pricing",
          votes: 267,
          date: "2024-01-05"
        },
        { 
          id: 7,
          q: "How do I list my property?", 
          a: "Contact our team at 0300-1234567 or visit our office to list your property. We'll guide you through the entire process including documentation, photography, and marketing.",
          category: "Selling",
          votes: 134,
          date: "2024-01-25"
        },
        { 
          id: 8,
          q: "What payment methods are accepted?", 
          a: "We accept bank transfers, online payments, and installment plans. For international clients, we also accept wire transfers and cryptocurrency payments.",
          category: "Payment",
          votes: 76,
          date: "2024-01-28"
        },
        { 
          id: 9,
          q: "How long does it take to sell a property?", 
          a: "The average time to sell a property through EstateFlow is 30-45 days, depending on location, price, and market conditions. We use AI-powered marketing to speed up the process.",
          category: "Selling",
          votes: 92,
          date: "2024-02-01"
        },
        { 
          id: 10,
          q: "Can I get a property valuation?", 
          a: "Yes! We offer free property valuations using our AI-powered valuation tool. Simply enter your property details and get an instant market estimate.",
          category: "General",
          votes: 178,
          date: "2024-02-03"
        },
        { 
          id: 11,
          q: "What documents do I need to buy a property?", 
          a: "You'll need CNIC/B-Form, NTN certificate, proof of income, bank statements, and property documents. Our team will guide you through the complete documentation process.",
          category: "Legal",
          votes: 145,
          date: "2024-02-05"
        },
        { 
          id: 12,
          q: "Do you offer property management services?", 
          a: "Yes, we offer comprehensive property management services including tenant screening, rent collection, maintenance, and legal compliance. Contact us for a customized plan.",
          category: "Services",
          votes: 67,
          date: "2024-02-07"
        }
      ];
      
      setFaqData(data);
      setFilteredFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      toast.error('Failed to load FAQ data');
    } finally {
      setLoading(false);
    }
  };

  // Search and Filter
  useEffect(() => {
    let filtered = faqData;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredFaqs(filtered);
  }, [searchTerm, faqData, selectedCategory]);

  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  const handleVote = (id) => {
    setFaqData(prev => prev.map(item =>
      item.id === id ? { ...item, votes: item.votes + 1 } : item
    ));
    toast.success('Thank you for your feedback! 👍');
  };

  const handleShare = (question) => {
    const text = `Check out this FAQ: ${question}`;
    navigator.clipboard?.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 60px', flex: 1, width: '100%' }}>
        
        {/* Hero Section */}
        <div style={{ 
          marginBottom: '40px', 
          padding: '60px 40px', 
          borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.10), rgba(139,92,246,0.03))',
          border: '1px solid rgba(99,102,241,0.10)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-50%', 
            right: '-10%', 
            width: '300px', 
            height: '300px', 
            background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent)',
            borderRadius: '50%'
          }} />
          <div style={{ 
            position: 'absolute', 
            bottom: '-30%', 
            left: '-5%', 
            width: '200px', 
            height: '200px', 
            background: 'radial-gradient(circle, rgba(139,92,246,0.06), transparent)',
            borderRadius: '50%'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(99,102,241,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HelpCircle size={30} style={{ color: '#6366f1' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '40px', fontWeight: '800', color: 'white', margin: 0, background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Frequently Asked Questions
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                {faqData.length} FAQs • {categories.length - 1} Categories • Real-time Data
              </p>
            </div>
          </div>
          
          <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            Find answers to the most common questions about EstateFlow, property listings, and our services.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '32px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ 
            flex: 1, 
            minWidth: '250px',
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '0 16px',
            border: '1px solid rgba(255,255,255,0.06)',
            transition: 'all 0.3s'
          }}>
            <Search size={18} style={{ color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '14px 12px',
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
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '10px 18px',
              borderRadius: '30px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#818cf8',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Filter size={16} />
            Filter
          </button>
        </div>

        {/* Category Filters */}
        <div style={{ 
          display: showFilters ? 'flex' : 'none',
          gap: '8px', 
          flexWrap: 'wrap',
          marginBottom: '24px',
          padding: '16px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                background: selectedCategory === category ? '#6366f1' : 'rgba(255,255,255,0.05)',
                border: selectedCategory === category ? 'none' : '1px solid rgba(255,255,255,0.08)',
                color: selectedCategory === category ? 'white' : '#9ca3af',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
              {category !== 'All' && (
                <span style={{ 
                  marginLeft: '6px', 
                  fontSize: '10px', 
                  opacity: 0.7,
                  background: selectedCategory === category ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                  padding: '0 6px',
                  borderRadius: '10px'
                }}>
                  {faqData.filter(item => item.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          padding: '0 4px'
        }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Showing <span style={{ color: 'white', fontWeight: '600' }}>{filteredFaqs.length}</span> of {faqData.length} FAQs
          </p>
          {filteredFaqs.length > 0 && (
            <p style={{ color: '#4b5563', fontSize: '12px' }}>
              {selectedCategory !== 'All' ? `Category: ${selectedCategory}` : 'All Categories'}
            </p>
          )}
        </div>

        {/* FAQ List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              border: '3px solid rgba(99,102,241,0.1)', 
              borderTopColor: '#6366f1', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite', 
              margin: '0 auto' 
            }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading FAQs...</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px', 
            background: 'rgba(255,255,255,0.02)', 
            borderRadius: '20px',
            border: '1px dashed rgba(255,255,255,0.06)'
          }}>
            <HelpCircle size={56} style={{ color: '#6b7280', margin: '0 auto 16px', display: 'block' }} />
            <p style={{ color: '#9ca3af', fontSize: '18px', fontWeight: '500' }}>No FAQs found</p>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setShowFilters(false); }}
              style={{ 
                marginTop: '16px', 
                padding: '10px 28px', 
                background: 'rgba(99,102,241,0.15)', 
                border: '1px solid rgba(99,102,241,0.2)', 
                borderRadius: '30px', 
                color: '#818cf8', 
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredFaqs.map((item, index) => (
              <div 
                key={item.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  transform: openIndex === index ? 'scale(1.01)' : 'scale(1)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <span style={{ 
                      fontSize: '10px', 
                      color: '#818cf8', 
                      background: 'rgba(99,102,241,0.12)',
                      padding: '3px 12px',
                      borderRadius: '20px',
                      fontWeight: '600',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {item.category}
                    </span>
                    <span style={{ lineHeight: '1.4' }}>{item.q}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <ThumbsUp size={14} /> {item.votes}
                    </span>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        color: '#6366f1',
                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </div>
                </button>
                
                <div style={{
                  maxHeight: openIndex === index ? '500px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease'
                }}>
                  <div style={{
                    padding: '0 22px 20px 22px',
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: '1.8',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    paddingTop: '16px'
                  }}>
                    {item.a}
                    
                    <div style={{ 
                      marginTop: '16px', 
                      display: 'flex', 
                      gap: '12px', 
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(item.id);
                        }}
                        style={{
                          fontSize: '12px',
                          color: '#818cf8',
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.15)',
                          borderRadius: '20px',
                          padding: '5px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                      >
                        <ThumbsUp size={12} /> Helpful
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(item.q);
                        }}
                        style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '20px',
                          padding: '5px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        📋 Share
                      </button>
                      
                      <span style={{ fontSize: '11px', color: '#4b5563' }}>
                        Updated: {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div style={{ 
          marginTop: '60px', 
          padding: '48px 40px', 
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.03))',
          borderRadius: '24px',
          border: '1px solid rgba(99,102,241,0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-40%', 
            right: '-10%', 
            width: '200px', 
            height: '200px', 
            background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)',
            borderRadius: '50%'
          }} />
          
          <MessageCircle size={36} style={{ color: '#6366f1', marginBottom: '12px' }} />
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
            Still have questions?
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/contact')}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '30px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Contact Support
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:info@estateflow.com'}
              style={{
                padding: '12px 32px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '30px',
                color: '#9ca3af',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            >
              📧 Email Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQPage;
