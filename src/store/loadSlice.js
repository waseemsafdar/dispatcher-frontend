// src/store/loadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for saving load data
export const saveLoad = createAsyncThunk('load/saveLoad', async (loadData) => {
  const response = await axios.post('http://127.0.0.1:5000/load', loadData);
  return response.data;
});

const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loadData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveLoad.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadData = action.payload;
      })
      .addCase(saveLoad.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = loadSlice.actions;
export default loadSlice.reducer;
