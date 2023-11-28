import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../assets/js/api";

// Initial state for registration process
const initialState = {
  registrationStatus: "idle", // Indicates the status of the registration process
  loading: false, // Indicates if a request is in progress
  error: null, // Any errors during requests
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, surname, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/users", {
        name,
        surname,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle the error
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    // Reducers for synchronous actions (if any)
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationStatus = "succeeded";
        // Add any other necessary state updates here
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registrationStatus = "failed";
        state.error = action.payload; // Ensure the payload contains the error
      });
  },
});

export default registrationSlice.reducer;
