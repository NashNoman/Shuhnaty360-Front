/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../../config';

export const getCities = createAsyncThunk('cities/getCities', async () => {
  try {
    const response = await axios.get(`${baseURL}/cities/api/`, {
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

export const getCity = createAsyncThunk('cities/getCity', async (id: any) => {
  try {
    const response = await axios.get(`${baseURL}/cities/api/${id}`, {
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

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [
      {
        id: 0,
        name: '',
      }
    ],
    city: {
      id: 0,
      name: '',
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.isLoading = false;
      })
      .addCase(getCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCities.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.isLoading = false;
      })
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default citiesSlice.reducer;
