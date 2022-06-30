import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TransactionDocument,
  transactionRegistration,
} from '../../../types/transactions';
import { transactionsList } from '../transactionsSlice';
import { IResponse } from '../../../types/api';
import { RootState } from '../../../app/store';

type ReponseTransactionID = IResponse<Pick<TransactionDocument, 'id'>>;

export const addTransactionAPI = createAsyncThunk<
  void,
  transactionRegistration,
  { state: RootState }
>('transactions/addTransaction', async (newTransaction, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${thunkAPI.getState().user.data.accessToken}`,
      },
      body: JSON.stringify(newTransaction),
    }
  );
  const addResponse: ReponseTransactionID = await response.json();

  if (addResponse?.data?.id) {
    thunkAPI.dispatch(transactionsList());
  }
});
