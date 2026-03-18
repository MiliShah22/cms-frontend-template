// ── Product Reviews ─────────────────────────────────────────────────────────
export interface Review {
  id: number;
  productId: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

export const REVIEWS: Review[] = [
  // iPhone (id 1)
  { id:1,  productId:1, author:"Rahul M.",   avatar:"R", rating:5, date:"Mar 10, 2026", title:"Best iPhone yet", body:"The A18 Pro chip is blazing fast. Camera quality is stunning—low light shots are unreal. Build quality is premium. Battery easily lasts a full day with heavy use.", helpful:48, verified:true },
  { id:2,  productId:1, author:"Priya S.",   avatar:"P", rating:5, date:"Mar 5, 2026",  title:"Worth every rupee", body:"Switched from Android and couldn't be happier. Face ID is instant, ProMotion display is butter-smooth. The titanium frame feels luxurious.", helpful:32, verified:true },
  { id:3,  productId:1, author:"Karan T.",   avatar:"K", rating:4, date:"Feb 28, 2026", title:"Great but expensive", body:"Performance and cameras are top-tier. iOS is polished. Dropped one star because the base storage feels limiting at this price point.", helpful:19, verified:true },
  // Nike (id 2)
  { id:4,  productId:2, author:"Amit K.",    avatar:"A", rating:5, date:"Mar 12, 2026", title:"Super comfortable!", body:"Wore these for a 10km run and my feet felt great throughout. The Air unit cushioning is noticeable. Sizing runs true.", helpful:27, verified:true },
  { id:5,  productId:2, author:"Sneha R.",   avatar:"S", rating:4, date:"Mar 8, 2026",  title:"Stylish and functional", body:"Great for both gym and casual wear. The colourway is exactly as pictured. Slightly narrow for wide feet.", helpful:14, verified:false },
  // Sony headphones (id 3)
  { id:6,  productId:3, author:"Dev P.",     avatar:"D", rating:5, date:"Mar 15, 2026", title:"Noise cancellation is insane", body:"Put these on in a noisy office and the world just disappears. Sound quality is balanced and rich. 40-hour battery is real-world accurate.", helpful:61, verified:true },
  { id:7,  productId:3, author:"Meera G.",   avatar:"M", rating:5, date:"Mar 9, 2026",  title:"Worth the upgrade", body:"Coming from XM4s, the XM6 is a clear step up—better ANC, improved call quality, and the new fold mechanism is more compact.", helpful:38, verified:true },
  { id:8,  productId:3, author:"Rohan J.",   avatar:"R", rating:4, date:"Mar 1, 2026",  title:"Almost perfect", body:"Excellent headphones in every way. My only gripe is they clamp a bit tight initially, though they loosen up after a week of use.", helpful:22, verified:true },
  // Apple Watch (id 5)
  { id:9,  productId:5, author:"Aisha B.",   avatar:"A", rating:5, date:"Mar 14, 2026", title:"My daily driver", body:"Tracks everything accurately—heart rate, sleep, workouts. The always-on display is bright outdoors. GPS locks fast. Battery comfortably lasts 2 days.", helpful:44, verified:true },
  { id:10, productId:5, author:"Vikram S.",  avatar:"V", rating:5, date:"Mar 6, 2026",  title:"Built like a tank", body:"The titanium case is scratch-resistant even after months of hiking. Water lock works perfectly. Best smartwatch money can buy.", helpful:35, verified:true },
  // PS5 (id 7)
  { id:11, productId:7, author:"Nikhil R.",  avatar:"N", rating:5, date:"Mar 11, 2026", title:"Next-gen is real", body:"Games load in seconds. Ray tracing makes a huge visual difference. The DualSense haptics transform how games feel. Absolutely worth it.", helpful:72, verified:true },
  { id:12, productId:7, author:"Pooja M.",   avatar:"P", rating:4, date:"Mar 3, 2026",  title:"Great console", body:"Incredible performance and game library. Knocked a star because it runs warm and the fan can get noisy under load.", helpful:29, verified:true },
  // Samsung TV (id 15)
  { id:13, productId:15, author:"Suresh K.", avatar:"S", rating:5, date:"Mar 13, 2026", title:"Stunning picture", body:"The OLED panel produces perfect blacks. HDR content looks incredible. Dolby Atmos sound is room-filling. Setup was straightforward.", helpful:41, verified:true },
  { id:14, productId:15, author:"Anita P.",  avatar:"A", rating:4, date:"Mar 4, 2026",  title:"Beautiful TV", body:"Picture quality is jaw-dropping. Smart TV interface is fast and intuitive. Remote is premium. Loses a star for the aggressive dimming in bright rooms.", helpful:18, verified:true },
  // Generic reviews for remaining products
  { id:15, productId:4,  author:"Leela N.",  avatar:"L", rating:5, date:"Mar 7, 2026",  title:"Perfect for our living room", body:"Assembly was simple, fabric quality is excellent, and it's incredibly comfortable. The modular design means we can rearrange whenever we want.", helpful:23, verified:true },
  { id:16, productId:6,  author:"Zara H.",   avatar:"Z", rating:5, date:"Mar 9, 2026",  title:"Gorgeous shades", body:"The packaging is luxurious and the shades are so pigmented. Matte formula doesn't dry out lips. Definitely worth the splurge.", helpful:31, verified:true },
  { id:17, productId:8,  author:"Tara S.",   avatar:"T", rating:5, date:"Mar 6, 2026",  title:"Exquisite quality", body:"The leather is buttery soft and the stitching is immaculate. Gets better with age. Large enough for a 13\" laptop.", helpful:19, verified:true },
  { id:18, productId:9,  author:"Arjun M.",  avatar:"A", rating:4, date:"Mar 8, 2026",  title:"Solid fitness tracker", body:"Accurate heart rate and SpO2 readings. 14-day battery is real. GPS acquisition is a bit slow but everything else is great.", helpful:26, verified:true },
  { id:19, productId:10, author:"Maya R.",   avatar:"M", rating:5, date:"Mar 5, 2026",  title:"Changed my habits", body:"The concepts in this book are practical and immediately actionable. The deluxe edition is beautiful and the author notes add real depth.", helpful:88, verified:true },
  { id:20, productId:11, author:"Riya K.",   avatar:"R", rating:5, date:"Mar 10, 2026", title:"My skin loves this", body:"Started seeing a difference in 2 weeks. The hyaluronic acid serum is incredibly hydrating and the SPF moisturiser isn't greasy at all.", helpful:54, verified:true },
  { id:21, productId:12, author:"Nisha P.",  avatar:"N", rating:4, date:"Mar 3, 2026",  title:"Beautiful planters", body:"Love the matte sage glaze—each one is slightly different which adds character. Drainage holes are well-sized. Shipping was very careful.", helpful:12, verified:true },
  { id:22, productId:13, author:"Kabir A.",  avatar:"K", rating:5, date:"Mar 12, 2026", title:"Timeless style", body:"The gold frame is exactly as pictured—elegant and not too flashy. Polarised lenses reduce glare significantly. Fit is comfortable for all-day wear.", helpful:17, verified:true },
  { id:23, productId:14, author:"Om T.",     avatar:"O", rating:4, date:"Mar 7, 2026",  title:"Great for hiking", body:"Carried this on a 3-day trek—waterproof base worked great in rain, straps are comfortable. Laptop compartment fits a 15\" machine perfectly.", helpful:33, verified:true },
  { id:24, productId:16, author:"Diya S.",   avatar:"D", rating:5, date:"Mar 9, 2026",  title:"Makes my room smell amazing", body:"The scents last for hours. Ultra-quiet operation—I literally forget it's on. The LED colour changes are a nice touch for ambience.", helpful:21, verified:true },
];

export function getReviewsForProduct(productId: number): Review[] {
  return REVIEWS.filter(r => r.productId === productId);
}

export function getAverageRating(productId: number): number {
  const reviews = getReviewsForProduct(productId);
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

// ── Orders ───────────────────────────────────────────────────────────────────
export interface OrderItem {
  id: number;
  name: string;
  emoji: string;
  qty: number;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  address: string;
  paymentMethod: string;
  trackingId: string;
  estimatedDelivery: string;
}

export const ORDERS: Order[] = [
  {
    id: "LUXE-2026-84201",
    date: "Mar 10, 2026",
    status: "Delivered",
    items: [
      { id:1,  name:"iPhone 16 Pro Max",  emoji:"📱", qty:1, price:134900, size:"N/A" },
      { id:3,  name:"Sony WH-1000XM6",    emoji:"🎧", qty:1, price:34990,  size:"N/A" },
      { id:10, name:"Atomic Habits Deluxe",emoji:"📚", qty:2, price:699,   size:"N/A" },
    ],
    subtotal: 171288, discount: 24701, tax: 26396, total: 172983,
    address: "Flat 4B, Sunshine Apartments, MG Road, Ahmedabad, Gujarat 380001",
    paymentMethod: "HDFC Credit Card ····4242",
    trackingId: "DTDC-IN-9827461",
    estimatedDelivery: "Delivered on Mar 14, 2026",
  },
  {
    id: "LUXE-2026-71038",
    date: "Feb 22, 2026",
    status: "Delivered",
    items: [
      { id:2, name:"Nike Air Max Pulse", emoji:"👟", qty:1, price:12995, size:"UK 9" },
    ],
    subtotal: 12995, discount: 3000, tax: 1799, total: 11794,
    address: "Flat 4B, Sunshine Apartments, MG Road, Ahmedabad, Gujarat 380001",
    paymentMethod: "UPI — aryan@upi",
    trackingId: "BLUEDART-IN-4412890",
    estimatedDelivery: "Delivered on Feb 26, 2026",
  },
  {
    id: "LUXE-2026-59314",
    date: "Jan 15, 2026",
    status: "Delivered",
    items: [
      { id:5, name:"Apple Watch Ultra 3", emoji:"⌚", qty:1, price:89900, size:"44mm" },
      { id:11,name:"The Ordinary Regimen",emoji:"🧴", qty:1, price:2299,  size:"N/A" },
    ],
    subtotal: 92199, discount: 10000, tax: 14756, total: 96955,
    address: "Flat 4B, Sunshine Apartments, MG Road, Ahmedabad, Gujarat 380001",
    paymentMethod: "ICICI Debit Card ····8821",
    trackingId: "FEDEX-IN-7719234",
    estimatedDelivery: "Delivered on Jan 20, 2026",
  },
];
