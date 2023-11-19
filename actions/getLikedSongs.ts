import { Song } from "@/types";
import { SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// function to fetch liked songs for a user
const getLikedSongs = async (): Promise<Song[]> => {

    // Create a Supabase client for server components with provided cookies
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Retrieve the current user's session information
    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    // Fetch liked songs data from the 'liked_songs' table for the user
    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)') // Select all columns and include related 'songs'
        .eq('user_id', session?.user?.id) // Filter by user ID
        .order('created_at', { ascending: false }); // Order the results by 'created_at' in descending order

    // Handle errors during the data fetching process
    if (error) {
        console.log(error);
        return [];
    }

    // Check if no data is returned
    if (!data) {
        return [];
    }

    // Map the returned data to extract and return the 'songs' property of each item
    return data.map((item) => ({
        ...item.songs
    }))
};

export default getLikedSongs;