import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// How to import relevant component from the module for reactstrap
// import { Container, Row, Col} from 'reactstrap';

import NavMenu from "./components/navbar.component";
import NationalView from "./components/national-view.component";
import StateView from "./components/state-view.component";
import NewsList from "./components/news-list.component";
import About from "./components/about.component";
import WhatIsCovid from "./components/what-is-covid19.component";
import noMatch from "./components/404page.component";



function App() {
  return (
    <Router>
      <NavMenu />
      <br />
      <Switch>
        <Route path="/" exact component={NationalView} />
        <Route path="/state-view" exact component={StateView} />
        <Route path="/news" exact component={NewsList} />
        <Route path="/about" exact component={About} />
        <Route path="/What-is-covid19" exact component={WhatIsCovid} />
        <Route path="/404" exact component={noMatch} />
        <Redirect to="/404"/>
      </Switch>
    </Router>
  );
}

export default App;
