import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
export default class Navbar extends Component {

    render() {
        return (
            // <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <nav className="navbar navbar-expand-lg">
                {/* <h1 className="navbar-brand">COVIDsimple</h1> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <Link to="/"className="nav-item nav-link">NationalView</Link>
                    <Link to="/state-view"className="nav-item nav-link">StateView</Link>
                    <Link to="/news" className="nav-item nav-link">News</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    </div>
                </div>
            </nav>
        );
    }
}