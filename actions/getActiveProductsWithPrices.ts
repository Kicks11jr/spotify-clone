import { ProductWithPrice } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Asynchronous function to get active products with prices
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {

        // Creating a Supabase client for server-side components with provided cookies
        const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Fetching data from the 'products' table with related 'prices'
    const { data, error } = await supabase
        .from('products') // Selecting the 'products' table
        .select('*, prices(*)') // Selecting all columns from 'products' and related 'prices'
        .eq('active', true) // Filtering by 'active' column in 'products'
        .eq('prices.active', true) // Filtering by 'active' column in 'prices' (related to products)
        .order('metadata->index') // Ordering by the 'index' column in the 'metadata' field
        .order('unit_amount', { foreignTable: 'prices' }); // Ordering by the 'index' column in the 'metadata' field

    // Logging an error message if there's an error
    if (error) {
        console.log(error.message);
    }

    // Returning the fetched data or an empty array if there's no data
    return (data as any) || [];
}

export default getActiveProductsWithPrices;