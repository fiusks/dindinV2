import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReponseTransactions } from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { transactionsList } from '../transactionsSlice';
const token = getToken();

export const deleteTransactionById = createAsyncThunk<void, string>(
  'transactions/deleteTransactionById',
  async (id, thunkAPI) => {
    const response = await fetch(`http://localhost:3001/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = (await response.json()) as ReponseTransactions;
    if (data) {
      thunkAPI.dispatch(transactionsList());
    }
  }
);
