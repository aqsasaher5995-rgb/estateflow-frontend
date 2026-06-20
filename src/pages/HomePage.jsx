import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Phone, Mail, MapPin, Star, Heart, Share2,
  Search, Bed, Bath, Ruler, Car, Calendar, 
  Check, ArrowRight, Shield, Clock, Users, 
  Trophy, Award, Globe, Quote, Send, MessageSquare, X, ChevronDown, CheckCircle,
  Grid, DollarSign, Building, Home, TrendingUp, ThumbsUp, HelpCircle, Filter, Zap, Video, FileText,
  Briefcase, Handshake, TrendingUp as TrendingUpIcon, Headphones, Menu, ChevronRight,
  Calendar as CalendarIcon, User, Settings, LogOut, BookOpen, Newspaper, GripVertical
} from 'lucide-react';
import Avatar from '../components/common/Avatar';
import toast from 'react-hot-toast';

// Hero Background Images
const heroBackgroundImages = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
];

// Category Buttons
const categoryButtons = [
  { id: 1, name: "All Properties", value: "All", icon: <Home size={18} />, color: "#6366f1" },
  { id: 2, name: "Villas", value: "Villa", icon: <Building size={18} />, color: "#10b981" },
  { id: 3, name: "Penthouses", value: "Penthouse", icon: <TrendingUp size={18} />, color: "#ef4444" },
  { id: 4, name: "Farmhouses", value: "Farmhouse", icon: <Globe size={18} />, color: "#8b5cf6" },
  { id: 5, name: "Commercial", value: "Commercial", icon: <Building size={18} />, color: "#06b6d4" }
];

// ========== VILLAS (12 images) ==========
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

// ========== PENTHOUSES (9 images) ==========
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

// ========== FARMHOUSES (7 images) ==========
const farmhouseImages = [
  "https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1733760180239-ef05b25dd5ad?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1687710306880-95c72d9a19c5?w=600&h=400&fit=crop",
  "https://plus.unsplash.com/premium_photo-1733760125038-06564d0a4568?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/183774477/photo/cumbrian-countryside.jpg?s=612x612&w=0&k=20&c=z2iU97VBusBMkLceJMdt8HRjfRincbb3YWEcX5imB5A=",
  "https://media.istockphoto.com/id/1414798334/photo/idyllic-landscape-in-the-alps-with-mountain-chalet-and-cows-in-springtime.jpg?s=612x612&w=0&k=20&c=5EM2jzwh1YR7dOlaT4fPh1kyv23Zj9wBTohUt5DyCDg=",
  "https://media.istockphoto.com/id/1301517964/photo/tuscan-countryside-landscape-in-italy.jpg?s=612x612&w=0&k=20&c=HFQP-5XJQYhhsqye21evB0MIzYaqnzwCyFAXr7HJV-4="
];

// ========== COMMERCIAL (3 images) ==========
const commercialImages = [
  "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600&h=400&fit=crop",
  "https://media.istockphoto.com/id/2241825793/photo/aerial-drone-view-of-standing-seam-metal-roof-on-modern-commercial-buildings.jpg?s=612x612&w=0&k=20&c=L56By6JNcFIUe2HgTxvIxsq07em3sMPb-Yc975xhBZk="
];

