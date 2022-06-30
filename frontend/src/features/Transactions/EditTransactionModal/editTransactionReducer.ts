import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TransactionDocument,
  TransactionResponseMessage,
} from '../../../types/transactions';
import { transactionsList } from '../transactionsSlice';
import { IResponse } from '../../../types/api';
import { RootState } from '../../../app/store';

type ReponseTransactions = IResponse<TransactionResponseMessage>;

export const editTransaction = createAsyncThunk<
  void,
  Omit<TransactionDocument, 'weekday'>,
  { state: RootState }
>('transactions/editTransaction', async (transaction, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions/${transaction.id}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${thunkAPI.getState().user.data.accessToken}`,
      },
      body: JSON.stringify(transaction),
    }
  );
  const { data } = (await response.json()) as ReponseTransactions;

  if (data) {
    thunkAPI.dispatch(transactionsList());
  }
});
