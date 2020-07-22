import React, { Component } from 'react';
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
                                <img src="https://avatars1.githubusercontent.com/u/21066381?s=400&u=f459405e8ac019e30cfa764d72c4cc432eacd0ce&v=4" alt="developer"></img>
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
                                <img src="https://avatars3.githubusercontent.com/u/27927826?s=460&u=cdc6fbdf407938cd1c23d940cf15a999fbc30491&v=4" alt="developer"></img>
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
                                <img src="https://avatars1.githubusercontent.com/u/6835377?s=400&u=6a4741de1ef918135a280438b02cbc28d42bb48b&v=4" alt="developer"></img>
                            </div>
                            <h3 class="card-title mt-2">Meghan Mueller-Cox</h3>
                            <h5 class="card-subtitle">Graduate Student</h5>
                            <p class="card-text mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                            <a href="https://github.com/mueller-cox" class="btn btn-dark btn-sm float-right">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}