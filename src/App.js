import { useState } from 'react';
import './App.css';
import { Expenses } from './expenses/Expenses';
import { Incomes } from './incomes/Incomes';
import { Liabilities } from './liabilities/Liabilities';
import { Assets } from './assets/Assets';
import { DateViews } from './date-views';
import { Tabs } from './components/tabs/Tabs';
import { Liability } from './liabilities/Liability';
import { Asset } from './assets/Asset';
import { Expense } from './expenses/Expense';
import { Income } from './incomes/Income';
import { usePostRequest } from './usePostRequest';
import { LabelsProvider } from './contexts/LabelsContext';

function App() {
  const [currentTab, handleCurrentTab] = useState();
  const [openLiability, setOpenLiability] = useState();
  const [openAsset, setOpenAsset] = useState();
  const [openExpense, setOpenExpense] = useState();
  const [openIncome, setOpenIncome] = useState();
  const [newLabelOpen, setNewLabelOpen] = useState();
  const [labelName, setLabelName] = useState();
  const { sendPostRequest } = usePostRequest();

  return (
    <div className="App">
      <LabelsProvider>
        <div className="info">
          <Tabs tabArray={['Assets', 'Liabilities', 'Incomes', 'Expenses']} handleCurrentTab={handleCurrentTab} />
          {currentTab === 'Assets' && <Assets setOpenAsset={setOpenAsset} />}
          {currentTab === 'Liabilities' && <Liabilities setOpenLiability={setOpenLiability} />}
          {currentTab === 'Expenses' && <Expenses setOpenExpense={setOpenExpense} />}
          {currentTab === 'Incomes' && <Incomes setOpenIncome={setOpenIncome} />}
        </div>
        <DateViews />
        <div><button onClick={() => setNewLabelOpen(true)}>New Label</button></div>
        {newLabelOpen && 
          <div>
            <label>Name</label>
            <input value={labelName} onChange={(e) => setLabelName(e.target.value)} type='text' />
            <button onClick={() => sendPostRequest('/api/v1/labels', { name: labelName }, 'POST')}>Create</button>
          </div>
        }
        {openLiability && <Liability id={openLiability} />}
        {openAsset && <Asset id={openAsset} />}
        {openExpense && <Expense id={openExpense} />}
        {openIncome && <Income id={openIncome} />}
      </LabelsProvider>
    </div>
  );
}

export default App;
