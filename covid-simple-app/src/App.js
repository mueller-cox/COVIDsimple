import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import NationalView from "./components/national.component";
import StateView from "./components/state-view.component";
import NewsList from "./components/news-list.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={NationalView} />
      <Route path="/state_view" exact component={StateView} />
      <Route path="/news" exact component={NewsList} />
    </Router>
    
  );
}

export default App;
