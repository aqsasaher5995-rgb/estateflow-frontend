import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  Wrench, 
  BarChart3, 
  LogOut, 
  CheckCircle, 
  Play, 
  Clock, 
  AlertTriangle,
  Building,
  ArrowUpRight,
  TrendingUp,
  Percent,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

const MyProperties = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties'); // properties, maintenance, analytics
  const [properties, setProperties] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketsLoading, setTicketsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Image Upload State
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    rent: '',
    city: '',
    state: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });
  const [editFormData, setEditFormData] = useState({
    title: '',
    rent: '',
    city: '',
    state: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });

  useEffect(() => {
    fetchProperties();
    fetchTickets();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      const response = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/properties/my/properties', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProperties(data.data.properties);
      }
    } catch (error) {
      console.error('Error fetching owner properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setTicketsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/maintenance/owner', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTickets(data.data.requests);
      }
    } catch (error) {
      console.error('Error fetching owner tickets:', error);
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleUpdateTicketStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/maintenance/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Ticket status updated to ${newStatus}`);
        fetchTickets();
      } else {
        toast.error(data.message || 'Failed to update ticket');
      }
    } catch (error) {
      toast.error('Error updating ticket status');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description || 'No description');
      formDataToSend.append('type', 'apartment');
      formDataToSend.append('address', JSON.stringify({ 
        street: 'Street', 
        city: formData.city, 
        state: formData.state, 
        pincode: '44000' 
      }));
      formDataToSend.append('details', JSON.stringify({ 
        bedrooms: parseInt(formData.bedrooms) || 0, 
        bathrooms: parseInt(formData.bathrooms) || 0, 
        area: parseInt(formData.area) || 0,
        furnishing: 'unfurnished'
      }));
      formDataToSend.append('rent', JSON.stringify({ 
        amount: parseInt(formData.rent), 
        deposit: parseInt(formData.rent) * 2, 
        maintenance: Math.round(parseInt(formData.rent) * 0.05) 
      }));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const response = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/properties', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Property created successfully!');
        setFormData({ title: '', rent: '', city: '', state: '', description: '', bedrooms: '', bathrooms: '', area: '' });
        setSelectedImage(null);
        setImagePreview(null);
        setShowForm(false);
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to create');
      }
    } catch (error) {
      toast.error('Error creating property');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const propertyData = {
        title: editFormData.title,
        description: editFormData.description || 'No description',
        type: selectedProperty?.type || 'apartment',
        address: { street: selectedProperty?.address?.street || 'Street', city: editFormData.city, state: editFormData.state, pincode: selectedProperty?.address?.pincode || '44000' },
        details: { bedrooms: parseInt(editFormData.bedrooms) || 0, bathrooms: parseInt(editFormData.bathrooms) || 0, area: parseInt(editFormData.area) || 0, furnishing: selectedProperty?.details?.furnishing || 'unfurnished' },
        rent: { amount: parseInt(editFormData.rent), deposit: parseInt(editFormData.rent) * 2, maintenance: Math.round(parseInt(editFormData.rent) * 0.05) }
      };
      const response = await fetch(`https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${selectedProperty._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(propertyData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Property updated successfully!');
        setShowEditModal(false);
        setSelectedProperty(null);
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to update');
      }
    } catch (error) {
      toast.error('Error updating property');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        toast.success('Property deleted successfully!');
        fetchProperties();
      } catch (error) {
        toast.error('Error deleting');
      }
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setEditFormData({
      title: property.title || '',
      rent: property.rent?.amount || '',
      city: property.address?.city || '',
      state: property.address?.state || '',
      description: property.description || '',
      bedrooms: property.details?.bedrooms || '',
      bathrooms: property.details?.bathrooms || '',
      area: property.details?.area || ''
    });
    setShowEditModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.address?.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || prop.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const rentedProperties = properties.filter(p => p.status === 'rented').length;
  const occupancyRate = totalProperties > 0 ? Math.round((rentedProperties / totalProperties) * 100) : 0;
  
  // Estimate Total Income from rented properties
  const totalRentReceived = properties
    .filter(p => p.status === 'rented')
    .reduce((sum, p) => sum + (p.rent?.amount || 0), 0);

  // SVG Chart Calculation (Analytics)
  const barChartData = [
    { label: 'Jan', val: Math.round(totalRentReceived * 0.7) },
    { label: 'Feb', val: Math.round(totalRentReceived * 0.8) },
    { label: 'Mar', val: Math.round(totalRentReceived * 0.85) },
    { label: 'Apr', val: Math.round(totalRentReceived * 0.9) },
    { label: 'May', val: totalRentReceived },
    { label: 'Jun', val: totalRentReceived }
  ];

  const maxChartVal = Math.max(...barChartData.map(d => d.val), 50000);

  if (loading) {
    return (
      <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>🏠</span>
            </div>
            <div>
              <h1 style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0, letterSpacing: '-0.3px' }}>EstateFlow</h1>
              <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>Owner Dashboard</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button onClick={() => navigate('/')} style={{ padding: '8px 20px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '40px', color: '#818cf8', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              ← Back to Home
            </button>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '40px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Title Section & Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'white', margin: 0 }}>Property Management</h1>
            <p style={{ color: '#9ca3af', marginTop: '6px', fontSize: '14px' }}>Track analytics, review tenant tickets, and manage listings.</p>
          </div>
          
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', padding: '6px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={() => setActiveTab('properties')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'properties' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'properties' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Properties
            </button>
            <button onClick={() => { setActiveTab('maintenance'); fetchTickets(); }} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'maintenance' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'maintenance' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Maintenance ({tickets.filter(t => t.status !== 'resolved').length})
            </button>
            <button onClick={() => setActiveTab('analytics')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'analytics' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent', color: activeTab === 'analytics' ? 'white' : '#9ca3af', borderRadius: '20px', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="mobile-grid">
          
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(99,102,241,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building size={20} style={{ color: '#6366f1' }} />
              </div>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Total Properties</p>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: '2px 0 0 0' }}>{totalProperties}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(34,197,94,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Percent size={20} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Occupancy Rate</p>
                <p style={{ color: '#10b981', fontSize: '24px', fontWeight: '800', margin: '2px 0 0 0' }}>{occupancyRate}%</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(245,158,11,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Active Rentals</p>
                <p style={{ color: '#f59e0b', fontSize: '24px', fontWeight: '800', margin: '2px 0 0 0' }}>{rentedProperties}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(139,92,246,0.12)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={20} style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Est. Monthly Rent</p>
                <p style={{ color: '#8b5cf6', fontSize: '22px', fontWeight: '800', margin: '2px 0 0 0' }}>PKR {totalRentReceived.toLocaleString()}</p>
              </div>
            </div>
          </div>

        </div>

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1, maxWidth: '600px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input type="text" placeholder="Search by name or city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '11px 16px 11px 40px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none' }} />
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>🔍</span>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '11px 20px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none', cursor: 'pointer' }}>
                  <option value="all">All Listings</option>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              <button onClick={() => setShowForm(!showForm)} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '40px', color: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {showForm ? 'Close Form' : <><Plus size={16} /> Add Property</>}
              </button>
            </div>

            {/* Add Property Form */}
            {showForm && (
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>➕ Create Property Listing</h2>
                <form onSubmit={handleCreate}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }} className="mobile-col">
                    <input type="text" placeholder="Property Title *" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
                    <input type="number" placeholder="Monthly Rent (PKR) *" value={formData.rent} onChange={(e) => setFormData({...formData, rent: e.target.value})} style={inputStyle} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }} className="mobile-col">
                    <input type="text" placeholder="City *" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} style={inputStyle} required />
                    <input type="text" placeholder="State *" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} style={inputStyle} required />
                  </div>
                  <textarea placeholder="Property Description" rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }} className="mobile-col">
                    <input type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} style={inputStyle} />
                    <input type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} style={inputStyle} />
                    <input type="number" placeholder="Area (sq.ft)" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} style={inputStyle} />
                  </div>
                  
                  {/* Image Upload */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Property Banner Image</label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label style={{ padding: '10px 20px', background: '#6366f1', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                        Browse Computer
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                      </label>
                      {imagePreview && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={imagePreview} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                          <button type="button" onClick={() => { setSelectedImage(null); setImagePreview(null); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>Remove</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" style={{ padding: '12px 28px', background: '#10b981', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Create Property</button>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
              <div className="glass-panel" style={{ padding: '60px', textAlign: 'center' }}>
                <span style={{ fontSize: '56px' }}>🏘️</span>
                <p style={{ color: '#9ca3af', fontSize: '17px', marginTop: '16px' }}>No properties found</p>
                <p style={{ color: '#6b7280', fontSize: '13.5px', marginTop: '4px' }}>Click "Add Property" to create your first real estate listing.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {filteredProperties.map((prop) => (
                  <div key={prop._id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '180px', position: 'relative', overflow: 'hidden', background: '#090d16' }}>
                      <img src={prop.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '12px', right: '12px', background: prop.status === 'available' ? 'rgba(16,185,129,0.9)' : 'rgba(99,102,241,0.9)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                        {prop.status === 'available' ? 'Available' : 'Rented'}
                      </span>
                    </div>
                    
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                      <div>
                        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>{prop.title}</h3>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '12px' }}>📍 {prop.address?.city}, {prop.address?.state}</p>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', fontSize: '12.5px', color: '#6b7280' }}>
                          <span>🛏️ {prop.details?.bedrooms || 0} Beds</span>
                          <span>🛁 {prop.details?.bathrooms || 0} Baths</span>
                          <span>📐 {prop.details?.area || 0} sqft</span>
                        </div>
                      </div>
                      
                      <div>
                        <p style={{ color: '#6366f1', fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>PKR {prop.rent?.amount?.toLocaleString()}<span style={{ fontSize: '12px', color: '#6b7280' }}>/month</span></p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleEditClick(prop)} style={{ flex: 1, padding: '10px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', color: '#f59e0b', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <Edit size={14} /> Edit
                          </button>
                          <button onClick={() => handleDelete(prop._id)} style={{ flex: 1, padding: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#f87171', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div className="glass-panel" style={{ padding: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={20} style={{ color: '#6366f1' }} /> Tenant Maintenance Requests
            </h3>

            {ticketsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}><div style={{ width: '30px', height: '30px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div></div>
            ) : tickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.01)', borderRadius: '16px' }}>
                <CheckCircle size={32} style={{ color: '#10b981', marginBottom: '8px', margin: '0 auto' }} />
                <p style={{ color: '#9ca3af', marginTop: '8px' }}>All requests resolved! No pending issues reported by tenants.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {tickets.map((ticket) => (
                  <div key={ticket._id} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h4 style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>{ticket.title}</h4>
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: ticket.priority === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: ticket.priority === 'high' ? '#f87171' : '#f59e0b' }}>
                          {ticket.priority.toUpperCase()}
                        </span>
                        <span style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '20px', background: ticket.status === 'resolved' ? 'rgba(16,185,129,0.15)' : ticket.status === 'in_progress' ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)', color: ticket.status === 'resolved' ? '#4ade80' : ticket.status === 'in_progress' ? '#818cf8' : '#fbbf24' }}>
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                      <p style={{ color: '#818cf8', fontSize: '12.5px', marginTop: '6px' }}>🏢 Property: <strong style={{ color: 'white' }}>{ticket.propertyId?.title}</strong></p>
                      <p style={{ color: '#9ca3af', fontSize: '13.5px', marginTop: '8px', lineHeight: '1.5' }}>{ticket.description}</p>
                      
                      {/* Tenant Contacts */}
                      <div style={{ display: 'flex', gap: '20px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', fontSize: '12px', color: '#6b7280' }}>
                        <span>👤 Tenant: <strong style={{ color: '#9ca3af' }}>{ticket.tenantId?.name}</strong></span>
                        <span>📞 Phone: <strong style={{ color: '#9ca3af' }}>{ticket.tenantId?.phone || 'N/A'}</strong></span>
                      </div>
                    </div>

                    {/* Progress Control Actions */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {ticket.status === 'pending' && (
                        <button onClick={() => handleUpdateTicketStatus(ticket._id, 'in_progress')} style={{ padding: '8px 16px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', borderRadius: '8px', cursor: 'pointer', fontSize: '12.5px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Play size={12} /> Assign Request
                        </button>
                      )}
                      {ticket.status === 'in_progress' && (
                        <button onClick={() => handleUpdateTicketStatus(ticket._id, 'resolved')} style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#4ade80', borderRadius: '8px', cursor: 'pointer', fontSize: '12.5px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} /> Mark Resolved
                        </button>
                      )}
                      {ticket.status === 'resolved' && (
                        <span style={{ color: '#6b7280', fontSize: '12px', fontStyle: 'italic' }}>Resolved ✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '30px' }} className="mobile-col">
            
            {/* SVG Earnings Bar Chart */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} style={{ color: '#6366f1' }} /> Monthly Rental Income Flow
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                {/* SVG Visual graph */}
                <svg width="100%" height="240" viewBox="0 0 500 240" style={{ overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                  {/* Rendering Bars */}
                  {barChartData.map((d, i) => {
                    const barWidth = 32;
                    const spacing = 70;
                    const x = 60 + i * spacing;
                    // Max height 150px
                    const pct = d.val / (maxChartVal || 1);
                    const barHeight = Math.max(pct * 140, 5);
                    const y = 180 - barHeight;

                    return (
                      <g key={i}>
                        {/* Glowing shadow hover effect */}
                        <rect x={x} y={y} width={barWidth} height={barHeight} fill="url(#barGrad)" rx="6" style={{ transition: 'all 0.3s' }} />
                        <text x={x + barWidth/2} y="202" fill="#9ca3af" fontSize="11" textAnchor="middle">{d.label}</text>
                        <text x={x + barWidth/2} y={y - 8} fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                          {d.val > 1000 ? `${Math.round(d.val / 1000)}k` : d.val}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Y Axis Labels */}
                  <text x="30" y="34" fill="#6b7280" fontSize="9" textAnchor="end">100%</text>
                  <text x="30" y="104" fill="#6b7280" fontSize="9" textAnchor="end">50%</text>
                  <text x="30" y="184" fill="#6b7280" fontSize="9" textAnchor="end">0%</text>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '16px' }}>Estimated yields tracking over the past 6 months (PKR)</p>
              </div>
            </div>

            {/* Occupancy Radial Gauge Chart */}
            <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '20px', width: '100%' }}>
                <Percent size={18} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} /> Property Yields
              </h3>

              <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <svg width="180" height="180" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="transparent" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#10b981" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * occupancyRate) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <span style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>{occupancyRate}%</span>
                  <p style={{ color: '#9ca3af', fontSize: '11px', margin: '2px 0 0 0' }}>Occupancy</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>{rentedProperties}</span>
                  <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>Rented</p>
                </div>
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{availableProperties}</span>
                  <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>Available</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Edit Property Modal */}
      {showEditModal && selectedProperty && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }} onClick={() => setShowEditModal(false)}>
          <div className="glass-panel" style={{ padding: '28px', width: '480px', maxWidth: '90%', maxHeight: '85vh', overflow: 'auto', background: '#0b0f19' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>✏️ Update Listing Details</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" placeholder="Title *" value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} style={inputStyle} required />
              <input type="number" placeholder="Rent (PKR) *" value={editFormData.rent} onChange={(e) => setEditFormData({...editFormData, rent: e.target.value})} style={inputStyle} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="text" placeholder="City *" value={editFormData.city} onChange={(e) => setEditFormData({...editFormData, city: e.target.value})} style={inputStyle} required />
                <input type="text" placeholder="State *" value={editFormData.state} onChange={(e) => setEditFormData({...editFormData, state: e.target.value})} style={inputStyle} required />
              </div>
              <textarea placeholder="Description" rows="4" value={editFormData.description} onChange={(e) => setEditFormData({...editFormData, description: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }} className="mobile-col">
                <input type="number" placeholder="Beds" value={editFormData.bedrooms} onChange={(e) => setEditFormData({...editFormData, bedrooms: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="Baths" value={editFormData.bathrooms} onChange={(e) => setEditFormData({...editFormData, bathrooms: e.target.value})} style={inputStyle} />
                <input type="number" placeholder="Area" value={editFormData.area} onChange={(e) => setEditFormData({...editFormData, area: e.target.value})} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#22c55e', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
                <button type="button" onClick={() => setShowEditModal(false)} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: '#05070a', padding: '30px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>© 2026 EstateFlow. All rights reserved.</p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .mobile-grid { grid-template-columns: 1fr 1fr !important; }
          .mobile-col { display: flex !important; flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  marginBottom: '14px',
  background: '#090d16',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: 'white',
  outline: 'none',
  fontSize: '14px'
};

export default MyProperties;