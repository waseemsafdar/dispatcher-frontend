// src/store/loadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import RecommendedLoadForm from '../views/dashboard/components/RecommendedLoadForm';

// Async thunk for saving load data
export const saveLoad = createAsyncThunk('load/saveLoad', async (loadData) => {
  const response = await axios.post('http://18.118.168.39:5000/load', loadData);
  return response.data;
});

export const saveUserFilters = createAsyncThunk('load/saveUserFilters', async (filtersData) => {
  const response = await axios.post('http://18.118.168.39:5000/create_filter', filtersData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const getRecomendedLoads = createAsyncThunk('load/getRecomendedLoads', async (filters = {}) => {
  // Clean the filters object to remove any entries with no value
  const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
    if (value != null && value !== '' && key !== 'origin' && key !== 'destination') {
      acc[key] = value;
    }
    return acc;
  }, {});

  const params = new URLSearchParams(cleanedFilters).toString();
  const response = await axios.get(`http://18.118.168.39:5000/rec_loads?${params}`);
  return response.data;
});

export const getLoad = createAsyncThunk(
  'load/getLoad',
  // Accept one object as argument
  async ({ filters = {}, perPage = 25, page = 1 }) => {
    // Clean the filters object
    const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value != null && value !== '' && key !== 'origin' && key !== 'destination') {
        acc[key] = value;
      }
      return acc;
    }, {});
    cleanedFilters.per_page = perPage;
    cleanedFilters.page = page;

    const params = new URLSearchParams(cleanedFilters).toString();
    const response = await axios.get(`http://18.118.168.39:5000/load?${params}`);
    return response.data;
  }
);

export const updateLoad = createAsyncThunk('load/updateLoad', async ({ id, loadData }) => {
  const response = await axios.put(`http://18.118.168.39:5000/load/${id}`, JSON.stringify(loadData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const updateDeliveryStatus = createAsyncThunk(
  'delivery/updateStatus',
  async ({ deliveryId, onTime }) => {
    const response = await axios.put(
      `http://18.118.168.39:5000/delivery_status/${deliveryId}`,
      JSON.stringify({ stop_status: onTime }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
);

export const restLoad = createAsyncThunk('load/resetload', async ({ id }) => {
  const response = await axios.put(`http://18.118.168.39:5000/reset_load/${id}`);
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

export const fetchFiltersByUserId = createAsyncThunk('load/fetchFiltersByUserId', async (id) => { 
  const response = await axios.get(`http://18.118.168.39:5000/user_filter/${id}`); 
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

export const deleteSavedFilterById = createAsyncThunk('load/deleteSavedFilterById', async (id) => { 
  const response = await axios.delete(`http://18.118.168.39:5000/remove_filter/${id}`); 
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
    userFilters: {},
    isFilterChanges: false,
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
      .addCase(restLoad.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(fetchloadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loadData = action.payload;
        state.RecommendedLoadList= null
      })
      .addCase(fetchFiltersByUserId.pending, (state) => {
        state.isFilterChanges = false;
      })
      .addCase(fetchFiltersByUserId.fulfilled, (state, action) => {
        state.isFilterChanges = true;
        state.userFilters = action.payload;
      })
      .addCase(deleteLoadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      })
      .addCase(deleteSavedFilterById.fulfilled, (state, action) => {
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
      })
      .addCase(updateDeliveryStatus.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      });
  },
});

export const { clearFilters, resetStatus, setFilters , setBackFromDetail} = loadSlice.actions;
export default loadSlice.reducer;
