// Import "useClient" for using supabase as a client
"use client";

// custom Box component
import Box from "@/components/Box";

// Error function component
const Error = () => {
    return (
        <Box className="
            h-full
            flex
            items-center
            justify-center
        ">
            <div className="
                text-neutral-400
            ">
                Something went wrong
            </div>
        </Box>
    );
};

// Export Error component
export default Error;