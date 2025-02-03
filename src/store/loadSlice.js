// src/store/loadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import RecommendedLoadForm from '../views/dashboard/components/RecommendedLoadForm';

// Async thunk for saving load data
export const saveLoad = createAsyncThunk('load/saveLoad', async (loadData) => {
  const response = await axios.post('http://18.118.168.39:5000/load', loadData);
  return response.data;
});


export const getRecomendedLoads = createAsyncThunk('load/getRecomendedLoads', async (filters = {}) => {
  // Clean the filters object to remove any entries with no value
  const cleanedFilters = Object.keys(filters).reduce((acc, key) => {
    if (filters[key] !== null && filters[key] !== '' && filters[key] !== undefined) {
      acc[key] = filters[key];
    }
    return acc;
  }, {});

  const params = new URLSearchParams(cleanedFilters).toString();
  const response = await axios.get(`http://18.118.168.39:5000/rec_loads?${params}`);
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
  const response = await axios.get(`http://18.118.168.39:5000/load?${params}`);
  return response.data;
});




export const updateLoad = createAsyncThunk('load/updateLoad', async ({ id, loadData }) => {
  const response = await axios.put(`http://18.118.168.39:5000/load/${id}`, JSON.stringify(loadData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

// export const syncData = createAsyncThunk('load/syncData', async (url) => { 
//   const response = await axios.get(`http://18.118.168.39:5000/${url}`); 
//   return response.data; 
// });


export const syncData = createAsyncThunk('load/syncData', async ({ url }) => {
  const dynamicUrl = `http://18.118.168.39:5000/${url}`;
  const response = await axios.get(dynamicUrl);
  return response.data;
});


export const fetchloadById = createAsyncThunk('load/fetchloadById', async (id) => { 
  const response = await axios.get(`http://18.118.168.39:5000/load/${id}`); 
  return response.data; 
});
export const deleteLoadById = createAsyncThunk('load/deleteLoadById', async (id) => { 
  const response = await axios.delete(`http://18.118.168.39:5000/load/${id}`); 
  return response.data; 
});



const loadSlice = createSlice({
  name: 'load',
  initialState: {
    loadData: null,
    loadList: null,
    RecommendedLoadList: null,
    status: 'idle',
    error: null,
    filters: {},
    isClearFilter: false,
    isBackFromDetail : false,
  },
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
    },
    clearFilters(state) {
      state.isClearFilter = true;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setBackFromDetail(state, action) {
      state.isBackFromDetail = action.payload;
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
      .addCase(syncData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      })
      .addCase(getLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadList = action.payload;
      })
      .addCase(getRecomendedLoads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.RecommendedLoadList = action.payload;
      });
  },
});

export const { clearFilters, resetStatus, setFilters , setBackFromDetail} = loadSlice.actions;
export default loadSlice.reducer;
