// src/features/trailerTypes/trailerTypesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching trailer types
export const fetchTrailerTypes = createAsyncThunk('trailerTypes/fetchTrailerTypes', async () => {
  const response = await axios.get('https://api.example.com/trailer-types');
  return response.data;
});

const trailerTypesSlice = createSlice({
  name: 'trailerTypes',
  initialState: {
    trailerTypes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrailerTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrailerTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trailerTypes = action.payload;
      })
      .addCase(fetchTrailerTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default trailerTypesSlice.reducer;
