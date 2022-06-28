import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  ReponseTransactions,
  TransactionDocument,
} from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';
import { IActiveFilters, IFilterOptions } from '../../types/filter';
import { firstLetterUppercase } from '../../helpers/stringFormat';
import { listTransactions } from '../Transactions/transactionsSlice';

const token = getToken();

function filterUniqueCategory(transactions: TransactionDocument[]): string[] {
  const onlyCategories = transactions.map((transaction) =>
    transaction.category.toLowerCase()
  );
  const uniqueCategories = Array.from(new Set(onlyCategories));
  for (let category of uniqueCategories) {
    category = firstLetterUppercase(category);
  }

  return uniqueCategories;
}

const initialState: IFilterOptions = {
  categories: [],
  activeFilters: {},
};

export const listFilteredTransactions = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('transactions/listFilteredTransactions', async (_, thunkAPI) => {
  const activeFilters = thunkAPI.getState().filters.activeFilters;
  const response = await fetch('http://localhost:3001/filtertransactions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activeFilters),
  });
  const filteredTransactionList =
    (await response.json()) as ReponseTransactions;
  thunkAPI.dispatch(listTransactions(filteredTransactionList));
});

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateCategories: (
      state,
      { payload }: PayloadAction<TransactionDocument[]>
    ) => {
      state.categories = filterUniqueCategory(payload);
    },
    updateActiveFilters: (
      state,
      { payload }: PayloadAction<IActiveFilters>
    ) => {
      state.activeFilters = {};
      const activeFiltersName = Object.keys(payload);
      activeFiltersName.forEach((filter) => {
        if (filter === 'minValue' || filter === 'maxValue') {
          if (payload[filter]) {
            state.activeFilters[filter] = payload[filter];
          }
        }
        if (filter === 'categories' || filter === 'weekday') {
          if (payload[filter]?.length) {
            state.activeFilters[filter] = payload[filter];
          }
        }
      });
    },
  },
});

export const { updateCategories, updateActiveFilters } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
