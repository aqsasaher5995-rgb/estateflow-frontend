import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getAvatarColor = () => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];
    const index = (user?.name?.length || 0) % colors.length;
    return colors[index];
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <>
      {/* Avatar Button */}
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${getAvatarColor()}, ${getAvatarColor()}dd)`,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 0 0 2px rgba(255,255,255,0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {getInitials()}
        </button>

        {/* Enhanced Beautiful Dropdown Menu */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '55px',
            right: '0',
            width: '320px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            zIndex: 1000,
            animation: 'slideDown 0.3s ease'
          }}>
            {/* Gradient Header with Avatar */}
            <div style={{
              padding: '30px 24px 24px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Decorative dots */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                display: 'flex',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
                <span style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
                <span style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }}></span>
              </div>
              
              {/* Avatar Circle */}
              <div style={{
                width: '85px',
                height: '85px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                fontSize: '36px',
                fontWeight: 'bold',
                border: '3px solid rgba(255,255,255,0.4)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(5px)'
              }}>
                {getInitials()}
              </div>
              
              {/* User Name */}
              <div style={{ 
                fontWeight: '700', 
                fontSize: '20px', 
                marginBottom: '5px',
                letterSpacing: '0.5px'
              }}>
                {user?.name || 'User'}
              </div>
              
              {/* User Email */}
              <div style={{ 
                fontSize: '12px', 
                opacity: 0.85,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <span>📧</span>
                {user?.email || ''}
              </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '12px 0' }}>
              {/* My Profile */}
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s',
                  fontWeight: '500',
                  borderLeft: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderLeftColor = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }}
              >
                <span style={{ 
                  fontSize: '20px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>👤</span>
                <span>My Profile</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>→</span>
              </button>

              {/* Dashboard */}
              <button
                onClick={() => {
                  navigate('/');
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s',
                  fontWeight: '500',
                  borderLeft: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.borderLeftColor = '#10b981';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }}
              >
                <span style={{ fontSize: '20px' }}>🏠</span>
                <span>Home</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#94a3b8' }}>→</span>
              </button>

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)', 
                margin: '10px 20px' 
              }}></div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s',
                  fontWeight: '500',
                  borderLeft: '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fef2f2';
                  e.currentTarget.style.borderLeftColor = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }}
              >
                <span style={{ fontSize: '20px' }}>🚪</span>
                <span>Logout</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#fca5a5' }}>→</span>
              </button>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 20px',
              background: '#f8fafc',
              borderTop: '1px solid #e5e7eb',
              fontSize: '11px',
              color: '#94a3b8',
              textAlign: 'center'
            }}>
              EstateFlow v1.0
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Avatar;