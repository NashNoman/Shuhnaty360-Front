import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../config";

export const getClients = createAsyncThunk("clients/getClients", async () => {
  try {
    const response = await axios.get(`${baseURL}/api/clients/api/`, {
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

export const getClient = createAsyncThunk(
  "clients/getClient",
  async (id: any) => {
    try {
      const response = await axios.get(`${baseURL}/api/clients/api/${id}`, {
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
  },
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (data: any) => {
    try {
      const response = await axios.post(`${baseURL}/api/clients/api/`, data, {
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
  },
);

export const editClient = createAsyncThunk(
  "clients/editClient",
  async ({ id, data }: any) => {
    try {
      const response = await axios.put(`${baseURL}/api/clients/${id}/`, data, {
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
  },
);

export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id: any) => {
    try {
      const response = await axios.delete(`${baseURL}/api/clients/api/${id}`, {
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
  },
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [
      {
        id: 0,
        name: "",
        address: "",
        phone_number: "",
        second_phone_number: "",
        email: "",
        branches: [{ id: null, name: "" }],
      },
    ],
    client: {
      id: 0,
      name: "",
      email: "",
      phone_number: "",
      second_phone_number: "",
      address: "",
      client_branch: 0,
      dicription: "",
      branches: [
        {
          id: null,
          name: "",
          address: "",
          name_address: "",
          phone_number: "",
          second_phone_number: "",
        },
      ],
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClients.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getClient.fulfilled, (state, action) => {
      state.client = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getClient.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default clientsSlice.reducer;
