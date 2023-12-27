import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';

export const Liabilities = () => {
    const { data, fetchData } = useFetcher('/api/v1/liabilities');
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Liabilities</h1>
            {data?.map((liability) => {
                return <div>{liability.name}</div>
            })}
            <button>Create Liability</button>
        </div>
    )
}