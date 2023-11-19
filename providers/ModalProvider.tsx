"use client"

import { useState, useEffect } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

// Props interface for ModalProvider
interface ModalProviderProps {
    products: ProductWithPrice[];
}

// ModalProvider functional component
const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
    // State hook to track whether the component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // useEffect hook to set isMounted to true once the component is mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not mounted yet, return null
    if (!isMounted) { 
        return null;
    }
    
    // Render the AuthModal, UploadModal, and SubscribeModal components
    return (
        <>
            <AuthModal/>
            <UploadModal/>
            <SubscribeModal products={products} />
        </>
    );
}

export default ModalProvider;