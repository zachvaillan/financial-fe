import { useState } from 'react';
import './App.css';
import { Expenses } from './components/Expenses';
import { Incomes } from './components/Incomes';
import { Liabilities } from './components/Liabilities';
import { Assets } from './components/Assets';
import { DateViews } from './date-views';
import { Tabs } from './components/Tabs';
import { Liability } from './components/Liability';

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
      {/* {openAsset && <Asset id={openAsset} />}
      {openExpense && <Expense id={openExpense} />}
      {openIncome && <Income id={openIncome} />} */}
    </div>
  );
}

export default App;
