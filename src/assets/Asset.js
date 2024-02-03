import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { AccountForm } from '../components/forms/account-form/AccountForm';
import { usePostRequest } from '../usePostRequest';

export const Asset = ({id}) => {
  const { data, fetchData } = useFetcher(`/api/v1/assets/${id}`);
  const { sendPostRequest } = usePostRequest();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    interest_rate: '',
  });

  useEffect(() => {
    fetchData();
  }, [id])

  useEffect(() => {
    data && setFormData(data);
  }, [data])

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
    sendPostRequest(`/api/v1/assets/${id}`, formDataWithCents, 'PUT');
    fetchData();
  };

  return (
    <div>
      <AccountForm title="Edit Asset" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}