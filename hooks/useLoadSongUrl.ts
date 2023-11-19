import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Custom hook to load the public URL of a song from Supabase Storage
const useLoadSongUrl = (song: Song) => {

    // Access the Supabase client using the custom hook
    const supabaseClient = useSupabaseClient();

    // Check if the song object is provided; if not, return an empty string
    if (!song) {
        return '';
    }

    // Retrieve the public URL of the song from Supabase Storage
    const { data: songData } = supabaseClient
        .storage
        .from('songs') // Specify the storage bucket ('songs' in this case)
        .getPublicUrl(song.song_path); // Get the public URL using the song path

    return songData.publicUrl;
};

export default useLoadSongUrl;