"use client";

import {
    useSupabaseClient,
    useSessionContext
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

// AuthModal component
const AuthModal = () => {
    // Retrieve Supabase client and router from Next.js
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    // Retrieve Supabase client and router from Next.js
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal() ;

    // useEffect to refresh the page and close the modal when the session changes
    useEffect(() => {
        if (session) {
            router.refresh(); // Refresh the page to reflect the authenticated state
            onClose(); // Close the authentication modal
        }
    }, [session, router, onClose]);

    // Function to handle modal state change
    const onChange = (open: boolean) => {
        if (!open) {
            onClose(); // Close the authentication modal when it's not open
        }
    }

    // Render the AuthModal component
    return ( 
            <Modal
                title="Welcome Back!"
                description="Login to your account"
                isOpen={isOpen}
                onChange={onChange}
            >
                {/* Auth component for handling authentication */}
                <Auth
                    theme="dark"
                    magicLink
                    providers={["github"]}
                    supabaseClient={supabaseClient}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: "#404040",
                                    brandAccent: "#22c55e",
                                }
                            }
                        }
                    }}
                />
            </Modal>
    );
}

export default AuthModal;