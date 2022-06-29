import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionResponseMessage } from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { transactionsList } from '../transactionsSlice';
import { IResponse } from '../../../types/api';
import { RootState } from '../../../app/store';
const token = getToken();

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
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data } = (await response.json()) as ReponseTransactions;
  if (data) {
    thunkAPI.dispatch(transactionsList());
  }
});
