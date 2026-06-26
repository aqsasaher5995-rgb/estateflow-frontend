import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'What is EstateFlow?',
        a: 'EstateFlow is a modern real estate property management platform that connects property owners, agents, and tenants. It allows owners to list and manage properties, agents to assist with transactions, and tenants to discover and apply for rentals — all in one place.',
      },
      {
        q: 'How do I create an account?',
        a: "Click the \"Get Started\" button on the homepage and fill in your name, email, and password. You'll also choose your role: Owner, Agent, or Tenant. After registering you're immediately logged in and taken to your dashboard.",
      },
      {
        q: 'Is EstateFlow free to use?',
        a: 'Basic listing browsing and account creation are completely free. Premium features such as featured listings, advanced analytics, and priority support are available through our subscription plans.',
      },
    ],
  },
  {
    category: 'Properties',
    items: [
      {
        q: 'How do I list a property?',
        a: 'After logging in as an Owner or Agent, navigate to your Dashboard and click "Add Property". Fill in the property details including title, description, address, rent amount, and images. Your listing will be live immediately.',
      },
      {
        q: 'What types of properties can I list?',
        a: 'EstateFlow supports four property types: Apartments, Houses, Commercial spaces, and Land. Each type has relevant fields to capture the specific details that matter most to prospective tenants or buyers.',
      },
      {
        q: 'Can I edit or remove a listing?',
        a: 'Yes. From your Dashboard, open any property card and click "Edit" to update details, change the status (available, rented, maintenance), or upload new photos. You can also soft-delete a listing to hide it without permanently losing the data.',
      },
      {
        q: 'How are property images handled?',
        a: 'Images are uploaded securely and stored in the cloud. We accept JPEG, PNG, and WebP formats up to 5 MB each. Multiple images per listing are supported, and the first image is used as the cover thumbnail.',
      },
    ],
  },
  {
    category: 'Accounts & Roles',
    items: [
      {
        q: 'What is the difference between Owner, Agent, and Tenant roles?',
        a: 'Owners can list and manage their own properties. Agents can manage properties on behalf of owners and assist with negotiations. Tenants can browse listings, view property details, and contact owners or agents. Each role has a dedicated dashboard tailored to their workflow.',
      },
      {
        q: 'Can I change my role after registration?',
        a: 'Role changes can be requested through the Profile page. Contact our support team if you need to switch your primary role, as some role transitions require verification.',
      },
      {
        q: 'How do I update my profile information?',
        a: 'Go to your Profile page (accessible from the top navigation). You can update your display name, email address, and phone number. Changes are saved instantly.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    items: [
      {
        q: 'How is my password stored?',
        a: 'Passwords are never stored in plain text. We use bcrypt with a salt factor of 10, which means your password is transformed into a secure hash before being saved to the database.',
      },
      {
        q: 'How does authentication work?',
        a: 'EstateFlow uses JSON Web Tokens (JWT) for authentication. When you log in, you receive a signed token that is stored in your browser and sent with every request. Tokens expire after 7 days, after which you will be prompted to log in again.',
      },
      {
        q: 'Is my data shared with third parties?',
        a: 'No. Your personal data is never sold or shared with third parties for marketing purposes. Property data is displayed publicly as part of the platform. Please review our Privacy Policy for full details.',
      },
    ],
  },
  {
    category: 'Technical',
    items: [
      {
        q: 'Which browsers are supported?',
        a: 'EstateFlow works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience. Internet Explorer is not supported.',
      },
      {
        q: 'Is there a mobile app?',
        a: 'The EstateFlow web application is fully responsive and works great on mobile browsers. A dedicated native mobile app is on our roadmap for a future release.',
      },
      {
        q: 'Who do I contact if I encounter a bug?',
        a: 'Use the Contact page to submit a bug report. Please include a description of the issue, the steps to reproduce it, and your browser version. Our team aims to respond within 24 hours.',
      },
    ],
  },
];

