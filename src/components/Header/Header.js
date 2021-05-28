import React from "react";
import bmwLogo from "../../assets/bmw_logo.png";
import * as classes from "./Header.styles.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.Header}>
      <nav style={{ backgroundColor: "#fff", padding: "18px 0" }}>
        <NavLink to="/statistics">Stats</NavLink>
        <NavLink to="/">Home</NavLink>
      </nav>
      <img className={classes.logo} src={bmwLogo} alt="BMW logo" />
    </header>
  );
};

export default Header;
