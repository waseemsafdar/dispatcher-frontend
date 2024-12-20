import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, logout } from './api';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginApi(credentials, { withCredentials: true });
  // Save user data to local storage
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});
export const logoutuser = createAsyncThunk('auth/logout', async () => {
  const response = await logout();
  return response;
});

const initialState = {
  user: localStorage?.getItem('user')? JSON.parse(localStorage?.getItem('user')) : null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(logoutuser.fulfilled, (state, action) => {
        state.status = 'idle';
        localStorage.removeItem('user');

        state.user = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
