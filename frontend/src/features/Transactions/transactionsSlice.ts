import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ReponseTransactions } from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';
const token = getToken();
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

const initialState: ReponseTransactions = {
  data: [],
  error: null,
};

export const transactionsList = createAsyncThunk<ReponseTransactions, void>(
  'transactions/listTransactions',
  async () => {
    const response = await fetch('http://localhost:3001/transactions', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return (await response.json()) as ReponseTransactions;
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    deleteTransaction: (
      state,
      { payload }: PayloadAction<ReponseTransactions>
    ) => {
      if (!payload.error) {
        state.error = payload.error;
      } else {
        state.data = state.data.filter(
          (transaction) => transaction.id === payload.data[0].id
        );
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(transactionsList.fulfilled, (state, { payload }) => {
      state.data = [...payload.data];
    });
  },
});

export const { deleteTransaction } = transactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions;
export default transactionsSlice.reducer;
