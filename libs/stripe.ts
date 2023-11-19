// Import the stripe library
import Stripe from 'stripe';

// Create a new instance of the Stripe class with the provided Stripe secret key
export const stripe = new Stripe(

    // Provided secret key defined in the .env.local
    process.env.STRIPE_SECRET_KEY ?? '',
    {
        apiVersion: '2023-10-16', //Stripe API version used
        appInfo: {
            name: 'Spotify Clone', // Name of the app
            version: '0.1.0' // Version of the app
        }
    }
);