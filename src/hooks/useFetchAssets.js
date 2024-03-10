import { useState, useEffect } from 'react';
import { useFetcher } from "./useFetcher";

export const useFetchAssets = () => {
  const { fetchData, error, isLoading } = useFetcher();
  const [data, setData] = useState();

  useEffect(() => {
    fetchData('/api/v1/assets').then((data) => {
      setData(data)
    });
  }, [])

  return { data, error, isLoading };
}