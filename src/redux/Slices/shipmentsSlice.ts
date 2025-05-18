/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "./../../../config";

export const getShipments = createAsyncThunk(
  "shipments/getShipments",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/api/shipments/api/`, {
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

export const getShipment = createAsyncThunk(
  "shipments/getShipment",
  async (id: any) => {
    try {
      const response = await axios.get(`${baseURL}/api/shipments/api/${id}`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
);

export const getShipmentsStatus = createAsyncThunk(
  "shipments/getShipmentsStatus",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/api/shipments/api/status`, {
        auth: {
          username: "admin",
          password: "admin",
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
);

export const addShipment = createAsyncThunk(
  "shipments/addShipment",
  async (shipment: any) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/shipments/api/`,
        shipment,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      return response.data.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
);

export const updateShipment = createAsyncThunk(
  "shipments/updateShipment",
  async (shipment: any) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/shipments/api/`,
        shipment,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      return response.data.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
);

export const deleteShipment = createAsyncThunk(
  "shipments/deleteShipment",
  async (id: any) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/shipments/api/${id}`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        }
      );
      return response.data.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }
);

const shipmentsSlice = createSlice({
  name: "shipments",
  initialState: {
    shipments: [
      {
        origin_city: "",
        status: "",
      },
    ],
    shipment: {
      driver: 0,
      origin_city: "",
      destination_city: "",
      status: "",
      fare: 0,
      premium: 0,
      deducted: 0,
      recipient: null,
      client: null,
      user: null,
      client_branch: 0,
      weight: 0,
      contents: "",
      history: [],
      expected_arrival_date: null,
      actual_delivery_date: null,
      client_invoice_number: "",
      days_to_arrive: 0,
      days_stayed: 0,
      stay_cost: 0,
      fare_return: 0,
      loading_at: null,
      total_cost: null,
      notes: "",
    },
    shipmentsStatus: [
      {
        id: null,
        name_ar: "",
        name_en: "",
      },
    ],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShipments.fulfilled, (state, action) => {
      state.shipments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getShipments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShipments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getShipment.fulfilled, (state, action) => {
      state.shipment = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getShipment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShipment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getShipmentsStatus.fulfilled, (state, action) => {
      state.shipmentsStatus = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getShipmentsStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShipmentsStatus.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default shipmentsSlice.reducer;
