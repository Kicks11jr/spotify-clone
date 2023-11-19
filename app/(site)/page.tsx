// custom component imports from other components folder
import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

// custom component import from this components folder
import PageContent from "./components/PageContent";

// constant set to 0 because no auto revalidation is needed
export const revalidate = 0;

// Main function Home Page
export default async function Home() {
  // Fetching the list of songs from supabase using getSongs function
  const songs = await getSongs();

  /* throw new Error('Test') */

  // RMain page structure
  return ( 
    
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      {/* Header section */}
      <Header>
        <div className="mb-2">
          <h1 className="
            text-white
            text-3xl
            font-semibold
          ">
            Welcome back
          </h1>
          {/* Displaying Liked Songs */}
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          ">
            {/* ListItem component for Liked Songs */}
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      {/* Main content section */}
      <div className="
        mt-2
        mb-7
        px-6
      ">
        <div className="
          flex
          justify-between
          items-center
        ">
          {/* Heading for displaying Newest songs */}
          <h1 className="
            text-white
            text-2xl
            font-semibold
          ">
            Newest songs
          </h1>
        </div>
        {/* PageContent component for displaying songs */}
        <PageContent songs={songs}/>
      </div>
    </div>
  )
}
