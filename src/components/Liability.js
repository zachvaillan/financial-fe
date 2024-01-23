import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';

export const Liability = ({ id }) => {
  const { data, fetchData } = useFetcher(`/api/v1/liabilities/${id}`);
  
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      hi
    </div>
  );
};