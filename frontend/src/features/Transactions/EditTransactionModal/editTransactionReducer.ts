import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ReponseTransactions,
  TransactionDocument,
} from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { updateTransaction } from '../transactionsSlice';
const token = getToken();

export const editTransaction = createAsyncThunk<
  void,
  Omit<TransactionDocument, 'weekday'>
>('transactions/editTransaction', async (transaction, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions/${transaction.id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    }
  );
  const { data } = (await response.json()) as ReponseTransactions;

  if (data) {
    thunkAPI.dispatch(updateTransaction(transaction));
  }
});
