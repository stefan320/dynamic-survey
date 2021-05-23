import React from "react";
import Header from "./components/Header/Header";

import FormStart from "./pages/FormStart";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>

      <Switch>
        <Route exact path="/" component={FormStart} />
        <Route exact path="/step-two" component={FormStart} />
      </Switch>
    </Router>
  );
}

export default App;
