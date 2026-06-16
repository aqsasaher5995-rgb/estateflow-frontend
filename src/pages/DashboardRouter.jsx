import React from 'react';
import { useSelector } from 'react-redux';
import MyProperties from './owner/MyProperties';
import TenantDashboard from './tenant/TenantDashboard';
import AdminDashboard from './admin/AdminDashboard';

const DashboardRouter = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  if (user.role === 'owner') {
    return <MyProperties />;
  }

  return <TenantDashboard />;
};

export default DashboardRouter;
