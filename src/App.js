import { useState } from 'react';
import './App.css';
import { DateViews } from './date-views';
import { usePostRequest } from './usePostRequest';
import { LabelsProvider } from './contexts/LabelsContext';
import { AccountsProvider } from './contexts/AccountsContext';

function App() {
  const [newLabelOpen, setNewLabelOpen] = useState();
  const [labelName, setLabelName] = useState();
  const { sendPostRequest } = usePostRequest();

  return (
    <div className="App">
      <LabelsProvider>
        <DateViews />
        <div className="info">
          <AccountsProvider />
        </div>
        <div><button onClick={() => setNewLabelOpen(true)}>New Label</button></div>
        {newLabelOpen && 
          <div>
            <label>Name</label>
            <input value={labelName} onChange={(e) => setLabelName(e.target.value)} type='text' />
            <button onClick={() => sendPostRequest('/api/v1/labels', { name: labelName }, 'POST')}>Create</button>
          </div>
        }
      </LabelsProvider>
    </div>
  );
}

export default App;
