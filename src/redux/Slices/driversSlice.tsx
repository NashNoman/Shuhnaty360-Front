/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../config";

export const getDrivers = createAsyncThunk("drivers/getDrivers", async () => {
  try {
    const response = await axios.get(`${baseURL}/api/drivers/api/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });

    return response.data;
  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    throw err;
  }
});

export const getDriver = createAsyncThunk(
  "drivers/getDriver",
  async (id: any) => {
    try {
      const response = await axios.get(`${baseURL}/api/drivers/api/${id}`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  }
);

export const addDriver = createAsyncThunk(
  "drivers/addDriver",
  async (data: any) => {
    try {
      const response = await axios.post(`${baseURL}/api/drivers/api/`, data, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  }
);

export const deleteDriver = createAsyncThunk(
  "drivers/deleteDriver",
  async (id: any) => {
    try {
      const response = await axios.delete(`${baseURL}/api/drivers/api/${id}`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  }
);

export const editDriver = createAsyncThunk(
  "drivers/editDriver",
  async ({ id, data }: any) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/drivers/api/${id}`,
        data,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  }
);

export const getTruckTypes = createAsyncThunk(
  "drivers/getTruckTypes",
  async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/drivers/api/TruckType/`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  }
);

const driversSlice = createSlice({
  name: "drivers",
  initialState: {
    drivers: [
      {
        id: 0,
        name: "",
      },
    ],
    driver: {
      id: 0,
      name: "",
      vehicle_number: "",
      truck_type: null,
      phone_number: "",
      status: "",
      identity_number: "",
      nationality: "",
    },
    isLoading: false,
    truckTypes: [
      {
        id: null,
        name_ar: "",
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDrivers.fulfilled, (state, action) => {
      state.drivers = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDrivers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDrivers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDriver.fulfilled, (state, action) => {
      state.driver = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDriver.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDriver.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTruckTypes.fulfilled, (state, action) => {
      state.truckTypes = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getTruckTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTruckTypes.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default driversSlice.reducer;
