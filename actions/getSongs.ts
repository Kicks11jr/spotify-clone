import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Asynchronous function to fetch songs from the Supabase database
const getSongs = async (): Promise<Song[]> => {

    // Create a Supabase client for server-side authentication
    const supabase = createServerComponentClient({
        cookies: cookies // Pass the cookies for authentication
    });

    // Use the Supabase client to query the 'songs' table, selecting all columns,
    // and ordering the results by 'created_at' in descending order
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    // If there's an error during the query, log it to the console
    if (error) {
        console.log(error);
    }

    // Return the fetched data (cast to any) or an empty array if no data is available
    return (data as any) || [];
};

export default getSongs;