import React from "react";
import style from "../../css/LoginButton.module.scss"; // Importa il file SCSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom"; // Importa il componente Link
function loginButton({ isLoggedIn }) {
  console.log(isLoggedIn);
  return (
    <div className={style.loginButton}>
      <Link to={`/`}>
        <FontAwesomeIcon icon={isLoggedIn ? faSignOutAlt : faSignInAlt} />
      </Link>
    </div>
  );
}

export default loginButton;
