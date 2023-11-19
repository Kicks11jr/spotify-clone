import { loadStripe, Stripe } from '@stripe/stripe-js';

// Declare a Promise that resolves to a Stripe instance or null
let stripePromise: Promise<Stripe | null>;

// Function
export const getStripe = () => {

    // Check if the stripePromise is not already initialized
    if (!stripePromise) {
        // If not initialized, set stripePromise to a new instance of Stripe
        // using the Stripe publishable key from the environment variables
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
            ''
        );
    }

    // Return stripePromise, newly created or already existing
    return stripePromise;
};