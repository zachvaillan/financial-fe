import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import './Assets.css';

export const Assets = () => {
    const { data, fetchData } = useFetcher('/api/v1/assets');
    const { sendPostRequest } = usePostRequest();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount_cents: '',
        interest_rate: '',
    });

    useEffect(() => {
        fetchData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPostRequest('/api/v1/assets', formData);
    };

    return (
        <div>
            <form className="Assets" onSubmit={handleSubmit}>
                <h3>Create Asset</h3>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="textarea"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Amount (cents):</label>
                    <input
                        type="text"
                        name="amount_cents"
                        checked={formData.amount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Interest rate:</label>
                    <input
                        type="text"
                        name="interest_rate"
                        value={formData.interest_rate}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <h1>Assets</h1>
            {data?.map((asset) => {
                return (
                    <div>
                        <h3>{asset.name}</h3>
                        <p>{asset.amount_cents}</p>
                    </div>
                )
            })}
        </div>
    )
}