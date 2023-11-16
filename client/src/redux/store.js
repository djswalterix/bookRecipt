import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.reducer"; // Assicurati che il percorso sia corretto

const store = configureStore({
  reducer: {
    auth: authReducer,
    // altri reducer...
  },
});
export default store;
