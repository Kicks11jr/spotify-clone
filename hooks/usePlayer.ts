import { create } from "zustand";

interface PlayerStore {
    ids: string[]; // Array to store song IDs.
    activeId?: string; // ID of the currently active song
    setId: (id: string) => void; // Function to set the active song ID
    setIds: (ids: string[]) => void; // Function to set an array of song IDs
    reset: () => void; // Function to reset the state (clearing all song IDs and the active song ID)
};

// Create the 'usePlayer' hook using the 'create' function from 'zustand'
const usePlayer = create<PlayerStore>((set) => ({
    ids: [], // Initialize the array of song IDs as empty.
    activeId: undefined, // Initialize the active song ID as undefined.

    // Function to set the active song ID.
    setId: (id: string) => set({ activeId: id }),

    // Function to set an array of song IDs.
    setIds: (ids: string[]) => set({ ids: ids }),

    // Function to reset the state, clearing all song IDs and the active song ID.
    reset: () => set({ ids: [], activeId: undefined })
}));

// Export of the custom hook
export default usePlayer;