const CATEGORIES = ['All', ...faqs.map((f) => f.category)];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const toggle = (key) => setOpenIndex(openIndex === key ? null : key);

  const filteredFaqs = faqs
    .filter((section) => activeCategory === 'All' || section.category === activeCategory)
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  const totalResults = filteredFaqs.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'var(--font-sans)', padding: '0 0 80px' }}>
      {/* ── Header ── */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px 48px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <Link
            to="/"
            style={{
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>←</span> Back to Home
          </Link>
        </div>
        <div
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '100px',
            padding: '6px 18px',
            fontSize: '13px',
            color: '#a5b4fc',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Help Center
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f3f4f6 0%, #a5b4fc 50%, #c4b5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          Frequently Asked Questions
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '17px',
            maxWidth: '520px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Everything you need to know about EstateFlow. Can't find an answer?{' '}
          <Link to="/contact" style={{ color: '#a5b4fc', textDecoration: 'none' }}>
            Contact us
          </Link>
          .
        </p>

        {/* Search */}
        <div style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-secondary)',
              fontSize: '18px',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            style={{
              width: '100%',
              padding: '14px 18px 14px 50px',
              background: 'rgba(15,23,42,0.7)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '14px',
              color: 'var(--color-text-primary)',
              fontSize: '15px',
              outline: 'none',
              backdropFilter: 'blur(12px)',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.6)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(99,102,241,0.25)')}
          />
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'rgba(99,102,241,0.7)' : 'rgba(99,102,241,0.2)',
                background:
                  activeCategory === cat
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))'
                    : 'rgba(15,23,42,0.5)',
                color: activeCategory === cat ? '#a5b4fc' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count when searching */}
        {search && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>
            {totalResults === 0
              ? 'No results found. Try a different search term.'
              : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${search}"`}
          </p>
        )}

        {/* FAQ Sections */}
        {filteredFaqs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              background: 'rgba(15,23,42,0.5)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '20px',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
              No questions match your search.{' '}
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                style={{ background: 'none', border: 'none', color: '#a5b4fc', cursor: 'pointer', fontSize: '16px' }}
              >
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          filteredFaqs.map((section) => (
            <div key={section.category} style={{ marginBottom: '40px' }}>
              {/* Section header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                    border: '1px solid rgba(99,102,241,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                  }}
                >
                  {section.category === 'Getting Started' && '🚀'}
                  {section.category === 'Properties' && '🏠'}
                  {section.category === 'Accounts & Roles' && '👤'}
                  {section.category === 'Security & Privacy' && '🔒'}
                  {section.category === 'Technical' && '⚙️'}
                </div>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {section.category}
                </h2>
                <div
                  style={{
                    marginLeft: 'auto',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '100px',
                    padding: '2px 10px',
                  }}
                >
                  {section.items.length} Q{section.items.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Accordion items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.items.map((item, idx) => {
                  const key = `${section.category}-${idx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={key}
                      style={{
                        background: isOpen
                          ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))'
                          : 'rgba(15,23,42,0.55)',
                        border: `1px solid ${isOpen ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        backdropFilter: 'blur(12px)',
                        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    >
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%',
                          padding: '20px 24px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: isOpen ? '#c4b5fd' : 'var(--color-text-primary)',
                            lineHeight: 1.4,
                            transition: 'color 0.2s',
                          }}
                        >
                          {item.q}
                        </span>
                        <span
                          style={{
                            flexShrink: 0,
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: isOpen
                              ? 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))'
                              : 'rgba(99,102,241,0.1)',
                            border: `1px solid ${isOpen ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.2)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isOpen ? '#a5b4fc' : 'var(--color-text-secondary)',
                            fontSize: '16px',
                            fontWeight: 300,
                            transition: 'all 0.25s',
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          }}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            padding: '0 24px 22px',
                            borderTop: '1px solid rgba(99,102,241,0.12)',
                            marginTop: '-2px',
                          }}
                        >
                          <p
                            style={{
                              color: 'var(--color-text-secondary)',
                              fontSize: '14px',
                              lineHeight: 1.75,
                              paddingTop: '16px',
                            }}
                          >
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '56px',
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '24px',
            textAlign: 'center',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>💬</div>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Still have questions?
          </h3>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              marginBottom: '24px',
              lineHeight: 1.6,
            }}
          >
            Our support team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 0 24px rgba(99,102,241,0.35)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
