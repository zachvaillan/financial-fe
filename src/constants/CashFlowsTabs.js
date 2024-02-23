const FormData = {
  name: '',
  email: '',
  amount: '',
  start_date: '',
  recurrence_rule: '',
}

export const AccountsTabs = {
  Expenses: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/expense',
    urlPlural: '/expenses',
    titleSingle: 'Expense',
    titlePlural: 'Expenses',
    formData: FormData.transaction
  },
  Incomes: {
    columns: ['Name', 'Amount'],
    keys: ['name', 'amount'],
    urlSingle: '/income',
    urlPlural: '/incomes',
    titleSingle: 'Income',
    titlePlural: 'Incomes',
    formData: FormData.transaction
  },
}
