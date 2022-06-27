import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  ReponseTransactions,
  TransactionDocument,
  transactionRegistration,
} from '../../types/transactions';
import { getToken } from '../../helpers/Auth/authHeader';
import {
  IActiveFilters,
  IFilterOptions,
  IFiltersTransactions,
} from '../../types/filter';
import { firstLetterUppercase } from '../../helpers/stringFormat';
const token = getToken();

function filterUniqueCategory(
  transactions: TransactionDocument[]
): IFiltersTransactions {
  const filteredCategories: IFiltersTransactions = {};
  transactions
    .map((transaction) => transaction.category.toLowerCase())
    .filter((value, index, arr) => arr.indexOf(value.toLowerCase()) === index)
    .map((category) => {
      const categoryName = firstLetterUppercase(category);
      filteredCategories[categoryName] = false;
      return;
    });
  return filteredCategories;
}

const initialState: IFilterOptions = {
  weekday: {
    Segunda: false,
    Terça: false,
    Quarta: false,
    Quinta: false,
    Sexta: false,
    Sábado: false,
    Domingo: false,
  },
  categories: {},
  minValue: '',
  maxValue: '',
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
    updateFilterState: (state, { payload }: PayloadAction<IActiveFilters>) => {
      const filters = Object.keys(payload);
      filters.forEach((filterName) => {
        if (filterName === 'minValue' || filterName === 'maxValue') {
          payload[filterName]
            ? (state[filterName] = payload[filterName])
            : (state[filterName] = '');
        }
        if (filterName === 'weekday' || filterName === 'categories') {
          const filterKeys = Object.keys(state[filterName]);
          const filterPayload = payload[filterName];
          if (filterPayload) {
            filterKeys.forEach((filterStateValue) => {
              const valor = filterPayload?.find(
                (filterPayloadValue) => filterPayloadValue === filterStateValue
              );
              valor
                ? (state[filterName][filterStateValue] = true)
                : (state[filterName][filterStateValue] = false);
            });
          }
        }
      });
    },
    updateCategories: (
      state,
      { payload }: PayloadAction<TransactionDocument[]>
    ) => {
      state.categories = filterUniqueCategory(payload);
    },
  },
});

export const { updateFilterState, updateCategories } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
