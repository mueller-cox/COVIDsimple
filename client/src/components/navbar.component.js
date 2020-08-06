import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';


import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';


// ALTERNATIVE HEADER
// export default class NavMenu extends Component {
//     render() {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);
//     return()
//     }

const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navbar">
            <Navbar color="faded" light expand="md">
                <Nav className="project-name"
                    title="project-name">COVIDsimple
                    </Nav>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/"
                                className="nav-item nav-link"
                                title="national-view">NationalView
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/state-view"
                                className="nav-item nav-link"
                                title="state-view">StateView
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/news"
                                className="nav-item nav-link"
                                title="news">News
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about"
                                className="nav-item nav-link"
                                title="about">About
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
export default NavMenu;

// ALTERNATIVE VERSION WITH BOOTSTRAP
// export default class Navbar extends Component {

//     render() {
//         return (
//             // <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <nav className="navbar navbar-expand-lg">
//                 {/* <h1 className="navbar-brand">COVIDsimple</h1> */}
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div className="navbar-nav">
//                     <Link to="/"className="nav-item nav-link">NationalView</Link>
//                     <Link to="/state-view"className="nav-item nav-link">StateView</Link>
//                     <Link to="/news" className="nav-item nav-link">News</Link>
//                     <Link to="/about" className="nav-item nav-link">About</Link>
//                     </div>
//                 </div>
//             </nav>
//         );
//     }
// }