import { useState, useEffect } from 'react'; 
import { useFetcher } from "./useFetcher";

export const useFetchCashflowParent = (id, type) => {
  const { fetchData, error, isLoading } = useFetcher();
  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      fetchData(`/api/v1/cashflow_parents/${id}?type=${type}`).then((data) => {
        setData(data)
      });
    }
  }, [id, type])

  return { data, error, isLoading };
}