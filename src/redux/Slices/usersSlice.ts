import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../../config";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(`${baseURL}/api/accounts/users/`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    console.log(response.data);

    return response.data.data;
  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    throw err;
  }
});

export const getUser = createAsyncThunk("users/getUser", async (id: any) => {
  try {
    const response = await axios.get(`${baseURL}/api/accounts/users/${id}`, {
      auth: {
        username: "admin",
        password: "admin",
      },
    });
    console.log(response.data);

    return response.data;
  } catch (err: any) {
    console.error("API Error:", err.response?.data || err.message);
    throw err;
  }
});

export const addUser = createAsyncThunk("users/addUser", async (data: any) => {
  try {
    const response = await axios.post(`${baseURL}/api/accounts/users/`, data, {
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

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }: any) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/accounts/users/${id}/`,
        data,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        },
      );
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: any) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/accounts/users/${id}`,
        {
          auth: {
            username: "admin",
            password: "admin",
          },
        },
      );
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {
      id: null,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
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