// Complete Properties Data (Total 31 Properties)
const allProperties = [
  // VILLAS (ID 1-12)
  { id: 1, price: 180000, priceDisplay: "PKR 180,000/month", title: "Luxury Villa DHA Karachi", location: "Karachi, Sindh", city: "Karachi", beds: 4, baths: 3, area: "2,800 sqft", image: villaImages[0], description: "Experience luxury living in this stunning 4-bedroom villa.", features: ["Swimming Pool", "Garden", "Security"], type: "Villa", status: "For Rent", rating: 4.8, reviews: 124 },
  { id: 2, price: 250000, priceDisplay: "PKR 250,000/month", title: "Modern Villa Clifton", location: "Karachi, Sindh", city: "Karachi", beds: 5, baths: 4, area: "3,500 sqft", image: villaImages[1], description: "Beautiful modern villa with sea view.", features: ["Sea View", "Rooftop Terrace", "Elevator"], type: "Villa", status: "For Rent", rating: 4.9, reviews: 89 },
  { id: 3, price: 320000, priceDisplay: "PKR 320,000/month", title: "Executive Villa Islamabad", location: "Islamabad, Capital", city: "Islamabad", beds: 5, baths: 4, area: "4,000 sqft", image: villaImages[2], description: "Stunning executive villa with mountain views.", features: ["Mountain View", "Garden", "Pool"], type: "Villa", status: "For Rent", rating: 4.9, reviews: 67 },
  { id: 4, price: 280000, priceDisplay: "PKR 280,000/month", title: "Beach View Villa DHA", location: "Karachi, Sindh", city: "Karachi", beds: 4, baths: 3, area: "3,200 sqft", image: villaImages[3], description: "Luxury beach view villa.", features: ["Beach Access", "Swimming Pool", "Gym"], type: "Villa", status: "For Rent", rating: 5.0, reviews: 45 },
  { id: 5, price: 200000, priceDisplay: "PKR 200,000/month", title: "Garden Villa Lahore", location: "Lahore, Punjab", city: "Lahore", beds: 4, baths: 3, area: "3,000 sqft", image: villaImages[4], description: "Beautiful garden villa.", features: ["Garden", "Swimming Pool", "Security"], type: "Villa", status: "For Rent", rating: 4.7, reviews: 56 },
  { id: 6, price: 350000, priceDisplay: "PKR 350,000/month", title: "Presidential Villa Rawalpindi", location: "Rawalpindi, Punjab", city: "Rawalpindi", beds: 6, baths: 5, area: "5,000 sqft", image: villaImages[5], description: "Ultra-luxury presidential villa.", features: ["Private Theater", "Gym", "Pool"], type: "Villa", status: "For Rent", rating: 5.0, reviews: 34 },
  { id: 7, price: 150000, priceDisplay: "PKR 150,000/month", title: "Cozy Villa Peshawar", location: "Peshawar, KPK", city: "Peshawar", beds: 3, baths: 2, area: "2,200 sqft", image: villaImages[6], description: "Cozy and affordable villa.", features: ["Garden", "Security", "Parking"], type: "Villa", status: "For Rent", rating: 4.5, reviews: 78 },
  { id: 8, price: 300000, priceDisplay: "PKR 300,000/month", title: "Lake View Villa Islamabad", location: "Islamabad, Capital", city: "Islamabad", beds: 5, baths: 4, area: "4,500 sqft", image: villaImages[7], description: "Stunning lake view villa.", features: ["Lake View", "Garden", "Pool"], type: "Villa", status: "For Rent", rating: 4.9, reviews: 92 },
  { id: 9, price: 400000, priceDisplay: "PKR 400,000/month", title: "Tropical Pool Villa Karachi", location: "Karachi, Sindh", city: "Karachi", beds: 5, baths: 4, area: "4,200 sqft", image: villaImages[8], description: "Luxury tropical pool villa.", features: ["Private Pool", "Tropical Garden", "Outdoor Kitchen"], type: "Villa", status: "For Rent", rating: 5.0, reviews: 28 },
  { id: 10, price: 380000, priceDisplay: "PKR 380,000/month", title: "Sunset View Villa DHA", location: "Karachi, Sindh", city: "Karachi", beds: 5, baths: 4, area: "3,900 sqft", image: villaImages[9], description: "Beautiful sunset view villa.", features: ["Sunset View", "Infinity Pool", "Smart Home"], type: "Villa", status: "For Rent", rating: 4.9, reviews: 35 },
  { id: 11, price: 500000, priceDisplay: "PKR 500,000/month", title: "Lakeside Executive Villa", location: "Islamabad, Capital", city: "Islamabad", beds: 6, baths: 5, area: "5,500 sqft", image: villaImages[10], description: "Luxurious lakeside residence.", features: ["Lake View", "Private Dock", "Tennis Court"], type: "Villa", status: "For Rent", rating: 5.0, reviews: 42 },
  { id: 12, price: 220000, priceDisplay: "PKR 220,000/month", title: "Modern Cube Villa Lahore", location: "Lahore, Punjab", city: "Lahore", beds: 4, baths: 3, area: "3,100 sqft", image: villaImages[11], description: "Contemporary modern house.", features: ["Modern Design", "Garage", "Smart Security"], type: "Villa", status: "For Rent", rating: 4.8, reviews: 51 },

  // PENTHOUSES (ID 13-21)
  { id: 13, price: 450000, priceDisplay: "PKR 450,000/month", title: "Royal Penthouse Lahore", location: "Lahore, Punjab", city: "Lahore", beds: 6, baths: 5, area: "5,200 sqft", image: penthouseImages[0], description: "Luxury penthouse with panoramic city views.", features: ["Private Elevator", "Jacuzzi", "Home Theater"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 34 },
  { id: 14, price: 550000, priceDisplay: "PKR 550,000/month", title: "Sky Penthouse Mall Road", location: "Lahore, Punjab", city: "Lahore", beds: 7, baths: 6, area: "6,500 sqft", image: penthouseImages[1], description: "Ultra-luxury penthouse.", features: ["Infinity Pool", "Smart Home", "Concierge"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 28 },
  { id: 15, price: 480000, priceDisplay: "PKR 480,000/month", title: "Ocean View Penthouse Karachi", location: "Karachi, Sindh", city: "Karachi", beds: 5, baths: 4, area: "4,800 sqft", image: penthouseImages[2], description: "Stunning ocean view penthouse.", features: ["Ocean View", "Private Pool", "Gym"], type: "Penthouse", status: "For Rent", rating: 4.9, reviews: 42 },
  { id: 16, price: 600000, priceDisplay: "PKR 600,000/month", title: "Presidential Penthouse Islamabad", location: "Islamabad, Capital", city: "Islamabad", beds: 8, baths: 7, area: "7,500 sqft", image: penthouseImages[3], description: "The most luxurious penthouse.", features: ["Mountain View", "Private Theater", "Infinity Pool"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 56 },
  { id: 17, price: 650000, priceDisplay: "PKR 650,000/month", title: "Sunset View Penthouse Karachi", location: "Karachi, Sindh", city: "Karachi", beds: 6, baths: 5, area: "6,000 sqft", image: penthouseImages[4], description: "Breathtaking sunset view penthouse.", features: ["Sunset View", "Private Pool", "Home Theater"], type: "Penthouse", status: "For Rent", rating: 4.9, reviews: 29 },
  { id: 18, price: 700000, priceDisplay: "PKR 700,000/month", title: "Ultimate Luxury Penthouse", location: "Islamabad, Capital", city: "Islamabad", beds: 7, baths: 6, area: "8,000 sqft", image: penthouseImages[5], description: "The ultimate luxury penthouse.", features: ["360 View", "Private Cinema", "Infinity Pool"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 42 },
  { id: 19, price: 500000, priceDisplay: "PKR 500,000/month", title: "Modern Loft Penthouse", location: "Lahore, Punjab", city: "Lahore", beds: 5, baths: 4, area: "5,500 sqft", image: penthouseImages[6], description: "Modern loft penthouse.", features: ["Open Space", "Modern Kitchen", "City View"], type: "Penthouse", status: "For Rent", rating: 4.9, reviews: 23 },
  { id: 20, price: 580000, priceDisplay: "PKR 580,000/month", title: "Black Master Penthouse", location: "Karachi, Sindh", city: "Karachi", beds: 6, baths: 5, area: "6,200 sqft", image: penthouseImages[7], description: "Luxury black master penthouse.", features: ["Night View", "Luxury Interior", "Smart Home"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 31 },
  { id: 21, price: 620000, priceDisplay: "PKR 620,000/month", title: "Terrace Jacuzzi Penthouse", location: "Islamabad, Capital", city: "Islamabad", beds: 6, baths: 5, area: "6,800 sqft", image: penthouseImages[8], description: "Luxury penthouse with terrace.", features: ["Private Terrace", "Hot Tub", "Mountain View"], type: "Penthouse", status: "For Rent", rating: 5.0, reviews: 27 },

  // FARMHOUSES (ID 22-28)
  { id: 22, price: 320000, priceDisplay: "PKR 320,000/month", title: "Modern Farmhouse Bahria", location: "Rawalpindi, Punjab", city: "Rawalpindi", beds: 8, baths: 6, area: "8,000 sqft", image: farmhouseImages[0], description: "Sprawling modern farmhouse.", features: ["Private Pool", "Tennis Court", "Garden"], type: "Farmhouse", status: "For Rent", rating: 4.9, reviews: 56 },
  { id: 23, price: 250000, priceDisplay: "PKR 250,000/month", title: "Weekend Farmhouse Islamabad", location: "Islamabad, Capital", city: "Islamabad", beds: 5, baths: 4, area: "5,000 sqft", image: farmhouseImages[1], description: "Perfect weekend getaway.", features: ["Mountain View", "Organic Garden", "Pool"], type: "Farmhouse", status: "For Rent", rating: 4.8, reviews: 42 },
  { id: 24, price: 400000, priceDisplay: "PKR 400,000/month", title: "Luxury Farmhouse Lahore", location: "Lahore, Punjab", city: "Lahore", beds: 10, baths: 8, area: "12,000 sqft", image: farmhouseImages[2], description: "Ultra-luxury farmhouse.", features: ["Private Lake", "Tennis Court", "Swimming Pool"], type: "Farmhouse", status: "For Rent", rating: 5.0, reviews: 38 },
  { id: 25, price: 280000, priceDisplay: "PKR 280,000/month", title: "Countryside Farmhouse", location: "Rawalpindi, Punjab", city: "Rawalpindi", beds: 6, baths: 5, area: "7,000 sqft", image: farmhouseImages[3], description: "Beautiful countryside farmhouse.", features: ["Countryside View", "Garden", "Pool"], type: "Farmhouse", status: "For Rent", rating: 4.7, reviews: 29 },
  { id: 26, price: 220000, priceDisplay: "PKR 220,000/month", title: "Cumbrian Country Farm", location: "Islamabad, Capital", city: "Islamabad", beds: 5, baths: 4, area: "6,000 sqft", image: farmhouseImages[4], description: "Charming country farmhouse.", features: ["Traditional Design", "Garden", "Fireplace"], type: "Farmhouse", status: "For Rent", rating: 4.6, reviews: 34 },
  { id: 27, price: 350000, priceDisplay: "PKR 350,000/month", title: "Alpine Chalet Farmhouse", location: "Murree, Punjab", city: "Murree", beds: 6, baths: 5, area: "6,500 sqft", image: farmhouseImages[5], description: "Idyllic alpine chalet.", features: ["Alpine View", "Chalet Style", "Fireplace"], type: "Farmhouse", status: "For Rent", rating: 4.9, reviews: 41 },
  { id: 28, price: 300000, priceDisplay: "PKR 300,000/month", title: "Tuscan Villa Farmhouse", location: "Lahore, Punjab", city: "Lahore", beds: 7, baths: 6, area: "9,000 sqft", image: farmhouseImages[6], description: "Tuscan countryside inspired farmhouse.", features: ["Tuscan Style", "Wine Cellar", "Pool"], type: "Farmhouse", status: "For Rent", rating: 4.9, reviews: 36 },

  // COMMERCIAL (ID 29-31)
  { id: 29, price: 180000, priceDisplay: "PKR 180,000/month", title: "Commercial Plaza DHA", location: "Karachi, Sindh", city: "Karachi", beds: 0, baths: 4, area: "3,000 sqft", image: commercialImages[0], description: "Prime commercial plaza.", features: ["High Footfall", "Parking", "Security"], type: "Commercial", status: "For Rent", rating: 4.7, reviews: 23 },
  { id: 30, price: 220000, priceDisplay: "PKR 220,000/month", title: "Office Space IT Tower", location: "Karachi, Sindh", city: "Karachi", beds: 0, baths: 3, area: "2,500 sqft", image: commercialImages[1], description: "Modern office space.", features: ["High Speed Internet", "Conference Room", "Security"], type: "Commercial", status: "For Rent", rating: 4.6, reviews: 18 },
  { id: 31, price: 300000, priceDisplay: "PKR 300,000/month", title: "Commercial Building with Roof", location: "Lahore, Punjab", city: "Lahore", beds: 0, baths: 5, area: "4,000 sqft", image: commercialImages[2], description: "Modern commercial building.", features: ["Modern Design", "Parking", "Security"], type: "Commercial", status: "For Rent", rating: 4.8, reviews: 14 }
];

// Home page properties - Only 6 properties (sample/fragment)
const homeProperties = allProperties.slice(0, 6);

// Get unique cities from properties
const getUniqueCities = () => {
  const cities = [...new Set(allProperties.map(p => p.city))];
  return cities.length;
};

// Action Buttons
const actionButtons = [
  { id: 1, name: "Schedule Tour", icon: <Calendar size={18} />, bg: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" },
  { id: 2, name: "Virtual Tour", icon: <Video size={18} />, bg: "transparent", color: "#9ca3af" },
  { id: 3, name: "Download Brochure", icon: <FileText size={18} />, bg: "transparent", color: "#9ca3af" }
];

// Core Services Data
const coreServices = [
  { id: 1, title: "Buyer Advisory", icon: <Handshake size={24} />, description: "Complete assistance in purchasing residential and commercial properties—covering consultation, site visits, pricing guidance, and documentation support." },
  { id: 2, title: "Investment Advisory", icon: <TrendingUpIcon size={24} />, description: "Strategic guidance for investors seeking secure, growth-oriented opportunities across Lahore and emerging development zones, with a focus on long-term returns." },
  { id: 3, title: "Seller Representation", icon: <Briefcase size={24} />, description: "Professional marketing and resale support to position properties correctly, attract genuine buyers, and achieve fair market value." },
  { id: 4, title: "End-to-End Support", icon: <Headphones size={24} />, description: "From initial inquiry to post-sale assistance, Dream Homes manages the entire process with transparency and professionalism." }
];

// Testimonials Data (Exactly 3)
const testimonials = [
  { 
    id: 1, 
    name: "Ahmed Raza", 
    role: "Homeowner", 
    content: "Dream Homes helped me find the perfect villa in DHA. Their team was professional and responsive throughout the process. I couldn't be happier with my new home!", 
    rating: 5, 
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    id: 2, 
    name: "Sara Khan", 
    role: "Investor", 
    content: "Excellent service! They provided great investment opportunities and guided me through every step. My investment has already appreciated significantly.", 
    rating: 5, 
    image: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
  { 
    id: 3, 
    name: "Usman Chaudhry", 
    role: "Business Owner", 
    content: "Found the perfect commercial space for my business. Highly recommend their services! The team understood my requirements perfectly.", 
    rating: 5, 
    image: "https://randomuser.me/api/portraits/men/45.jpg" 
  }
];

// Blog Posts Data (Exactly 2 with detailed content)
const blogPosts = [
  {
    id: 1,
    title: "Vertical Cities in Pakistan | Sustainable Urban Development",
    excerpt: "Pakistan's urban landscape is undergoing a transformative shift. The government's visionary approach towards sustainable development emphasizes intelligent high-rise developments, preserving natural environments.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    date: "February 23, 2026",
    views: 14,
    readTime: "6 min read",
    category: "Urban Development",
    fullContent: `
      <div style="font-family: inherit;">
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Pakistan's urban landscape is undergoing a transformative shift. The government's visionary approach towards sustainable development emphasizes intelligent high-rise developments, preserving natural environments. This blog explores Pakistan's venture into vertical cities, their benefits and the impact on.</p>
        
        <div style="display: flex; gap: 20px; margin: 20px 0; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #818cf8;">📅 February 23, 2026</span>
          <span style="color: #818cf8;">👁️ Views: 14</span>
        </div>
        
        <h2 style="font-size: 24px; font-weight: 700; color: white; margin: 30px 0 20px 0;">What are Vertical Cities?</h2>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Vertical cities integrate multiple layers of urban infrastructure, optimizing space usage. High-rise buildings, innovative architecture and smart technologies converge to create sustainable, eco-friendly hubs.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">Benefits of Vertical Cities</h3>
        <ul style="color: #cbd5e1; line-height: 1.7; margin-bottom: 20px;">
          <li><strong style="color: #818cf8;">Environmental Conservation:</strong> By building upwards, natural habitats remain untouched.</li>
          <li><strong style="color: #818cf8;">Increased Efficiency:</strong> Compact, well-planned spaces reduce energy consumption.</li>
          <li><strong style="color: #818cf8;">Enhanced Livability:</strong> Residents enjoy proximity to amenities, public transport and services.</li>
          <li><strong style="color: #818cf8;">Economic Growth:</strong> Attractive investment opportunities emerge.</li>
        </ul>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">Pakistan Vision for Sustainable Development</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">The government aims to: Mitigate Urban Sprawl, Contain city expansion, preserving surrounding ecosystems.</p>
        
        <div style="background: rgba(99,102,241,0.1); border-left: 3px solid #6366f1; padding: 20px; margin: 20px 0; border-radius: 12px;">
          <p style="color: #cbd5e1; margin: 0; font-size: 14px;"><strong style="color: #818cf8;">Urban Sprawl Management:</strong> Urban sprawl poses significant environmental and social challenges. Pakistan's government aims to contain city expansion, preserving surrounding ecosystems through: Compact Urban Planning, Green Spaces, Mixed-Use Developments, Public Transport, and Zoning Regulations.</p>
        </div>
        
        <div style="background: rgba(99,102,241,0.1); border-left: 3px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 12px;">
          <p style="color: #cbd5e1; margin: 0; font-size: 14px;"><strong style="color: #10b981;">Fostering Innovative Architecture:</strong> Sustainable architecture is crucial. The government encourages: Energy-Efficient Buildings, Sustainable Materials, Water Conservation, Waste Management, and Smart Building Technologies.</p>
        </div>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">Success Stories: Transforming Metropolitan Areas</h3>
        
        <div style="margin-bottom: 25px;">
          <h4 style="font-size: 18px; font-weight: 600; color: #818cf8; margin-bottom: 10px;">Karachi: Bahria Icon Tower - A Skyscraper Marvel</h4>
          <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Karachi's skyline has been dramatically reshaped by the iconic Bahria Icon Tower. This 62-story architectural marvel stands as a testament to modern, sustainable design. The tower's sleek silhouette and innovative construction techniques have made it a landmark in the city. Its strategic location, coupled with world-class amenities, has redefined luxury living in Karachi.</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h4 style="font-size: 18px; font-weight: 600; color: #818cf8; margin-bottom: 10px;">Lahore: Smart City Projects - A Tech-Driven Future</h4>
          <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Lahore is embracing the future with its ambitious smart city projects. These initiatives integrate cutting-edge technology with sustainable urban planning. By leveraging IoT, AI, and other advanced technologies, these projects aim to optimize resource management, improve public services, and enhance the overall quality of life for residents.</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h4 style="font-size: 18px; font-weight: 600; color: #818cf8; margin-bottom: 10px;">Islamabad: High-Rise Developments - Pioneering Vertical Growth</h4>
          <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Islamabad's skyline is rapidly evolving with the emergence of numerous high-rise developments. These towering structures symbolize the city's growth and progress. By utilizing vertical space, these developments help to optimize land use and create vibrant urban centers. These projects not only offer luxurious living spaces but also contribute to the city's economic and social development.</p>
        </div>
      </div>
    `
  },
  {
    id: 2,
    title: "10 Reasons to Invest in RUDA Lahore — The Complete Investor Guide 2026",
    excerpt: "Discover why RUDA Lahore is becoming the hottest investment destination in Pakistan with complete guide for investors in 2026.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    date: "February 20, 2026",
    views: 28,
    readTime: "8 min read",
    category: "Investment",
    fullContent: `
      <div style="font-family: inherit;">
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">RUDA (Ravi Urban Development Authority) is transforming Lahore's landscape with a visionary project along the Ravi River. This comprehensive guide explores why investors are flocking to this mega-development.</p>
        
        <div style="display: flex; gap: 20px; margin: 20px 0; padding: 15px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span style="color: #818cf8;">📅 February 20, 2026</span>
          <span style="color: #818cf8;">👁️ Views: 28</span>
        </div>
        
        <h2 style="font-size: 24px; font-weight: 700; color: white; margin: 30px 0 20px 0;">Why Invest in RUDA Lahore?</h2>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">1. Strategic Location</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Located along the Ravi River, RUDA offers prime real estate with excellent connectivity to Lahore's major arteries and upcoming transport infrastructure.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">2. Government-Backed Project</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">As a government initiative, RUDA provides secure investment opportunities with clear regulatory frameworks and transparent processes.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">3. Modern Infrastructure</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">World-class infrastructure including wide roads, underground utilities, high-speed internet, and sustainable waste management systems.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">4. Environmental Focus</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">The project emphasizes green spaces, riverfront development, and eco-friendly practices, making it attractive for modern living.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">5. High ROI Potential</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Early investors are seeing significant appreciation as the project develops, with experts predicting continued growth through 2026 and beyond.</p>
        
        <div style="background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1)); padding: 25px; border-radius: 16px; margin: 30px 0;">
          <h4 style="color: white; font-size: 18px; margin-bottom: 15px;">📈 Investment Outlook 2026</h4>
          <p style="color: #cbd5e1; margin-bottom: 10px;">Expected ROI: 15-20% annually</p>
          <p style="color: #cbd5e1; margin-bottom: 10px;">Minimum Investment: Starting from PKR 2.5 Million</p>
          <p style="color: #cbd5e1;">Best Plots: Residential (5, 8, 10 Marla) and Commercial</p>
        </div>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">6. Affordable Entry Points</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Compared to DHA and Bahria Town, RUDA offers competitive pricing with flexible payment plans for various budget ranges.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">7. Smart City Features</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">IoT-enabled infrastructure, smart traffic management, and integrated security systems make RUDA a truly modern urban development.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">8. Educational & Healthcare Facilities</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Planned international schools, universities, and state-of-the-art hospitals within the development.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">9. Commercial Opportunities</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">Dedicated commercial zones offering excellent business opportunities for retail, offices, and entertainment venues.</p>
        
        <h3 style="font-size: 20px; font-weight: 600; color: white; margin: 25px 0 15px 0;">10. Long-term Vision</h3>
        <p style="font-size: 16px; line-height: 1.7; color: #cbd5e1;">RUDA is designed as a self-sustaining city with long-term master planning ensuring sustained value appreciation over decades.</p>
      </div>
    `
  }
];

// Fast typing speed effect
const useFastTypewriter = (text, typingSpeed = 30, deletingSpeed = 20, pauseTime = 1500) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === text.length) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isWaiting, text, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
};

// Blog Detail Modal Component
const BlogDetailModal = ({ blog, onClose }) => {
  if (!blog) return null;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, overflowY: 'auto', backdropFilter: 'blur(8px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px 60px', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            zIndex: 2001
          }}
        >
          <X size={24} />
        </button>
        
        <div style={{ marginBottom: '30px' }}>
          <span style={{ background: 'rgba(99,102,241,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', color: '#818cf8' }}>{blog.category}</span>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '20px 0 15px 0', lineHeight: '1.3' }}>{blog.title}</h1>
          <div style={{ display: 'flex', gap: '20px', color: '#6b7280', fontSize: '14px' }}>
            <span>📅 {blog.date}</span>
            <span>👁️ Views: {blog.views}</span>
            <span>⏱️ {blog.readTime}</span>
          </div>
        </div>
        
        <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '30px' }}>
          <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }} />
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: blog.fullContent }} />
        
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '20px' }}>Share this article</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map(social => (
              <button key={social} style={{ padding: '8px 16px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', cursor: 'pointer', fontSize: '13px' }}>{social}</button>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', padding: '30px' }}>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>Related Properties</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {allProperties.slice(0, 3).map(prop => (
              <div key={prop.id} style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '15px' }}>
                <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <h4 style={{ color: 'white', fontSize: '14px', marginBottom: '5px' }}>{prop.title}</h4>
                <p style={{ color: '#818cf8', fontSize: '14px', fontWeight: 'bold' }}>{prop.priceDisplay}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Draggable Home Menu Component
