import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false, // Inizialmente l'utente non è autenticato
};

import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
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
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      // aggiungi altri aggiornamenti di stato necessari
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    // i tuoi reducer sincroni qui
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
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

/*
const initialState = {
  query: "",
  apiCache: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "ADD_TO_CACHE":
      return {
        ...state,
        apiCache: {
          ...state.apiCache,
          [action.key]: action.data,
        },
      };
    case "GET_FROM_CACHE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
*/
