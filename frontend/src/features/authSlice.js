// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username, // Change email to username
        password,
      });
      localStorage.setItem("token", response.data.token); // Store JWT
      return response.data.data; // Assuming response.data.data contains user info
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Store user data
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set error message
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
