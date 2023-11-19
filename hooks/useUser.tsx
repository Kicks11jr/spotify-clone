import { User } from "@supabase/auth-helpers-nextjs";
import { 
    useSessionContext, 
    useUser as useSupaUser 
} from "@supabase/auth-helpers-react";
import { createContext, useEffect, useState, useContext } from "react";

import { Subscription, UserDetails } from "@/types";

// Define the shape of the user context
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

// Create a context for the user
export const UserContext = createContext<UserContextType | undefined >(
    undefined
);

// Define the props for the provider
export interface Props {
    [propName: string]: any;
}

// Create the user context provider component
export const MyUserContextProvider = (props: Props) => {
    
    // Destructure values from Supabase hooks
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();

    // Get the user from Supabase
    const user = useSupaUser();

    // Extract the access token from the session or set it to null
    const accessToken = session?.access_token ?? null;

    // State for loading data
    const [isLoadingData, setIsLoadingData] = useState(false);

    // State for user details and subscription
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    // Define functions to get user details and subscription
    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () =>
    supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();

    // useEffect to run when the component mounts or user state changes
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            // Fetch user details and subscription details concurrently
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    // Set user details if promise is fulfilled
                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    // Set subscription details if promise is fulfilled
                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }

                    setIsLoadingData(false);
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // Reset user details and subscription if user is not logged in
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    // Create a context value with the relevant information
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }

    // Provide the context value to the children components
    return <UserContext.Provider value={value} {...props}/>
};

// Custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);

    // Throw an error if used outside of the provider
    if (context === undefined) {
        throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
};