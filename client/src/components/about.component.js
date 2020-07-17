import React, { Component } from 'react';
import { Button, Jumbotron } from 'reactstrap';
/* import { Link } from 'react-router-dom'; */

import '../App.css';

export default class About extends Component {
    /*constructor(props) { super(props); } */
    render() {
        return (
            <div className="container">
                    <div class="about-project">
                        <div class="card-body">
                            <div class="inner">
                            </div>
                            <h3 class="card-title mt-2">COVIDsimple</h3>
                            <h5 class="card-subtitle">A more intuitivi data representation</h5>
                            <p class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                    </div>
                </div>
                <div class='card-deck'>
                    <div class="card cardSet1">
                        <div class="card-body">
                            <div class="inner">
                                {/* DOTO add image here */}
                            </div>
                            <h3 class="card-title mt-2">Connor Robetorye</h3>
                            <h5 class="card-subtitle">Graduate Student</h5>
                            <p class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                            <a href="https://github.com/inordirection" class="btn btn-dark btn-sm float-right">GitHub</a>
                        </div>
                    </div>
                    <div class="card cardSet2 ">
                        <div class="card-body">
                            <div class="inner">
                                {/* DOTO add image here */}
                            </div>
                            <h3 class="card-title mt-2">Cosimo Gonnelli</h3>
                            <h5 class="card-subtitle">Graduate Student</h5>
                            <p class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                            <a href="https://github.com/cosimogonnelli" class="btn btn-dark btn-sm float-right">GitHub</a>
                        </div>
                    </div>
                    <div class="card cardSet3 ">
                        <div class="card-body">
                            <div class="inner">
                                {/* DOTO add image here */}
                            </div>
                            <h3 class="card-title mt-2">Meghan Mueller-Cox</h3>
                            <h5 class="card-subtitle">Graduate Student</h5>
                            <p class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                            <a href="https://github.com/mlmcx" class="btn btn-dark btn-sm float-right">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}