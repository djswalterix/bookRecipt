import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../assets/js/api";
const initialState = {
  registrationStatus: "idle",
  loading: false, // Indica se una richiesta è in corso
  error: null, // Eventuali errori durante le richieste
};

import axios from "axios";

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
      return rejectWithValue(error.response.data);
    }
  }
);
const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationStatus = "succeeded";
        // Aggiungi qui qualsiasi altro aggiornamento di stato necessario
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.registrationStatus = "failed";
        state.error = action.payload; // Assicurati che il payload contenga l'errore
      });
  },
});

export default registrationSlice.reducer;
