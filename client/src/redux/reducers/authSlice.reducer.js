import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../assets/js/api";

// Initial state with authentication status and user role
const initialState = {
  isAuthenticated: !!localStorage.getItem("token"), // Initially, the user is not authenticated
  role: localStorage.getItem("role") || null, // Retrieve the role from localStorage
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.removeItem("expirationTime"); // Remove expiration time from localStorage
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      // Additional state updates as needed
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role"); // Add this line
      // Additional cleanup as necessary
    },
    // Your synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        localStorage.setItem("role", action.payload.user.role); // Add this line
        localStorage.setItem("token", action.payload.token); // Ensure the token is saved
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { loginSuccess, logout, setUserLoggedIn } = authSlice.actions;
export default authSlice.reducer;
