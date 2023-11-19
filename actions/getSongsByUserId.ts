import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Async function to fetch songs by user ID
const getSongsByUserId = async (): Promise<Song[]> => {
    // Create a Supabase client for server-side components
    const supabase = createServerComponentClient({
        cookies: cookies // Pass cookies to the Supabase client for authentication
    });

    // Fetch the user session data from Supabase
    const {
        data: sessionData,
        error: sessionError
    } = await supabase.auth.getSession();

    // Handle errors related to fetching user session
    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    // Fetch songs data from the 'songs' table for the authenticated user
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id) // Filter by user ID
        .order('created_at', { ascending: false }); // Order the results by created_at in descending order

    // Handle errors related to fetching songs data
    if (error) {
        console.log(error.message);
    }

    // Return the fetched songs data or an empty array if no data is available
    return (data as any) || [];
};

export default getSongsByUserId;