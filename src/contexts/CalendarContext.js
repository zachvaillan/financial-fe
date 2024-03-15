import React, { createContext, useContext, useMemo } from 'react';
import { centsToDollars } from '../utils/centsToDollars';
import { getDaysInMonth } from '../utils/getDaysInMonth';
import { getFirstDayOfMonth } from '../utils/getFirstDayOfMonth';
import { useFetchCalendar } from '../hooks/useFetchCalendar'; 
import { useFetchAssets } from '../hooks/useFetchAssets';

const CalendarContext = createContext();

export function useCalendar() {
  return useContext(CalendarContext);
}

const dayNameToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6,
};

export const CalendarProvider = ({ children }) => {
  const { data } = useFetchCalendar();

  const context = useMemo(() => {
    if (!data) return {};
    const firstDayOfMonth = data.first_day_of_month;
    const daysInMonth = data.days_in_month;
    const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const calendarArray = paddingDays.concat(daysArray);

    return({
      cashFlows: data.cash_flows,
      accounts: data.accounts,
      currentDate: data.today,
      calendarArray
    })
  }, [data])

  return (
    <CalendarContext.Provider value={context}>
      {children}
    </CalendarContext.Provider>
  );
};