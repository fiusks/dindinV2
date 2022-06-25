import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ReponseTransactions,
  transactionRegistration,
} from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { transactionsList } from '../transactionsSlice';
const token = getToken();

export const addTransaction = createAsyncThunk<
  ReponseTransactions,
  transactionRegistration
>('transactions/addTransaction', async (newTransaction, thunkAPI) => {
  const response = await fetch('http://localhost:3001/transactions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newTransaction),
  });
  thunkAPI.dispatch(transactionsList());
  return (await response.json()) as ReponseTransactions;
});
