// src/features/partners/partnersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPartnerdata, getPartner, getTrailer } from './api'; // Import the getPartner function
import axios from 'axios';

// Create async thunk
export const fetchPartner = createAsyncThunk('partners/fetchPartner', async (credentials) => {
  const response = await getPartner(credentials);
  return response;
});
export const fetchPartnerById = createAsyncThunk('partner/fetchById', async (id) => { 
  const response = await axios.get(`http://127.0.0.1:5000/partners/${id}`,{ withCredentials: true }); 
  return response.data; 
});
export const getpartners = createAsyncThunk('partners/getAll', async () => {
  const response = await axios.get('http://127.0.0.1:5000/partners');
  return response.data;
});
export const fetchTrailer = createAsyncThunk('trailer/fetchTrailer', async (credentials) => {
  const response = await getTrailer(credentials);
  return response;
});

export const addPartner = createAsyncThunk('partners/addPartner', async (data) => {
  const response = await addPartnerdata(data);
  return response;
});
export const updatePartnerById = createAsyncThunk(
  'partners/updatePartnerById', // Action name
  async ({ id, values }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/partners/${id}`, // URL with ID
        JSON.stringify(values), // JSON payload
        {
          headers: {
            'Content-Type': 'application/json', // Ensure proper header
          },
        }
      );
      return response.data; // Return the API response data
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
);
// Create slice
const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    partnerData: null,
    partnersData: null,
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
      })
      .addCase(getpartners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partnersData = action.payload;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partnerData = action.payload;
      })
      .addCase(addPartner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partnerData = action.payload;
      });
  },
});

export default partnersSlice.reducer;
