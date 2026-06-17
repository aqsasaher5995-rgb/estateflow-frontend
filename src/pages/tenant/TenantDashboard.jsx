import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  Clock, 
  FileText, 
  CheckCircle, 
  Plus, 
  LogOut, 
  User, 
  Phone, 
  Mail, 
  DollarSign, 
  AlertCircle, 
  Calendar,
  ShieldAlert,
  Loader
} from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import toast from 'react-hot-toast';

const TenantDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('overview'); // overview, payments, maintenance
  const [rentedProperty, setRentedProperty] = useState(null);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rent Payment Form State
  const [payingMonth, setPayingMonth] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Maintenance Request Form State
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketCategory, setTicketCategory] = useState('plumbing');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [ticketDesc, setTicketDesc] = useState('');
  const [submittingTicket, setSubmittingTicket] = useState(false);

  // Billing Months (Mock)
  const billingMonths = [
    { month: 'June 2026', amount: 85000, status: 'pending' },
    { month: 'May 2026', amount: 85000, status: 'paid', date: '2026-05-02', txn: 'TXN-A3B9C4D8' },
    { month: 'April 2026', amount: 85000, status: 'paid', date: '2026-04-03', txn: 'TXN-E5F6G7H8' }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // 1. Fetch properties to associate one as "rented"
      const propRes = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/properties');
      const propData = await propRes.json();
      
      let selectedProp = null;
      if (propData.success && propData.data.properties.length > 0) {
        // Assign first available property as their mock active lease
        selectedProp = propData.data.properties[0];
      } else {
        // Fallback mock property if db is completely empty
        selectedProp = {
          _id: 'mock-prop-id-123',
          title: "Luxury Apartment DHA Clifton",
          rent: { amount: 85000, deposit: 170000, maintenance: 4250 },
          address: { street: 'Main Khayaban-e-Ittehad', city: 'Karachi', state: 'Sindh' },
          details: { bedrooms: 3, bathrooms: 2, area: 1600 },
          ownerId: { name: 'Sarmad Ali', email: 'sarmad@estateflow.com', phone: '0300-1122334' },
          images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"]
        };
      }
      setRentedProperty(selectedProp);

      // 2. Fetch payments from backend
      const payRes = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/payments/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const payData = await payRes.json();
      
      // Merge backend payments with default mock statements
      if (payData.success) {
        const dbPayments = payData.data.payments.map(p => ({
          month: p.month,
          amount: p.amount,
          status: p.status,
          date: p.createdAt.split('T')[0],
          txn: p.transactionId
        }));
        
        // Filter out mock months that have been paid in backend
        const remainingMock = billingMonths.filter(m => 
          !dbPayments.some(dp => dp.month === m.month && dp.status === 'paid')
        );
        
        setPayments([...dbPayments, ...remainingMock]);
      } else {
        setPayments(billingMonths);
      }

      // 3. Fetch maintenance tickets from backend
      const ticketRes = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/maintenance/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const ticketData = await ticketRes.json();
      if (ticketData.success) {
        setTickets(ticketData.data.requests);
      } else {
        // Fallback mock requests
        setTickets([
          { _id: 't1', title: 'AC Water Leakage', category: 'appliances', priority: 'medium', status: 'resolved', createdAt: '2026-05-15T10:00:00Z', description: 'Master bedroom AC unit is leaking water on the floor.' },
          { _id: 't2', title: 'Kitchen Sink Plumbing', category: 'plumbing', priority: 'high', status: 'in_progress', createdAt: '2026-06-02T14:30:00Z', description: 'Drain pipe blocked below kitchen sink, causing slow water flow.' }
        ]);
      }
      
    } catch (error) {
      console.error("Error fetching tenant dashboard data:", error);
      // Fallback on error
      setPayments(billingMonths);
      setTickets([
        { _id: 't1', title: 'AC Water Leakage', category: 'appliances', priority: 'medium', status: 'resolved', createdAt: '2026-05-15T10:00:00Z', description: 'Master bedroom AC unit is leaking water.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayRentSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      toast.error("Please fill in all credit card details.");
      return;
    }
    
    setPaymentProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId: rentedProperty._id || 'mock-prop-id-123',
          amount: rentedProperty.rent?.amount || 85000,
          month: payingMonth,
          cardLast4: cardNumber.replace(/\s/g, '').slice(-4)
        })
      });
      
      const data = await response.json();
      
      // Simulate bank verification delay
      setTimeout(() => {
        setPaymentProcessing(false);
        if (data.success) {
          setPaymentSuccess(true);
          toast.success("Rent Paid successfully!");
          
          // Clear input fields
          setCardNumber('');
          setCardExpiry('');
          setCardCvv('');
          setCardName('');
          
          // Re-fetch billing history
          fetchDashboardData();
        } else {
          toast.error(data.message || "Payment Gateway Rejected Transaction.");
        }
      }, 2000);

    } catch (error) {
      setPaymentProcessing(false);
      toast.error("Error connecting to payment processor.");
    }
  };

  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) {
      toast.error("Please fill in title and description.");
      return;
    }

    setSubmittingTicket(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId: rentedProperty._id || 'mock-prop-id-123',
          title: ticketTitle,
          category: ticketCategory,
          priority: ticketPriority,
          description: ticketDesc
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success("Maintenance request submitted!");
        setTicketTitle('');
        setTicketDesc('');
        fetchDashboardData(); // Refresh requests list
      } else {
        toast.error(data.message || "Failed to submit ticket.");
      }
    } catch (error) {
      toast.error("Error submitting request.");
    } finally {
      setSubmittingTicket(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Formatting Card Number Inputs
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted.substring(0, 19));
  };

  const handleCardExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 2) {
      setCardExpiry(val);
    } else {
      setCardExpiry(val.substring(0, 2) + '/' + val.substring(2, 4));
    }
  };

  const getPriorityColor = (prio) => {
    switch(prio) {
      case 'high': return '#f87171';
      case 'medium': return '#fbbf24';
      default: return '#60a5fa';
    }
  };

  if (loading) {
    return (
      <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>🏠</span>
            </div>
            <div>
              <h1 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0, letterSpacing: '-0.3px' }}>EstateFlow</h1>
              <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>Tenant Portal</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button onClick={() => navigate('/')} style={{ padding: '8px 20px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '40px', color: '#818cf8', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              ← Back to Home
            </button>
            <Avatar />
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '40px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD BODY */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Welcome Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>Welcome back, {user?.name}!</h2>
            <p style={{ color: '#9ca3af', marginTop: '6px', fontSize: '14px' }}>Review your tenancy details, payments, and open maintenance requests.</p>
          </div>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', padding: '6px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => setActiveTab('overview')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'overview' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'overview' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Overview
            </button>
            <button onClick={() => setActiveTab('payments')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'payments' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'payments' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Payments
            </button>
            <button onClick={() => setActiveTab('maintenance')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'maintenance' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'maintenance' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Maintenance
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '30px' }} className="mobile-col">
            
            {/* Left: Active Lease info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '30px', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} style={{ color: '#6366f1' }} /> Active Lease Details
                </h3>
                
                {rentedProperty && (
                  <div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
                      <img src={rentedProperty.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'} alt="Lease Property" style={{ width: '150px', height: '110px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }} />
                      <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>{rentedProperty.title}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '13.5px', marginTop: '6px' }}>📍 {rentedProperty.address?.street}, {rentedProperty.address?.city}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '12px', color: '#6b7280' }}>
                          <span>🛏️ {rentedProperty.details?.bedrooms} Bedrooms</span>
                          <span>🛁 {rentedProperty.details?.bathrooms} Bathrooms</span>
                          <span>📐 {rentedProperty.details?.area} Sq. Ft.</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                      <div>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>Monthly Rent</span>
                        <p style={{ color: '#6366f1', fontSize: '20px', fontWeight: '700', marginTop: '4px' }}>PKR {rentedProperty.rent?.amount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>Security Deposit</span>
                        <p style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginTop: '4px' }}>PKR {rentedProperty.rent?.deposit?.toLocaleString() || (rentedProperty.rent?.amount * 2).toLocaleString()}</p>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280', fontSize: '12px' }}>Lease Period</span>
                        <p style={{ color: 'white', fontSize: '15px', fontWeight: '600', marginTop: '6px' }}>12 Months (Active)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rented Landlord Contact details */}
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={20} style={{ color: '#8b5cf6' }} /> Landlord Information
                </h3>
                {rentedProperty && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>👤</div>
                    <div>
                      <p style={{ color: 'white', fontWeight: '700', fontSize: '17px' }}>{rentedProperty.ownerId?.name || 'Landlord Partner'}</p>
                      <div style={{ display: 'flex', gap: '20px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {rentedProperty.ownerId?.phone || '0321-4567890'}</span>
                        <span style={{ color: '#9ca3af', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {rentedProperty.ownerId?.email || 'landlord@estateflow.com'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick actions and status counters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Payment due card */}
              <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(99,102,241,0.06)', borderRadius: '50%' }}></div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Rent Payment Due</h3>
                {payments.find(p => p.status === 'pending') ? (
                  <div>
                    <p style={{ color: '#cbd5e1', fontSize: '13px' }}>Current billing period: <strong style={{ color: 'white' }}>{payments.find(p => p.status === 'pending').month}</strong></p>
                    <p style={{ fontSize: '32px', fontWeight: '800', color: '#f59e0b', margin: '14px 0' }}>
                      PKR {rentedProperty?.rent?.amount?.toLocaleString()}
                    </p>
                    <button onClick={() => { setActiveTab('payments'); setPayingMonth(payments.find(p => p.status === 'pending').month); }} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                      Pay Rent Now
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', margin: '20px 0' }}>
                      <CheckCircle size={32} />
                      <div>
                        <p style={{ fontWeight: '700', margin: 0 }}>All paid up!</p>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>No payments pending.</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('payments')} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>
                      View Billing History
                    </button>
                  </div>
                )}
              </div>

              {/* Maintenance tickets summary */}
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Maintenance Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#fbbf24', fontSize: '24px', fontWeight: '800' }}>{tickets.filter(t => t.status === 'pending').length}</span>
                    <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '4px' }}>Pending</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#6366f1', fontSize: '24px', fontWeight: '800' }}>{tickets.filter(t => t.status === 'in_progress').length}</span>
                    <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '4px' }}>In Progress</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ color: '#10b981', fontSize: '24px', fontWeight: '800' }}>{tickets.filter(t => t.status === 'resolved').length}</span>
                    <p style={{ color: '#9ca3af', fontSize: '11px', marginTop: '4px' }}>Resolved</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab('maintenance')} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>
                  File Maintenance Request
                </button>
              </div>

            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="mobile-col">
            
            {/* Pay Rent Panel */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={20} style={{ color: '#6366f1' }} /> Pay Rent Online
              </h3>

              {paymentSuccess ? (
                <div style={{ textAlign: 'center', padding: '30px' }}>
                  <div style={{ display: 'inline-flex', width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10b981', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '16px' }}>
                    <CheckCircle size={36} />
                  </div>
                  <h4 style={{ fontSize: '22px', color: 'white', fontWeight: '700', marginBottom: '8px' }}>Payment Successful!</h4>
                  <p style={{ color: '#9ca3af', fontSize: '13.5px', marginBottom: '24px' }}>Your transaction has been logged and the landlord notified.</p>
                  <button onClick={() => setPaymentSuccess(false)} style={{ padding: '10px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
                    Make Another Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePayRentSubmit}>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Select Billing Month *</label>
                    <select value={payingMonth} onChange={(e) => setPayingMonth(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white' }}>
                      <option value="">-- Choose Month --</option>
                      {payments.filter(p => p.status === 'pending').map(p => (
                        <option key={p.month} value={p.month}>{p.month} (PKR {p.amount.toLocaleString()})</option>
                      ))}
                    </select>
                  </div>

                  {/* Visa Card Mock Graphics */}
                  <div style={{ marginBottom: '24px' }}>
                    <div className="premium-credit-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '2px' }}>GOLDEN LEASE CARD</span>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', color: '#fbbf24' }}>VISA</span>
                      </div>
                      <div style={{ fontSize: '18px', letterSpacing: '3px', fontFamily: 'monospace', margin: '14px 0' }}>
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1' }}>
                        <div>
                          <span>CARDHOLDER</span>
                          <p style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '2px', color: 'white' }}>{cardName.toUpperCase() || 'YOUR NAME'}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span>EXPIRES</span>
                          <p style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '2px', color: 'white' }}>{cardExpiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <input type="text" placeholder="Cardholder Name" value={cardName} onChange={(e) => setCardName(e.target.value)} required style={inputStyle} />
                  </div>
                  
                  <div style={{ marginBottom: '14px' }}>
                    <input type="text" placeholder="Card Number (16-Digit)" value={cardNumber} onChange={handleCardNumberChange} required style={inputStyle} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                    <input type="text" placeholder="Expiry (MM/YY)" value={cardExpiry} onChange={handleCardExpiryChange} required style={inputStyle} />
                    <input type="password" placeholder="CVV" maxLength="3" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))} required style={inputStyle} />
                  </div>

                  <button type="submit" disabled={paymentProcessing} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {paymentProcessing ? (
                      <>
                        <Loader className="spinner" size={16} /> Processing Gateway...
                      </>
                    ) : (
                      <>
                        <DollarSign size={16} /> Pay Rent (PKR {rentedProperty?.rent?.amount?.toLocaleString()})
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

            {/* Billing History */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} style={{ color: '#8b5cf6' }} /> Billing Statements
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {payments.map((statement, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div>
                      <p style={{ fontWeight: '700', color: 'white', fontSize: '15px' }}>{statement.month}</p>
                      {statement.date ? (
                        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>Paid: {statement.date} • Txn: <span style={{ color: '#818cf8' }}>{statement.txn}</span></p>
                      ) : (
                        <p style={{ color: '#fbbf24', fontSize: '12px', marginTop: '4px' }}>Payment Pending</p>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '700', color: 'white', fontSize: '16px' }}>PKR {statement.amount.toLocaleString()}</p>
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '2px 10px', borderRadius: '20px', marginTop: '6px', color: 'white', background: statement.status === 'paid' ? '#10b981' : '#f59e0b' }}>
                        {statement.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '40px' }} className="mobile-col">
            
            {/* Submit Request Form */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench size={20} style={{ color: '#6366f1' }} /> File Request
              </h3>
              <form onSubmit={handleCreateTicketSubmit}>
                
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Request Title *</label>
                  <input type="text" placeholder="e.g. Bathroom Leakage" value={ticketTitle} onChange={(e) => setTicketTitle(e.target.value)} required style={inputStyle} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Category</label>
                    <select value={ticketCategory} onChange={(e) => setTicketCategory(e.target.value)} style={{ width: '100%', padding: '12px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white' }}>
                      <option value="plumbing">🚰 Plumbing</option>
                      <option value="electrical">⚡ Electrical</option>
                      <option value="appliances">🔌 Appliances</option>
                      <option value="structural">🧱 Structural</option>
                      <option value="cleaning">🧹 Cleaning</option>
                      <option value="other">🛠️ Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Urgency Level</label>
                    <select value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)} style={{ width: '100%', padding: '12px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white' }}>
                      <option value="low">🟢 Low Urgency</option>
                      <option value="medium">🟡 Medium Urgency</option>
                      <option value="high">🔴 High Urgency</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Description of the Issue *</label>
                  <textarea placeholder="Please describe the problem in detail so the landlord can assign the correct technician..." rows="5" value={ticketDesc} onChange={(e) => setTicketDesc(e.target.value)} required style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <button type="submit" disabled={submittingTicket} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {submittingTicket ? <Loader className="spinner" size={16} /> : <Plus size={16} />} Submit Complaint
                </button>

              </form>
            </div>

            {/* Request Ticket History */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={20} style={{ color: '#8b5cf6' }} /> Ticket Log & Status
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tickets.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.01)', borderRadius: '16px' }}>
                    <CheckCircle size={32} style={{ color: '#6b7280', marginBottom: '8px' }} />
                    <p style={{ color: '#9ca3af' }}>No active maintenance requests.</p>
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <div key={ticket._id} style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <h4 style={{ fontWeight: '700', color: 'white', fontSize: '16px' }}>{ticket.title}</h4>
                          <p style={{ color: '#6b7280', fontSize: '11.5px', marginTop: '4px' }}>Category: <strong style={{ color: '#9ca3af' }}>{ticket.category.toUpperCase()}</strong> • Filed: {new Date(ticket.createdAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: '600', color: getPriorityColor(ticket.priority), background: getPriorityColor(ticket.priority) + '15', padding: '2px 8px', borderRadius: '6px' }}>
                            {ticket.priority.toUpperCase()}
                          </span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'white',
                            background: ticket.status === 'resolved' ? '#10b981' : ticket.status === 'in_progress' ? '#6366f1' : '#f59e0b',
                            padding: '2px 10px',
                            borderRadius: '20px'
                          }}>
                            {ticket.status === 'resolved' ? 'RESOLVED' : ticket.status === 'in_progress' ? 'IN PROGRESS' : 'PENDING'}
                          </span>
                        </div>
                      </div>
                      
                      <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.5', marginTop: '6px' }}>{ticket.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ background: '#05070a', padding: '30px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
          <p>© 2026 EstateFlow. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .mobile-col { display: flex !important; flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#090d16',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: 'white',
  outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.2s'
};

export default TenantDashboard;
