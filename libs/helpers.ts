// Import Price type from the 'types' module
import { Price } from '@/types';

// Function to get the base URL for the application
export const getURL = () => {
    // Attempting to get the site URL from environment variables
    let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Prod env
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Vercel (if deployed)
    'http://localhost:3000/';

    // Adding 'https://' if the URL doesn't already include it
    url = url.includes('http') ? url : `https://${url}`;

    // Ensuring the URL ends with a trailing '/'
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;

    // Return Final URL
    return url;
};

// Async function to perform a POST request
export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: { price: Price };
}) => {

    // Logging information about the POST request
    console.log('posting,', url, data);

    // Making the POST request using fetch API
    const res: Response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });

    // Checking if the response is not okay (HTTP status code not in the range 200-299)
    if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    // Throwing error
    throw Error(res.statusText);
    }

    // Return JSON data from the response
    return res.json();
};

// Function to convert seconds since epoch to a JS Date object
export const toDateTime = (secs: number) => {

    // Creating a new Date object with the base date and time
    var t = new Date('1970-01-01T00:30:00Z');

    // Setting the seconds since epoch
    t.setSeconds(secs);

    // Returning the Date object
    return t;
};