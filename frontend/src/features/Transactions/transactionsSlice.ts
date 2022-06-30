import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  TransactionDocument,
  TransactionListResponse,
} from '../../types/transactions';
import { updateCategories } from '../Filter/filtersSlice';
import { IResponse } from '../../types/api';
// interface ITransactionAPI {
//   method: 'GET' | 'PUT' | 'DELETE';
//   transactionID: string;
// }
//Analisar como otimização
// const transactionAPI = async (args: ITransactionAPI) => {
//   const { method, transactionID } = args;
//   let url = 'http://localhost:3001/transactions';
//   if (args.transactionID) {
//     url = url + '/' + transactionID;
//   }
//   const response = await fetch(url, {
//     method,
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return (await response.json()) as ReponseTransactions;
// };

interface transactionsReducer {
  data: TransactionDocument[];
}
type ReponseTransactions = IResponse<TransactionListResponse>;

const initialState: transactionsReducer = {
  data: [],
};

export const transactionsList = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('transactions/listTransactions', async (_, thunkAPI) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/transactions`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${thunkAPI.getState().user.data.accessToken}`,
      },
    }
  );

  const transactions = (await response.json()) as ReponseTransactions;
  console.log(transactions);
  if (transactions?.data) {
    thunkAPI.dispatch(listTransactions(transactions.data.transactions));
    thunkAPI.dispatch(updateCategories(transactions.data.categories));
  }

  return;
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    listTransactions: (
      state,
      { payload }: PayloadAction<TransactionDocument[]>
    ) => {
      state.data = payload;
    },
    addTransaction: (
      state,
      { payload }: PayloadAction<TransactionDocument>
    ) => {
      state.data = [...state.data, payload];
    },
    deleteTransaction: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.data = state.data.filter(
        (transaction) => transaction.id !== payload.id
      );
    },
    updateTransaction: (
      state,
      { payload }: PayloadAction<TransactionDocument>
    ) => {
      state.data.forEach((transaction, index) => {
        if (transaction.id === payload.id) {
          state.data[index] = payload;
        }
      });
    },
  },
});

export const {
  deleteTransaction,
  addTransaction,
  updateTransaction,
  listTransactions,
} = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions;
export default transactionsSlice.reducer;
