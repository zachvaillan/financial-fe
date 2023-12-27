import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';

export const Incomes = () => {
    const { data, fetchData } = useFetcher('/api/v1/incomes');
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Incomes</h1>
            {data?.map((incomes) => {
                return <div>{incomes.name}</div>
            })}
            <button>Create Incomes</button>
        </div>
    )
}