// Importing global styles
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

// Importing components and providers
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

// Configuring the Font
const font = Figtree({ subsets: ['latin'] })

// Metadata for the page
export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
};

// Revalidation setting
export const revalidate = 0;

// Main layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetching user's songs and active products with prices
  const userSongs  = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    // HTML structure for the page
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player/>
            </UserProvider>
          </SupabaseProvider>
        </body>
    </html>
  )
}
