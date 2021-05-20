import React from "react";
import bmwLogo from "../../assets/bmw_logo.png";
import * as classes from "./Header.styles.module.css";

const Header = () => {
  return (
    <header className={classes.Header}>
      <img className={classes.logo} src={bmwLogo} alt="BMW logo" />
    </header>
  );
};

export default Header;
