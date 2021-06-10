import React from "react";
import Header from "./components/Header/Header";

import FormStart from "./pages/FormStart";
import FormStepTwo from "./pages/FormStepTwo";
import FormStepThree from "./pages/FormStepThree";
import Statistics from "./pages/Statistics/Statistics";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0a2342",
    },
    secondary: {
      main: "#e8f1f2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ backgroundColor: "#0a2342" }}>
          <Header />
        </div>
        <div style={{ backgroundColor: "#e8f1f2" }}>
          <Switch>
            <Route exact path="/" component={FormStart} />
            <Route exact path="/step-two" component={FormStepTwo} />
            <Route exact path="/step-three" component={FormStepThree} />
            <Route exact path="/statistics" component={Statistics} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