const DraggableHomeMenu = ({ items, isOpen, onClose, onItemClick }) => {
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.menu-header')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      
      newX = Math.max(10, Math.min(window.innerWidth - (menuRef.current?.offsetWidth || 280) - 10, newX));
      newY = Math.max(60, Math.min(window.innerHeight - (menuRef.current?.offsetHeight || 400) - 10, newY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 2000,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div style={{
        background: '#0b0f19',
        borderRadius: '16px',
        border: '1px solid rgba(99,102,241,0.3)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.2)',
        width: '260px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        <div 
          className="menu-header"
          style={{
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'grab',
            userSelect: 'none'
          }}
          onMouseDown={handleMouseDown}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GripVertical size={16} style={{ color: 'white' }} />
            <span style={{ color: 'white', fontWeight: '600', fontSize: '13px' }}>🏠 Home Menu</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>
        
        <div style={{ padding: '8px 0' }}>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onItemClick(item.action);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                color: '#e5e7eb',
                cursor: 'pointer',
                fontSize: '13px',
                textAlign: 'left',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '11px',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          💡 Drag to reposition • Click to navigate
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [stats, setStats] = useState({ 
    properties: allProperties.length, 
    clients: 0, 
    cities: getUniqueCities(), 
    agents: 0 
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDraggableMenuOpen, setIsDraggableMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showCoreServicesInquiryModal, setShowCoreServicesInquiryModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', phone: '', message: '' });
  const [favorites, setFavorites] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hi! I am your EstateFlow AI Assistant. How can I help you find your dream home?" }
  ]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const chatEndRef = useRef(null);

  // Fast typing animation for heading only
  const animatedHeading = useFastTypewriter("Find Your Dream Home", 30, 20, 1500);
  
  // Static subheading
  const staticSubheading = "Discover luxury properties across Pakistan's prime locations";

  // Draggable Menu Items - All scroll to home page sections (NO external links)
  const draggableMenuItems = [
    { name: "🏠 Home", icon: <Home size={16} />, action: "home" },
    { name: "🏘️ Properties", icon: <Building size={16} />, action: "properties" },
    { name: "📝 Blog", icon: <Newspaper size={16} />, action: "blog" },
    { name: "⚙️ Services", icon: <Zap size={16} />, action: "services" },
    { name: "⭐ Testimonials", icon: <Star size={16} />, action: "testimonials" },
    { name: "📊 Stats", icon: <TrendingUp size={16} />, action: "stats" },
    { name: "📞 Contact", icon: <Phone size={16} />, action: "contact" },
    { name: "💬 AI Assistant", icon: <MessageSquare size={16} />, action: "chat" }
  ];

  // Get filtered properties for home page (only 6 properties)
  const getFilteredHomeProperties = () => {
    let filtered = [...homeProperties];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(prop => prop.type === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(prop => 
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredProperties = getFilteredHomeProperties();
  const displayedProperties = filteredProperties;

  const getCategoryCount = (categoryValue) => {
    if (categoryValue === 'All') return homeProperties.length;
    return homeProperties.filter(p => p.type === categoryValue).length;
  };

  // Fetch real stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/users/count');
        const usersData = await usersRes.json();
        
        const agentsRes = await fetch('https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app/api/users/agents/count');
        const agentsData = await agentsRes.json();
        
        setStats({
          properties: allProperties.length,
          clients: usersData.success ? usersData.count : 1250,
          cities: getUniqueCities(),
          agents: agentsData.success ? agentsData.count : 8
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          properties: allProperties.length,
          clients: 1250,
          cities: getUniqueCities(),
          agents: 8
        });
      }
    };
    
    fetchStats();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroBackgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewProperty = (property) => {
    navigate(`/property/${property.id}`);
  };

  const handleInquirySubmit = () => {
    if (inquiryData.name && inquiryData.email && inquiryData.message) {
      toast.success(`Thank you ${inquiryData.name}! Our agent will contact you shortly.`);
      setShowInquiryModal(false);
      setShowCoreServicesInquiryModal(false);
      setInquiryData({ name: '', email: '', phone: '', message: '' });
      setSelectedProperty(null);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleCoreServicesInquiry = () => {
    setShowCoreServicesInquiryModal(true);
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);
    toast.success(`Showing ${categoryValue === 'All' ? 'All Properties' : categoryValue + 's'}`);
  };

  const handleActionClick = (action, property) => {
    if (action === 'Schedule Tour') {
      setSelectedProperty(property);
      setShowInquiryModal(true);
    } else if (action === 'Virtual Tour') {
      toast.success("Virtual tour is being prepared. Our agent will contact you!");
    } else if (action === 'Download Brochure') {
      toast.success(`${property.title} brochure downloaded!`);
    }
  };

  const handleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter(id => id !== propertyId));
      toast.success("Removed from favorites");
    } else {
      setFavorites([...favorites, propertyId]);
      toast.success("Added to favorites");
    }
  };

  const handleShare = (property) => {
    navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
    toast.success(`Share link for ${property.title} copied!`);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    toast.success("All filters reset!");
  };

  // Navigate to separate Properties page
  const handleViewAllProperties = () => {
    navigate('/properties');
  };

  // Scroll to section on home page (NO external navigation)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Handle draggable menu item click
  const handleMenuItemClick = (action) => {
    if (action === "chat") {
      setIsChatOpen(true);
    } else if (action === "home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(action);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      const query = chatInput.toLowerCase();
      let responseText = '';
      
      if (query.includes('price') || query.includes('cost') || query.includes('budget')) {
        responseText = "Our properties range from PKR 150,000 to PKR 700,000 per month. What's your budget?";
      } else if (query.includes('karachi')) {
        responseText = "We have many amazing properties in Karachi! Including luxury villas, penthouses, and commercial spaces.";
      } else if (query.includes('lahore')) {
        responseText = "We have stunning properties in Lahore! Including penthouses, villas, and farmhouses.";
      } else if (query.includes('islamabad')) {
        responseText = "We have beautiful properties in Islamabad! Executive villa, farmhouse, and penthouses.";
      } else if (query.includes('villa')) {
        responseText = "We have 12 luxury villas available across Karachi, Lahore, Islamabad, Rawalpindi, and Peshawar!";
      } else if (query.includes('penthouse')) {
        responseText = "We have 9 luxury penthouses available in Lahore, Karachi, and Islamabad! Starting from PKR 450,000/month.";
      } else if (query.includes('farmhouse')) {
        responseText = "We have 7 beautiful farmhouses available in Rawalpindi, Islamabad, Lahore, and Murree!";
      } else if (query.includes('commercial')) {
        responseText = "We have 3 commercial properties available in Karachi and Lahore for your business needs!";
      } else {
        responseText = "I can help you find properties by city (Karachi, Lahore, Islamabad) or type (Villa, Penthouse, Farmhouse, Commercial). What are you looking for?";
      }
      
      setChatMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
    }, 500);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = 'hidden';
  };

  const closeBlogDetail = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'auto';
  };

  // Social Media Links - Working URLs
  const socialLinks = {
    facebook: "https://facebook.com/estateflow",
    twitter: "https://twitter.com/estateflow",
    instagram: "https://instagram.com/estateflow",
    linkedin: "https://linkedin.com/company/estateflow"
  };

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Draggable Home Menu Button */}
      <button
        onClick={() => setIsDraggableMenuOpen(!isDraggableMenuOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1001,
          boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Menu size={24} />
      </button>

      {/* Draggable Home Menu */}
      <DraggableHomeMenu
        items={draggableMenuItems}
        isOpen={isDraggableMenuOpen}
        onClose={() => setIsDraggableMenuOpen(false)}
        onItemClick={handleMenuItemClick}
      />
      
      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetailModal blog={selectedBlog} onClose={closeBlogDetail} />
      )}
      
      {/* Core Services Inquiry Modal */}
      {showCoreServicesInquiryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }} onClick={() => setShowCoreServicesInquiryModal(false)}>
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', background: '#0b0f19', borderRadius: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>Get in Touch</h2>
              <button onClick={() => setShowCoreServicesInquiryModal(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(99,102,241,0.1)', borderRadius: '12px' }}>
              <p style={{ color: '#818cf8', fontSize: '13px', margin: 0 }}>Our team will help you with your real estate needs</p>
            </div>
            <div>
              <input type="text" placeholder="Full Name *" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} style={modalInputStyle} />
              <input type="email" placeholder="Email Address *" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} style={modalInputStyle} />
              <input type="tel" placeholder="Phone Number" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} style={modalInputStyle} />
              <textarea placeholder="Your Message / Requirement" value={inquiryData.message} onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})} rows="3" style={{ ...modalInputStyle, resize: 'vertical' }} />
              <button onClick={handleInquirySubmit} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>Send Inquiry</button>
            </div>
          </div>
        </div>
      )}

      {/* Property Inquiry Modal */}
      {showInquiryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }} onClick={() => setShowInquiryModal(false)}>
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '30px', background: '#0b0f19', borderRadius: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>Schedule a Tour</h2>
              <button onClick={() => setShowInquiryModal(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            {selectedProperty && (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(99,102,241,0.1)', borderRadius: '12px' }}>
                <p style={{ color: '#818cf8', fontSize: '13px', margin: 0 }}>Property: <strong>{selectedProperty.title}</strong></p>
                <p style={{ color: '#6366f1', fontSize: '12px', margin: '5px 0 0 0' }}>{selectedProperty.priceDisplay}</p>
              </div>
            )}
            <div>
              <input type="text" placeholder="Full Name *" value={inquiryData.name} onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})} style={modalInputStyle} />
              <input type="email" placeholder="Email Address *" value={inquiryData.email} onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})} style={modalInputStyle} />
              <input type="tel" placeholder="Phone Number" value={inquiryData.phone} onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})} style={modalInputStyle} />
              <textarea placeholder="Preferred Date & Time" value={inquiryData.message} onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})} rows="3" style={{ ...modalInputStyle, resize: 'vertical' }} />
              <button onClick={handleInquirySubmit} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>Request Tour</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="glass-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '12px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{ width: '36px', height: '36px', background: '#6366f1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>🏠</span></div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'white', letterSpacing: '-0.3px' }}>EstateFlow</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-nav">
            <a href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Home</a>
            <a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Properties</a>
            <a href="/services" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Services</a>
            <a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Agents</a>
            <a href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="desktop-nav">
            {isAuthenticated ? (
              <><button onClick={() => navigate('/dashboard')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #6366f1', color: '#6366f1', borderRadius: '40px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Dashboard</button><Avatar /></>
            ) : (
              <><button onClick={() => navigate('/login')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '40px', cursor: 'pointer', fontSize: '13px' }}>Sign In</button><button onClick={() => navigate('/register')} style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '40px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Get Started</button></>
            )}
          </div>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }} className="mobile-btn">
            <Menu size={24} />
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div style={{ 
            position: 'absolute', top: '100%', left: 0, right: 0, 
            background: 'rgba(8, 11, 23, 0.95)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px',
            display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            <a href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '16px', fontWeight: '600', padding: '10px 0' }}>🏠 Home</a>
            <a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '16px', padding: '10px 0' }}>🏘️ Properties</a>
            <a href="/services" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '16px', padding: '10px 0' }}>⚙️ Services</a>
            <a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '16px', padding: '10px 0' }}>👥 Agents</a>
            <a href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '16px', padding: '10px 0' }}>📞 Contact</a>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {isAuthenticated ? (
                <><button onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #6366f1', color: '#6366f1', borderRadius: '40px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Dashboard</button></>
              ) : (
                <><button onClick={() => navigate('/login')} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '40px', cursor: 'pointer', fontSize: '14px' }}>Sign In</button><button onClick={() => navigate('/register')} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '40px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Get Started</button></>
              )}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: `url(${heroBackgroundImages[currentHeroImage]})`, 
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          transition: 'background-image 1s ease-in-out', zIndex: 0 
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(8,11,17,0.5) 0%, rgba(8,11,17,0.3) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: '900', color: 'white', letterSpacing: '-2px', lineHeight: '1.1', marginBottom: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.3)', minHeight: '140px' }}>
            {animatedHeading}
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '50px',
              backgroundColor: '#6366f1',
              marginLeft: '4px',
              animation: 'blink 0.7s infinite',
              verticalAlign: 'middle'
            }} />
          </h1>
          
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>
            {staticSubheading}
          </p>
          
          <div className="glass-panel" style={{ display: 'flex', padding: '8px', gap: '8px', maxWidth: '550px', margin: '0 auto', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <input 
              type="text" 
              placeholder="Search by city, title, or location..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', paddingLeft: '16px', outline: 'none', fontSize: '16px' }} 
            />
            <button onClick={handleViewAllProperties} style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '40px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* OUR CORE SERVICES SECTION */}
      <section id="services" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'stretch' }} className="services-grid">
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', height: '100%', minHeight: '500px' }}>
              <img 
                src="https://www.dreamhomes.com.pk/media/images/2026/04/0fad65806d205042f8bd2f6f11e539c0.webp" 
                alt="Luxury Property" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '20px', lineHeight: '1.2' }}>
                What Makes Real Estate Decisions Challenging in Pakistan?
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                Pakistan's real estate market demands more than just listings. Buyers and investors face challenges around trust, legal clarity, location analysis, pricing accuracy, and long-term value. Navigating these factors requires professional guidance, verified information, and on-ground market expertise.
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
                Dream Homes addresses these challenges by offering transparent, client-focused real estate solutions. Our team combines local market knowledge, verified project insights, and end-to-end support to simplify property decisions and protect client interests.
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
                With a commitment to accuracy, integrity, and long-term value, Dream Homes ensures every client experiences a secure, informed, and confident property journey—whether buying for living or investing for the future.
              </p>
              
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Zap size={28} style={{ color: '#6366f1' }} /> Our Core Services
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="services-cards">
                {coreServices.map((service) => (
                  <div key={service.id} className="glass-panel" style={{ padding: '20px', transition: 'transform 0.3s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'white' }}>
                      {service.icon}
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>{service.title}</h4>
                    <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{service.description}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button 
                  onClick={handleCoreServicesInquiry}
                  style={{
                    padding: '16px 40px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.3)';
                  }}
                >
                  <Mail size={20} /> Get Expert Advice
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BUTTONS */}
      <section style={{ padding: '60px 24px 20px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', margin: 0 }}>Browse Properties</h2>
            <button onClick={handleResetFilters} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '30px', color: '#9ca3af', cursor: 'pointer' }}>
              <Filter size={16} /> Reset Filters
            </button>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categoryButtons.map((cat) => {
              const displayName = cat.value === 'All' ? 'All Properties' : cat.value + 's';
              return (
                <button key={cat.id} onClick={() => handleCategoryClick(cat.value)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                  background: selectedCategory === cat.value ? cat.color : 'rgba(255,255,255,0.05)',
                  border: selectedCategory === cat.value ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '40px', color: selectedCategory === cat.value ? 'white' : '#9ca3af', cursor: 'pointer'
                }}>
                  {cat.icon} {displayName} <span style={{ fontSize: '12px', opacity: 0.8 }}>({getCategoryCount(cat.value)})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROPERTIES GRID - Only 6 properties */}
      <section style={{ padding: '40px 24px 0px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ color: '#818cf8', fontWeight: '600', fontSize: '14px', letterSpacing: '2px' }}>✨ BEST DEALS</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '8px 0 0 0' }}>Available Properties</h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>Showing {displayedProperties.length} of {homeProperties.length} properties</p>
          </div>

          {displayedProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px' }}>
              <Home size={64} style={{ color: '#6366f1', marginBottom: '20px' }} />
              <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>No Properties Found</h3>
              <button onClick={handleResetFilters} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '30px', cursor: 'pointer' }}>Reset Filters</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }} className="mobile-col">
                {displayedProperties.map((house) => (
                  <div key={house.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    onClick={() => handleViewProperty(house)}>
                    
                    <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                      <img src={house.image} alt={house.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#10b981', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{house.status}</span>
                      <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Star size={14} fill="#fbbf24" /> {house.rating} ({house.reviews})
                      </div>
                      <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', color: '#818cf8' }}>{house.type}</div>
                    </div>
                    
                    <div style={{ padding: '24px', flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>{house.title}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '14px' }}>📍 {house.location}</p>
                      <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                        {house.beds > 0 && <span>🛏️ {house.beds} {house.beds === 1 ? 'Bed' : 'Beds'}</span>}
                        {house.baths > 0 && <span>🛁 {house.baths} {house.baths === 1 ? 'Bath' : 'Baths'}</span>}
                        <span>📐 {house.area}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        {house.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} style={{ background: 'rgba(99,102,241,0.12)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>{feature}</span>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {actionButtons.map((action) => (
                          <button key={action.id} onClick={(e) => { e.stopPropagation(); handleActionClick(action.name, house); }} style={{
                            flex: action.name === 'Schedule Tour' ? 1 : 'auto', padding: '10px 14px',
                            background: action.bg, border: action.name === 'Schedule Tour' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px', color: action.color, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'
                          }}>
                            {action.icon} {action.name === 'Schedule Tour' ? 'Schedule Tour' : ''}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                        <span style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>{house.priceDisplay}</span>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={(e) => { e.stopPropagation(); handleFavorite(house.id); }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                            <Heart size={18} style={{ color: favorites.includes(house.id) ? '#ef4444' : '#9ca3af', fill: favorites.includes(house.id) ? '#ef4444' : 'none' }} />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleShare(house); }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                            <Share2 size={18} style={{ color: '#9ca3af' }} />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleViewProperty(house); }} style={{ padding: '8px 20px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', borderRadius: '25px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Properties Button - Navigates to separate Properties Page */}
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button 
                  onClick={handleViewAllProperties}
                  style={{ padding: '14px 40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '50px', cursor: 'pointer', fontWeight: '600', fontSize: '15px', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.3)'; }}
                >
                  View All Properties ({allProperties.length - homeProperties.length} more) <ArrowRight size={16} style={{ marginLeft: '10px' }} />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* BLOG SECTION - Exactly 2 Posts with Modal on Click */}
      <section id="blog" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#818cf8', fontWeight: '600', fontSize: '14px', letterSpacing: '2px' }}>📝 LATEST ARTICLES</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '8px 0 0 0' }}>Real Estate Insights</h2>
            <p style={{ color: '#6b7280', marginTop: '12px' }}>Expert tips and market updates for smart property decisions</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', maxWidth: '900px', margin: '0 auto' }} className="mobile-col">
            {blogPosts.map((post) => (
              <div key={post.id} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => handleBlogClick(post)}>
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(99,102,241,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: '#818cf8' }}>{post.category}</span>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>📅 {post.date}</span>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>👁️ {post.views} views</span>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>⏱️ {post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '12px', lineHeight: '1.4' }}>{post.title.length > 70 ? post.title.substring(0, 70) + '...' : post.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}</p>
                  <button style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HAPPY CLIENTS SECTION with Glowing Boundary - Exactly 3 Testimonials */}
      <section id="testimonials" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '14px', letterSpacing: '2px' }}>⭐ TESTIMONIALS</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '8px 0 0 0' }}>What Our Clients Say</h2>
            <p style={{ color: '#6b7280', marginTop: '12px' }}>Real experiences from our happy customers</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                style={{ 
                  padding: '32px 28px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  boxShadow: '0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.1)',
                  transition: 'all 0.3s ease',
                  animation: 'glowPulse 2s ease-in-out infinite'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(99,102,241,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }} />
                  <div>
                    <h4 style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: 0 }}>{testimonial.name}</h4>
                    <p style={{ color: '#818cf8', fontSize: '13px', margin: '5px 0 0 0' }}>{testimonial.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '20px' }}>"{testimonial.content}"</p>
                <Quote size={28} style={{ color: 'rgba(99,102,241,0.4)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION with Glowing Boundary */}
      <section id="stats" style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '30px',
            borderRadius: '28px',
            padding: '40px',
            background: 'rgba(8, 11, 23, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(99,102,241,0.3)',
            boxShadow: '0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.1)',
            animation: 'glowPulse 2s ease-in-out infinite'
          }} className="mobile-col">
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6366f1', marginBottom: '12px' }}><Building size={32} /></div>
              <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: 0 }}>{stats.properties}+</p>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px' }}>Properties Listed</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6366f1', marginBottom: '12px' }}><Users size={32} /></div>
              <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: 0 }}>{stats.clients}+</p>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px' }}>Happy Clients</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6366f1', marginBottom: '12px' }}><Globe size={32} /></div>
              <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: 0 }}>{stats.cities}+</p>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px' }}>Cities</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#6366f1', marginBottom: '12px' }}><ThumbsUp size={32} /></div>
              <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: 0 }}>{stats.agents}+</p>
              <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '6px' }}>Expert Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <Zap size={56} style={{ color: '#6366f1', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '38px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>Ready to Find Your Dream Home?</h2>
          <p style={{ color: '#9ca3af', marginBottom: '32px', fontSize: '18px' }}>Get in touch with our expert agents today for a personalized consultation.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setSelectedProperty(null); setShowInquiryModal(true); }} style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: 'white', borderRadius: '50px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>Contact an Expert →</button>
            <button onClick={handleViewAllProperties} style={{ padding: '14px 32px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '50px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}>Browse All Properties</button>
          </div>
        </div>
      </section>

      {/* FOOTER with Working Social Media Links */}
      <footer id="contact" style={{ background: '#05070a', padding: '60px 24px 30px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }} className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>🏠</span></div>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>EstateFlow</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>Pakistan's #1 premium real estate platform with {stats.properties}+ properties and {stats.clients}+ happy clients.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#1877f2'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1877f2'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>FB</a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#000000'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>TW</a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#bc1888'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>IG</a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#0a66c2'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#0a66c2'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>LI</a>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Home</a></li>
                <li><a href="/properties" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Properties</a></li>
                <li><a href="/services" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Services</a></li>
                <li><a href="/agents" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Agents</a></li>
                <li><a href="/contact" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Privacy Policy</a></li>
                <li><a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Terms of Service</a></li>
                <li><a href="/faq" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ FAQ</a></li>
                <li><a href="/blog" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>→ Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}><MapPin size={18} style={{ color: '#6366f1' }} /><span style={{ color: '#9ca3af' }}>DHA Phase 6, Karachi</span></li>
                <li style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}><Phone size={18} style={{ color: '#6366f1' }} /><a href="tel:+923001234567" style={{ color: '#9ca3af', textDecoration: 'none' }}>+92-300-1234567</a></li>
                <li style={{ display: 'flex', gap: '10px' }}><Mail size={18} style={{ color: '#6366f1' }} /><a href="mailto:info@estateflow.com" style={{ color: '#9ca3af', textDecoration: 'none' }}>info@estateflow.com</a></li>
              </ul>
              <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(99,102,241,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trophy size={20} style={{ color: '#fbbf24' }} />
                <div><p style={{ color: '#818cf8', fontSize: '10px', fontWeight: '700', margin: 0 }}>AWARD WINNER</p><p style={{ color: '#9ca3af', fontSize: '9px', margin: 0 }}>Best Real Estate Platform 2025</p></div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#6b7280', fontSize: '13px' }}>© 2026 EstateFlow. All rights reserved. Made with ❤️ in Pakistan</div>
        </div>
      </footer>

      {/* CHATBOT */}
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="chatbot-toggle">
        {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      {isChatOpen && (
        <div className="chatbot-container">
          <div style={{ padding: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div><h4 style={{ margin: 0 }}>EstateFlow AI</h4></div>
            <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((msg, idx) => (<div key={idx} className={`chat-bubble ${msg.sender}`}>{msg.text}</div>))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleChatSubmit} style={{ padding: '12px', display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input type="text" placeholder="Ask me..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} style={{ flex: 1, padding: '10px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px', color: 'white', outline: 'none' }} />
            <button type="submit" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#6366f1', border: 'none', color: 'white', cursor: 'pointer' }}><Send size={14} /></button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes glowPulse {
          0% { box-shadow: 0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.05); border-color: rgba(99,102,241,0.3); }
          50% { box-shadow: 0 0 35px rgba(99,102,241,0.5), 0 0 60px rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.6); }
          100% { box-shadow: 0 0 20px rgba(99,102,241,0.2), 0 0 40px rgba(99,102,241,0.05); border-color: rgba(99,102,241,0.3); }
        }
        
        @media (max-width: 1000px) { .desktop-nav { display: none !important; } }
        @media (min-width: 1001px) { .mobile-btn { display: none !important; } }
        @media (max-width: 900px) { 
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
          .services-grid { display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .services-cards { display: flex !important; flex-direction: column !important; }
        }
        @media (max-width: 560px) { 
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) { 
          .mobile-col { display: flex !important; flex-direction: column !important; gap: 20px !important; } 
          .chatbot-container { width: calc(100vw - 48px); right: 24px; bottom: 85px; }
          h1 { font-size: 36px !important; min-height: 100px !important; }
          p { font-size: 16px !important; }
        }
        
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.06); }
        .glass-header { background: rgba(8, 11, 23, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
        
        .chatbot-toggle { position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); border: none; color: white; cursor: pointer; z-index: 1000; box-shadow: 0 4px 15px rgba(99,102,241,0.4); }
        .chatbot-container { position: fixed; bottom: 95px; right: 24px; width: 360px; height: 500px; background: #0b0f19; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); z-index: 1000; display: flex; flex-direction: column; }
        .chatbot-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .chat-bubble { max-width: 85%; padding: 10px 14px; border-radius: 16px; font-size: 13px; }
        .chat-bubble.user { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .chat-bubble.bot { background: #1a1f2e; color: #e5e7eb; align-self: flex-start; border-bottom-left-radius: 4px; }
      `}</style>
    </div>
  );
};

const modalInputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  background: '#090d16',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: 'white',
  outline: 'none',
  fontSize: '14px'
};

export default HomePage;