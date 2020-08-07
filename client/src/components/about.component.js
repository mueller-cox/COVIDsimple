import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import '../App.css';
import covid19 from '../images/covid19.png';


export default class About extends Component {
    render() {
        return (
            <div className="container">
                <div className="about-project">
                    <div className="card-body">
                        <div className="inner">
                            <img className="covid-image" src={covid19} alt="covid-19 virus close-up" />
                        </div>
                        <h3 className="card-title mt-2">COVIDsimple</h3>
                        <h5 className="card-subtitle">A more intuitivi data representation</h5>
                        <p className="card-text mt-3">This project started with the idea of creating a site that would be able to represent
                        COVID-19 data in an accessible and visual way. This was meant to give the user an intuitive feeling of the complexity
                        of the pandemic and the seriousness of the problem. Due to the short time available for the project, we had to
                        scale-down the complexity of our graphical representation. </p>
                    </div>
                </div>
                <div className='card-deck'>
                    <div className="card cardSet1">
                        <div className="card-body">
                            <div className="inner">
                                <img src="https://avatars1.githubusercontent.com/u/21066381?s=400&u=f459405e8ac019e30cfa764d72c4cc432eacd0ce&v=4"
                                    alt="developer">
                                </img>
                            </div>
                            <h3 className="card-title mt-2">Connor Robetorye</h3>
                            <h5 className="card-subtitle">Graduate Student</h5>
                            <p className="card-text mt-3">Interests include lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            cupiditate laudantium
                            corrupti,
                            minima
                            dolore commodi eius. Ea, nam possimus laborum ab magnam quia ipsam nemo dolores? A doloribus
                        exercitationem aliquam.</p>
                            <a href="https://github.com/inordirection"
                                className="btn btn-dark btn-sm float-right"
                                title="Go to Connor gitHub page">GitHub
                            </a>
                        </div>
                    </div>
                    <div className="card cardSet2 ">
                        <div className="card-body">
                            <div className="inner">
                                <img src="https://avatars3.githubusercontent.com/u/27927826?s=460&u=cdc6fbdf407938cd1c23d940cf15a999fbc30491&v=4" alt="developer"></img>
                            </div>
                            <h3 className="card-title mt-2">Cosimo Gonnelli</h3>
                            <h5 className="card-subtitle">Graduate Student</h5>
                            <p className="card-text mt-3">I am a grad student at Portland State University interested in AI/ML and building new things.
                            I have experince in research with my previous Master and work experience in Psychology in Italy and US.
                            My hobbies are lifting heavy weights, and watching anime and documentaries of all kinds.</p>
                            <a href="https://github.com/cosimogonnelli"
                                className="btn btn-dark btn-sm float-right"
                                title="Go to Cosimo gitHub page" >GitHub
                            </a>
                        </div>
                    </div>
                    <div className="card cardSet3 ">
                        <div className="card-body">
                            <div className="inner">
                                <img src="https://avatars1.githubusercontent.com/u/6835377?s=400&u=6a4741de1ef918135a280438b02cbc28d42bb48b&v=4"
                                    alt="developer">
                                </img>
                            </div>
                            <h3 className="card-title mt-2">Meghan Mueller-Cox</h3>
                            <h5 className="card-subtitle">Graduate Student</h5>
                            <p className="card-text mt-3">I am a grad student at PSU. While at PSU my focus areas of study have been Databases and Security.
                            Prior to arriving at PSU I was a release manager and program manager at several software companies here in Portland.
                                                          In my spare time I like to play soccer, hike, go for bike rides, and spend time with my 2 dogs. </p>
                            <a href="https://github.com/mueller-cox"
                                className="btn btn-dark btn-sm float-right"
                                title="Go to Meghan gitHub page">GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}