// src/store/loadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for saving load data
export const saveLoad = createAsyncThunk('load/saveLoad', async (loadData) => {
  const response = await axios.post('http://127.0.0.1:5000/load', loadData);
  return response.data;
});
export const getLoad = createAsyncThunk('load/getLoad', async () => {
  const response = await axios.get('http://127.0.0.1:5000/load');
  return response.data;
});

const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loadData: null,
    loadList: null,
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
      })
      .addCase(getLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadList = action.payload;
      });
  },
});

export const { resetStatus } = loadSlice.actions;
export default loadSlice.reducer;
