import { Table } from '../components/tables/Table';
import { Tabs } from '../components/tabs/Tabs';
import { CashFlowsTabs } from '../constants/CashFlowsTabs';
import { useCashFlows } from '../contexts/CashFlowsContext';

export const CashFlows = () => {
  const {
    mappedData,
    totalAmount,
    setItemOpen,
    currentTab,
    handleDelete,
    setCurrentTab
  } = useCashFlows();

  return (
    <>
      <Tabs 
        tabArray={['Assets', 'Liabilities']}
        handleCurrentTab={setCurrentTab}
      />
      <h1>{CashFlowsTabs[currentTab].titlePlural}</h1>
      <button onClick={() => setItemOpen(true)}>New {CashFlowsTabs[currentTab].titleSingle}</button>
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
