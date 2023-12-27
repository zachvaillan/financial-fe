import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';

export const Assets = () => {
    const { data, fetchData } = useFetcher('/api/v1/assets');
    const { sendPostRequest } = usePostRequest();

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Assets</h1>
            {data?.map((asset) => {
                return <div>{asset.name}</div>
            })}
            <button onClick={() => sendPostRequest('/api/v1/assets', {name: 'hello'})}>Create Asset</button>
        </div>
    )
}