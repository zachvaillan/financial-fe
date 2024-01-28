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

    console.log(data)
    return data.map((cashFlow) => {
      return {...cashFlow, dollars: centsToDollars(cashFlow.amount.cents), date: cashFlow.occurence_date}
    })
  }, [data])

  return (
    <div>
      <Table columns={['Date', 'Name', 'Amount', 'Total']} rows={lineItems} keys={['date', 'name', 'dollars']} />
    </div>
  )
}