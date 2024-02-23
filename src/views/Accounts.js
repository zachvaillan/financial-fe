import { Table } from '../components/tables/Table';
import { Tabs } from '../components/tabs/Tabs';
import { AccountsTabs } from '../constants/AccountsTabs';
import { useAccounts } from '../contexts/AccountsContext';

export const Accounts = () => {
  const {
    mappedData,
    totalAmount,
    setItemOpen,
    currentTab,
    handleDelete,
    setCurrentTab
  } = useAccounts();

  return (
    <>
      <Tabs 
        tabArray={['Assets', 'Liabilities']}
        handleCurrentTab={setCurrentTab}
      />
      <h1>{AccountsTabs[currentTab].titlePlural}</h1>
      <button onClick={() => setItemOpen(true)}>New {AccountsTabs[currentTab].titleSingle}</button>
      <div>Total: {totalAmount / 100}</div>
      <Table 
        handleOpen={setItemOpen}
        handleDelete={handleDelete}
        rows={mappedData}
        columns={['Name', 'Amount']}
        keys={['name', 'amount']} 
      />
    </>
  )
};
