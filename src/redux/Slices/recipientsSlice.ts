/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../config";

export const getRecipients = createAsyncThunk(
  "recipients/getRecipients",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/api/recipient/api/`, {
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

export const getRecipient = createAsyncThunk(
  "recipients/getRecipient",
  async (id: any) => {
    try {
      const response = await axios.get(`${baseURL}/api/recipient/api/${id}`, {
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

const recipientsSlice = createSlice({
  name: "recipients",
  initialState: {
    recipients: [
      {
        id: 0,
      },
    ],
    recipient: {
      id: 0,
      name: "",
      address: "",
      email: "",
      phone_number: "",
      second_phone_number: "",
    },
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipients.fulfilled, (state, action) => {
      state.recipients = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getRecipients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipients.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getRecipient.fulfilled, (state, action) => {
      state.recipient = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getRecipient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipient.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default recipientsSlice.reducer;
