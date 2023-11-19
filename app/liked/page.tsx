// Import dependencies
import Image from "next/image";

// Import custom components
import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import LikedContent from "./components/LikedContent";

// Constant set to 0 because no auto revalidation is needed
export const revalidate = 0;

// Function Liked page component as an asynchronous function
const Liked = async () => {

    // Fetch liked songs data using the getLikedSongs function
    const songs = await getLikedSongs();

    return ( 
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        ">
            {/* Header component for the Liked page */}
            <Header>
                <div className="
                    mt-20
                ">
                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                    ">
                        {/* Playlist image */}
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                        ">
                            <Image
                                fill
                                alt="Playlist"
                                className="
                                    object-cover
                                "
                                src="/images/liked.png"
                            />
                        </div>
                        {/* Playlist information */}
                        <div className="
                            flex
                            flex-col
                            gap-y-2
                            mt-4
                            md:mt-0
                        ">
                            {/* Playlist label (hidden on small screens) */}
                            <p className="
                                hidden
                                md:block
                                font-semibold
                                text-sm
                            ">
                                Playlist
                            </p>
                            {/* Liked songs title */}
                            <h1 className="
                                text-white
                                text-4xl
                                sm:text-5xl
                                lg:text-7xl
                                font-bold
                            ">
                                Liked songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            {/* Component to display liked songs */}
            <LikedContent songs={songs}/>
        </div>
    );
}

// export Liked component
export default Liked;