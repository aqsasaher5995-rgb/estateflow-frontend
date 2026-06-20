// src/components/common/CookiePolicy.jsx

import React, { useState, useEffect } from 'react';
import { X, Shield, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CookiePolicy = ({ isOpen, onClose }) => {
  const [cookieData, setCookieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    performance: true,
    marketing: false
  });

  // ===== REAL-TIME DATA FETCH =====
  useEffect(() => {
    if (isOpen) {
      fetchCookieData();
    }
  }, [isOpen]);

  const fetchCookieData = async () => {
    try {
      setLoading(true);
      // Simulate API call - Replace with your actual API
      // const response = await fetch('https://your-api.com/cookie-policy');
      // const data = await response.json();
      
      // Real-time data (simulated)
      const realTimeData = {
        lastUpdated: new Date().toLocaleString(),
        cookiesUsed: [
          { name: 'Essential Cookies', status: 'Active', purpose: 'Site functionality' },
          { name: 'Analytics Cookies', status: 'Active', purpose: 'User behavior tracking' },
          { name: 'Performance Cookies', status: 'Active', purpose: 'Site performance' },
          { name: 'Marketing Cookies', status: 'Inactive', purpose: 'Targeted advertising' }
        ],
        totalCookies: 12,
        activeCookies: 9
      };
      
      setCookieData(realTimeData);
    } catch (error) {
      console.error('Error fetching cookie data:', error);
      toast.error('Failed to load cookie data');
    } finally {
      setLoading(false);
    }
  };

  // ===== UPDATE PREFERENCE REAL-TIME =====
  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} preference updated`);
    
    // Send to backend (optional)
    // fetch('https://your-api.com/cookie-preferences', {
    //   method: 'POST',
    //   body: JSON.stringify({ [key]: value })
    // });
  };

  // ===== SAVE ALL PREFERENCES =====
  const saveAllPreferences = () => {
    localStorage.setItem('ef_cookie_preferences', JSON.stringify(preferences));
    toast.success('✅ Cookie preferences saved successfully!');
    onClose();
  };

  // ===== ACCEPT ALL =====
  const acceptAll = () => {
    const allTrue = { essential: true, analytics: true, performance: true, marketing: true };
    setPreferences(allTrue);
    localStorage.setItem('ef_cookie_preferences', JSON.stringify(allTrue));
    localStorage.setItem('ef_cookies_accepted', 'true');
    toast.success('🍪 All cookies accepted!');
    onClose();
  };

  // ===== REJECT NON-ESSENTIAL =====
  const rejectNonEssential = () => {
    const essentialOnly = { essential: true, analytics: false, performance: false, marketing: false };
    setPreferences(essentialOnly);
    localStorage.setItem('ef_cookie_preferences', JSON.stringify(essentialOnly));
    toast.success('Only essential cookies accepted');
    onClose();
  };

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
          maxWidth: '700px', 
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
              <Shield size={20} style={{ color: '#6366f1' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: 0 }}>Cookie Policy</h2>
              {cookieData && (
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                  Last updated: {cookieData.lastUpdated}
                </p>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '8px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Real-time Stats */}
        {!loading && cookieData && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '12px', 
            marginBottom: '24px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#818cf8', fontSize: '20px', fontWeight: '700', margin: 0 }}>{cookieData.totalCookies}</p>
              <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>Total Cookies</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#10b981', fontSize: '20px', fontWeight: '700', margin: 0 }}>{cookieData.activeCookies}</p>
              <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>Active Cookies</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#fbbf24', fontSize: '20px', fontWeight: '700', margin: 0 }}>4</p>
              <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>Categories</p>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: '#6b7280', marginTop: '16px' }}>Loading cookie data...</p>
          </div>
        ) : (
          <>
            {/* Cookie Preferences */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '14px' }}>Your Cookie Preferences</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Essential - Always On */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div>
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Essential</p>
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '2px 0 0 0' }}>Required for site functionality</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#10b981', fontSize: '11px', fontWeight: '600' }}>Always Active</span>
                    <div style={{ width: '40px', height: '22px', background: '#10b981', borderRadius: '11px', position: 'relative', opacity: 0.6 }}>
                      <div style={{ position: 'absolute', top: '2px', right: '2px', width: '18px', height: '18px', background: 'white', borderRadius: '50%' }} />
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div>
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Analytics</p>
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '2px 0 0 0' }}>Track user behavior & improve</p>
                  </div>
                  <button
                    onClick={() => updatePreference('analytics', !preferences.analytics)}
                    style={{
                      width: '44px',
                      height: '24px',
                      background: preferences.analytics ? '#6366f1' : 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: preferences.analytics ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </button>
                </div>

                {/* Performance */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div>
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Performance</p>
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '2px 0 0 0' }}>Optimize site speed</p>
                  </div>
                  <button
                    onClick={() => updatePreference('performance', !preferences.performance)}
                    style={{
                      width: '44px',
                      height: '24px',
                      background: preferences.performance ? '#6366f1' : 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: preferences.performance ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </button>
                </div>

                {/* Marketing */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div>
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Marketing</p>
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '2px 0 0 0' }}>Personalized ads</p>
                  </div>
                  <button
                    onClick={() => updatePreference('marketing', !preferences.marketing)}
                    style={{
                      width: '44px',
                      height: '24px',
                      background: preferences.marketing ? '#6366f1' : 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: preferences.marketing ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: 'all 0.3s'
                    }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Cookie List - Real Time */}
            {cookieData && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '12px' }}>Cookies in Use</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cookieData.cookiesUsed.map((cookie, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.04)'
                    }}>
                      <div>
                        <p style={{ color: 'white', fontSize: '12px', fontWeight: '500', margin: 0 }}>{cookie.name}</p>
                        <p style={{ color: '#6b7280', fontSize: '10px', margin: '2px 0 0 0' }}>{cookie.purpose}</p>
                      </div>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '600',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        background: cookie.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: cookie.status === 'Active' ? '#10b981' : '#ef4444'
                      }}>
                        {cookie.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={acceptAll}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  color: 'white', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  minWidth: '120px'
                }}
              >
                Accept All
              </button>
              <button 
                onClick={rejectNonEssential}
                style={{ 
                  padding: '14px 24px', 
                  background: 'transparent', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '12px', 
                  color: '#9ca3af', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Essential Only
              </button>
              <button 
                onClick={saveAllPreferences}
                style={{ 
                  padding: '14px 24px', 
                  background: 'rgba(99,102,241,0.15)', 
                  border: '1px solid rgba(99,102,241,0.2)', 
                  borderRadius: '12px', 
                  color: '#818cf8', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Save Preferences
              </button>
            </div>

            <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>
              You can change your preferences anytime. Data is updated in real-time.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CookiePolicy;