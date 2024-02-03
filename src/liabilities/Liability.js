import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { AccountForm } from '../components/forms/account-form/AccountForm';

export const Liability = ({ id }) => {
  const { data, fetchData } = useFetcher(`/api/v1/liabilities/${id}`);
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

  const handleChange = () => null;
  const handleSubmit = () => null;

  return (
    <div>
      <AccountForm title="Edit Liability" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};