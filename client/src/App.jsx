import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./redux/store"; // Assicurati che il percorso sia corretto
import Home from "./components/Home";
import SignIn from "./components/sign-in/SignIn";
import { logout } from "./redux/reducers/authSlice.reducer"; // Importa l'azione logout

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch dell'azione logout
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          {/* Aggiungi altre route secondo necessità */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
