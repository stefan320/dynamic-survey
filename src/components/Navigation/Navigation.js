import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Navigation.styles";

const Navigation = (props) => {
  const classes = useStyles();
  return (
    <nav>
      <Button
        color="secondary"
        variant="contained"
        fontWeight={700}
        component={NavLink}
        to="/"
        className={[classes.ButtonMarginR, classes.Button]}
      >
        Home
      </Button>
      <Button
        component={NavLink}
        variant="contained"
        color="secondary"
        fontWeight={700}
        to="/statistics"
      >
        Statistics
      </Button>
    </nav>
  );
};

export default Navigation;
