import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ArrowLeft, Bed, Bath, Ruler, Calendar, MapPin, 
  Phone, Mail, User, Star, Heart, Share2, 
  Calculator, MessageSquare, Send, CheckCircle2, ShieldAlert,
  X, ChevronLeft, ChevronRight, Grid, Home as HomeIcon,
  Building, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState(false);
  const [otherHouses, setOtherHouses] = useState([]);
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  const [homeValue, setHomeValue] = useState(8500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(10);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(5);
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [hoverRating, setHoverRating] = useState(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: '' });

  // ========== VILLAS (ID 1-12) IMAGES ==========
  const propertyCustomImages = {
    1: { main: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/2258279767/photo/japandi-style-hotel-room-interior-with-double-bed-and-wooden-head-board.jpg", bedroom2: "https://media.istockphoto.com/id/1256466090/photo/modern-style-bedroom.jpg", bedroom3: "https://media.istockphoto.com/id/2194122030/photo/cozy-modern-bedroom-design.jpg", bedroom4: "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg", bathroom1: "https://media.istockphoto.com/id/1208210864/photo/master-bathroom-interior-in-new-farmhouse-style-luxury-home-large-mirror-shower-and-bathtub.jpg", bathroom2: "https://media.istockphoto.com/id/1073403366/photo/luxurious-minimalist-bathroom-with-slate-black-stone-wall.jpg", bathroom3: "https://media.istockphoto.com/id/2239250117/photo/japandi-bathroom-at-night-with-beige-natural-stone-tiles-and-ambient-led-lighting.jpg", kitchen: "https://media.istockphoto.com/id/2209779864/photo/new-contruction-family-home-kitchen-interior.jpg" },
    2: { main: "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1336925615/photo/a-guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-rental-small-cottage.jpg", bedroom2: "https://media.istockphoto.com/id/1042424568/photo/3d-rendering-luxury-modern-bedroom-suite-tv-with-wardrobe-and-walk-in-closet.jpg", bedroom3: "https://media.istockphoto.com/id/2051508506/photo/renovated-and-staged-home-interior-photographs.jpg", bedroom4: "https://media.istockphoto.com/id/1353440472/photo/elegant-bedroom-interior-with-double-bed-night-tables-armchair-and-seaview-through-window.jpg", bedroom5: "https://media.istockphoto.com/id/1249292283/photo/master-bedroom-with-high-coffered-ceiling-and-wainscoting-wall.jpg", bathroom1: "https://media.istockphoto.com/id/1408740166/photo/contemporary-bathroom-design-with-freestanding-bathtub-and-shower-stall.jpg", bathroom2: "https://media.istockphoto.com/id/1973276016/photo/modern-minimalist-bathroom-interior-bathtub-and-bathroom-cabinet-white-sink-interior-plants.jpg", bathroom3: "https://media.istockphoto.com/id/1309074908/photo/luxury-bathroom-interior-with-hot-tub-and-beautiful-sea-view.jpg", bathroom4: "https://media.istockphoto.com/id/2268031945/photo/small-bathroom-with-window-toilet-sink-and-glas-shower.jpg", kitchen: "https://media.istockphoto.com/id/1366623005/photo/brown-and-beige-kitchen-with-large-black-refrigerator-and-extractor-hood-with-oven-on-a-white.jpg" },
    3: { main: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1007179966/photo/patterned-pouf-and-basket-in-bright-bedroom-interior-with-lamps-plants-and-poster-next-to-bed.jpg", bedroom2: "https://media.istockphoto.com/id/1353440472/photo/elegant-bedroom-interior-with-double-bed-night-tables-armchair-and-seaview-through-window.jpg", bedroom3: "https://media.istockphoto.com/id/1362692369/photo/modern-luxury-beautiful-interior-with-panoramic-windows-design-bedroom-with-bright-night.jpg", bedroom4: "https://media.istockphoto.com/id/1625138485/photo/modern-bedroom-interior.jpg", bedroom5: "https://media.istockphoto.com/id/1318363878/photo/luxury-modern-bedroom-interior-at-night.jpg", bathroom1: "https://media.istockphoto.com/id/1782114985/photo/modern-bathroom-interior-with-tiles.jpg", bathroom2: "https://media.istockphoto.com/id/1476870691/photo/modern-minimalist-scandinavian-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1440917339/photo/modern-minimalist-bathroom-hotel-room-interior.jpg", bathroom4: "https://media.istockphoto.com/id/167487090/photo/bathroom.jpg", kitchen: "https://media.istockphoto.com/id/1350512518/photo/spacious-kitchen-in-luxurious-home-with-modern-decor.jpg" },
    4: { main: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.jpg", bedroom2: "https://media.istockphoto.com/id/2078584317/photo/3d-rendering-of-bedroom-with-cozy-bed-at-night.jpg", bedroom3: "https://media.istockphoto.com/id/2169200951/photo/modern-bedroom-interior-with-bed-side-table-armchair-and-bookshelf.jpg", bedroom4: "https://media.istockphoto.com/id/2157249352/photo/cozy-bedroom-with-a-king-sized-bed-and-a-flat-screen-projector.jpg", bathroom1: "https://media.istockphoto.com/id/2179552509/photo/luxurious-modern-bathroom-interior-with-marble-finish-and-soft-lighting.jpg", bathroom2: "https://media.istockphoto.com/id/1181472050/photo/elegant-attic-bathroom-with-bathtub.jpg", bathroom3: "https://media.istockphoto.com/id/1805905715/photo/elegant-big-master-bathroom.jpg", kitchen: "https://media.istockphoto.com/id/2104603719/photo/interior-photographs-of-a-luxurious-residential-home-den-study-dining-room-kitchen-living.jpg" },
    5: { main: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/182913408/photo/luxury-bedroom.jpg", bedroom2: "https://media.istockphoto.com/id/177112902/photo/luxury-rococo-bedroom.jpg", bedroom3: "https://media.istockphoto.com/id/1161927918/photo/beautiful-royal-room-with-bathroom-in-the-hotel.jpg", bedroom4: "https://media.istockphoto.com/id/157592041/photo/luxurious-bedroom-suite.jpg", bathroom1: "https://media.istockphoto.com/id/1330856760/photo/modern-bathroom-interior.jpg", bathroom2: "https://media.istockphoto.com/id/171577494/photo/luxury-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1169546376/photo/luxury-bathroom.jpg", kitchen: "https://media.istockphoto.com/id/1648288633/photo/modern-kitchen.jpg" },
    6: { main: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1227060710/photo/portrait-of-young-couple-tourist-standing-nearly-window-looking-to-beautiful-view-outside-in.jpg", bedroom2: "https://media.istockphoto.com/id/654289190/photo/four-poster-bed-with-mosquito-net-in-bright-hotel-room.jpg", bedroom3: "https://media.istockphoto.com/id/1486230942/photo/modern-bedroom-interior-with-double-bed-wicker-lamps-red-pillows-and-potted-plant.jpg", bedroom4: "https://media.istockphoto.com/id/1141951033/photo/luxury-bedroom-interior.jpg", bedroom5: "https://media.istockphoto.com/id/1148629418/photo/home-or-house-building-exterior-and-interior-design-showing-tropical-pool-villa-with-green.jpg", bedroom6: "https://media.istockphoto.com/id/500120991/photo/white-modern-bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/1404266465/photo/modern-luxury-bathroom-interior.jpg", bathroom2: "https://media.istockphoto.com/id/1076306572/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", bathroom3: "https://media.istockphoto.com/id/1076307880/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", bathroom4: "https://media.istockphoto.com/id/874975774/photo/modern-contemporary-interior-bathroom-with-two-sinks-and-large-mirror.jpg", bathroom5: "https://media.istockphoto.com/id/1208420863/photo/luxurious-bathroom-with-bathtub-and-window.jpg", kitchen: "https://media.istockphoto.com/id/130408321/photo/stove-and-counters-in-modern-kitchen.jpg" },
    7: { main: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=600&h=400&fit=crop", bedroom1: "https://plus.unsplash.com/premium_photo-1684445035187-c4bc7c96bc5d?w=500&auto=format", bedroom2: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format", bedroom3: "https://images.unsplash.com/photo-1560184897-502a475f7a0d?w=500&auto=format", bathroom1: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=500&auto=format", bathroom2: "https://images.unsplash.com/photo-1644421439741-712c7fde7e95?w=500&auto=format", kitchen: "https://images.unsplash.com/photo-1617228069096-4638a7ffc906?w=500&auto=format" },
    8: { main: "https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?w=600&h=400&fit=crop", bedroom1: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&auto=format", bedroom2: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=500&auto=format", bedroom3: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=500&auto=format", bedroom4: "https://media.istockphoto.com/id/2159352100/photo/digitally-generated-image-of-old-style-bedroom-with-access-to-balcony.jpg", bedroom5: "https://media.istockphoto.com/id/2159352100/photo/digitally-generated-image-of-old-style-bedroom-with-access-to-balcony.jpg", bathroom1: "https://media.istockphoto.com/id/1304826235/photo/luxury-bathroom-interior-with-shower-toilet-mirror-and-yellow-towels.jpg", bathroom2: "https://media.istockphoto.com/id/1211605858/photo/public-interior-of-bathroom-with-sink-basin-faucet-lined-up-modern-design.jpg", bathroom3: "https://media.istockphoto.com/id/1476870691/photo/modern-minimalist-scandinavian-bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/1474853026/photo/bathtub-in-bathroom-staging-model-home-house-or-hotel-with-modern-luxury-white-cabinets.jpg", kitchen: "https://media.istockphoto.com/id/2240054679/photo/modern-japandi-style-kitchen-interior-with-wooden-cabinets-and-minimalist-dining-area.jpg" },
    9: { main: "https://media.istockphoto.com/id/2223376026/photo/luxury-tropical-pool-villa-at-dusk.jpg", bedroom1: "https://media.istockphoto.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.jpg", bedroom2: "https://media.istockphoto.com/id/1195596155/photo/computer-generated-image-of-bed-room-architectural-visualization-3d-rendering.jpg", bedroom3: "https://media.istockphoto.com/id/619995398/photo/abstract-sketch-design-of-interior-bedroom-3d-rendering.jpg", bedroom4: "https://media.istockphoto.com/id/1203799607/photo/modern-bedroom-in-the-evening.jpg", bedroom5: "https://media.istockphoto.com/id/1053944358/photo/cozy-bedroom-interior.jpg", bathroom1: "https://media.istockphoto.com/id/130407910/photo/tiled-open-shower-in-modern-bathroom.jpg", bathroom2: "https://media.istockphoto.com/id/872680402/photo/abstract-sketch-design-of-interior-bathroom-3d-rendering.jpg", bathroom3: "https://media.istockphoto.com/id/154968467/photo/beautiful-new-bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/538653268/photo/3d-rendering-contemporary-wood-bathroom-with-plants.jpg", kitchen: "https://media.istockphoto.com/id/1398693404/photo/beautiful-kitchen-in-new-luxury-home-with-island-pendant-lights-and-hardwood-floors.jpg" },
    10: { main: "https://media.istockphoto.com/id/2110310187/photo/luxury-tropical-pool-villa-at-dusk.jpg", bedroom1: "https://media.istockphoto.com/id/1061766054/photo/bedroom-and-living-area-on-nature-view-bedroom-in-house-or-apartment-on-forest-view.jpg", bedroom2: "https://media.istockphoto.com/id/2230649701/photo/modern-loft-style-bedroom-with-mountain-view-background-3d-render.jpg", bedroom3: "https://media.istockphoto.com/id/2170944023/photo/luxury-modern-master-bedroom.jpg", bedroom4: "https://media.istockphoto.com/id/2224684240/photo/modern-farmhouse-bedroom-interior-design-with-a-neutral-color-palette.jpg", bedroom5: "https://media.istockphoto.com/id/2206289184/photo/luxurious-black-modern-master-suite-with-open-concept-bathroom.jpg", bathroom1: "https://media.istockphoto.com/id/1305968742/photo/bathroom-in-new-luxury-home.jpg", bathroom2: "https://media.istockphoto.com/id/1305969343/photo/bathroom-in-new-luxury-home.jpg", bathroom3: "https://media.istockphoto.com/id/155033518/photo/bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/1474669971/photo/glass-walls-and-shower-door-installed.jpg", kitchen: "https://media.istockphoto.com/id/481536200/photo/professional-kitchen.jpg" },
    11: { main: "https://media.istockphoto.com/id/2204602504/photo/luxurious-lakeside-residence-with-manicured-gardens-and-dock-view.jpg", bedroom1: "https://media.istockphoto.com/id/2204605019/photo/master-or-primary-bedroom-interior.jpg", bedroom2: "https://media.istockphoto.com/id/2259464232/photo/owners-bedroom-at-night-with-warm-lamp-light-and-rainy-city-view.jpg", bedroom3: "https://media.istockphoto.com/id/186886221/photo/master-bedroom.jpg", bedroom4: "https://media.istockphoto.com/id/2272185018/photo/luxurious-modern-master-bedroom-with-walk-in-glass-wardrobe-and-neoclassical-wall-moldings.jpg", bedroom5: "https://media.istockphoto.com/id/2272555234/photo/rustic-master-bedroom-interior-3d-rendering-featuring-rich-natural-wood-grain-textures.jpg", bedroom6: "https://media.istockphoto.com/id/2210463101/photo/modern-farmhouse-style-primary-suite-in-middle-class-home.jpg", bathroom1: "https://media.istockphoto.com/id/1210780531/photo/interior-of-a-large-bathroom.jpg", bathroom2: "https://media.istockphoto.com/id/2179552509/photo/luxurious-modern-bathroom-interior-with-marble-finish-and-soft-lighting.jpg", bathroom3: "https://media.istockphoto.com/id/170094574/photo/bright-luxury-bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/2151164767/photo/newly-renovated-modern-bathroom-in-luxury-home.jpg", bathroom5: "https://media.istockphoto.com/id/1202620492/photo/contemporary-bathroom-design-with-vanity-and-shower-bathtub.jpg", kitchen: "https://media.istockphoto.com/id/2203032223/photo/luxurious-modernity-of-this-interior-duplex-house-depicted-in-stunning-3d-rendering-living.jpg" },
    12: { main: "https://media.istockphoto.com/id/1533428710/photo/modern-house-with-a-cubic-extension-and-garage.jpg", bedroom1: "https://media.istockphoto.com/id/2152107582/photo/orange-bed-and-mockup-dark-green-wall-in-bedroom-interior-3d-rendering.jpg", bedroom2: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg", bedroom3: "https://media.istockphoto.com/id/1059918860/photo/modern-luxurious-by-ocean-in-northern-california.jpg", bedroom4: "https://media.istockphoto.com/id/174136871/photo/bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/2239250117/photo/japandi-bathroom-at-night-with-beige-natural-stone-tiles-and-ambient-led-lighting.jpg", bathroom2: "https://media.istockphoto.com/id/1490946100/photo/luxury-marble-modern-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1276846269/photo/luxury-modern-renovated-apartment-with-closets-walk-ins-very-well-staged.jpg", kitchen: "https://media.istockphoto.com/id/2217149382/photo/home-improvement-remodeled-contemporary-classic-kitchen-design-in-residential-home.jpg" },

    // ========== PENTHOUSES (ID 13-21) ==========
    13: { main: "https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/2258279767/photo/japandi-style-hotel-room-interior-with-double-bed-and-wooden-head-board.jpg", bedroom2: "https://media.istockphoto.com/id/1256466090/photo/modern-style-bedroom.jpg", bedroom3: "https://media.istockphoto.com/id/2194122030/photo/cozy-modern-bedroom-design.jpg", bedroom4: "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg", bedroom5: "https://media.istockphoto.com/id/1336925615/photo/a-guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-rental-small-cottage.jpg", bedroom6: "https://media.istockphoto.com/id/1042424568/photo/3d-rendering-luxury-modern-bedroom-suite-tv-with-wardrobe-and-walk-in-closet.jpg", bathroom1: "https://media.istockphoto.com/id/1208210864/photo/master-bathroom-interior-in-new-farmhouse-style-luxury-home-large-mirror-shower-and-bathtub.jpg", bathroom2: "https://media.istockphoto.com/id/1073403366/photo/luxurious-minimalist-bathroom-with-slate-black-stone-wall.jpg", bathroom3: "https://media.istockphoto.com/id/2239250117/photo/japandi-bathroom-at-night-with-beige-natural-stone-tiles-and-ambient-led-lighting.jpg", bathroom4: "https://media.istockphoto.com/id/1408740166/photo/contemporary-bathroom-design-with-freestanding-bathtub-and-shower-stall.jpg", bathroom5: "https://media.istockphoto.com/id/1973276016/photo/modern-minimalist-bathroom-interior-bathtub-and-bathroom-cabinet-white-sink-interior-plants.jpg", kitchen: "https://media.istockphoto.com/id/2209779864/photo/new-contruction-family-home-kitchen-interior.jpg" },
    14: { main: "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/2051508506/photo/renovated-and-staged-home-interior-photographs.jpg", bedroom2: "https://media.istockphoto.com/id/1353440472/photo/elegant-bedroom-interior-with-double-bed-night-tables-armchair-and-seaview-through-window.jpg", bedroom3: "https://media.istockphoto.com/id/1249292283/photo/master-bedroom-with-high-coffered-ceiling-and-wainscoting-wall.jpg", bedroom4: "https://media.istockphoto.com/id/1007179966/photo/patterned-pouf-and-basket-in-bright-bedroom-interior-with-lamps-plants-and-poster-next-to-bed.jpg", bedroom5: "https://media.istockphoto.com/id/1362692369/photo/modern-luxury-beautiful-interior-with-panoramic-windows-design-bedroom-with-bright-night.jpg", bedroom6: "https://media.istockphoto.com/id/1625138485/photo/modern-bedroom-interior.jpg", bedroom7: "https://media.istockphoto.com/id/1318363878/photo/luxury-modern-bedroom-interior-at-night.jpg", bathroom1: "https://media.istockphoto.com/id/1309074908/photo/luxury-bathroom-interior-with-hot-tub-and-beautiful-sea-view.jpg", bathroom2: "https://media.istockphoto.com/id/2268031945/photo/small-bathroom-with-window-toilet-sink-and-glas-shower.jpg", bathroom3: "https://media.istockphoto.com/id/1782114985/photo/modern-bathroom-interior-with-tiles.jpg", bathroom4: "https://media.istockphoto.com/id/1476870691/photo/modern-minimalist-scandinavian-bathroom.jpg", bathroom5: "https://media.istockphoto.com/id/1440917339/photo/modern-minimalist-bathroom-hotel-room-interior.jpg", bathroom6: "https://media.istockphoto.com/id/167487090/photo/bathroom.jpg", kitchen: "https://media.istockphoto.com/id/1366623005/photo/brown-and-beige-kitchen-with-large-black-refrigerator-and-extractor-hood-with-oven-on-a-white.jpg" },
    15: { main: "https://images.unsplash.com/photo-1568115286680-d203e08a8be6?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.jpg", bedroom2: "https://media.istockphoto.com/id/2078584317/photo/3d-rendering-of-bedroom-with-cozy-bed-at-night.jpg", bedroom3: "https://media.istockphoto.com/id/2169200951/photo/modern-bedroom-interior-with-bed-side-table-armchair-and-bookshelf.jpg", bedroom4: "https://media.istockphoto.com/id/2157249352/photo/cozy-bedroom-with-a-king-sized-bed-and-a-flat-screen-projector.jpg", bedroom5: "https://media.istockphoto.com/id/182913408/photo/luxury-bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/2179552509/photo/luxurious-modern-bathroom-interior-with-marble-finish-and-soft-lighting.jpg", bathroom2: "https://media.istockphoto.com/id/1181472050/photo/elegant-attic-bathroom-with-bathtub.jpg", bathroom3: "https://media.istockphoto.com/id/1805905715/photo/elegant-big-master-bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/1330856760/photo/modern-bathroom-interior.jpg", kitchen: "https://media.istockphoto.com/id/1350512518/photo/spacious-kitchen-in-luxurious-home-with-modern-decor.jpg" },
    16: { main: "https://plus.unsplash.com/premium_photo-1733320822557-e4ccfb5f20d1?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/177112902/photo/luxury-rococo-bedroom.jpg", bedroom2: "https://media.istockphoto.com/id/1161927918/photo/beautiful-royal-room-with-bathroom-in-the-hotel.jpg", bedroom3: "https://media.istockphoto.com/id/157592041/photo/luxurious-bedroom-suite.jpg", bedroom4: "https://media.istockphoto.com/id/1227060710/photo/portrait-of-young-couple-tourist-standing-nearly-window-looking-to-beautiful-view-outside-in.jpg", bedroom5: "https://media.istockphoto.com/id/654289190/photo/four-poster-bed-with-mosquito-net-in-bright-hotel-room.jpg", bedroom6: "https://media.istockphoto.com/id/1486230942/photo/modern-bedroom-interior-with-double-bed-wicker-lamps-red-pillows-and-potted-plant.jpg", bedroom7: "https://media.istockphoto.com/id/1141951033/photo/luxury-bedroom-interior.jpg", bedroom8: "https://media.istockphoto.com/id/1148629418/photo/home-or-house-building-exterior-and-interior-design-showing-tropical-pool-villa-with-green.jpg", bathroom1: "https://media.istockphoto.com/id/1404266465/photo/modern-luxury-bathroom-interior.jpg", bathroom2: "https://media.istockphoto.com/id/1076306572/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", bathroom3: "https://media.istockphoto.com/id/1076307880/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", bathroom4: "https://media.istockphoto.com/id/874975774/photo/modern-contemporary-interior-bathroom-with-two-sinks-and-large-mirror.jpg", bathroom5: "https://media.istockphoto.com/id/1208420863/photo/luxurious-bathroom-with-bathtub-and-window.jpg", bathroom6: "https://media.istockphoto.com/id/171577494/photo/luxury-bathroom.jpg", bathroom7: "https://media.istockphoto.com/id/1169546376/photo/luxury-bathroom.jpg", kitchen: "https://media.istockphoto.com/id/130408321/photo/stove-and-counters-in-modern-kitchen.jpg" },
    17: { main: "https://images.unsplash.com/photo-1609766857326-18a204c2cf31?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/500120991/photo/white-modern-bedroom.jpg", bedroom2: "https://media.istockphoto.com/id/1195596155/photo/computer-generated-image-of-bed-room-architectural-visualization-3d-rendering.jpg", bedroom3: "https://media.istockphoto.com/id/619995398/photo/abstract-sketch-design-of-interior-bedroom-3d-rendering.jpg", bedroom4: "https://media.istockphoto.com/id/1203799607/photo/modern-bedroom-in-the-evening.jpg", bedroom5: "https://media.istockphoto.com/id/1053944358/photo/cozy-bedroom-interior.jpg", bedroom6: "https://media.istockphoto.com/id/130407910/photo/tiled-open-shower-in-modern-bathroom.jpg", bathroom1: "https://media.istockphoto.com/id/872680402/photo/abstract-sketch-design-of-interior-bathroom-3d-rendering.jpg", bathroom2: "https://media.istockphoto.com/id/154968467/photo/beautiful-new-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/538653268/photo/3d-rendering-contemporary-wood-bathroom-with-plants.jpg", bathroom4: "https://media.istockphoto.com/id/1061766054/photo/bedroom-and-living-area-on-nature-view-bedroom-in-house-or-apartment-on-forest-view.jpg", bathroom5: "https://media.istockphoto.com/id/2230649701/photo/modern-loft-style-bedroom-with-mountain-view-background-3d-render.jpg", kitchen: "https://media.istockphoto.com/id/1398693404/photo/beautiful-kitchen-in-new-luxury-home-with-island-pendant-lights-and-hardwood-floors.jpg" },
    18: { main: "https://images.unsplash.com/photo-1613643043796-a370ee99ecbe?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/2170944023/photo/luxury-modern-master-bedroom.jpg", bedroom2: "https://media.istockphoto.com/id/2224684240/photo/modern-farmhouse-bedroom-interior-design-with-a-neutral-color-palette.jpg", bedroom3: "https://media.istockphoto.com/id/2206289184/photo/luxurious-black-modern-master-suite-with-open-concept-bathroom.jpg", bedroom4: "https://media.istockphoto.com/id/1305968742/photo/bathroom-in-new-luxury-home.jpg", bedroom5: "https://media.istockphoto.com/id/1305969343/photo/bathroom-in-new-luxury-home.jpg", bedroom6: "https://media.istockphoto.com/id/155033518/photo/bathroom.jpg", bedroom7: "https://media.istockphoto.com/id/1474669971/photo/glass-walls-and-shower-door-installed.jpg", bathroom1: "https://media.istockphoto.com/id/481536200/photo/professional-kitchen.jpg", bathroom2: "https://media.istockphoto.com/id/2204605019/photo/master-or-primary-bedroom-interior.jpg", bathroom3: "https://media.istockphoto.com/id/2259464232/photo/owners-bedroom-at-night-with-warm-lamp-light-and-rainy-city-view.jpg", bathroom4: "https://media.istockphoto.com/id/186886221/photo/master-bedroom.jpg", bathroom5: "https://media.istockphoto.com/id/2272185018/photo/luxurious-modern-master-bedroom-with-walk-in-glass-wardrobe-and-neoclassical-wall-moldings.jpg", bathroom6: "https://media.istockphoto.com/id/2272555234/photo/rustic-master-bedroom-interior-3d-rendering-featuring-rich-natural-wood-grain-textures.jpg", kitchen: "https://media.istockphoto.com/id/2203032223/photo/luxurious-modernity-of-this-interior-duplex-house-depicted-in-stunning-3d-rendering-living.jpg" },
    19: { main: "https://media.istockphoto.com/id/2199434139/photo/luxury-modern-loft-interior-with-open-space-living-room-and-kitchen-3d-rendering.jpg", bedroom1: "https://media.istockphoto.com/id/2210463101/photo/modern-farmhouse-style-primary-suite-in-middle-class-home.jpg", bedroom2: "https://media.istockphoto.com/id/1210780531/photo/interior-of-a-large-bathroom.jpg", bedroom3: "https://media.istockphoto.com/id/2152107582/photo/orange-bed-and-mockup-dark-green-wall-in-bedroom-interior-3d-rendering.jpg", bedroom4: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg", bedroom5: "https://media.istockphoto.com/id/1059918860/photo/modern-luxurious-by-ocean-in-northern-california.jpg", bathroom1: "https://media.istockphoto.com/id/174136871/photo/bedroom.jpg", bathroom2: "https://media.istockphoto.com/id/1490946100/photo/luxury-marble-modern-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1276846269/photo/luxury-modern-renovated-apartment-with-closets-walk-ins-very-well-staged.jpg", bathroom4: "https://media.istockphoto.com/id/2217149382/photo/home-improvement-remodeled-contemporary-classic-kitchen-design-in-residential-home.jpg", kitchen: "https://media.istockphoto.com/id/2104603719/photo/interior-photographs-of-a-luxurious-residential-home-den-study-dining-room-kitchen-living.jpg" },
    20: { main: "https://media.istockphoto.com/id/2021707621/photo/night-scene-modern-style-luxury-black-master-bedroom-with-city-view-3d-render.jpg", bedroom1: "https://media.istockphoto.com/id/2258279767/photo/japandi-style-hotel-room-interior-with-double-bed-and-wooden-head-board.jpg", bedroom2: "https://media.istockphoto.com/id/1256466090/photo/modern-style-bedroom.jpg", bedroom3: "https://media.istockphoto.com/id/2194122030/photo/cozy-modern-bedroom-design.jpg", bedroom4: "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg", bedroom5: "https://media.istockphoto.com/id/1336925615/photo/a-guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-rental-small-cottage.jpg", bedroom6: "https://media.istockphoto.com/id/1042424568/photo/3d-rendering-luxury-modern-bedroom-suite-tv-with-wardrobe-and-walk-in-closet.jpg", bathroom1: "https://media.istockphoto.com/id/1208210864/photo/master-bathroom-interior-in-new-farmhouse-style-luxury-home-large-mirror-shower-and-bathtub.jpg", bathroom2: "https://media.istockphoto.com/id/1073403366/photo/luxurious-minimalist-bathroom-with-slate-black-stone-wall.jpg", bathroom3: "https://media.istockphoto.com/id/2239250117/photo/japandi-bathroom-at-night-with-beige-natural-stone-tiles-and-ambient-led-lighting.jpg", bathroom4: "https://media.istockphoto.com/id/1408740166/photo/contemporary-bathroom-design-with-freestanding-bathtub-and-shower-stall.jpg", bathroom5: "https://media.istockphoto.com/id/1973276016/photo/modern-minimalist-bathroom-interior-bathtub-and-bathroom-cabinet-white-sink-interior-plants.jpg", kitchen: "https://media.istockphoto.com/id/2209779864/photo/new-contruction-family-home-kitchen-interior.jpg" },
    21: { main: "https://media.istockphoto.com/id/1440918716/photo/luxury-apartment-terrace-with-hot-tub-hot-tub.jpg", bedroom1: "https://media.istockphoto.com/id/2051508506/photo/renovated-and-staged-home-interior-photographs.jpg", bedroom2: "https://media.istockphoto.com/id/1353440472/photo/elegant-bedroom-interior-with-double-bed-night-tables-armchair-and-seaview-through-window.jpg", bedroom3: "https://media.istockphoto.com/id/1249292283/photo/master-bedroom-with-high-coffered-ceiling-and-wainscoting-wall.jpg", bedroom4: "https://media.istockphoto.com/id/1007179966/photo/patterned-pouf-and-basket-in-bright-bedroom-interior-with-lamps-plants-and-poster-next-to-bed.jpg", bedroom5: "https://media.istockphoto.com/id/1362692369/photo/modern-luxury-beautiful-interior-with-panoramic-windows-design-bedroom-with-bright-night.jpg", bedroom6: "https://media.istockphoto.com/id/1625138485/photo/modern-bedroom-interior.jpg", bathroom1: "https://media.istockphoto.com/id/1309074908/photo/luxury-bathroom-interior-with-hot-tub-and-beautiful-sea-view.jpg", bathroom2: "https://media.istockphoto.com/id/2268031945/photo/small-bathroom-with-window-toilet-sink-and-glas-shower.jpg", bathroom3: "https://media.istockphoto.com/id/1782114985/photo/modern-bathroom-interior-with-tiles.jpg", bathroom4: "https://media.istockphoto.com/id/1476870691/photo/modern-minimalist-scandinavian-bathroom.jpg", bathroom5: "https://media.istockphoto.com/id/1440917339/photo/modern-minimalist-bathroom-hotel-room-interior.jpg", kitchen: "https://media.istockphoto.com/id/1366623005/photo/brown-and-beige-kitchen-with-large-black-refrigerator-and-extractor-hood-with-oven-on-a-white.jpg" },

    // ========== FARMHOUSES (ID 22-28) ==========
    22: { main: "https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/2258279767/photo/japandi-style-hotel-room-interior-with-double-bed-and-wooden-head-board.jpg", bedroom2: "https://media.istockphoto.com/id/1256466090/photo/modern-style-bedroom.jpg", bedroom3: "https://media.istockphoto.com/id/2194122030/photo/cozy-modern-bedroom-design.jpg", bedroom4: "https://media.istockphoto.com/id/2207337994/photo/stylish-bedroom-interior-with-closet-and-wooden-panel-3d-rendering.jpg", bedroom5: "https://media.istockphoto.com/id/1336925615/photo/a-guest-bedroom-with-a-queen-sized-bed-and-nightstand-at-a-short-term-rental-small-cottage.jpg", bedroom6: "https://media.istockphoto.com/id/1042424568/photo/3d-rendering-luxury-modern-bedroom-suite-tv-with-wardrobe-and-walk-in-closet.jpg", bedroom7: "https://media.istockphoto.com/id/2051508506/photo/renovated-and-staged-home-interior-photographs.jpg", bedroom8: "https://media.istockphoto.com/id/1353440472/photo/elegant-bedroom-interior-with-double-bed-night-tables-armchair-and-seaview-through-window.jpg", bathroom1: "https://media.istockphoto.com/id/1208210864/photo/master-bathroom-interior-in-new-farmhouse-style-luxury-home-large-mirror-shower-and-bathtub.jpg", bathroom2: "https://media.istockphoto.com/id/1073403366/photo/luxurious-minimalist-bathroom-with-slate-black-stone-wall.jpg", bathroom3: "https://media.istockphoto.com/id/2239250117/photo/japandi-bathroom-at-night-with-beige-natural-stone-tiles-and-ambient-led-lighting.jpg", bathroom4: "https://media.istockphoto.com/id/1408740166/photo/contemporary-bathroom-design-with-freestanding-bathtub-and-shower-stall.jpg", bathroom5: "https://media.istockphoto.com/id/1973276016/photo/modern-minimalist-bathroom-interior-bathtub-and-bathroom-cabinet-white-sink-interior-plants.jpg", bathroom6: "https://media.istockphoto.com/id/1309074908/photo/luxury-bathroom-interior-with-hot-tub-and-beautiful-sea-view.jpg", kitchen: "https://media.istockphoto.com/id/2209779864/photo/new-contruction-family-home-kitchen-interior.jpg" },
    23: { main: "https://plus.unsplash.com/premium_photo-1733760180239-ef05b25dd5ad?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1249292283/photo/master-bedroom-with-high-coffered-ceiling-and-wainscoting-wall.jpg", bedroom2: "https://media.istockphoto.com/id/1007179966/photo/patterned-pouf-and-basket-in-bright-bedroom-interior-with-lamps-plants-and-poster-next-to-bed.jpg", bedroom3: "https://media.istockphoto.com/id/1362692369/photo/modern-luxury-beautiful-interior-with-panoramic-windows-design-bedroom-with-bright-night.jpg", bedroom4: "https://media.istockphoto.com/id/1625138485/photo/modern-bedroom-interior.jpg", bedroom5: "https://media.istockphoto.com/id/1318363878/photo/luxury-modern-bedroom-interior-at-night.jpg", bathroom1: "https://media.istockphoto.com/id/1782114985/photo/modern-bathroom-interior-with-tiles.jpg", bathroom2: "https://media.istockphoto.com/id/1476870691/photo/modern-minimalist-scandinavian-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1440917339/photo/modern-minimalist-bathroom-hotel-room-interior.jpg", bathroom4: "https://media.istockphoto.com/id/167487090/photo/bathroom.jpg", kitchen: "https://media.istockphoto.com/id/1350512518/photo/spacious-kitchen-in-luxurious-home-with-modern-decor.jpg" },
    24: { main: "https://plus.unsplash.com/premium_photo-1687710306880-95c72d9a19c5?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.jpg", bedroom2: "https://media.istockphoto.com/id/2078584317/photo/3d-rendering-of-bedroom-with-cozy-bed-at-night.jpg", bedroom3: "https://media.istockphoto.com/id/2169200951/photo/modern-bedroom-interior-with-bed-side-table-armchair-and-bookshelf.jpg", bedroom4: "https://media.istockphoto.com/id/2157249352/photo/cozy-bedroom-with-a-king-sized-bed-and-a-flat-screen-projector.jpg", bedroom5: "https://media.istockphoto.com/id/182913408/photo/luxury-bedroom.jpg", bedroom6: "https://media.istockphoto.com/id/177112902/photo/luxury-rococo-bedroom.jpg", bedroom7: "https://media.istockphoto.com/id/1161927918/photo/beautiful-royal-room-with-bathroom-in-the-hotel.jpg", bedroom8: "https://media.istockphoto.com/id/157592041/photo/luxurious-bedroom-suite.jpg", bedroom9: "https://media.istockphoto.com/id/1227060710/photo/portrait-of-young-couple-tourist-standing-nearly-window-looking-to-beautiful-view-outside-in.jpg", bedroom10: "https://media.istockphoto.com/id/654289190/photo/four-poster-bed-with-mosquito-net-in-bright-hotel-room.jpg", bathroom1: "https://media.istockphoto.com/id/2179552509/photo/luxurious-modern-bathroom-interior-with-marble-finish-and-soft-lighting.jpg", bathroom2: "https://media.istockphoto.com/id/1181472050/photo/elegant-attic-bathroom-with-bathtub.jpg", bathroom3: "https://media.istockphoto.com/id/1805905715/photo/elegant-big-master-bathroom.jpg", bathroom4: "https://media.istockphoto.com/id/1330856760/photo/modern-bathroom-interior.jpg", bathroom5: "https://media.istockphoto.com/id/171577494/photo/luxury-bathroom.jpg", bathroom6: "https://media.istockphoto.com/id/1169546376/photo/luxury-bathroom.jpg", bathroom7: "https://media.istockphoto.com/id/1404266465/photo/modern-luxury-bathroom-interior.jpg", bathroom8: "https://media.istockphoto.com/id/1076306572/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", kitchen: "https://media.istockphoto.com/id/1648288633/photo/modern-kitchen.jpg" },
    25: { main: "https://plus.unsplash.com/premium_photo-1733760125038-06564d0a4568?w=600&h=400&fit=crop", bedroom1: "https://media.istockphoto.com/id/1486230942/photo/modern-bedroom-interior-with-double-bed-wicker-lamps-red-pillows-and-potted-plant.jpg", bedroom2: "https://media.istockphoto.com/id/1141951033/photo/luxury-bedroom-interior.jpg", bedroom3: "https://media.istockphoto.com/id/1148629418/photo/home-or-house-building-exterior-and-interior-design-showing-tropical-pool-villa-with-green.jpg", bedroom4: "https://media.istockphoto.com/id/500120991/photo/white-modern-bedroom.jpg", bedroom5: "https://media.istockphoto.com/id/1195596155/photo/computer-generated-image-of-bed-room-architectural-visualization-3d-rendering.jpg", bedroom6: "https://media.istockphoto.com/id/619995398/photo/abstract-sketch-design-of-interior-bedroom-3d-rendering.jpg", bathroom1: "https://media.istockphoto.com/id/1076307880/photo/luxury-white-bathroom-with-gold-onyx-and-bold-black-details.jpg", bathroom2: "https://media.istockphoto.com/id/874975774/photo/modern-contemporary-interior-bathroom-with-two-sinks-and-large-mirror.jpg", bathroom3: "https://media.istockphoto.com/id/1208420863/photo/luxurious-bathroom-with-bathtub-and-window.jpg", bathroom4: "https://media.istockphoto.com/id/130407910/photo/tiled-open-shower-in-modern-bathroom.jpg", bathroom5: "https://media.istockphoto.com/id/872680402/photo/abstract-sketch-design-of-interior-bathroom-3d-rendering.jpg", kitchen: "https://media.istockphoto.com/id/130408321/photo/stove-and-counters-in-modern-kitchen.jpg" },
    26: { main: "https://media.istockphoto.com/id/183774477/photo/cumbrian-countryside.jpg", bedroom1: "https://media.istockphoto.com/id/154968467/photo/beautiful-new-bathroom.jpg", bedroom2: "https://media.istockphoto.com/id/538653268/photo/3d-rendering-contemporary-wood-bathroom-with-plants.jpg", bedroom3: "https://media.istockphoto.com/id/1061766054/photo/bedroom-and-living-area-on-nature-view-bedroom-in-house-or-apartment-on-forest-view.jpg", bedroom4: "https://media.istockphoto.com/id/2230649701/photo/modern-loft-style-bedroom-with-mountain-view-background-3d-render.jpg", bedroom5: "https://media.istockphoto.com/id/2170944023/photo/luxury-modern-master-bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/2224684240/photo/modern-farmhouse-bedroom-interior-design-with-a-neutral-color-palette.jpg", bathroom2: "https://media.istockphoto.com/id/2206289184/photo/luxurious-black-modern-master-suite-with-open-concept-bathroom.jpg", bathroom3: "https://media.istockphoto.com/id/1305968742/photo/bathroom-in-new-luxury-home.jpg", bathroom4: "https://media.istockphoto.com/id/1305969343/photo/bathroom-in-new-luxury-home.jpg", kitchen: "https://media.istockphoto.com/id/1398693404/photo/beautiful-kitchen-in-new-luxury-home-with-island-pendant-lights-and-hardwood-floors.jpg" },
    27: { main: "https://media.istockphoto.com/id/1414798334/photo/idyllic-landscape-in-the-alps-with-mountain-chalet-and-cows-in-springtime.jpg", bedroom1: "https://media.istockphoto.com/id/155033518/photo/bathroom.jpg", bedroom2: "https://media.istockphoto.com/id/1474669971/photo/glass-walls-and-shower-door-installed.jpg", bedroom3: "https://media.istockphoto.com/id/481536200/photo/professional-kitchen.jpg", bedroom4: "https://media.istockphoto.com/id/2204605019/photo/master-or-primary-bedroom-interior.jpg", bedroom5: "https://media.istockphoto.com/id/2259464232/photo/owners-bedroom-at-night-with-warm-lamp-light-and-rainy-city-view.jpg", bedroom6: "https://media.istockphoto.com/id/186886221/photo/master-bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/2272185018/photo/luxurious-modern-master-bedroom-with-walk-in-glass-wardrobe-and-neoclassical-wall-moldings.jpg", bathroom2: "https://media.istockphoto.com/id/2272555234/photo/rustic-master-bedroom-interior-3d-rendering-featuring-rich-natural-wood-grain-textures.jpg", bathroom3: "https://media.istockphoto.com/id/2210463101/photo/modern-farmhouse-style-primary-suite-in-middle-class-home.jpg", bathroom4: "https://media.istockphoto.com/id/1210780531/photo/interior-of-a-large-bathroom.jpg", bathroom5: "https://media.istockphoto.com/id/2179552509/photo/luxurious-modern-bathroom-interior-with-marble-finish-and-soft-lighting.jpg", kitchen: "https://media.istockphoto.com/id/2203032223/photo/luxurious-modernity-of-this-interior-duplex-house-depicted-in-stunning-3d-rendering-living.jpg" },
    28: { main: "https://media.istockphoto.com/id/1301517964/photo/tuscan-countryside-landscape-in-italy.jpg", bedroom1: "https://media.istockphoto.com/id/170094574/photo/bright-luxury-bathroom.jpg", bedroom2: "https://media.istockphoto.com/id/2151164767/photo/newly-renovated-modern-bathroom-in-luxury-home.jpg", bedroom3: "https://media.istockphoto.com/id/1202620492/photo/contemporary-bathroom-design-with-vanity-and-shower-bathtub.jpg", bedroom4: "https://media.istockphoto.com/id/2152107582/photo/orange-bed-and-mockup-dark-green-wall-in-bedroom-interior-3d-rendering.jpg", bedroom5: "https://media.istockphoto.com/id/1129076301/photo/chinese-style-bedroom-interior.jpg", bedroom6: "https://media.istockphoto.com/id/1059918860/photo/modern-luxurious-by-ocean-in-northern-california.jpg", bedroom7: "https://media.istockphoto.com/id/174136871/photo/bedroom.jpg", bathroom1: "https://media.istockphoto.com/id/1490946100/photo/luxury-marble-modern-bathroom.jpg", bathroom2: "https://media.istockphoto.com/id/1276846269/photo/luxury-modern-renovated-apartment-with-closets-walk-ins-very-well-staged.jpg", bathroom3: "https://media.istockphoto.com/id/2217149382/photo/home-improvement-remodeled-contemporary-classic-kitchen-design-in-residential-home.jpg", bathroom4: "https://media.istockphoto.com/id/2104603719/photo/interior-photographs-of-a-luxurious-residential-home-den-study-dining-room-kitchen-living.jpg", bathroom5: "https://media.istockphoto.com/id/2258279767/photo/japandi-style-hotel-room-interior-with-double-bed-and-wooden-head-board.jpg", bathroom6: "https://media.istockphoto.com/id/1256466090/photo/modern-style-bedroom.jpg", kitchen: "https://media.istockphoto.com/id/2209779864/photo/new-contruction-family-home-kitchen-interior.jpg" },

    // ========== COMMERCIAL (ID 29-31) ==========
    29: { main: "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=600&h=400&fit=crop", kitchen: "https://media.istockphoto.com/id/1499713980/photo/modern-kitchen.jpg" },
    30: { main: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600&h=400&fit=crop", kitchen: "https://media.istockphoto.com/id/1499713980/photo/modern-kitchen.jpg" },
    31: { main: "https://media.istockphoto.com/id/2241825793/photo/aerial-drone-view-of-standing-seam-metal-roof-on-modern-commercial-buildings.jpg", kitchen: "https://media.istockphoto.com/id/1499713980/photo/modern-kitchen.jpg" }
  };

  const defaultImages = {
    main: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=600&h=400&fit=crop",
    bedroom1: "https://media.istockphoto.com/id/2177225853/photo/modern-bedroom-interior-with-side-view-of-night-table-and-double-bed-at-night.jpg",
    bedroom2: "https://media.istockphoto.com/id/1256427091/photo/luxurious-new-bedroom-with-large-oversized-windows.jpg",
    bathroom1: "https://media.istockphoto.com/id/1885760273/photo/a-bathroom-with-gold-accents-and-a-shower-with-green-subway-tiles.jpg",
    kitchen: "https://media.istockphoto.com/id/1499713980/photo/modern-kitchen.jpg",
    dining: "https://media.istockphoto.com/id/1307425820/photo/modern-dining-room-interior-with-wooden-table-and-chairs.jpg"
  };

  const getPropertyImages = (propertyId, bedsCount, bathsCount) => {
    const custom = propertyCustomImages[propertyId];
    const images = {};
    
    if (custom) {
      images.main = custom.main || defaultImages.main;
      images.kitchen = custom.kitchen || defaultImages.kitchen;
      images.dining = custom.dining || defaultImages.dining;
      
      for (let i = 1; i <= bedsCount; i++) {
        images[`bedroom${i}`] = custom[`bedroom${i}`] || defaultImages[`bedroom${i}`] || defaultImages.bedroom1;
      }
      for (let i = 1; i <= bathsCount; i++) {
        images[`bathroom${i}`] = custom[`bathroom${i}`] || defaultImages[`bathroom${i}`] || defaultImages.bathroom1;
      }
    } else {
      images.main = defaultImages.main;
      images.kitchen = defaultImages.kitchen;
      images.dining = defaultImages.dining;
      for (let i = 1; i <= bedsCount; i++) {
        images[`bedroom${i}`] = defaultImages[`bedroom${i}`] || defaultImages.bedroom1;
      }
      for (let i = 1; i <= bathsCount; i++) {
        images[`bathroom${i}`] = defaultImages[`bathroom${i}`] || defaultImages.bathroom1;
      }
    }
    return images;
  };

  const getStaticProperty = (propertyId) => {
    const propertyIdNum = parseInt(propertyId);
    
    let beds = 4, baths = 3;
    let propertyType = 'Villa';
    
    if (propertyIdNum >= 13 && propertyIdNum <= 21) {
      propertyType = 'Penthouse';
      const bedsMap = {13:6,14:7,15:5,16:8,17:6,18:7,19:5,20:6,21:6};
      const bathsMap = {13:5,14:6,15:4,16:7,17:5,18:6,19:4,20:5,21:5};
      beds = bedsMap[propertyIdNum] || 5;
      baths = bathsMap[propertyIdNum] || 4;
    } else if (propertyIdNum >= 22 && propertyIdNum <= 28) {
      propertyType = 'Farmhouse';
      const bedsMap = {22:8,23:5,24:10,25:6,26:5,27:6,28:7};
      const bathsMap = {22:6,23:4,24:8,25:5,26:4,27:5,28:6};
      beds = bedsMap[propertyIdNum] || 6;
      baths = bathsMap[propertyIdNum] || 5;
    } else if (propertyIdNum >= 29 && propertyIdNum <= 31) {
      propertyType = 'Commercial';
      beds = 0;
      baths = 4;
    } else {
      if (propertyIdNum === 2 || propertyIdNum === 3) { beds = 5; baths = 4; }
      else if (propertyIdNum === 6 || propertyIdNum === 11) { beds = 6; baths = 5; }
      else if (propertyIdNum === 7) { beds = 3; baths = 2; }
    }
    
    const images = getPropertyImages(propertyIdNum, beds, baths);
    const bedroomImgs = [];
    const bathroomImgs = [];
    for (let i = 1; i <= beds; i++) bedroomImgs.push(images[`bedroom${i}`]);
    for (let i = 1; i <= baths; i++) bathroomImgs.push(images[`bathroom${i}`]);
    
    const titles = {
      1:"Luxury Villa DHA Karachi",2:"Modern Villa Clifton",3:"Executive Villa Islamabad",
      4:"Beach View Villa DHA",5:"Garden Villa Lahore",6:"Presidential Villa Rawalpindi",
      7:"Cozy Villa Peshawar",8:"Lake View Villa Islamabad",9:"Tropical Pool Villa Karachi",
      10:"Sunset View Villa DHA",11:"Lakeside Executive Villa",12:"Modern Cube Villa Lahore",
      13:"Royal Penthouse Lahore",14:"Sky Penthouse Mall Road",15:"Ocean View Penthouse Karachi",
      16:"Presidential Penthouse Islamabad",17:"Sunset View Penthouse Karachi",18:"Ultimate Luxury Penthouse",
      19:"Modern Loft Penthouse",20:"Black Master Penthouse",21:"Terrace Jacuzzi Penthouse",
      22:"Modern Farmhouse Bahria",23:"Weekend Farmhouse Islamabad",24:"Luxury Farmhouse Lahore",
      25:"Countryside Farmhouse",26:"Cumbrian Country Farm",27:"Alpine Chalet Farmhouse",
      28:"Tuscan Villa Farmhouse",29:"Commercial Plaza DHA",30:"Office Space IT Tower",31:"Commercial Building with Roof"
    };
    
    const locations = {
      1:"Karachi, Sindh",2:"Karachi, Sindh",3:"Islamabad, Capital",4:"Karachi, Sindh",
      5:"Lahore, Punjab",6:"Rawalpindi, Punjab",7:"Peshawar, KPK",8:"Islamabad, Capital",
      9:"Karachi, Sindh",10:"Karachi, Sindh",11:"Islamabad, Capital",12:"Lahore, Punjab",
      13:"Lahore, Punjab",14:"Lahore, Punjab",15:"Karachi, Sindh",16:"Islamabad, Capital",
      17:"Karachi, Sindh",18:"Islamabad, Capital",19:"Lahore, Punjab",20:"Karachi, Sindh",21:"Islamabad, Capital",
      22:"Rawalpindi, Punjab",23:"Islamabad, Capital",24:"Lahore, Punjab",25:"Rawalpindi, Punjab",
      26:"Islamabad, Capital",27:"Murree, Punjab",28:"Lahore, Punjab",29:"Karachi, Sindh",30:"Karachi, Sindh",31:"Lahore, Punjab"
    };
    
    const prices = {
      1:180000,2:250000,3:320000,4:280000,5:200000,6:350000,7:150000,8:300000,9:400000,10:380000,
      11:500000,12:220000,13:450000,14:550000,15:480000,16:600000,17:650000,18:700000,19:500000,20:580000,21:620000,
      22:320000,23:250000,24:400000,25:280000,26:220000,27:350000,28:300000,29:180000,30:220000,31:300000
    };
    
    const areas = {
      1:"2,800 sqft",2:"3,500 sqft",3:"4,000 sqft",4:"3,200 sqft",5:"3,000 sqft",6:"5,000 sqft",7:"2,200 sqft",
      8:"4,500 sqft",9:"4,200 sqft",10:"3,900 sqft",11:"5,500 sqft",12:"3,100 sqft",13:"5,200 sqft",14:"6,500 sqft",
      15:"4,800 sqft",16:"7,500 sqft",17:"6,000 sqft",18:"8,000 sqft",19:"5,500 sqft",20:"6,200 sqft",21:"6,800 sqft",
      22:"8,000 sqft",23:"5,000 sqft",24:"12,000 sqft",25:"7,000 sqft",26:"6,000 sqft",27:"6,500 sqft",28:"9,000 sqft",
      29:"3,000 sqft",30:"2,500 sqft",31:"4,000 sqft"
    };
    
    return {
      id: propertyId,
      title: titles[propertyIdNum] || `${propertyType} Property ${propertyId}`,
      city: locations[propertyIdNum]?.split(",")[0] || "Karachi",
      state: locations[propertyIdNum]?.split(",")[1] || "Sindh",
      location: locations[propertyIdNum] || "Karachi, Sindh",
      beds: beds,
      baths: baths,
      area: areas[propertyIdNum] || "1,000 sqft",
      rent: prices[propertyIdNum] || 80000,
      deposit: (prices[propertyIdNum] || 80000) * 2,
      maintenance: Math.round((prices[propertyIdNum] || 80000) * 0.05),
      yearBuilt: "Fully Furnished",
      floors: 2,
      image: images.main,
      bedroomImgs: bedroomImgs,
      bathroomImgs: bathroomImgs,
      kitchenImg: images.kitchen,
      diningImg: images.dining,
      description: `Beautiful ${beds}-bedroom ${propertyType.toLowerCase()} located in ${locations[propertyIdNum] || "the city"}.`,
      amenities: ["Dining Area", "Modern Kitchen", "Security", "Parking"],
      nearby: ["Shopping Mall (500m)", "Restaurants (200m)", "Park (300m)"],
      agent: { name: "Sarah Khan", role: "Property Specialist", phone: "0300-1234567", email: "sarah@estateflow.com" },
      type: propertyType,
      isHouse: false
    };
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    loadPropertyData();
  }, [id]);

  const loadPropertyData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://estateflow-backend-mt7ox7s2k6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${id}`);
      const data = await res.json();
      
      let fetchedProp = null;
      const propertyId = parseInt(id);
      
      if (data.success && data.data.property) {
        const p = data.data.property;
        const beds = p.details?.bedrooms || 4;
        const baths = p.details?.bathrooms || 3;
        const images = getPropertyImages(propertyId, beds, baths);
        
        const bedroomImgs = [];
        const bathroomImgs = [];
        for (let i = 1; i <= beds; i++) bedroomImgs.push(images[`bedroom${i}`]);
        for (let i = 1; i <= baths; i++) bathroomImgs.push(images[`bathroom${i}`]);
        
        fetchedProp = {
          id: p._id,
          title: p.title,
          city: p.address?.city || 'Karachi',
          state: p.address?.state || 'Sindh',
          location: `${p.address?.city || 'Karachi'}, ${p.address?.state || 'Sindh'}`,
          beds: beds,
          baths: baths,
          area: p.details?.area || 0,
          rent: p.rent?.amount || 0,
          deposit: p.rent?.deposit || (p.rent?.amount * 2),
          maintenance: p.rent?.maintenance || Math.round(p.rent?.amount * 0.05),
          yearBuilt: p.details?.furnishing === 'furnished' ? 'Fully Furnished' : 'Unfurnished',
          floors: 1,
          image: images.main,
          bedroomImgs: bedroomImgs,
          bathroomImgs: bathroomImgs,
          kitchenImg: images.kitchen,
          diningImg: images.dining,
          description: p.description,
          amenities: ["Dining Area", "Modern Kitchen", "Security", "Parking"],
          nearby: ["Shopping Mall (500m)", "Restaurants (200m)", "Park (300m)"],
          agent: { name: p.ownerId?.name || "Landlord Partner", role: "Property Owner",
            phone: p.ownerId?.phone || "0300-1234567", email: p.ownerId?.email || "landlord@estateflow.com" },
          type: p.type || 'Villa',
          isHouse: false
        };
        setHomeValue(p.rent?.amount * 100);
      } else {
        fetchedProp = getStaticProperty(id);
        setHomeValue(fetchedProp.rent * 100);
      }
      
      setProperty(fetchedProp);
      setOtherHouses([]);
      fetchReviews(fetchedProp.id);
    } catch (err) {
      console.error("Error:", err);
      const fallback = getStaticProperty(id);
      setProperty(fallback);
      fetchReviews(id);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (propertyId) => {
    try {
      const res = await fetch(`https://estateflow-backend-mt7ox7s2k6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${propertyId}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data.reviews);
        if (data.data.reviews.length > 0) {
          const sum = data.data.reviews.reduce((acc, r) => acc + r.rating, 0);
          setAvgRating(Math.round((sum / data.data.reviews.length) * 10) / 10);
        }
      }
    } catch (err) { console.error("Error loading reviews:", err); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    if (!isAuthenticated) { toast.error("Please login to submit a review."); return; }
    setSubmittingReview(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://estateflow-backend-mt7ox7s2k6wllj-aqsasaher5995-rgbs-projects.vercel.app/api/properties/${property.id}/reviews`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rating: ratingInput, comment: commentInput })
      });
      const data = await res.json();
      if (data.success) { toast.success("Review posted!"); setCommentInput(''); fetchReviews(property.id); }
      else { toast.error(data.message || "Failed"); }
    } catch (error) { toast.error("Error posting review"); }
    finally { setSubmittingReview(false); }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setShowInquiryForm(false); setInquirySubmitted(false);
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
      toast.success("Inquiry sent!");
    }, 2000);
  };

  const getMortgageCalculation = () => {
    const downPayment = (homeValue * downPaymentPct) / 100;
    const loanAmount = homeValue - downPayment;
    const r = (interestRate / 100) / 12;
    const n = loanTerm * 12;
    let monthlyMortgage = 0;
    if (r > 0) monthlyMortgage = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    else monthlyMortgage = loanAmount / n;
    const utilities = Math.round(property?.rent * 0.08 || 12000);
    const taxes = Math.round(homeValue * 0.0005);
    const buffer = Math.round(property?.rent * 0.05 || 5000);
    const totalMonthlyCost = Math.round(monthlyMortgage + utilities + taxes + buffer);
    return { downPayment, loanAmount, monthlyMortgage: Math.round(monthlyMortgage), utilities, taxes, buffer, totalMonthlyCost };
  };

  const calc = property ? getMortgageCalculation() : null;

  const openGallery = (category, startIndex = 0) => {
    let images = [];
    if (category === 'bedrooms') images = property.bedroomImgs.map((img, idx) => ({ src: img, title: `Bedroom ${idx + 1}` }));
    else if (category === 'bathrooms') images = property.bathroomImgs.map((img, idx) => ({ src: img, title: `Bathroom ${idx + 1}` }));
    else if (category === 'kitchen') images = [{ src: property.kitchenImg, title: 'Kitchen' }];
    else if (category === 'dining') images = [{ src: property.diningImg, title: 'Dining Area' }];
    else if (category === 'all') {
      images = [{ src: property.image, title: 'Front View' }, ...property.bedroomImgs.map((img, idx) => ({ src: img, title: `Bedroom ${idx + 1}` })), ...property.bathroomImgs.map((img, idx) => ({ src: img, title: `Bathroom ${idx + 1}` })), { src: property.kitchenImg, title: 'Kitchen' }];
      if (property.diningImg) images.push({ src: property.diningImg, title: 'Dining Area' });
    }
    setGalleryImages(images);
    setGalleryActiveIndex(Math.min(startIndex, images.length - 1));
    setIsGalleryOpen(true);
  };

  const nextGalleryImage = () => setGalleryActiveIndex((prev) => (prev + 1) % galleryImages.length);
  const prevGalleryImage = () => setGalleryActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  if (loading) {
    return (
      <div style={{ background: '#080b11', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const getAllImages = () => {
    const images = [{ src: property.image, title: "Front View" }];
    if (property.bedroomImgs) property.bedroomImgs.forEach((img, idx) => images.push({ src: img, title: `Bedroom ${idx + 1}` }));
    if (property.bathroomImgs) property.bathroomImgs.forEach((img, idx) => images.push({ src: img, title: `Bathroom ${idx + 1}` }));
    images.push({ src: property.kitchenImg, title: "Kitchen" });
    if (property.diningImg) images.push({ src: property.diningImg, title: "Dining Area" });
    return images;
  };

  const propertyImages = getAllImages();

  return (
    <div style={{ background: '#080b11', minHeight: '100vh', color: 'white' }}>
      
      {/* FULL SCREEN GALLERY MODAL */}
      {isGalleryOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setIsGalleryOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: 'white', zIndex: 2001 }}><X size={24} /></button>
          <button onClick={prevGalleryImage} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', color: 'white', zIndex: 2001 }}><ChevronLeft size={28} /></button>
          <button onClick={nextGalleryImage} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', color: 'white', zIndex: 2001 }}><ChevronRight size={28} /></button>
          <div style={{ maxWidth: '90vw', maxHeight: '80vh', textAlign: 'center' }}>
            <img src={galleryImages[galleryActiveIndex]?.src} alt={galleryImages[galleryActiveIndex]?.title} style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px' }} />
            <p style={{ marginTop: '20px', color: '#e5e7eb', fontSize: '16px', fontWeight: '500' }}>{galleryImages[galleryActiveIndex]?.title}</p>
            <p style={{ marginTop: '8px', color: '#9ca3af', fontSize: '13px' }}>{galleryActiveIndex + 1} of {galleryImages.length}</p>
          </div>
          <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px', overflowX: 'auto', maxWidth: '100%' }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} onClick={() => setGalleryActiveIndex(idx)} style={{ width: '60px', height: '45px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: galleryActiveIndex === idx ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* HEADER with Back to Home Button */}
      <div className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '16px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handleGoHome} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#6366f1', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏠</div>
            <span style={{ fontWeight: '800', fontSize: '18px', color: 'white' }}>EstateFlow</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Title Block */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.8px', marginBottom: '10px', color: 'white' }}>{property.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: '#9ca3af', fontSize: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} style={{ color: '#6366f1' }} /> {property.city}, {property.state}</span>
                <span>•</span><span style={{ color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '2px 10px', borderRadius: '20px', fontSize: '12.5px', fontWeight: '600' }}>Active Available</span>
                <span>•</span><span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="#fbbf24" stroke="none" /> {avgRating} ({reviews.length} reviews)</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '32px', fontWeight: '900', color: '#6366f1', margin: 0 }}>PKR {property.rent?.toLocaleString()}<span style={{ fontSize: '14px', color: '#9ca3af', fontWeight: 'normal' }}>/month</span></p>
              <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>Deposit: PKR {property.deposit?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* GALLERY - Only Main Image (no thumbnails below) */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ height: '480px', background: '#090d16', borderRadius: '24px', overflow: 'hidden', marginBottom: '16px', position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={() => setZoomImage(true)} onMouseLeave={() => setZoomImage(false)} onClick={() => openGallery('all', activeImage)}>
            <img src={property.image} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: zoomImage ? 'scale(1.04)' : 'scale(1)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', border: '1px solid rgba(255,255,255,0.1)' }}>Front View</div>
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(0,0,0,0.7)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Grid size={14} /> View Gallery
            </div>
          </div>
        </div>

        {/* Two Columns Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '40px' }} className="mobile-col">
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Features Row */}
            <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '24px', textAlign: 'center', gap: '10px' }}>
              <div style={{ cursor: 'pointer' }} onClick={() => openGallery('bedrooms', 0)}>
                <span style={{ fontSize: '24px' }}>🛏️</span>
                <p style={{ fontWeight: '800', color: 'white', fontSize: '18px', margin: '4px 0 0 0' }}>{property.beds}</p>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Bedrooms</p>
                <p style={{ color: '#6366f1', fontSize: '10px', marginTop: '4px' }}>Click to view →</p>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => openGallery('bathrooms', 0)}>
                <span style={{ fontSize: '24px' }}>🛁</span>
                <p style={{ fontWeight: '800', color: 'white', fontSize: '18px', margin: '4px 0 0 0' }}>{property.baths}</p>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Bathrooms</p>
                <p style={{ color: '#6366f1', fontSize: '10px', marginTop: '4px' }}>Click to view →</p>
              </div>
              <div>
                <span style={{ fontSize: '24px' }}>📐</span>
                <p style={{ fontWeight: '800', color: 'white', fontSize: '16px', margin: '4px 0 0 0' }}>{property.area}</p>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Total Area</p>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => openGallery('kitchen', 0)}>
                <span style={{ fontSize: '24px' }}>🍳</span>
                <p style={{ fontWeight: '800', color: 'white', fontSize: '16px', margin: '4px 0 0 0' }}>Kitchen</p>
                <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Modern Design</p>
                <p style={{ color: '#6366f1', fontSize: '10px', marginTop: '4px' }}>Click to view →</p>
              </div>
            </div>

            {/* Dining Area Preview */}
            {property.diningImg && (
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><HomeIcon size={20} style={{ color: '#6366f1' }} /> Dining Area</h3>
                <div onClick={() => openGallery('dining', 0)} style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.2s', maxWidth: '400px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <img src={property.diningImg} alt="Dining Area" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.5)' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'white' }}>Separate Dining Area</p>
                    <p style={{ margin: '4px 0 0 0', color: '#6366f1', fontSize: '12px' }}>Click to view →</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="glass-panel" style={{ padding: '30px' }}><h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Property Description</h3><p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '14.5px' }}>{property.description}</p></div>

            {/* Bedrooms Preview */}
            {property.bedroomImgs && property.bedroomImgs.length > 0 && (
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Bed size={20} style={{ color: '#6366f1' }} /> Bedrooms ({property.beds})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                  {property.bedroomImgs.map((img, idx) => (
                    <div key={idx} onClick={() => openGallery('bedrooms', idx)} style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <img src={img} alt={`Bedroom ${idx + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <div style={{ padding: '10px', background: 'rgba(0,0,0,0.5)' }}><p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'white' }}>Bedroom {idx + 1}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bathrooms Preview */}
            {property.bathroomImgs && property.bathroomImgs.length > 0 && (
              <div className="glass-panel" style={{ padding: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Bath size={20} style={{ color: '#6366f1' }} /> Bathrooms ({property.baths})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
                  {property.bathroomImgs.map((img, idx) => (
                    <div key={idx} onClick={() => openGallery('bathrooms', idx)} style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                      <img src={img} alt={`Bathroom ${idx + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <div style={{ padding: '10px', background: 'rgba(0,0,0,0.5)' }}><p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'white' }}>Bathroom {idx + 1}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kitchen Preview */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><HomeIcon size={20} style={{ color: '#6366f1' }} /> Kitchen</h3>
              <div onClick={() => openGallery('kitchen', 0)} style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', transition: 'transform 0.2s', maxWidth: '400px' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={property.kitchenImg} alt="Kitchen" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '12px', background: 'rgba(0,0,0,0.5)' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'white' }}>Modern Modular Kitchen</p>
                  <p style={{ margin: '4px 0 0 0', color: '#6366f1', fontSize: '12px' }}>Click to view →</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px' }}>Amenities & Facilities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {property.amenities.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}><span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span><span style={{ color: '#9ca3af', fontSize: '13.5px' }}>{item}</span></div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={20} style={{ color: '#6366f1' }} /> Customer Reviews ({reviews.length})</h3>
              {isAuthenticated ? (
                <form onSubmit={handleReviewSubmit} style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'white', marginBottom: '14px' }}>Write a Review</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}><span style={{ color: '#9ca3af', fontSize: '13px', marginRight: '8px' }}>Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={20} style={{ cursor: 'pointer', transition: 'all 0.15s' }} fill={(hoverRating || ratingInput) >= star ? '#fbbf24' : 'none'} stroke={(hoverRating || ratingInput) >= star ? '#fbbf24' : '#6b7280'} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)} onClick={() => setRatingInput(star)} />))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <textarea placeholder="Share your experience..." rows="2" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} required style={{ flex: 1, padding: '12px 16px', background: '#090d16', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'vertical' }} />
                    <button type="submit" disabled={submittingReview} style={{ width: '46px', height: '46px', background: '#6366f1', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={16} /></button>
                  </div>
                </form>
              ) : (
                <div style={{ marginBottom: '24px', background: 'rgba(99,102,241,0.06)', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.2)' }}><p style={{ color: '#818cf8', fontSize: '13px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldAlert size={16} /> Please log in to write reviews.</p></div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.length === 0 ? (<p style={{ color: '#6b7280', fontStyle: 'italic', margin: 0 }}>No reviews yet. Be the first to review!</p>) : (
                  reviews.map((r) => (
                    <div key={r._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><strong style={{ color: 'white', fontSize: '14.5px' }}>{r.userName}</strong><div style={{ display: 'flex', gap: '2px' }}>{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={r.rating > i ? '#fbbf24' : 'none'} stroke={r.rating > i ? '#fbbf24' : '#6b7280'} />)}</div></div>
                      <p style={{ color: '#9ca3af', fontSize: '13.5px', marginTop: '6px', lineHeight: '1.5' }}>{r.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Contact Card */}
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(99,102,241,0.2)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Property Owner</h3>
              {inquirySubmitted ? (
                <div style={{ textAlign: 'center', padding: '20px' }}><CheckCircle2 size={36} style={{ color: '#10b981', margin: '0 auto 10px auto' }} /><p style={{ fontWeight: 'bold' }}>Message Received!</p><p style={{ color: '#9ca3af', fontSize: '12px' }}>The landlord will contact you shortly.</p></div>
              ) : !showInquiryForm ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#090d16', padding: '14px', borderRadius: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(99,102,241,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👤</div>
                    <div><p style={{ fontWeight: '700', color: 'white', fontSize: '15.5px' }}>{property.agent.name}</p><p style={{ color: '#6366f1', fontSize: '12px' }}>{property.agent.role}</p></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => setShowInquiryForm(true)} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>✉️ Send Message</button>
                    <button onClick={() => window.open(`tel:${property.agent.phone}`)} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>📞 Call: {property.agent.phone}</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit}>
                  <input type="text" placeholder="Name" value={inquiryForm.name} onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})} required style={sideInputStyle} />
                  <input type="email" placeholder="Email" value={inquiryForm.email} onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})} required style={sideInputStyle} />
                  <input type="tel" placeholder="Phone" value={inquiryForm.phone} onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})} required style={sideInputStyle} />
                  <textarea placeholder="Your message..." rows="3" value={inquiryForm.message} onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})} required style={{ ...sideInputStyle, resize: 'vertical' }} />
                  <div style={{ display: 'flex', gap: '10px' }}><button type="submit" style={{ flex: 1, padding: '10px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Submit</button><button type="button" onClick={() => setShowInquiryForm(false)} style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Cancel</button></div>
                </form>
              )}
            </div>

            {/* Financial Planner */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calculator size={18} style={{ color: '#6366f1' }} /> Financial Planner</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}><span style={{ color: '#9ca3af' }}>Property Value</span><strong style={{ color: 'white' }}>PKR {homeValue.toLocaleString()}</strong></div><input type="range" min={property.rent * 50} max={property.rent * 500} step="100000" value={homeValue} onChange={(e) => setHomeValue(parseInt(e.target.value))} className="calc-slider" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}><span style={{ color: '#9ca3af' }}>Down Payment</span><strong style={{ color: 'white' }}>{downPaymentPct}% (PKR {calc?.downPayment?.toLocaleString()})</strong></div><input type="range" min="0" max="50" step="5" value={downPaymentPct} onChange={(e) => setDownPaymentPct(parseInt(e.target.value))} className="calc-slider" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}><span style={{ color: '#9ca3af' }}>Interest Rate</span><strong style={{ color: 'white' }}>{interestRate}%</strong></div><input type="range" min="3" max="20" step="0.5" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="calc-slider" /></div>
                <div><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}><span style={{ color: '#9ca3af' }}>Lease Period</span><strong style={{ color: 'white' }}>{loanTerm} Years</strong></div><input type="range" min="1" max="25" step="1" value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))} className="calc-slider" /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="120" height="120" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" /><circle cx="50" cy="50" r="42" stroke="#8b5cf6" strokeWidth="6" fill="transparent" strokeDasharray="263.89" strokeDashoffset={263.89 - (263.89 * 75) / 100} strokeLinecap="round" transform="rotate(-90 50 50)" /></svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}><span style={{ fontSize: '10px', color: '#9ca3af', display: 'block' }}>Monthly Cost</span><strong style={{ fontSize: '14px', color: 'white' }}>PKR {calc?.totalMonthlyCost > 1000 ? `${Math.round(calc?.totalMonthlyCost / 1000)}k` : calc?.totalMonthlyCost}</strong></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Principal + Interest</span><span>PKR {calc?.monthlyMortgage?.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Estimated Utilities</span><span>PKR {calc?.utilities?.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Property Insurance / Tax</span><span>PKR {calc?.taxes?.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#9ca3af' }}>Reserve buffer</span><span>PKR {calc?.buffer?.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', fontWeight: 'bold', fontSize: '14px' }}><span style={{ color: 'white' }}>Total Est. Payment</span><span style={{ color: '#8b5cf6' }}>PKR {calc?.totalMonthlyCost?.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#05070a', padding: '40px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '40px', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>© 2026 EstateFlow. All rights reserved.</p>
      </footer>

      <style>{`
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.06); }
        .glass-header { background: rgba(8, 11, 23, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
        .calc-slider { width: 100%; height: 4px; -webkit-appearance: none; background: rgba(255,255,255,0.1); border-radius: 5px; outline: none; }
        .calc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #6366f1; cursor: pointer; }
        @media (max-width: 768px) { .mobile-col { display: flex !important; flex-direction: column !important; gap: 30px !important; } }
      `}</style>
    </div>
  );
};

const sideInputStyle = {
  width: '100%',
  padding: '10px 14px',
  marginBottom: '10px',
  background: '#090d16',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: 'white',
  outline: 'none',
  fontSize: '13.5px'
};

export default PropertyDetailPage;