import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponseMessage } from '../../../types/transactions';
import { transactionsList } from '../transactionsSlice';
import { IResponse } from '../../../types/api';
import { RootState } from '../../../app/store';

type ReponseTransactions = IResponse<TransactionResponseMessage>;

export const deleteTransactionById = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('transactions/deleteTransactionById', async (id, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions/${id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${thunkAPI.getState().user.data.accessToken}`,
      },
    }
  );
  const deleteTransaction = (await response.json()) as ReponseTransactions;
  if (deleteTransaction) {
    thunkAPI.dispatch(transactionsList());
  }
});
