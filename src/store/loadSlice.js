// src/store/loadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for saving load data
export const saveLoad = createAsyncThunk('load/saveLoad', async (loadData) => {
  const response = await axios.post('http://127.0.0.1:5000/load', loadData);
  return response.data;
});
export const getLoad = createAsyncThunk('load/getLoad', async (filters = {}) => {
  // Clean the filters object to remove any entries with no value
  const cleanedFilters = Object.keys(filters).reduce((acc, key) => {
    if (filters[key] !== null && filters[key] !== '' && filters[key] !== undefined) {
      acc[key] = filters[key];
    }
    return acc;
  }, {});

  const params = new URLSearchParams(cleanedFilters).toString();
  const response = await axios.get(`http://127.0.0.1:5000/load?${params}`);
  return response.data;
});




export const updateLoad = createAsyncThunk('load/updateLoad', async ({ id, loadData }) => {
  const response = await axios.put(`http://127.0.0.1:5000/load/${id}`, JSON.stringify(loadData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const fetchloadById = createAsyncThunk('load/fetchloadById', async (id) => { 
  const response = await axios.get(`http://127.0.0.1:5000/load/${id}`); 
  return response.data; 
});
export const deleteLoadById = createAsyncThunk('load/deleteLoadById', async (id) => { 
  const response = await axios.delete(`http://127.0.0.1:5000/load/${id}`); 
  return response.data; 
});



const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loadData: null,
    loadList: null,
    status: 'idle',
    error: null,
    isClearFilter: false,
  },
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
    clearFilters(state) {
      state.isClearFilter = true;
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
      .addCase(updateLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(fetchloadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadData = action.payload;
      })
      .addCase(deleteLoadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      })
      .addCase(getLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadList = action.payload;
      });
  },
});

export const { clearFilters, resetStatus } = loadSlice.actions;
export default loadSlice.reducer;
