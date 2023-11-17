import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index"; // Assicurati che il percorso sia corretto

const store = configureStore({
  reducer: rootReducer, // Passa il tuo reducer combinato come argomento
  // Altri opzioni se necessario
});
export default store;
