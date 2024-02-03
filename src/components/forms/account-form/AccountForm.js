import '../form.css';
import { useFetchLabels } from '../../../useFetchLabels';

export const AccountForm = ({ title, formData, handleSubmit, handleChange }) => {
  const { data: labels } = useFetchLabels();

  return (
    <form className="Assets" onSubmit={handleSubmit}>
      <h3>{title}</h3>
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
          <label>Amount:</label>
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
      <div>
        <label>Label</label>
        <select name="label">
          {labels?.map(label => {
            return(
              <option value={label.id}>{label.name}</option>
            )
          })}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}