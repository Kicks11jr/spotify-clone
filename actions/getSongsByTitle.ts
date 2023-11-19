import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./getSongs";

// Define an asynchronous function to fetch songs by user ID
const getSongsByTitle = async (title: string): Promise<Song[]> => {
    // Create a Supabase client for server-side authentication using cookies
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Check if title is not provided, then fetch all songs
    if (!title) {
        // Check if title is not provided, then fetch all songs
        const allSongs = await getSongs();
        return allSongs;
    }

    // Check if title is not provided, then fetch all songs
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`) // Case-insensitive search for titles containing the provided text
        .order('created_at', { ascending: false }); // Order the results by created_at in descending order

    // Order the results by created_at in descending order
    if (error) {
        console.log(error);
    }

    return (data as any) || [];
};

export default getSongsByTitle;