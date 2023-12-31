import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store"; // Assicurati che il percorso sia corretto
import Home from "./components/Home";
import SignIn from "./components/sign-in/SignIn";
import ReciperPage from "./components/reciper/ReciperPage";
import EditReciperPage from "./components/editReciper/ReciperPage";
import Registration from "./components/sign-in/Registration";
import { logout } from "./redux/reducers/authSlice.reducer"; // Importa l'azione logout
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./components/Theme";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch dell'azione logout
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/sign-in" element={<SignIn />} />
            <Route exact path="/registration" element={<Registration />} />

            <Route
              path="/reciper"
              element={
                <ProtectedRoute>
                  <ReciperPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-recipe-book"
              element={
                <ProtectedRoute>
                  <EditReciperPage />
                </ProtectedRoute>
              }
            />
            {/* Aggiungi altre route secondo necessità */}
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
