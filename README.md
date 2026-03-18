# LUXE Store — Next.js + Redux Toolkit

A complete dark-themed premium e-commerce app built with **Next.js 14 App Router**, **Redux Toolkit + redux-persist**, and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
cd luxe-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Login Credentials

| Email             | Password | Role     |
|-------------------|----------|----------|
| admin@admin.com   | 123123   | Admin    |
| user@luxe.com     | user123  | Customer |

---

## 🗂 Pages & Routes

| Route            | Page               | Description                                     |
|------------------|--------------------|-------------------------------------------------|
| `/`              | Home               | Hero banner + full product listing with search/sort/filter |
| `/new-arrivals`  | New Arrivals       | Products with `isNew: true` or `badge: "new"` |
| `/collections`   | Collections        | 6 curated collections — click to browse         |
| `/brands`        | Brands             | 12 brand cards — click to browse by brand       |
| `/offers`        | Offers             | Coupon codes + discounted products filter       |
| `/products/[id]` | Product Detail     | Gallery, size/colour picker, qty, add/buy/wish  |
| `/cart`          | Cart               | Full cart with qty, remove, save-for-later, coupon |
| `/checkout`      | Checkout           | Address form + 4 payment methods + validation   |
| `/confirmation`  | Order Confirmation | Animated success + order timeline               |
| `/wishlist`      | Wishlist           | Saved items, move to cart, remove               |
| `/account`       | My Account         | Profile, order history, quick links (auth-guarded) |
| `/login`         | Login              | Static auth with demo credentials hint          |

---

## 🏗 Project Structure

```
luxe-store/
├── app/
│   ├── page.tsx                   # Home (Hero + ProductGrid)
│   ├── layout.tsx                 # Root layout (Navbar + Footer + Redux)
│   ├── login/page.tsx
│   ├── account/page.tsx
│   ├── wishlist/page.tsx
│   ├── new-arrivals/
│   │   ├── page.tsx
│   │   └── NewArrivalsClient.tsx
│   ├── offers/page.tsx
│   ├── brands/page.tsx
│   ├── collections/page.tsx
│   ├── products/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   └── confirmation/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Sticky nav with cart/wishlist badges + user dropdown
│   │   ├── HeroBanner.tsx         # Homepage hero with CTAs and trust bar
│   │   └── Footer.tsx             # Links, newsletter, social
│   ├── product/
│   │   ├── ProductGrid.tsx        # Category filter + search + sort
│   │   ├── ProductCard.tsx        # Card with Redux wishlist heart + quick-add
│   │   ├── ProductDetail.tsx      # Full detail page component
│   │   └── CategoryFilter.tsx     # Pill filter bar
│   ├── cart/
│   │   ├── CartItemRow.tsx        # Qty control + save-for-later + delete
│   │   ├── OrderSummary.tsx       # Subtotal/discount/tax/total + coupon
│   │   └── CheckoutForm.tsx       # Address + payment + validation
│   ├── ui/
│   │   ├── Badge.tsx              # NEW / HOT / SALE badge chip
│   │   ├── StarRating.tsx         # Star display with review count
│   │   ├── Toast.tsx              # Global event-based toast notifications
│   │   └── PageShell.tsx          # Shared page header wrapper
│   └── ReduxProvider.tsx          # Client-side Redux + PersistGate wrapper
│
├── store/
│   ├── index.ts                   # configureStore + redux-persist (cart+auth+wishlist)
│   ├── hooks.ts                   # useAppDispatch / useAppSelector
│   └── slices/
│       ├── cartSlice.ts           # addToCart, removeFromCart, updateQty, applyCoupon, clearCart
│       ├── authSlice.ts           # login, logout (static users)
│       └── wishlistSlice.ts       # toggleWishlist, removeFromWishlist
│
└── lib/
    └── products.ts                # 16 products + BRANDS + COLLECTIONS data
```

---

## 🛒 Cart Features

- Add to cart from listing, detail, and wishlist pages
- Qty increment / decrement (min 1, max 10)
- Remove item with toast confirmation
- **Save for later** (moves item to wishlist)
- **Clear entire cart**
- Working coupon codes: `LUXE20` (20%), `SAVE10` (10%), `FIRST15` (15%)
- Live subtotal, product discount, coupon discount, 18% GST, total
- **Persisted to localStorage** via redux-persist — survives refresh

## ❤️ Wishlist Features

- Toggle heart on every ProductCard and ProductDetail
- Live count badge on Navbar heart icon
- Wishlist page: view all saved products
- Move individual item to cart
- **Move All to Cart** button
- Remove from wishlist
- Persisted to localStorage

## 🔐 Auth Features

- Login with `admin@admin.com` / `123123`
- Persisted login across refreshes
- User dropdown in Navbar with Account / Wishlist / Cart / Logout
- Account page is auth-guarded (redirects to `/login`)

## 🏷️ Coupon Codes

| Code     | Discount |
|----------|----------|
| `LUXE20` | 20% off  |
| `SAVE10` | 10% off  |
| `FIRST15`| 15% off  |
