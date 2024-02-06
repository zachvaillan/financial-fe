import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { centsToDollars } from '../utils/centsToDollars';

const CalendarContext = createContext();

export function useCalendar() {
  return useContext(CalendarContext);
}

export const CalendarProvider = ({ children }) => {
  const { data, fetchData } = useFetcher();

  useEffect(() => {
    fetchData('/api/v1/calendar')
  }, []);

  const normalizeDates = (occurrence_date) => {
    const splitDate = occurrence_date.split('-');
    if (splitDate.length !== 3) return;

    const date = new Date(splitDate[0], splitDate[1], splitDate[2]);
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