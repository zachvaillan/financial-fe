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

export const CalendarProvider = ({ children }) => {
  const { data } = useFetchCalendar();
  const { data: assets } = useFetchAssets();

  const normalizeDates = (occurrence_date) => {
    const splitDate = occurrence_date.split('-');
    if (splitDate.length !== 3) return;

    const date = new Date(splitDate[0], splitDate[1], splitDate[2]);
    const dayOfMonth = date.getDate();

    return dayOfMonth;
  }

  const normalizedAssets = useMemo(() => {
    return assets?.map((asset) => ({ ...asset, dollars: centsToDollars(asset.amount_cents) })) || [];
  }, [assets]);

  const lineItems = useMemo(() => {
    if (!data) return [];

    const negativeBalances = {}

    const amountByDate = data.reduce((group, item) => {
      const { occurence_date: date } = item;
      group[date] = group[date] || 0;
      item.cash_flowable_type === "Income" ? group[date] += item.amount.cents : group[date] -= item.amount.cents;
      return group;
    }, {});

    const itemsByDate = data.reduce((group, item) => {
      const { occurence_date: date } = item;
      const normalizedDate = normalizeDates(date)
      group[normalizedDate] = group[date] || [];
      group[normalizedDate].push({...item, dollars: centsToDollars(item.amount.cents)})
      return group;
    }, {});

    Object.keys(amountByDate).forEach((dateKey) => {
      const normalizedDate = normalizeDates(dateKey);
      const amountCentsByDate = amountByDate[dateKey]
      const normalizedAmount = centsToDollars(amountCentsByDate);
      amountByDate[normalizedDate] = normalizedAmount;
      if (amountCentsByDate < 0) negativeBalances[normalizedDate] = normalizedAmount;
      delete amountByDate[dateKey];
    })
    return { amountByDate, negativeBalances, itemsByDate };
  }, [data])

  const date = new Date()
  const currentDate = date.getDate();
  const daysCount = getDaysInMonth(date);
  const firstDay = getFirstDayOfMonth(date);
  const days = Array.from({ length: daysCount }, (_, index) => index + 1);
  const pushedDays = Array.from({ length: firstDay - 1 });
  days.unshift(...pushedDays)

  const context = useMemo(() => {
    return(
      { lineItems, currentDate, days, assets: normalizedAssets }
    )
  }, [lineItems, currentDate, days, normalizedAssets])

  return (
    <CalendarContext.Provider value={context}>
      {children}
    </CalendarContext.Provider>
  );
};