import { useEffect, useState } from 'react';
import { useFetcher } from '../useFetcher';
import { AccountForm } from './AccountForm';

export const Asset = ({id}) => {
  const { data, fetchData } = useFetcher(`/api/v1/assets/${id}`);
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
      <AccountForm title="Edit Asset" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}