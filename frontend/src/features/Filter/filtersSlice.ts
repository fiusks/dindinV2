import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  ReponseTransactions,
  TransactionDocument,
  transactionRegistration,
} from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';
import {
  IFilterOptions,
  IFiltersTransactions,
  IFiltersUpdate,
} from '../../types/filter';
import { firstLetterUppercase } from '../../helpers/stringFormat';
const token = getToken();

function filterUniqueCategory(
  transactions: TransactionDocument[]
): IFiltersTransactions[] {
  const filteredCategory = transactions
    .map((category) => {
      return category.category.toLowerCase();
    })
    .filter((value, index, arr) => arr.indexOf(value.toLowerCase()) === index)
    .map((category) => {
      return {
        filterName: firstLetterUppercase(category),
        state: false,
      };
    });
  return filteredCategory;
}

const initialState: IFilterOptions = {
  weekday: [
    { filterName: 'Segunda', state: false },
    { filterName: 'Terça', state: false },
    { filterName: 'Quarta', state: false },
    { filterName: 'Quinta', state: false },
    { filterName: 'Sexta', state: false },
    { filterName: 'Sábado', state: false },
    { filterName: 'Domingo', state: false },
  ],
  categories: [],
  minValue: [{ filterName: '', value: '', state: false }],
  maxValue: [{ filterName: '', value: '', state: false }],
};

// export const filterTransactions = createAsyncThunk<
//   ReponseTransactions,
//   IFilterOptions,
//   { state: RootState }
// >('transactions/addTransaction', async (_, thunkAPI) => {
//   const activeFilters = thunkAPI.getState().filters.data;
//   const response = await fetch('http://localhost:3001/filtertransactions', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(activeFilters),
//   });
//   return (await response.json()) as ReponseTransactions;
// });

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilterState: (state, { payload }: PayloadAction<IFiltersUpdate>) => {
      const filterType = payload.filterType;
      const index = state[filterType].findIndex(
        (filter) => filter.filterName === payload.filterName
      );
      state[filterType][index].state = !state[filterType][index].state;
    },
    updateCategories: (
      state,
      { payload }: PayloadAction<TransactionDocument[]>
    ) => {
      const categories = filterUniqueCategory(payload);
      state.categories = categories;
    },
    updateMaxMin: (state, { payload }: PayloadAction<IFiltersTransactions>) => {
      if (
        payload.filterName === 'minValue' ||
        payload.filterName === 'maxValue'
      ) {
        const updateElement = state[payload.filterName][0];
        updateElement.value = payload.value;
        updateElement.state = !updateElement.state;
      }
    },
  },
});

export const { updateFilterState, updateCategories, updateMaxMin } =
  filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
