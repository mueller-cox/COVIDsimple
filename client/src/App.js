import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import NationalView from "./components/national-view.component";
import StateView from "./components/state-view.component";
import NewsList from "./components/news-list.component"; 
import About from "./components/about.component";
import Help from "./components/help.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={NationalView} />
      <Route path="/state-view" exact component={StateView} />
      <Route path="/news" exact component={NewsList} />
      <Route path="/About" exact component={About} />
      <Route path="/Help" exact component={Help} />

    </Router>
    
  );
}

export default App;
