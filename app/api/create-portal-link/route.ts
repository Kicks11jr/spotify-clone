import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

// POST request handler function
export async function POST() {
    try {
        // Create a Supabase client using the route handler
        const supabase = createRouteHandlerClient({ 
        cookies
        });
        
        // Retrieve the authenticated user information from Supabase
        const { data: { user } } = await supabase.auth.getUser();

        // Check if user information is available
        if (!user) throw new Error('Could not get user');

        // Create or retrieve a customer using Supabase Admin functions
        const customer = await createOrRetrieveCustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        // Check if customer information is available
        if (!customer) throw new Error('Could not get customer');

        // Create a billing portal session using the Stripe API
        const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/account`
        });

        // Return the billing portal URL in the response
        return NextResponse.json({ url });
    } catch (error: any) {

        // Handle errors and log them to the console
        console.log(error);

        // Return an internal server error response if an error occurs
        return new NextResponse('Internal Error', { status: 500 })
    }
};