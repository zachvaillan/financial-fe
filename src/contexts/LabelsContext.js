import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useFetcher } from '../useFetcher';

const LabelsContext = createContext();

export function useLabels() {
  return useContext(LabelsContext);
}

export const LabelsProvider = ({ children }) => {
  const { data, fetchData } = useFetcher('/api/v1/labels');

  useEffect(() => {
    fetchData()
  }, []);

  const context = useMemo(() => {
    return(
      { labels: data }
    )
  }, [data])

  return (
    <LabelsContext.Provider value={context}>
      {children}
    </LabelsContext.Provider>
  );
};