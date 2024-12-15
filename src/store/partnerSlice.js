// src/features/partners/partnersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPartner, getTrailer } from './api'; // Import the getPartner function

// Create async thunk
export const fetchPartner = createAsyncThunk('partners/fetchPartner', async (credentials) => {
  const response = await getPartner(credentials);
  return response;
});
export const fetchTrailer = createAsyncThunk('trailer/fetchTrailer', async (credentials) => {
  const response = await getTrailer(credentials);
  return response;
});

// Create slice
const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    partnerData: null,
    tarilerData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partnerData = action.payload;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTrailer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tarilerData = action.payload;
      });
  },
});

export default partnersSlice.reducer;
