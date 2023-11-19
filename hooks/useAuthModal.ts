import { create } from "zustand";

// Interface for the state managed by the hook
interface AuthModalStore {
    isOpen: boolean; // Indicating whether the modal is open or closed
    onOpen: () => void; // Function to open the modal
    onClose: () => void; // Function to close the modal
};

// Create and export the custom hook using the 'create' function from Zustand
const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false, // Initial state: modal is closed
    onOpen: () => set({ isOpen: true }), // Function to set isOpen to true, opening the modal
    onClose: () => set({ isOpen: false }), // Function to set isOpen to false, closing the modal
}));

// Export of the custom hook
export default useAuthModal;