// Home.js
import React from "react";
import Header from "./header/Header";

const Home = () => {
  return (
    <div>
      <Header isAuthenticated={false} onLogout={() => {}} />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Contenuto della Home</h2>
        <p>Aggiungi qui il contenuto della tua home page.</p>
      </div>
    </div>
  );
};

export default Home;
