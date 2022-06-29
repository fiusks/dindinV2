import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TransactionListResponse } from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';
import { IActiveFilters, IFilterOptions } from '../../types/filter';
import { listTransactions } from '../Transactions/transactionsSlice';
import { IResponse } from '../../types/api';

const token = getToken();

type ReponseTransactions = IResponse<TransactionListResponse>;

function filterUniqueCategory(transactions: string[]): string[] {
  return Array.from(new Set(transactions));
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
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/filtertransactions`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activeFilters),
    }
  );
  const { data } = (await response.json()) as ReponseTransactions;
  thunkAPI.dispatch(listTransactions(data.transactions));
  thunkAPI.dispatch(updateCategories(data.categories));
});

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateCategories: (
      state,
      { payload }: PayloadAction<string[] | string>
    ) => {
      if (typeof payload === 'string') {
        const categories = [...state.categories, payload];
        state.categories = filterUniqueCategory(categories);
      } else {
        state.categories = filterUniqueCategory(payload);
      }
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
