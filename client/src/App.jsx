// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    // Aggiorna lo stato di autenticazione
    setAuthenticated(false);
    // Esegui eventuali altre azioni di logout necessarie
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

        {/* Aggiungi altre route secondo necessità */}
      </Routes>
    </Router>
  );
};

export default App;
