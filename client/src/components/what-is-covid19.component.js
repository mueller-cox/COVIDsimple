import React, { Component, /*isValidElement*/ } from 'react';
/* import { Link } from 'react-router-dom'; */

import '../App.css';
import covid from '../images/covid.png';


export default class WhatIsCovid extends Component {
    render() {
        return (
            <div className="container">
                <div className="what-Is-project">
                    <div className="card-body">
                        <div className="inner">
                            <img className="covid-image-generic" src={covid} alt="covid-19 virus close-up" />
                        </div>
                        <h3 className="card-title mt-2">Coronavirous disease 2019</h3>
                        <h5 className="card-subtitle">What is it?</h5>
                        < br></br>
                        <div>
                            <a href="https://en.wikipedia.org/wiki/Coronavirus_disease_2019" className="btn btn-dark btn-sm float-left" title="Go to Wikipedia">Wikipedia</a>
                        </div>
                        < br></br>
                        <p className="card-text intro mt-3">"It is an infectious disease caused by severe
                        acute respiratory syndrome coronavirus 2 (SARS-CoV-2).
                        It was first identified in December 2019 in Wuhan, Hubei, China,
                        and has resulted in an ongoing pandemic.
                        The first confirmed case has been traced back to 17 November 2019 in Hubei.
                        As of 6 August 2020, more than 18.7 million cases have been reported
                        across 188 countries and territories, resulting in more than 706,000 deaths.
                        More than 11.3 million people have recovered.
                        Common symptoms include fever, cough, fatigue, shortness of breath,
                        and loss of smell and taste.While the majority of cases result in mild symptoms,
                        some progress to acute respiratory distress syndrome (ARDS) possibly precipitated
                        by cytokine storm, multi-organ failure, septic shock, and blood clots.
                        The time from exposure to onset of symptoms is typically around five days,
                        but may range from two to fourteen days."</p>
                    </div>
                </div>
                <div className='card-deck'>
                    <div className="card cardSet4">
                        <div className="card-body">
                            <h3 className="card-title mt-2">Symptoms</h3>
                            <h5 className="card-subtitle">Data from CDC</h5>
                            <ul className="card-text mt-3">
                                <li>Fever or chills</li>
                                <li>Cough</li>
                                <li>Shortness of breath</li>
                                <li>Difficult breathing</li>
                                <li>Fatigue</li>
                                <li>Muscle aches</li>
                                <li>Body aches</li>
                                <li>Headache</li>
                                <li>New loss of taste or smell</li>
                                <li>New loss of smell</li>
                                <li>Sore throat</li>
                                <li>Congestion</li>
                                <li>Runny nose</li>
                                <li>Nausea or vomiting</li>
                                <li>Diarrhea</li>
                            </ul>
                        </div>
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
                            className="btn CDC btn-dark btn-sm float-right"
                            title="Go to CDC-symptoms">Go to CDC
                        </a>
                    </div>
                    <div className="card cardSet5 ">
                        <div className="card-body">
                            <h3 className="card-title mt-2">Protect yourself</h3>
                            <h5 className="card-subtitle">Data from CDC</h5>
                            <p className="card-intro mt-3">Older adults and people who have severe underlying
                            medical conditions like heart or lung disease or
                            diabetes seem to be at higher risk for developing
                            serious complications from COVID-19 illness. More
                                information on Are you at higher risk for serious illness.</p>
                            <ul className="card-text-set5 mt-3">
                                <li>Know how it spreads</li>
                                <li>Wash you hands often</li>
                                <li>Avoid close contact</li>
                                <li>Cover your mouth and nose with a mask when around others</li>
                                <li>Cover coughs and sneezes</li>
                                <li>Clean and disinfect</li>
                                <li>Monitor Your Health Daily</li>
                            </ul>
                        </div>
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
                            className="btn CDC btn-dark btn-sm float-right"
                            title="Go to CDC-symptoms">Go to CDC
                        </a>
                    </div>
                    <div className="card cardSet6 ">
                        <div className="card-body">
                            <h3 className="card-title-white mt-2">Coping with stress</h3>
                            <h5 className="card-subtitle-white">Data from CDC</h5>
                            <p className='card-intro-white mt-3'>Stress during an infectious disease outbreak can sometimes cause the following:</p>
                            <ul className="card-text-set6 mt-3">
                                <li>Pandemic can be stressful</li>
                                <li>Wash you hands often</li>
                                <li>Take care of your mental health</li>
                                <li>Everyone reacts differently to stress situations</li>
                                <li>Take care of yourself and your community</li>
                                <li>Recovering from COVID-19 or ending home isolation</li>
                            </ul>
                        </div>
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html"
                            className="btn CDC btn-dark btn-sm float-right"
                            title="Go to CDC-symptoms">Go to CDC
                        </a>
                    </div>
                </div>
            </div >
        )
    }
}