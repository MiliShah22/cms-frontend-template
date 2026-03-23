# Fix Vercel Build Error for /api/stripe

## Steps:
- [x] 1. Update app/api/stripe/route.ts: Lazy init Stripe inside handler, add env check. ✅
- [ ] 2. User: Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to Vercel env vars.
- [ ] 3. Local test: Update .env.local with test keys, run `npm run build`.
- [ ] 4. Test API: POST to /api/stripe with {amount: 1000}, verify clientSecret.
- [ ] 5. User redeploy on Vercel.
- [ ] 6. Verify production: Test checkout flow end-to-end.

