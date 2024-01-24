import { useMemo, useEffect } from 'react';
import { centsToDollars } from '../utils/centsToDollars';
import { useFetcher } from '../useFetcher';
import './calendar.css';
import { Table } from '../components/Table';

export const DateTable = () => {
  const { data, fetchData } = useFetcher('/api/v1/calendar')

  useEffect(() => {
    fetchData();
  }, []);

  const lineItems = useMemo(() => {
    if (!data) return [];

    const cashFlows = data.incomes.concat(data.expenses);
    return cashFlows.map((cashFlow) => {
      return {...cashFlow, dollars: centsToDollars(cashFlow.amount_cents), date: cashFlow.dates.start_date}
    })
  }, [data])

  return (
    <div>
      <Table columns={['Date', 'Name', 'Amount', 'Total']} rows={lineItems} keys={['date', 'name', 'dollars']} />
    </div>
  )
}