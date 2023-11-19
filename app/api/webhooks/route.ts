import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/libs/stripe';
import {
upsertProductRecord,
upsertPriceRecord,
manageSubscriptionStatusChange
} from '@/libs/supabaseAdmin';

// Set of relevant Stripe webhook events to handle
const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]);

// Handler for the POST request to the webhook endpoint
export async function POST(
    request: Request
) {
    // Retrieve the request body and Stripe signature from headers
    const body = await request.text()
    const sig = headers().get('Stripe-Signature');

    // Retrieve the Stripe webhook secret from environment variables
    const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
    process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        // Verify the Stripe signature and construct the event
        if (!sig || !webhookSecret) return;
            event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        // Handle verification error
        console.log(`❌ Error message: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

// Process relevant events
if (relevantEvents.has(event.type)) {
    try {
    switch (event.type) {
        case 'product.created':
        case 'product.updated':
            // Handle product creation or update event
            await upsertProductRecord(event.data.object as Stripe.Product);
            break;
        case 'price.created':
        case 'price.updated':
            // Handle price creation or update event
            await upsertPriceRecord(event.data.object as Stripe.Price);
            break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            // Handle customer subscription events
            const subscription = event.data.object as Stripe.Subscription;
            await manageSubscriptionStatusChange(
                subscription.id,
                subscription.customer as string,
                event.type === 'customer.subscription.created'
            );
            break;
        case 'checkout.session.completed':
            // Handle completed checkout session for subscriptions
            const checkoutSession = event.data
                .object as Stripe.Checkout.Session;
                if (checkoutSession.mode === 'subscription') {
                    const subscriptionId = checkoutSession.subscription;
                    await manageSubscriptionStatusChange(
                    subscriptionId as string,
                    checkoutSession.customer as string,
                    true
                    );
                }
            break;
        default:
            // Throw an error for unhandled relevant events
            throw new Error('Unhandled relevant event!');
    }
    } catch (error) {
        // Handle any errors that occur during event processing
        console.log(error);
        return new NextResponse('Webhook error: "Webhook handler failed. View logs."', { status: 400 });
    }
}

// Respond with success status if the event was processed
return NextResponse.json({ received: true }, { status: 200 });
};