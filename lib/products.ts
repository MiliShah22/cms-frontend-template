export interface Product {
  id: number;
  emoji: string;
  name: string;
  cat: string;
  brand: string;
  price: number;
  old: number;
  badge: "new" | "hot" | "sale" | null;
  color: string;
  desc: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  offerTag?: string;
  collection?: string;
}

export const PRODUCTS: Product[] = [
  { id:1, emoji:"📱", name:"iPhone 16 Pro Max", cat:"Electronics", brand:"Apple", price:134900, old:149900, badge:"new", color:"#1a1a2e", desc:"The most advanced iPhone ever. Titanium design, A18 Pro chip, 48MP camera system, and a 6.9\" ProMotion OLED display that adapts from 1 to 120Hz.", rating:4.9, reviews:3412, isNew:true, collection:"Tech Essentials" },
  { id:2, emoji:"👟", name:"Nike Air Max Pulse", cat:"Fashion", brand:"Nike", price:12995, old:15995, badge:"hot", color:"#1a2e20", desc:"Engineered for comfort and style. Breathable mesh upper, full-length Air unit cushioning, and bold colourways that make every step a statement.", rating:4.7, reviews:1892, isNew:false, offerTag:"19% OFF", collection:"Street Style" },
  { id:3, emoji:"🎧", name:"Sony WH-1000XM6", cat:"Electronics", brand:"Sony", price:34990, old:39990, badge:"sale", color:"#2e1a1a", desc:"Industry-leading noise cancellation meets 40-hour battery life. Crystal-clear LDAC audio and multipoint connection.", rating:4.8, reviews:2741, isNew:false, offerTag:"12% OFF", collection:"Tech Essentials" },
  { id:4, emoji:"🛋️", name:"Modular Sofa Set", cat:"Home & Living", brand:"IKEA", price:45999, old:59999, badge:"sale", color:"#1e1a2e", desc:"Contemporary modular sofa in premium stain-resistant fabric. Mix and match configurations for any space.", rating:4.6, reviews:634, isNew:false, offerTag:"23% OFF", collection:"Home Luxe" },
  { id:5, emoji:"⌚", name:"Apple Watch Ultra 3", cat:"Electronics", brand:"Apple", price:89900, old:99900, badge:"new", color:"#2e2a1a", desc:"Rugged titanium case, precision dual-frequency GPS, 72-hour battery life in low-power mode and a 3000-nit display.", rating:4.9, reviews:1204, isNew:true, collection:"Tech Essentials" },
  { id:6, emoji:"💄", name:"NARS Lip Collection", cat:"Beauty", brand:"NARS", price:3499, old:4499, badge:"hot", color:"#2e1a22", desc:"Six iconic NARS shades in matte, satin, and gloss finishes. Limited-edition packaging with magnetic closure.", rating:4.5, reviews:897, isNew:false, offerTag:"22% OFF", collection:"Beauty Edit" },
  { id:7, emoji:"🎮", name:"PS5 Slim Bundle", cat:"Electronics", brand:"Sony", price:54990, old:59990, badge:"hot", color:"#1a2028", desc:"PlayStation 5 Slim with two DualSense controllers and three blockbuster titles. Next-gen gaming with ray tracing.", rating:4.8, reviews:3105, isNew:false, offerTag:"8% OFF", collection:"Tech Essentials" },
  { id:8, emoji:"👜", name:"Italian Leather Tote", cat:"Fashion", brand:"Gucci", price:8999, old:12999, badge:"sale", color:"#2e2418", desc:"Full-grain Italian leather with hand-stitched detailing and gold-tone hardware. Spacious interior with three pockets.", rating:4.7, reviews:523, isNew:false, offerTag:"30% OFF", collection:"Street Style" },
  { id:9, emoji:"🏋️", name:"Smart Fitness Tracker", cat:"Sports", brand:"Garmin", price:7499, old:9999, badge:"sale", color:"#1a2e28", desc:"Track heart rate, SpO2, sleep, 100+ workout modes. 14-day battery, 5ATM water resistance with GPS.", rating:4.4, reviews:1556, isNew:false, offerTag:"25% OFF", collection:"Active Life" },
  { id:10, emoji:"📚", name:"Atomic Habits Deluxe", cat:"Books", brand:"Penguin", price:699, old:999, badge:null, color:"#2e2618", desc:"James Clear's bestseller in a hardcover collector's edition with ribbon bookmark and author annotations.", rating:4.9, reviews:8734, isNew:false, collection:"Mind & Soul" },
  { id:11, emoji:"🧴", name:"The Ordinary Regimen", cat:"Beauty", brand:"The Ordinary", price:2299, old:2999, badge:"new", color:"#1e2e2a", desc:"Complete 5-step skincare routine — cleanser, hyaluronic acid, niacinamide, retinol, SPF 50 moisturiser.", rating:4.6, reviews:2190, isNew:true, collection:"Beauty Edit" },
  { id:12, emoji:"🪴", name:"Ceramic Planter Set", cat:"Home & Living", brand:"H&M Home", price:1899, old:2499, badge:null, color:"#1a2820", desc:"Three hand-glazed ceramic planters with drainage holes and bamboo saucers. Unique matte sage glaze.", rating:4.3, reviews:312, isNew:false, collection:"Home Luxe" },
  { id:13, emoji:"🕶️", name:"Ray-Ban Aviator Gold", cat:"Fashion", brand:"Ray-Ban", price:14500, old:18000, badge:"new", color:"#2e2a10", desc:"Classic gold metal aviator frame with polarised G-15 lenses. UV400 protection and scratch-resistant coating.", rating:4.8, reviews:712, isNew:true, offerTag:"19% OFF", collection:"Street Style" },
  { id:14, emoji:"🎒", name:"North Face Backpack", cat:"Sports", brand:"The North Face", price:6999, old:8999, badge:"sale", color:"#1a1e2e", desc:"30L technical backpack with FlexVent suspension, laptop compartment, and waterproof base.", rating:4.6, reviews:940, isNew:false, offerTag:"22% OFF", collection:"Active Life" },
  { id:15, emoji:"🖥️", name:"Samsung 4K OLED 55\"", cat:"Electronics", brand:"Samsung", price:129990, old:159990, badge:"sale", color:"#10182e", desc:"55-inch 4K OLED with Neural Quantum Processor, 144Hz VRR, Dolby Atmos and near-infinite contrast ratio.", rating:4.7, reviews:1830, isNew:false, offerTag:"18% OFF", collection:"Tech Essentials" },
  { id:16, emoji:"🌿", name:"Aromatherapy Diffuser", cat:"Home & Living", brand:"Dyson", price:3299, old:4499, badge:"hot", color:"#1e2a1e", desc:"Ultrasonic essential oil diffuser with 7-colour LED, 400ml tank and whisper-quiet operation for up to 8 hours.", rating:4.5, reviews:488, isNew:false, offerTag:"26% OFF", collection:"Home Luxe" },
];

