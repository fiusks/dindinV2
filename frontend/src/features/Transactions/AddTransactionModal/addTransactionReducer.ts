import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TransactionDocument,
  transactionRegistration,
} from '../../../types/transactions';
import { getToken } from '../../../helpers/Auth/authHeader';
import { addTransaction } from '../transactionsSlice';
import { IResponse } from '../../../types/api';
const token = getToken();

type ReponseTransactionID = IResponse<Pick<TransactionDocument, 'id'>>;

export const addTransactionAPI = createAsyncThunk<
  void,
  transactionRegistration
>('transactions/addTransaction', async (newTransaction, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTransaction),
    }
  );
  const {
    data: { id },
  }: ReponseTransactionID = await response.json();

  if (id) {
    const addedTransaction: TransactionDocument = { id, ...newTransaction };
    thunkAPI.dispatch(addTransaction(addedTransaction));
  }
});
