// Import necessary modules and functions
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from "next/headers";
import { NextResponse } from 'next/server';

// Import local libraries and utilities
import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

// Define the POST route handler function
export async function POST(
    request: Request
) {
    // Extract necessary data from the incoming request body
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        // Create a Supabase client for route handling with provided cookies
        const supabase = createRouteHandlerClient({ 
            cookies,
        });

        // Retrieve user information from Supabase authentication
        const { data: { user } } = await supabase.auth.getUser();

        // Create or retrieve a customer in Stripe based on user information
        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || ''
        });

        // Create a new checkout session using Stripe API
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: 'required',
            customer,
            line_items: [
                {
                price: price.id,
                quantity
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
                trial_period_days: 30,
                metadata
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}/`
        });

        // Return the session ID as a JSON response
        return NextResponse.json({ sessionId: session.id });
        
    } catch (error: any) {

        // Log any errors that occur during the process
        console.log(error);

        // Return an internal server error response
        return new NextResponse('Internal Error', { status: 500 });
    }
};