import '../form.css';
import { useLabels } from '../../../contexts/LabelsContext';
import { usePostRequest } from '../../../usePostRequest';
import { useState, useEffect, useCallback } from 'react';

export const AccountForm = ({ handleChange, formData, isEdit }) => {
  const [isAsset, setIsAsset] = useState();
  const { sendPostRequest } = usePostRequest();
  const { labels } = useLabels();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
    if (isEdit) {
      sendPostRequest(`/api/v1/accounts/${formData.id}`, formDataWithCents, 'PUT');
    } else {
      sendPostRequest(`/api/v1/accounts`, formDataWithCents, 'POST');
    }
    // fetchData();
  }, [formData, isAsset, isEdit]);

  useEffect(() => {
    if(formData.type === "Asset") setIsAsset(true)
  }, [formData])

  return (
    <div className="root">
      <h3 className="title">New {isAsset ? 'Asset' : 'Liability'}</h3>
      {!isEdit && 
        <div>
          <button type="button" onClick={() => setIsAsset()}>Liability</button>
          <button type="button" onClick={() => setIsAsset(true)}>Asset</button>
        </div>
      }
      <form onSubmit={handleSubmit}>
        <div className="input">
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
        </div>
        <div className="input">
            <label>Description:</label>
            <input
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
        </div>
        <div className="input">
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Interest Rate:</label>
          <input
            type="text"
            name="interest_rate"
            value={formData.interest_rate}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Label</label>
          <select onChange={handleChange} name="label">
            {labels?.map(label => {
              return(
                <option value={label.id}>{label.name}</option>
              )
            })}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
