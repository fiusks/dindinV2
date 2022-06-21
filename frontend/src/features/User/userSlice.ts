import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  IUserLoginError,
  UserDataResponse,
  UserLogin,
} from '../../types/users';

const initialState: UserDataResponse = {
  data: { id: '', accessToken: '' },
  error: null,
};

export const userLogin = createAsyncThunk<
  UserDataResponse,
  UserLogin,
  {
    rejectValue: IUserLoginError;
  }
>('user/userLogin', async (payload, thunkApi) => {
  const response = await fetch('http://localhost:3001/api/auth/signin', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (response.status === 404) {
    return thunkApi.rejectWithValue((await response.json()) as IUserLoginError);
  }
  return (await response.json()) as UserDataResponse;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data.accessToken = '';
      state.data.id = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.error = null;
      console.log(payload, 'pay');
      const { id, accessToken } = payload.data;
      if (id && accessToken) {
        state.data.id = id;
        state.data.accessToken = accessToken;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log('erro?');
      if (action.payload?.error) {
        state.error = action.payload.error;
      }
    });
  },
});

export const { userLogout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
