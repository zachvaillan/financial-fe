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

function App() {
  const [currentTab, handleCurrentTab] = useState();
  const [openLiability, setOpenLiability] = useState();
  const [openAsset, setOpenAsset] = useState();
  const [openExpense, setOpenExpense] = useState();
  const [openIncome, setOpenIncome] = useState();

  return (
    <div className="App">
      <div className="info">
        <Tabs tabArray={['Assets', 'Liabilities', 'Incomes', 'Expenses']} handleCurrentTab={handleCurrentTab} />
        {currentTab === 'Assets' && <Assets setOpenAsset={setOpenAsset} />}
        {currentTab === 'Liabilities' && <Liabilities setOpenLiability={setOpenLiability} />}
        {currentTab === 'Expenses' && <Expenses setOpenExpense={setOpenExpense} />}
        {currentTab === 'Incomes' && <Incomes setOpenIncome={setOpenIncome} />}
      </div>
      <DateViews />
      {openLiability && <Liability id={openLiability} />}
      {openAsset && <Asset id={openAsset} />}
      {openExpense && <Expense id={openExpense} />}
      {openIncome && <Income id={openIncome} />}
    </div>
  );
}

export default App;
