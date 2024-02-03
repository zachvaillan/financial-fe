import { useEffect } from 'react';
import { useFetcher } from "./useFetcher"

export const useFetchLabels = () => {
  const { data, fetchData } = useFetcher('/api/v1/labels');

  useEffect(() => {
    fetchData()
  }, []);

  return { data }
}