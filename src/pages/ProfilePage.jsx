import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setUpdateMessage('✅ Profile updated successfully!');
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setUpdateMessage('❌ ' + (data.message || 'Update failed'));
      }
    } catch (error) {
      setUpdateMessage('❌ Error updating profile');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Header Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          {/* Back to Home Button - Changed from Dashboard to Home */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(102,126,234,0.4)',
              padding: '8px 22px',
              borderRadius: '40px',
              color: '#a78bfa',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(102,126,234,0.2)';
              e.currentTarget.style.borderColor = 'rgba(102,126,234,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(102,126,234,0.4)';
            }}
          >
            ← Back to Home
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.4)',
              padding: '8px 22px',
              borderRadius: '40px',
              color: '#f87171',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Main Glowing Card */}
        <div style={{
          background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f23 100%)',
          borderRadius: '32px',
          padding: '36px 30px',
          boxShadow: '0 0 40px rgba(102,126,234,0.3), 0 0 80px rgba(139,92,246,0.15), 0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(102,126,234,0.4)',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Avatar with Glow */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${getAvatarColor()}, ${getAvatarColor()}aa)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 0 30px rgba(102,126,234,0.5), 0 8px 20px rgba(0,0,0,0.3)',
              border: '3px solid rgba(255,255,255,0.2)'
            }}>
              {getInitials()}
            </div>
          </div>

          {!isEditing ? (
            // View Mode
            <>
              {/* User Name & Role */}
              <div style={{
                textAlign: 'center',
                marginBottom: '28px'
              }}>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #fff, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>{user?.name}</h2>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(102,126,234,0.15)',
                  padding: '4px 16px',
                  borderRadius: '30px',
                  color: '#a78bfa',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {user?.role === 'owner' ? '🏠 Property Owner' : user?.role === 'agent' ? '🤝 Real Estate Agent' : '👤 Tenant'}
                </span>
              </div>

              {/* Info Rows */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                padding: '5px 0',
                marginBottom: '28px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(102,126,234,0.1)'
                }}>
                  <div style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>📧</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>EMAIL</span>
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: '14px', wordBreak: 'break-all' }}>{user?.email || 'Not set'}</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(102,126,234,0.1)'
                }}>
                  <div style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>📞</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>PHONE</span>
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{user?.phone || 'Not set'}</div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px'
                }}>
                  <div style={{ width: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>📅</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '500' }}>SINCE</span>
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: '14px' }}>2024</div>
                </div>
              </div>

              {/* Premium Badge */}
              <div style={{
                textAlign: 'center',
                marginBottom: '28px',
                padding: '12px',
                background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))',
                borderRadius: '16px',
                border: '1px solid rgba(34,197,94,0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🏆</span>
                  <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '600' }}>Premium Member</span>
                  <span style={{ fontSize: '14px' }}>✓</span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  border: 'none',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 20px rgba(59,130,246,0.4)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ✏️ Edit Profile
              </button>
            </>
          ) : (
            // Edit Mode
            <form onSubmit={handleUpdateProfile}>
              {updateMessage && (
                <div style={{
                  padding: '14px',
                  borderRadius: '14px',
                  marginBottom: '24px',
                  background: updateMessage.includes('✅') ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  border: `1px solid ${updateMessage.includes('✅') ? '#22c55e' : '#ef4444'}`,
                  color: updateMessage.includes('✅') ? '#4ade80' : '#fca5a5',
                  fontSize: '13px',
                  textAlign: 'center'
                }}>
                  {updateMessage}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block', fontWeight: '500' }}>
                  👤 Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block', fontWeight: '500' }}>
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '8px', display: 'block', fontWeight: '500' }}>
                  📞 Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 0 15px rgba(16,185,129,0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                    });
                    setUpdateMessage('');
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid #334155',
                    borderRadius: '14px',
                    color: '#94a3b8',
                    fontSize: '15px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                    e.currentTarget.style.borderColor = '#ef4444';
                    e.currentTarget.style.color = '#f87171';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;