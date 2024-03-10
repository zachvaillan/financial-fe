import { useState, useCallback } from 'react';

export const useFetcher = () => {
  const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchData = useCallback(async (url, options) => {
      setIsLoading(true);
      try {
          const response = await fetch(`http://localhost:3001${url}`, options);
          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setData(data)
          setError(null);
          return data
      } catch (err) {
          setData(null);
          setError(err.message);
      } finally {
          setIsLoading(false);
      }
    }, []);

    return { fetchData, error, isLoading };
};