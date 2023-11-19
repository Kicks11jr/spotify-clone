import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Song } from "@/types";

// Custom hook for fetching a song by its ID
const useGetSongById = (id?: string) => {

    // State variables for loading status, song data, and Supabase client
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    // useEffect hook to fetch the song data when the ID changes
    useEffect(() => {

        // Check if the ID is not provided
        if (!id) {
            return;
        }

        // Set loading status to true when starting the fetch
        setIsLoading(true);

        // Function to fetch the song data from the database
        const fetchSong = async () => {

            // Use Supabase client to select the song with the given ID
            const { data, error } = await supabaseClient
                .from('songs')
                .select("*")
                .eq('id', id)
                .single();

            // Check for errors during the fetch
            if (error) {
                // If there is an error, set loading status to false and display an error toast
                setIsLoading(false);
                return toast.error(error.message);
            }

            // If successful, set the fetched song data and update loading status
            setSong(data as Song);
            setIsLoading(false);
        }

        // Call the fetch function
        fetchSong();
    }, [id, supabaseClient]);

    // Memoize and return the loading status and song data
    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
};

// Export the custom hook
export default useGetSongById;