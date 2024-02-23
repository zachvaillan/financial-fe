import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { usePostRequest } from '../usePostRequest';
import { Table } from '../components/tables/Table';
import { centsToDollars } from '../utils/centsToDollars';
import { Dialog, DialogContent } from '@mui/material';
import { Tabs } from '../components/tabs/Tabs';
import { CashFlowsTabs, FormData } from '../constants/CashFlowsTabs';
import { TransactionForm } from '../components/forms/cash-flow-form/TransactionForm';

const AccountsContext = createContext();

export function useAccounts() {
  return useContext(AccountsContext);
}

export const AccountsProvider = () => {
  const [currentTab, setCurrentTab] = useState('Expenses');
  const [itemOpen, setItemOpen] = useState();
  const [formData, setFormData] = useState(FormData);
  const { data, fetchData } = useFetcher();
  const { data: singleData, fetchData: fetchSingleData } = useFetcher();
  const { sendPostRequest } = usePostRequest();

  useEffect(() => {
    fetchData(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}`);
  }, [currentTab, itemOpen])

  useEffect(() => {
    if (itemOpen) {
      fetchSingleData(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}/${itemOpen}`);
    }
  }, [itemOpen])

  useEffect(() => {
    if (singleData) {
      const amount_cents = singleData.amount_cents;
      delete singleData.amount_cents;
      setFormData({...singleData, amount: amount_cents / 100});
    }
  }, [singleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithCents = { ...formData, amount_cents: formData.amount * 100 }
    sendPostRequest(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}`, formDataWithCents, 'POST');
    fetchData();
  };

  const handleDelete = (id) => {
    sendPostRequest(`/api/v1/${CashFlowsTabs[currentTab].urlPlural}/${id}`, null, 'DELETE');
    fetchData();
  }

  const mappedData = data?.map((li) => { 
    return { ...li, amount: centsToDollars(li.amount_cents) }
  })

  const totalAmount = data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount_cents,
    0,
  );

  const handleClose = () => {
    setItemOpen(false);
    setFormData(CashFlowsTabs[currentTab].formData)
  }

  return (
    <>
      <Tabs 
        tabArray={['Incomes', 'Expenses']}
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
      <Dialog open={itemOpen} onClose={handleClose}>
        <DialogContent>
          <TransactionForm
            title={`Create ${CashFlowsTabs[currentTab].titleSingle}`}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
