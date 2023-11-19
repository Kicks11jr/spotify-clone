// Import "useClient" for using supabase as a client
"use client";

// BounceLoader react-spinners library
import { BounceLoader } from "react-spinners";

// custom Box component
import Box from "@/components/Box";

// Loading function component
const Loading = () => {
    return (
        <Box className="
            h-full
            flex
            items-center
            justify-center
        ">
            {/*BounceLoader component*/ }
            <BounceLoader color="#22c55e" size={40}/>
        </Box>
    )
}

// export Loading component
export default Loading;