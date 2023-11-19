import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";

import SearchContent from "./components/SearchContent";

// interface for Search component
interface SearchProps {
    searchParams: {
        title: string;
    }
};

// Constant set to 0 because no auto revalidation is needed
export const revalidate = 0;

// Asynchronous function component for Search page
const Search = async ({ searchParams }: SearchProps) => {

    // Fetching songs based on the provided title using the imported function
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        ">
            <Header className="from-bg-neutral-900">
                <div className="
                    mb-2
                    flex
                    flex-col
                    gap-y-6
                ">
                    {/* Heading for the Search page */}
                    <h1 className="
                        text-white
                        text-3xl
                        font-semibold
                    ">
                        Search
                    </h1>
                    {/* SearchInput component */}
                    <SearchInput />
                </div>
            </Header>
            {/* SearchContent component with the fetched songs as a prop */}
            <SearchContent songs={songs}/>
        </div>
    )
};

// export Search component
export default Search;