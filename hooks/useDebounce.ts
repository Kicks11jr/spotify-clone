import { useEffect, useState } from 'react';

// Defining a custom hook called useDebounce
function useDebounce<T>(value: T, delay?: number): T {

    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    // useEffect hook to perform the debounce logic
    useEffect(() => {

        // Set up a timer using setTimeout
        const timer = setTimeout(() => {

            // Update the debounced value after the specified delay
            setDebouncedValue(value)
        }, delay || 500); // Default delay is 500 milliseconds

        // Cleanup function to clear the timer if the value or delay changes before the timeout
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]); // Run the effect whenever value or delay changes

    return debouncedValue;
};

export default useDebounce;