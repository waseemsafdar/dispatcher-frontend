// src/features/locations/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for saving location data
export const saveLocation = createAsyncThunk('locations/saveLocation', async (locationData) => {
  const response = await axios.post('http://127.0.0.1:5000/locations', locationData);
  return response.data;
});

export const getLocations = createAsyncThunk('locations/getAll', async () => {
  const response = await axios.get('http://127.0.0.1:5000/locations');
  return response.data;
});

export const fetchLocationById = createAsyncThunk('locations/fetchById', async (id) => { 
  const response = await axios.get(`http://127.0.0.1:5000/locations/${id}`); 
  return response.data; 
});
export const updateLocationById = createAsyncThunk(
  'locations/updateLocationById', // Action name
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/locations/${id}`, // URL with ID
        data, // JSON payload
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


const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locationData: null,
    location : null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locationData = action.payload;
      })
      .addCase(saveLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locationData = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(fetchLocationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      })
      .addCase(updateLocationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      });
  },
});

export default locationsSlice.reducer;
