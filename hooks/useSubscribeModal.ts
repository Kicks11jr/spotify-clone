import { create } from 'zustand';

// Interface for the state managed by the hook
interface SubscribeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// Create and export the custom hook using the 'create' function from Zustand
const useSubscribeModal = create<SubscribeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

// Export of the custom hook
export default useSubscribeModal;