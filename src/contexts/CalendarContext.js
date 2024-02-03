import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { centsToDollars } from '../utils/centsToDollars';

// Create a context with a default value
const CalendarContext = createContext();

export function useCalendar() {
  return useContext(CalendarContext);
}

export const CalendarProvider = ({ children }) => {
  const { data, fetchData } = useFetcher('/api/v1/calendar');

  useEffect(() => {
    fetchData()
  }, []);

  const normalizeDates = (occurrence_date) => {
    const date = new Date(occurrence_date);
    const dayOfMonth = date.getDate();

    return dayOfMonth;
  }

  const lineItems = useMemo(() => {
    if (!data) return [];

    return data.map((cashFlow) => {
      return {...cashFlow, dollars: centsToDollars(cashFlow.amount.cents), date: normalizeDates(cashFlow.occurence_date)}
    })
  }, [data])

  const context = useMemo(() => {
    return(
      { lineItems }
    )
  }, [data])

  return (
    <CalendarContext.Provider value={context}>
      {children}
    </CalendarContext.Provider>
  );
};