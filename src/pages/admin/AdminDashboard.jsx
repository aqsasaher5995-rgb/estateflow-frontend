import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
  LayoutDashboard, Users, Building2, Wrench, TrendingUp,
  LogOut, Shield, CheckCircle, Clock, AlertTriangle,
  ArrowUpRight, DollarSign, Eye, RefreshCw, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ users: 0, properties: 0, maintenance: 0, revenue: 0 });
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, propsRes, mainRes] = await Promise.all([
        fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties'),
        fetch('https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/admin/maintenance', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const [statsData, usersData, propsData, mainData] = await Promise.all([
        statsRes.json(), usersRes.json(), propsRes.json(), mainRes.json()
      ]);
      if (statsData.success) setStats(statsData.data);
      if (usersData.success) setUsers(usersData.data.users);
      if (propsData.success) setProperties(propsData.data.properties);
      if (mainData.success) setMaintenance(mainData.data.requests);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Role updated successfully');
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
      } else toast.error(data.message);
    } catch { toast.error('Failed to update role'); }
  };

  const handleUpdateMaintenanceStatus = async (id, status) => {
    try {
      const res = await fetch(`https://estateflow-backend-djex6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/maintenance/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Status updated');
        setMaintenance(prev => prev.map(m => m._id === id ? { ...m, status } : m));
      }
    } catch { toast.error('Failed to update status'); }
  };

  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  const roleColor = { admin: '#8b5cf6', owner: '#6366f1', tenant: '#10b981', agent: '#f59e0b' };

  const barChartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const barValues = [0.6, 0.7, 0.75, 0.85, 0.92, 1.0];
  const estimatedRevenue = stats.revenue || properties.filter(p => p.status === 'rented').reduce((s, p) => s + (p.rent?.amount || 0), 0);

  if (loading) return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '3px solid #1e293b', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading admin panel...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>🏠</span>
            </div>
            <div>
              <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>EstateFlow</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Shield size={11} style={{ color: '#8b5cf6' }} />
                <p style={{ color: '#8b5cf6', fontSize: '11px', margin: 0, fontWeight: '600' }}>Admin Control Panel</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={fetchAll} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '30px', color: '#818cf8', fontSize: '13px', cursor: 'pointer' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => navigate('/')} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '30px', color: '#9ca3af', fontSize: '13px', cursor: 'pointer' }}>← Back to Site</button>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '30px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px', width: '100%', flex: 1 }}>
        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'users', label: `Users (${users.length})`, icon: Users },
            { id: 'properties', label: `Properties (${properties.length})`, icon: Building2 },
            { id: 'maintenance', label: `Maintenance (${maintenance.length})`, icon: Wrench },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 20px', border: 'none', background: activeTab === id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === id ? 'white' : '#9ca3af', borderRadius: '10px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="page-enter">
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="admin-stats-grid">
              {[
                { label: 'Total Users', value: stats.users ?? users.length, icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.12)', trend: '+12%' },
                { label: 'Properties Listed', value: stats.properties ?? properties.length, icon: Building2, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', trend: '+8%' },
                { label: 'Maintenance Tickets', value: stats.maintenance ?? maintenance.length, icon: Wrench, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', trend: '-5%' },
                { label: 'Est. Monthly Revenue', value: `PKR ${(estimatedRevenue).toLocaleString()}`, icon: DollarSign, color: '#10b981', bg: 'rgba(16,185,129,0.12)', trend: '+22%' },
              ].map(({ label, value, icon: Icon, color, bg, trend }) => (
                <div key={label} className="glass-panel" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', background: bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: trend.startsWith('+') ? '#4ade80' : '#f87171', background: trend.startsWith('+') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <ArrowUpRight size={10} /> {trend}
                    </span>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0 0 4px' }}>{label}</p>
                  <p style={{ color: 'white', fontSize: '22px', fontWeight: '800', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Revenue Chart + Role Distribution */}
            <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '24px' }} className="admin-chart-grid">
              {/* Revenue Chart */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} style={{ color: '#6366f1' }} /> Revenue Trend
                  </h3>
                  <span className="badge badge-info">Last 6 Months</span>
                </div>
                <svg width="100%" height="220" viewBox="0 0 540 220">
                  <defs>
                    <linearGradient id="adminBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
                      <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[40, 80, 120, 160].map(y => (
                    <line key={y} x1="50" y1={y} x2="530" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {/* Bars */}
                  {barChartMonths.map((m, i) => {
                    const bw = 48, gap = 80, x = 60 + i * gap;
                    const h = Math.max(barValues[i] * 140, 6);
                    const y = 170 - h;
                    return (
                      <g key={m}>
                        <rect x={x} y={y} width={bw} height={h} fill="url(#adminBarGrad)" rx="8" opacity="0.9" />
                        <text x={x + bw / 2} y="195" fill="#6b7280" fontSize="11" textAnchor="middle">{m}</text>
                        <text x={x + bw / 2} y={y - 7} fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                          {Math.round(estimatedRevenue * barValues[i] / 1000)}k
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* User Role Distribution */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} style={{ color: '#8b5cf6' }} /> User Roles
                </h3>
                {['admin', 'owner', 'agent', 'tenant'].map(role => {
                  const count = users.filter(u => u.role === role).length;
                  const pct = users.length ? Math.round((count / users.length) * 100) : 0;
                  return (
                    <div key={role} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#9ca3af', fontSize: '13px', textTransform: 'capitalize' }}>{role}s</span>
                        <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>{count} ({pct}%)</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: roleColor[role] || '#6366f1', borderRadius: '3px', transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  );
                })}

                {/* Recent activity */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px', fontWeight: '600' }}>RECENT REGISTRATIONS</p>
                  {users.slice(0, 3).map(u => (
                    <div key={u._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${roleColor[u.role]}20`, border: `1px solid ${roleColor[u.role]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: 'white', fontSize: '12px', fontWeight: '600', margin: 0 }}>{u.name}</p>
                        <p style={{ color: '#6b7280', fontSize: '11px', margin: 0 }}>{u.email}</p>
                      </div>
                      <span className={`badge badge-${u.role === 'admin' ? 'purple' : u.role === 'owner' ? 'info' : 'success'}`}>{u.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="glass-panel page-enter" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} style={{ color: '#6366f1' }} /> All Users
              </h3>
              <span className="badge badge-info">{users.length} total</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {['User', 'Email', 'Phone', 'Role', 'Actions'].map(col => (
                      <th key={col} style={{ padding: '14px 20px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${roleColor[u.role] || '#6366f1'}20`, border: `1px solid ${roleColor[u.role] || '#6366f1'}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: roleColor[u.role] || '#6366f1' }}>
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#9ca3af', fontSize: '14px' }}>{u.email}</td>
                      <td style={{ padding: '16px 20px', color: '#9ca3af', fontSize: '14px' }}>{u.phone || '—'}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span className={`badge badge-${u.role === 'admin' ? 'purple' : u.role === 'owner' ? 'info' : u.role === 'agent' ? 'warning' : 'success'}`}>{u.role}</span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <select
                          value={u.role}
                          onChange={e => handleRoleChange(u._id, e.target.value)}
                          style={{ padding: '6px 12px', background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', cursor: 'pointer' }}
                        >
                          {['tenant', 'owner', 'agent', 'admin'].map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {properties.map(p => (
                <div key={p._id} className="glass-panel" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                    <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop'} alt={p.title} className="property-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className={`badge badge-${p.status === 'available' ? 'success' : p.status === 'rented' ? 'info' : 'warning'}`} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      {p.status}
                    </span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{p.title}</h4>
                    <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>📍 {p.address?.city}, {p.address?.state}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ color: '#6366f1', fontWeight: '800', fontSize: '16px', margin: 0 }}>PKR {p.rent?.amount?.toLocaleString()}<span style={{ fontSize: '11px', color: '#6b7280' }}>/mo</span></p>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                        <span>🛏 {p.details?.bedrooms}</span>
                        <span>🛁 {p.details?.bathrooms}</span>
                      </div>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '8px' }}>Owner: <span style={{ color: '#9ca3af' }}>{p.ownerId?.name || 'N/A'}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div className="glass-panel page-enter" style={{ padding: '28px' }}>
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} style={{ color: '#6366f1' }} /> All Maintenance Requests
            </h3>
            {maintenance.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <CheckCircle size={40} style={{ color: '#10b981', marginBottom: '12px' }} />
                <p style={{ color: '#9ca3af' }}>No maintenance requests in the system.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {maintenance.map(m => (
                  <div key={m._id} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', margin: 0 }}>{m.title}</h4>
                        <span className={`badge badge-${m.priority === 'high' ? 'danger' : m.priority === 'medium' ? 'warning' : 'info'}`}>{m.priority}</span>
                        <span className={`badge badge-${m.status === 'resolved' ? 'success' : m.status === 'in_progress' ? 'info' : 'warning'}`}>{m.status}</span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 6px' }}>{m.description}</p>
                      <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                        🏢 <span style={{ color: '#9ca3af' }}>{m.propertyId?.title || 'N/A'}</span>
                        {m.tenantId && <> · 👤 <span style={{ color: '#9ca3af' }}>{m.tenantId?.name}</span></>}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {m.status === 'pending' && (
                        <button onClick={() => handleUpdateMaintenanceStatus(m._id, 'in_progress')} style={{ padding: '8px 14px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                          Start
                        </button>
                      )}
                      {m.status === 'in_progress' && (
                        <button onClick={() => handleUpdateMaintenanceStatus(m._id, 'resolved')} style={{ padding: '8px 14px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#4ade80', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                          Resolve
                        </button>
                      )}
                      {m.status === 'resolved' && <CheckCircle size={18} style={{ color: '#10b981' }} />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ background: '#05070a', padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>© 2026 EstateFlow Admin Panel. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .admin-chart-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .admin-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
