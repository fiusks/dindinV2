import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  IUserLoginError,
  UserDataResponse,
  IUserLoginData,
} from '../../types/users';

const initialState: UserDataResponse = {
  data: { id: '', accessToken: '' },
  error: null,
};

export const userLogin = createAsyncThunk<
  UserDataResponse,
  IUserLoginData,
  {
    rejectValue: IUserLoginError;
  }
>('user/userLogin', async (payload, thunkApi) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/auth/signin`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
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
      const { id, accessToken } = payload.data;
      localStorage.setItem('token', accessToken);
      if (id && accessToken) {
        state.data.id = id;
        state.data.accessToken = accessToken;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      if (action.payload?.error) {
        state.error = action.payload.error;
      }
    });
  },
});

export const { userLogout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
