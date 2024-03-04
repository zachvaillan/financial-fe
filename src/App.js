import { useState } from 'react';
import './App.css';
import { usePostRequest } from './usePostRequest';
import { LabelsProvider } from './contexts/LabelsContext';
import { AccountsProvider } from './contexts/AccountsContext';
import { Tabs } from './components/tabs/Tabs';
import { Calendar } from './views/Calendar';
import { DateTable } from './views/DateTable';
import { CalendarProvider } from './contexts/CalendarContext';
import { Accounts } from './views/Accounts';
import { CashFlows } from './views/CashFlows';
import { CashFlowsProvider } from './contexts/CashFlowsContext';

function App() {
  const [newLabelOpen, setNewLabelOpen] = useState();
  const [currentTab, setCurrentTab] = useState('Calendar');
  const [labelName, setLabelName] = useState();
  const { sendPostRequest } = usePostRequest();

  return (
    <div className="App">
      <LabelsProvider>
        <Tabs tabArray={['Calendar', 'Date Table', 'Accounts', 'Cash Flows']} handleCurrentTab={setCurrentTab} />
        <CalendarProvider>
          {currentTab === 'Calendar' && <Calendar />}
          {currentTab === 'Date Table' && <DateTable />}
        </CalendarProvider>
        <AccountsProvider>
          {currentTab === 'Accounts' && 
            <div className='info'>
              <Accounts />
            </div>
          }
        </AccountsProvider>
        <CashFlowsProvider>
          {currentTab === 'Cash Flows' && <CashFlows />}
        </CashFlowsProvider>
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
};

export default App;
