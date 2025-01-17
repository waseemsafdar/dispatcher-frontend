// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for saving user data
export const saveUser = createAsyncThunk('users/saveUser', async (userData) => {
  const response = await axios.post('http://18.118.168.39:5000/users/', userData);
  return response.data;
});

export const getUsers = createAsyncThunk('users/', async () => {
  const response = await axios.get('http://18.118.168.39:5000/users');
  return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchById', async (id) => { 
  const response = await axios.get(`http://18.118.168.39:5000/users/${id}`); 
  return response.data; 
});

export const updateUserById = createAsyncThunk(
  'users/updateUserById', // Action name
  async ({ id, values }) => {
    try {
      const response = await axios.put(
        `http://18.118.168.39:5000/users/${id}`, // URL with ID
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

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userData: [],
    user: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  },
});

export default usersSlice.reducer;