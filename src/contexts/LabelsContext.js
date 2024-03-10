import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useFetcher } from '../hooks/useFetcher';

const LabelsContext = createContext();

export function useLabels() {
  return useContext(LabelsContext);
}

export const LabelsProvider = ({ children }) => {
  const { data, fetchData } = useFetcher();

  useEffect(() => {
    fetchData('/api/v1/labels')
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
