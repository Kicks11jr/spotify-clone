// Import "useClient" for using supabase as a client
"use client";

// Imports
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[]
}

// Defining PageContent component
const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    // Using useOnPlay hook to handle play events
    const onPlay = useOnPlay(songs);

    // If there are no songs
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available.
            </div>
        )
    }

    // Rendering the list of songs in responsive grid
    return ( 
        <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
        ">
            {/* Mapping each song and use SongItem component */}
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
}

// export PageContent component
export default PageContent;