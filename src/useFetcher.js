import { useState } from 'react';

export const useFetcher = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log(url)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001${url}`, options);
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
            setError(null);
        } catch (err) {
            setError(err.message);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, fetchData };
};