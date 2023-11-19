// Import "useClient" for using supabase as a client
"use client";

//some imports
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Import custom hooks and components
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";

// Defining functional AccountContent component
const AccountContent = () => {
    // Initialize Next.js router hook for navigation
    const router = useRouter();

    // Custom hook to manage subscription modal
    const subscribeModal = useSubscribeModal();

    // Custom hook to fetch user data and subscription status
    const { isLoading, subscription, user } = useUser();

    // State to manage loading state for actions
    const [loading, setLoading] = useState(false);

    // useEffect hook to redirect to home page if user is not logged in
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // Function to redirect to customer portal using Stripe API
    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            // Send request to the server to get the customer portal link
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
        // Redirect the user to the obtained URL
        window.location.assign(url);
        } catch (error) {
            // Display error message if any error occurs
            if (error) return alert((error as Error).message);
        }
        setLoading(false);
    };

    return ( 
        <div className="mb-7 px-6">
        {/* Display message & subscribe button if there is no active subscription */}
        {!subscription && (
            <div className="flex flex-col gap-y-4">
                <p>No active plan.</p>
                <Button 
                    onClick={subscribeModal.onOpen}
                    className="w-[300px]"
                >
                Subscribe
            </Button>
        </div>
        )}

        {/* Display subscription details & customer portal button if there is an active subscription */}
        {subscription && (
            <div className="flex flex-col gap-y-4">
            <p>You are currently on the 
                <b> {subscription?.prices?.products?.name} </b> 
                plan.
            </p>
            <Button
                disabled={loading || isLoading}
                onClick={redirectToCustomerPortal}
                className="w-[300px]"
            >
                Open customer portal
            </Button>
            </div>
        )}
        </div>
    );
}

// export AccountContent component
export default AccountContent;