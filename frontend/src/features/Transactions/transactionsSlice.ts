import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ReponseTransactions } from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';

const initialState: ReponseTransactions = {
  data: [],
  error: null,
};

export const transactionsList = createAsyncThunk<ReponseTransactions, void>(
  'transactions/listTransactions',
  async () => {
    const token = getToken();
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
    deleteTransaction: (state, actions) => {
      console.log(state);
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
