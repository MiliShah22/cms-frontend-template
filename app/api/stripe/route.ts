import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({ error: 'Stripe is not configured. Please check your environment variables.' }, { status: 500 });
        }
        const stripe = new Stripe(secretKey);

        const { amount } = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // amount in rupees to paise
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