export const CATEGORIES = ["All","Electronics","Fashion","Home & Living","Beauty","Sports","Books"];

export const BRANDS = [
  { name:"Apple",          emoji:"🍎", tagline:"Think Different",         count:2  },
  { name:"Nike",           emoji:"👟", tagline:"Just Do It",              count:1  },
  { name:"Sony",           emoji:"🎮", tagline:"Make.Believe",            count:2  },
  { name:"Samsung",        emoji:"📺", tagline:"Imagine the Possibility", count:1  },
  { name:"Gucci",          emoji:"👜", tagline:"Italian Fashion House",   count:1  },
  { name:"Ray-Ban",        emoji:"🕶️",  tagline:"Never Hide",            count:1  },
  { name:"Garmin",         emoji:"⌚", tagline:"Beat Yesterday",          count:1  },
  { name:"The North Face", emoji:"🏔️", tagline:"Never Stop Exploring",  count:1  },
  { name:"NARS",           emoji:"💄", tagline:"Beauty Unchained",        count:1  },
  { name:"The Ordinary",   emoji:"🧴", tagline:"Clinical Formulations",   count:1  },
  { name:"IKEA",           emoji:"🛋️", tagline:"Design For Everyone",    count:1  },
  { name:"Dyson",          emoji:"🌀", tagline:"Engineered to Amaze",     count:1  },
];

export const COLLECTIONS = [
  { name:"Tech Essentials", emoji:"💻", desc:"Cutting-edge gadgets for the modern life",  color:"#1a1a2e", count:5 },
  { name:"Street Style",    emoji:"👗", desc:"Fashion-forward looks for every occasion",  color:"#1a2e20", count:3 },
  { name:"Home Luxe",       emoji:"🏠", desc:"Elevate your living space in style",         color:"#1e1a2e", count:3 },
  { name:"Beauty Edit",     emoji:"✨", desc:"Skincare and makeup curated by experts",      color:"#2e1a22", count:2 },
  { name:"Active Life",     emoji:"🏃", desc:"Gear for workouts and outdoor adventures",   color:"#1a2e28", count:2 },
  { name:"Mind & Soul",     emoji:"📖", desc:"Books and wellness for inner growth",         color:"#2e2618", count:1 },
];
