import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/User/userSlice';
import transactionsReducer from '../features/Transactions/transactionsSlice';
import filtersReducer from '../features/Filter/filtersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    transactions: transactionsReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
