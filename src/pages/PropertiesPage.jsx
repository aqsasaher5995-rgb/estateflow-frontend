import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Bed, Bath, Ruler, Heart, LayoutGrid, List, X, 
  Sparkles, Building2, Award, TrendingUp, Building as BuildingIcon,
  ChevronRight, Shield, Crown, Mountain, Waves, TreePine
} from 'lucide-react';
import Navbar from '../components/layouts/Navbar';
import Footer from '../components/layouts/Footer';
import toast from 'react-hot-toast';

// ========== VILLAS (ID 1-12) - 12 properties ==========
const villaImages = [
  "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/2223376026/photo/luxury-tropical-pool-villa-at-dusk.jpg?s=612x612&w=0&k=20&c=KmXb1-GWZvz-Fa6TvMKIbNsxfEs09t6Nm5NEzrMBy3E=",
  "https://media.istockphoto.com/id/2110310187/photo/luxury-tropical-pool-villa-at-dusk.jpg?s=612x612&w=0&k=20&c=r8UTpMnbLWD_DOKHAcu6dw-MJEcGg0CTqt0ICa84D84=",
  "https://media.istockphoto.com/id/2204602504/photo/luxurious-lakeside-residence-with-manicured-gardens-and-dock-view.jpg?s=612x612&w=0&k=20&c=vhPbSj6e_vFLH32-u2GnoXoaviFORhmjJVA_StHqgKQ=",
  "https://media.istockphoto.com/id/1533428710/photo/modern-house-with-a-cubic-extension-and-garage.jpg?s=612x612&w=0&k=20&c=I50n5gNveLhwj804AIHsufERdQmcgrCOvivUdT04yJA="
];

// ========== PENTHOUSES (ID 13-21) - 9 properties ==========
const penthouseImages = [
  "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1568115286680-d203e08a8be6?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1733320822557-e4ccfb5f20d1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1609766857326-18a204c2cf31?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1613643043796-a370ee99ecbe?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/2199434139/photo/luxury-modern-loft-interior-with-open-space-living-room-and-kitchen-3d-rendering.jpg?s=612x612&w=0&k=20&c=MllN1WSxGkessgnO-0IkC6r6F_V6mEgA3H2BcXsqaS4=",
  "https://media.istockphoto.com/id/2021707621/photo/night-scene-modern-style-luxury-black-master-bedroom-with-city-view-3d-render.jpg?s=612x612&w=0&k=20&c=D4_n5-lvzP9HiC-MXI8f5qYM9R7CH6EbF2Xyq9V8b_o=",
  "https://media.istockphoto.com/id/1440918716/photo/luxury-apartment-terrace-with-hot-tub-hot-tub.jpg?s=612x612&w=0&k=20&c=pIq9zkGMVrdiLpobMzUGDZR5ZSCdckx7hK0lDkBHluU="
];

// ========== FARMHOUSES (ID 22-28) - 7 properties ==========
const farmhouseImages = [
  "https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1733760180239-ef05b25dd5ad?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1687710306880-95c72d9a19c5?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1733760125038-06564d0a4568?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/183774477/photo/cumbrian-countryside.jpg?s=612x612&w=0&k=20&c=z2iU97VBusBMkLceJMdt8HRjfRincbb3YWEcX5imB5A=",
  "https://media.istockphoto.com/id/1414798334/photo/idyllic-landscape-in-the-alps-with-mountain-chalet-and-cows-in-springtime.jpg?s=612x612&w=0&k=20&c=5EM2jzwh1YR7dOlaT4fPh1kyv23Zj9wBTohUt5DyCDg=",
  "https://media.istockphoto.com/id/1301517964/photo/tuscan-countryside-landscape-in-italy.jpg?s=612x612&w=0&k=20&c=HFQP-5XJQYhhsqye21evB0MIzYaqnzwCyFAXr7HJV-4="
];

// ========== COMMERCIAL (ID 29-31) - 3 properties ==========
const commercialImages = [
  "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/2241825793/photo/aerial-drone-view-of-standing-seam-metal-roof-on-modern-commercial-buildings.jpg?s=612x612&w=0&k=20&c=L56By6JNcFIUe2HgTxvIxsq07em3sMPb-Yc975xhBZk="
];

