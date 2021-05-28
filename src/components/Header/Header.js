import React from "react";
import bmwLogo from "../../assets/bmw_logo.png";
import Navigaition from "../Navigation/Navigation";
import { useStyles } from "./Header.styles";
import Container from "@material-ui/core/Container";

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.Header}>
      <Container>
        <div className={classes.Header__Container}>
          <div>
            <img className={classes.logo} src={bmwLogo} alt="BMW logo" />
          </div>
          <Navigaition />
        </div>
      </Container>
    </header>
  );
};

export default Header;
