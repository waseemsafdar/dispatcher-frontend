// src/features/partners/partnersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPartner } from './api'; // Import the getPartner function

// Create async thunk
export const fetchPartner = createAsyncThunk('partners/fetchPartner', async (credentials) => {
  const response = await getPartner(credentials);
  return response;
});

// Create slice
const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    partnerData: null,
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
      });
  },
});

export default partnersSlice.reducer;
