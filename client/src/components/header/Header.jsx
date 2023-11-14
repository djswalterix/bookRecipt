import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../../css/Header.module.scss"; // Assicurati che il percorso sia corretto
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom"; // Assicurati di avere installato react-router-dom se stai utilizzando React Router
import LoginButton from "./LoginButton";
const Header = () => {
  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary ${style.header}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          RicettarioSmart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className={`navbar-nav ${style.nav}`}>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Ricettario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Profilo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Preferiti
              </Link>
            </li>
          </ul>
          <div className="ml-auto">
            <LoginButton isLoggedIn={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
