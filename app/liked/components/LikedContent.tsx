// Import "useClient" for using supabase as a client
"use client";

// Import dependencies
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// some imports
import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    // Initialize Next.js router and user hook
    const router = useRouter();
    const { isLoading, user } = useUser();

    // Initialize the onPlay hook for handling play functionality
    const onPlay = useOnPlay(songs);

    // Check if the user is not logged in, redirect to the home page
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // If there are no liked songs
    if (songs.length === 0) {
        return (
            <div className="
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                text-neutral-400
            ">
                No liked songs
            </div>
        )
    }

    // Display list Liked songs
    return (
        <div className="
            flex
            flex-col
            gap-y-2
            w-full
            p-6
        ">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="
                        flex
                        items-center
                        gap-x-4
                        w-full
                    "
                >
                    <div className="
                        flex-1
                    ">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
}

// export LikedContent component
export default LikedContent;