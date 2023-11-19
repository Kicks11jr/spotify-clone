"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

// SupabaseProvider component props
interface SupabaseProviderProps {
    children: React.ReactNode;
}

// SupabaseProvider functional component
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ 
    children 
}) => {
    // Create a state variable to store the Supabase client instance
    const [supabaseClient] = useState(() => 
        // Initialize the Supabase client using createClientComponentClient from auth-helpers-nextjs
        createClientComponentClient<Database>()
    );

    // Render the SessionContextProvider with the Supabase client as a prop
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider;