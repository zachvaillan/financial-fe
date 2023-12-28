import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import './Assets.css';

export const Liabilities = () => {
    const { data, fetchData } = useFetcher('/api/v1/liabilities');
    const { sendPostRequest } = usePostRequest();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        amount: '',
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
        const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
        sendPostRequest('/api/v1/liabilities', formDataWithCents);
    };

    return (
        <div>
            <form className="Assets" onSubmit={handleSubmit}>
                <h3>Create Liability</h3>
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
                        name="amount"
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
            <h1>Liabilities</h1>
            {data?.map((liability) => {
                return (
                    <div>
                        <h3>{liability.name}</h3>
                        <p>{liability.amount_cents / 100}</p>
                    </div>
                )
            })}
        </div>
    )
}