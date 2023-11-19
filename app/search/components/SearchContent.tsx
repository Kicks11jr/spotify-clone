// Import dependencies
"use client";

// some imports
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

// Define props for SearchContent component
interface SearchContentProps {
    songs: Song[];
}

// Functional component for displaying search results
const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    // useOnPlay hook to handle play functionality
    const onPlay = useOnPlay(songs);

    // If no songs are found
    if (songs.length === 0) {
        return (
            <div className="
                flex
                flex-col
                gap-y-4
                w-full
                px-6
                text-neutral-400
            ">
                No songs found.
            </div>
        )
    }

    // Display the list of songs
    return ( 
        <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
        ">
            {songs.map((song) => (
                <div
                key={song.id}
                className="
                    flex
                    items-center
                    gap-x-4
                    w-full
                ">
                    <div className="flex-1">
                        {/* MediaItem component for each song */}
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    {/* LikeButton component for each song */}
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
}

// export SearchContent component
export default SearchContent;