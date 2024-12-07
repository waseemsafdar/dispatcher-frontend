import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi } from './api';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginApi(credentials);
  // Save user data to local storage
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user from local storage
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user'); // Remove user from local storage on logout
    },
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
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