// ========== ALL 31 PROPERTIES (Pakistan) ==========
const ALL_PROPERTIES = [
  // VILLAS (ID 1-12)
  { id: 1, title: "Luxury Villa DHA Karachi", city: "Karachi", state: "Sindh", type: "Villa", beds: 4, baths: 3, area: 2800, rent: 180000, status: "available", image: villaImages[0], priceDisplay: "PKR 180,000/month" },
  { id: 2, title: "Modern Villa Clifton", city: "Karachi", state: "Sindh", type: "Villa", beds: 5, baths: 4, area: 3500, rent: 250000, status: "available", image: villaImages[1], priceDisplay: "PKR 250,000/month" },
  { id: 3, title: "Executive Villa Islamabad", city: "Islamabad", state: "Capital", type: "Villa", beds: 5, baths: 4, area: 4000, rent: 320000, status: "available", image: villaImages[2], priceDisplay: "PKR 320,000/month" },
  { id: 4, title: "Beach View Villa DHA", city: "Karachi", state: "Sindh", type: "Villa", beds: 4, baths: 3, area: 3200, rent: 280000, status: "available", image: villaImages[3], priceDisplay: "PKR 280,000/month" },
  { id: 5, title: "Garden Villa Lahore", city: "Lahore", state: "Punjab", type: "Villa", beds: 4, baths: 3, area: 3000, rent: 200000, status: "available", image: villaImages[4], priceDisplay: "PKR 200,000/month" },
  { id: 6, title: "Presidential Villa Rawalpindi", city: "Rawalpindi", state: "Punjab", type: "Villa", beds: 6, baths: 5, area: 5000, rent: 350000, status: "available", image: villaImages[5], priceDisplay: "PKR 350,000/month" },
  { id: 7, title: "Cozy Villa Peshawar", city: "Peshawar", state: "KPK", type: "Villa", beds: 3, baths: 2, area: 2200, rent: 150000, status: "available", image: villaImages[6], priceDisplay: "PKR 150,000/month" },
  { id: 8, title: "Lake View Villa Islamabad", city: "Islamabad", state: "Capital", type: "Villa", beds: 5, baths: 4, area: 4500, rent: 300000, status: "available", image: villaImages[7], priceDisplay: "PKR 300,000/month" },
  { id: 9, title: "Tropical Pool Villa Karachi", city: "Karachi", state: "Sindh", type: "Villa", beds: 5, baths: 4, area: 4200, rent: 400000, status: "available", image: villaImages[8], priceDisplay: "PKR 400,000/month" },
  { id: 10, title: "Sunset View Villa DHA", city: "Karachi", state: "Sindh", type: "Villa", beds: 5, baths: 4, area: 3900, rent: 380000, status: "available", image: villaImages[9], priceDisplay: "PKR 380,000/month" },
  { id: 11, title: "Lakeside Executive Villa", city: "Islamabad", state: "Capital", type: "Villa", beds: 6, baths: 5, area: 5500, rent: 500000, status: "available", image: villaImages[10], priceDisplay: "PKR 500,000/month" },
  { id: 12, title: "Modern Cube Villa Lahore", city: "Lahore", state: "Punjab", type: "Villa", beds: 4, baths: 3, area: 3100, rent: 220000, status: "available", image: villaImages[11], priceDisplay: "PKR 220,000/month" },

  // PENTHOUSES (ID 13-21)
  { id: 13, title: "Royal Penthouse Lahore", city: "Lahore", state: "Punjab", type: "Penthouse", beds: 6, baths: 5, area: 5200, rent: 450000, status: "available", image: penthouseImages[0], priceDisplay: "PKR 450,000/month" },
  { id: 14, title: "Sky Penthouse Mall Road", city: "Lahore", state: "Punjab", type: "Penthouse", beds: 7, baths: 6, area: 6500, rent: 550000, status: "available", image: penthouseImages[1], priceDisplay: "PKR 550,000/month" },
  { id: 15, title: "Ocean View Penthouse Karachi", city: "Karachi", state: "Sindh", type: "Penthouse", beds: 5, baths: 4, area: 4800, rent: 480000, status: "available", image: penthouseImages[2], priceDisplay: "PKR 480,000/month" },
  { id: 16, title: "Presidential Penthouse Islamabad", city: "Islamabad", state: "Capital", type: "Penthouse", beds: 8, baths: 7, area: 7500, rent: 600000, status: "available", image: penthouseImages[3], priceDisplay: "PKR 600,000/month" },
  { id: 17, title: "Sunset View Penthouse Karachi", city: "Karachi", state: "Sindh", type: "Penthouse", beds: 6, baths: 5, area: 6000, rent: 650000, status: "available", image: penthouseImages[4], priceDisplay: "PKR 650,000/month" },
  { id: 18, title: "Ultimate Luxury Penthouse", city: "Islamabad", state: "Capital", type: "Penthouse", beds: 7, baths: 6, area: 8000, rent: 700000, status: "available", image: penthouseImages[5], priceDisplay: "PKR 700,000/month" },
  { id: 19, title: "Modern Loft Penthouse", city: "Lahore", state: "Punjab", type: "Penthouse", beds: 5, baths: 4, area: 5500, rent: 500000, status: "available", image: penthouseImages[6], priceDisplay: "PKR 500,000/month" },
  { id: 20, title: "Black Master Penthouse", city: "Karachi", state: "Sindh", type: "Penthouse", beds: 6, baths: 5, area: 6200, rent: 580000, status: "available", image: penthouseImages[7], priceDisplay: "PKR 580,000/month" },
  { id: 21, title: "Terrace Jacuzzi Penthouse", city: "Islamabad", state: "Capital", type: "Penthouse", beds: 6, baths: 5, area: 6800, rent: 620000, status: "available", image: penthouseImages[8], priceDisplay: "PKR 620,000/month" },

  // FARMHOUSES (ID 22-28)
  { id: 22, title: "Modern Farmhouse Bahria", city: "Rawalpindi", state: "Punjab", type: "Farmhouse", beds: 8, baths: 6, area: 8000, rent: 320000, status: "available", image: farmhouseImages[0], priceDisplay: "PKR 320,000/month" },
  { id: 23, title: "Weekend Farmhouse Islamabad", city: "Islamabad", state: "Capital", type: "Farmhouse", beds: 5, baths: 4, area: 5000, rent: 250000, status: "available", image: farmhouseImages[1], priceDisplay: "PKR 250,000/month" },
  { id: 24, title: "Luxury Farmhouse Lahore", city: "Lahore", state: "Punjab", type: "Farmhouse", beds: 10, baths: 8, area: 12000, rent: 400000, status: "available", image: farmhouseImages[2], priceDisplay: "PKR 400,000/month" },
  { id: 25, title: "Countryside Farmhouse", city: "Rawalpindi", state: "Punjab", type: "Farmhouse", beds: 6, baths: 5, area: 7000, rent: 280000, status: "available", image: farmhouseImages[3], priceDisplay: "PKR 280,000/month" },
  { id: 26, title: "Cumbrian Country Farm", city: "Islamabad", state: "Capital", type: "Farmhouse", beds: 5, baths: 4, area: 6000, rent: 220000, status: "available", image: farmhouseImages[4], priceDisplay: "PKR 220,000/month" },
  { id: 27, title: "Alpine Chalet Farmhouse", city: "Murree", state: "Punjab", type: "Farmhouse", beds: 6, baths: 5, area: 6500, rent: 350000, status: "available", image: farmhouseImages[5], priceDisplay: "PKR 350,000/month" },
  { id: 28, title: "Tuscan Villa Farmhouse", city: "Lahore", state: "Punjab", type: "Farmhouse", beds: 7, baths: 6, area: 9000, rent: 300000, status: "available", image: farmhouseImages[6], priceDisplay: "PKR 300,000/month" },

  // COMMERCIAL (ID 29-31)
  { id: 29, title: "Commercial Plaza DHA", city: "Karachi", state: "Sindh", type: "Commercial", beds: 0, baths: 4, area: 3000, rent: 180000, status: "available", image: commercialImages[0], priceDisplay: "PKR 180,000/month" },
  { id: 30, title: "Office Space IT Tower", city: "Karachi", state: "Sindh", type: "Commercial", beds: 0, baths: 3, area: 2500, rent: 220000, status: "available", image: commercialImages[1], priceDisplay: "PKR 220,000/month" },
  { id: 31, title: "Commercial Building with Roof", city: "Lahore", state: "Punjab", type: "Commercial", beds: 0, baths: 5, area: 4000, rent: 300000, status: "available", image: commercialImages[2], priceDisplay: "PKR 300,000/month" }
];

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="skeleton-card" style={{ overflow: 'hidden' }}>
    <div className="skeleton" style={{ height: '200px', borderRadius: 0 }} />
    <div style={{ padding: '20px' }}>
      <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '10px' }} />
      <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '16px' }} />
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <div className="skeleton" style={{ height: '12px', width: '60px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px' }}>
        <div className="skeleton" style={{ height: '24px', width: '120px' }} />
        <div className="skeleton" style={{ height: '34px', width: '80px', borderRadius: '20px' }} />
      </div>
    </div>
  </div>
);

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterBeds, setFilterBeds] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ef_favourites') || '[]'); } catch { return []; }
  });

  useEffect(() => { 
    setProperties(ALL_PROPERTIES);
    setLoading(false);
  }, []);

  const toggleFav = (id, e) => {
    e.stopPropagation();
    const updated = favourites.includes(id) ? favourites.filter(f => f !== id) : [...favourites, id];
    setFavourites(updated);
    localStorage.setItem('ef_favourites', JSON.stringify(updated));
    toast(favourites.includes(id) ? 'Removed from favourites' : '❤️ Added to favourites', { duration: 1800 });
  };

  const cities = ['all', ...new Set(properties.map(p => p.city))];

  const filteredAndSorted = [...properties]
    .filter(p => {
      const s = searchTerm.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(s) || p.city.toLowerCase().includes(s);
      const matchCity = filterCity === 'all' || p.city === filterCity;
      const matchType = filterType === 'all' || p.type.toLowerCase() === filterType.toLowerCase();
      const matchBeds = filterBeds === 'all' || p.beds >= parseInt(filterBeds);
      let matchPrice = true;
      if (filterPrice === 'under50k') matchPrice = p.rent < 50000;
      else if (filterPrice === '50k-100k') matchPrice = p.rent >= 50000 && p.rent <= 100000;
      else if (filterPrice === '100k-200k') matchPrice = p.rent > 100000 && p.rent <= 200000;
      else if (filterPrice === 'above200k') matchPrice = p.rent > 200000;
      return matchSearch && matchCity && matchType && matchBeds && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.rent - b.rent;
      if (sortBy === 'price-desc') return b.rent - a.rent;
      if (sortBy === 'beds') return b.beds - a.beds;
      return 0;
    });

  const activeFilterCount = [filterCity !== 'all', filterType !== 'all', filterPrice !== 'all', filterBeds !== 'all'].filter(Boolean).length;

  const clearFilters = () => { setFilterCity('all'); setFilterType('all'); setFilterPrice('all'); setFilterBeds('all'); setSearchTerm(''); };

  const statusBadge = (status) => ({
    available: { label: 'Available', cls: 'badge-success' },
    rented: { label: 'Rented', cls: 'badge-warning' },
    maintenance: { label: 'Maintenance', cls: 'badge-danger' },
  }[status] || { label: status, cls: 'badge-info' });

  const sel = { padding: '11px 16px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white', outline: 'none', cursor: 'pointer', fontSize: '13px' };

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '110px 24px 60px', flex: 1, width: '100%' }} className="page-enter">
        
        {/* ===== ENHANCED HERO SECTION - CENTER ALIGNED ===== */}
        <div style={{ 
          marginBottom: '40px', 
          padding: '60px 50px', 
          borderRadius: '28px',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.10), rgba(139,92,246,0.04))',
          border: '1px solid rgba(99,102,241,0.12)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          {/* Decorative background elements */}
          <div style={{ 
            position: 'absolute', 
            top: '-120px', 
            right: '-60px', 
            width: '350px', 
            height: '350px', 
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{ 
            position: 'absolute', 
            bottom: '-140px', 
            left: '-80px', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '600px', 
            height: '600px', 
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Premium Badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              background: 'rgba(99,102,241,0.12)',
              padding: '8px 22px',
              borderRadius: '50px',
              marginBottom: '22px',
              border: '1px solid rgba(99,102,241,0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.08)'
            }}>
              <Sparkles size={16} style={{ color: '#818cf8' }} />
              <span style={{ color: '#818cf8', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Premium Collection
              </span>
              <Crown size={14} style={{ color: '#fbbf24' }} />
            </div>
            
            {/* Main Heading */}
            <h1 style={{ 
              fontSize: '52px', 
              fontWeight: '900', 
              color: 'white', 
              margin: '0 0 12px 0', 
              letterSpacing: '-2px',
              lineHeight: '1.1'
            }}>
              Exclusive <span style={{ 
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Properties</span>
            </h1>
            
            {/* Decorative line */}
            <div style={{ 
              width: '80px', 
              height: '3px', 
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              margin: '0 auto 18px auto',
              borderRadius: '10px'
            }} />
            
            {/* Subtitle */}
            <p style={{ 
              color: '#cbd5e1', 
              fontSize: '17px', 
              margin: '0 auto 28px auto',
              maxWidth: '620px',
              lineHeight: '1.7',
              letterSpacing: '0.2px'
            }}>
              Curated collection of luxury properties across Pakistan's prime locations —<br />
              from Karachi's coastline to Islamabad's serene valleys.
            </p>
            
            {/* Property Type Tags - Centered */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              marginBottom: '32px'
            }}>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '7px',
                background: 'rgba(255,255,255,0.04)', 
                padding: '8px 20px', 
                borderRadius: '50px', 
                fontSize: '13px', 
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                fontWeight: '500'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Building2 size={14} style={{ color: '#818cf8' }} /> Villas
              </span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '7px',
                background: 'rgba(255,255,255,0.04)', 
                padding: '8px 20px', 
                borderRadius: '50px', 
                fontSize: '13px', 
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                fontWeight: '500'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <TrendingUp size={14} style={{ color: '#818cf8' }} /> Penthouses
              </span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '7px',
                background: 'rgba(255,255,255,0.04)', 
                padding: '8px 20px', 
                borderRadius: '50px', 
                fontSize: '13px', 
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                fontWeight: '500'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Award size={14} style={{ color: '#818cf8' }} /> Farmhouses
              </span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '7px',
                background: 'rgba(255,255,255,0.04)', 
                padding: '8px 20px', 
                borderRadius: '50px', 
                fontSize: '13px', 
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                fontWeight: '500'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <BuildingIcon size={14} style={{ color: '#818cf8' }} /> Commercial
              </span>
            </div>
            
            {/* Quick Stats - Centered with glass effect */}
            <div style={{ 
              display: 'inline-flex', 
              gap: '40px',
              padding: '16px 40px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '60px',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>{ALL_PROPERTIES.length}+</p>
                <p style={{ color: '#9ca3af', fontSize: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Listings</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>5</p>
                <p style={{ color: '#9ca3af', fontSize: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Cities</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>4</p>
                <p style={{ color: '#9ca3af', fontSize: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Types</p>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>31</p>
                <p style={{ color: '#9ca3af', fontSize: '10px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: '2 1 220px', position: 'relative', minWidth: '200px' }}>
              <Search size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input type="text" placeholder="Search by title or city..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '11px 16px 11px 38px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '13px' }} />
            </div>

            <select value={filterCity} onChange={e => setFilterCity(e.target.value)} style={sel}>
              {cities.map(c => <option key={c} value={c}>{c === 'all' ? 'All Cities' : c}</option>)}
            </select>

            <select value={filterType} onChange={e => setFilterType(e.target.value)} style={sel}>
              <option value="all">All Types</option>
              <option value="villa">🏡 Villa</option>
              <option value="penthouse">🏢 Penthouse</option>
              <option value="farmhouse">🌾 Farmhouse</option>
              <option value="commercial">🏪 Commercial</option>
            </select>

            <select value={filterPrice} onChange={e => setFilterPrice(e.target.value)} style={sel}>
              <option value="all">Any Price</option>
              <option value="under50k">Under PKR 50k</option>
              <option value="50k-100k">PKR 50k – 100k</option>
              <option value="100k-200k">PKR 100k – 200k</option>
              <option value="above200k">Above PKR 200k</option>
            </select>

            <select value={filterBeds} onChange={e => setFilterBeds(e.target.value)} style={sel}>
              <option value="all">Any Beds</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={sel}>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="beds">Most Beds</option>
            </select>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid view"><LayoutGrid size={16} /></button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List view"><List size={16} /></button>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6b7280', fontSize: '12px' }}>{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
              <button onClick={clearFilters} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '20px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>
                <X size={11} /> Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Showing <span style={{ color: 'white', fontWeight: '700' }}>{filteredAndSorted.length}</span> properties
            {favourites.length > 0 && <span style={{ marginLeft: '12px', color: '#f87171', fontSize: '12px' }}>❤️ {favourites.length} saved</span>}
          </p>
        </div>

        {/* Properties */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '80px 40px' }}>
            <span style={{ fontSize: '64px' }}>🏘️</span>
            <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '700', margin: '20px 0 8px' }}>No properties found</h3>
            <p style={{ color: '#9ca3af' }}>Try adjusting your filters or search term.</p>
            <button onClick={clearFilters} style={{ marginTop: '20px', padding: '10px 28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '30px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Clear Filters</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredAndSorted.map(p => {
              const { label, cls } = statusBadge(p.status);
              const isFav = favourites.includes(p.id);
              const typeIcon = p.type === 'Villa' ? '🏡' : p.type === 'Penthouse' ? '🏢' : p.type === 'Farmhouse' ? '🌾' : '🏪';
              const priceDisplay = p.priceDisplay || `PKR ${p.rent?.toLocaleString()}/month`;
              return (
                <div key={p.id} className="glass-panel" style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/property/${p.id}`)}>
                  <div style={{ height: '210px', position: 'relative', overflow: 'hidden', background: '#090d16' }}>
                    <img src={p.image} alt={p.title} className="property-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className={`badge ${cls} fav-badge`} style={{ position: 'absolute', top: '12px', right: '12px' }}>{label}</span>
                    <button className={`fav-btn ${isFav ? 'active' : ''}`} onClick={e => toggleFav(p.id, e)} title={isFav ? 'Remove from favourites' : 'Save'}>
                      <Heart size={15} fill={isFav ? 'white' : 'none'} stroke={isFav ? 'white' : '#9ca3af'} />
                    </button>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                      <span className="badge badge-purple" style={{ fontSize: '10px', textTransform: 'capitalize' }}>{typeIcon} {p.type}</span>
                    </div>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'white', marginBottom: '6px', lineHeight: '1.3' }}>{p.title}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {p.city}, {p.state}
                      </p>
                      <div style={{ display: 'flex', gap: '14px', fontSize: '12.5px', color: '#6b7280' }}>
                        {p.beds > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bed size={13} /> {p.beds} Beds</span>}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bath size={13} /> {p.baths} Baths</span>
                        {p.area > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Ruler size={13} /> {p.area.toLocaleString()} sqft</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', marginTop: '14px' }}>
                      <div>
                        <p style={{ color: '#6366f1', fontSize: '20px', fontWeight: '800', margin: 0 }}>{priceDisplay}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); navigate(`/property/${p.id}`); }}
                        style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '30px', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredAndSorted.map(p => {
              const { label, cls } = statusBadge(p.status);
              const isFav = favourites.includes(p.id);
              const typeIcon = p.type === 'Villa' ? '🏡' : p.type === 'Penthouse' ? '🏢' : p.type === 'Farmhouse' ? '🌾' : '🏪';
              const priceDisplay = p.priceDisplay || `PKR ${p.rent?.toLocaleString()}/month`;
              return (
                <div key={p.id} className="glass-panel" style={{ display: 'flex', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/property/${p.id}`)}>
                  <div style={{ width: '220px', minWidth: '220px', position: 'relative', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} className="property-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className={`badge ${cls}`} style={{ position: 'absolute', top: '10px', right: '10px' }}>{label}</span>
                  </div>
                  <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge badge-purple" style={{ fontSize: '10px', textTransform: 'capitalize' }}>{typeIcon} {p.type}</span>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: '0 0 6px' }}>{p.title}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {p.city}, {p.state}</p>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                        {p.beds > 0 && <span><Bed size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {p.beds} Beds</span>}
                        <span><Bath size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {p.baths} Baths</span>
                        {p.area > 0 && <span><Ruler size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {p.area.toLocaleString()} sqft</span>}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#6366f1', fontSize: '22px', fontWeight: '800', margin: '0 0 14px' }}>{priceDisplay}</p>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className={`fav-btn`} onClick={e => toggleFav(p.id, e)} style={{ position: 'static', width: '36px', height: '36px', borderRadius: '8px' }} title="Save">
                          <Heart size={15} fill={isFav ? '#ef4444' : 'none'} stroke={isFav ? '#ef4444' : '#9ca3af'} />
                        </button>
                        <button onClick={e => { e.stopPropagation(); navigate(`/property/${p.id}`); }}
                          style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.06); transition: all 0.2s ease; }
        .glass-panel:hover { border-color: rgba(99,102,241,0.3); }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .badge-success { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
        .badge-warning { background: rgba(245,158,11,0.15); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); }
        .badge-danger { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
        .badge-purple { background: rgba(99,102,241,0.15); color: #818cf8; border: 1px solid rgba(99,102,241,0.3); }
        .fav-btn { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; transition: all 0.2s; }
        .fav-btn:hover { background: rgba(239,68,68,0.8); transform: scale(1.05); }
        .view-btn { background: #090d16; border: 1px solid rgba(255,255,255,0.08); padding: 8px 10px; border-radius: 8px; color: #9ca3af; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s; }
        .view-btn.active { background: #6366f1; color: white; border-color: #6366f1; }
        .skeleton { background: linear-gradient(90deg, #1a1f2e 25%, #252b3d 50%, #1a1f2e 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .property-card-img { transition: transform 0.4s ease; }
        .glass-panel:hover .property-card-img { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default PropertiesPage;