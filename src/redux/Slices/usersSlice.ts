/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../../config';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await axios.get(`${baseURL}/accounts/api/`, {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
});

export const getUser = createAsyncThunk('users/getUser', async (id: any) => {
  try {
    const response = await axios.get(`${baseURL}/accounts/api/${id}`, {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
});

export const addUser = createAsyncThunk('users/addUser', async (data: any) => {
  try {
    const response = await axios.post(`${baseURL}/accounts/api/`, data, {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
});

export const editUser = createAsyncThunk('users/editUser', async ({ id, data }: any) => {
  try {
    const response = await axios.put(
      `${baseURL}/accounts/api/${id}/`,
      data,
      {
        auth: {
          username: 'admin',
          password: 'admin',
        },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: any) => {
  try {
    const response = await axios.delete(`${baseURL}/accounts/api/${id}`, {
      auth: {
        username: 'admin',
        password: 'admin',
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {
      id: null,
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      is_active: false,
      is_staff: false,
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
