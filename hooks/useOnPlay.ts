import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

// Define a custom hook called useOnPlay that takes an array of songs as a parameter
const useOnPlay = (songs: Song[]) => {

    const player = usePlayer(); // Hook for managing the audio player
    const subscribeModal = useSubscribeModal(); // Hook for managing the subscription modal
    const authModal = useAuthModal(); // Hook for managing the authentication modal
    const { user, subscription } = useUser(); // Hook for accessing user information and subscription status

    // Define the onPlay function, which handles the play action for a specific song
    const onPlay = (id: string) => {

        // Check if the user is not authenticated, and open the authentication modal if needed
        if (!user) {
            return authModal.onOpen();;
        }

        // Check if the user is not authenticated, and open the authentication modal if needed
        if (!subscription) {
            return subscribeModal.onOpen();
        }

        // Set the current song ID in the player and update the list of song IDs
        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
};

export default useOnPlay;