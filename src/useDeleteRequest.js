import { useState } from 'react';

export const usePostRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendPostRequest = async (url, requestBody) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001${url}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
            });

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

    return { sendPostRequest, data, error, isLoading };
};
