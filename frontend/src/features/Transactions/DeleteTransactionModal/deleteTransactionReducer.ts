import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReponseTransactions } from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { deleteTransaction } from '../transactionsSlice';
const token = getToken();

export const deleteTransactionById = createAsyncThunk<void, number>(
  'transactions/deleteTransactionById',
  async (id, thunkAPI) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/transactions/${id}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = (await response.json()) as ReponseTransactions;
    if (data) {
      thunkAPI.dispatch(deleteTransaction({ id }));
    }
  }
);
