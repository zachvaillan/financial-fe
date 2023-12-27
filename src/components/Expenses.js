import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';

export const Expenses = () => {
    const { data, fetchData } = useFetcher('/api/v1/expenses');
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Expenses</h1>
            {data?.map((expense) => {
                return <div>{expense.name}</div>
            })}
            <button>Create Expense</button>
        </div>
    )
}