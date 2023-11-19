import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react"

import { Song } from "@/types";

// Define a custom hook to load image for a given song
const useLoadImage = (song: Song) => {
    // Get the Supabase client from the context using the custom hook
    const supabaseClient = useSupabaseClient();

    // If no song is provided, return null
    if (!song) {
        return null;
    }

    // Use Supabase Storage to get the public URL of the image associated with the song
    const { data: imageData } = supabaseClient
        .storage
        .from('images') // Specify the storage bucket or folder
        .getPublicUrl(song.image_path); // Get the public URL for the image based on the provided image path

    return imageData.publicUrl;
};

export default useLoadImage;