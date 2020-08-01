import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Slider from 'react-input-slider';
import USGraph from './usgraph.component.js';

import '../App.css'

// "enum" for allowed graph modes
export const Modes = {
    AGG: 'Aggregate',
    INC: 'Increase',
}

// Time constants for date slider
const TODAY = new Date();
const DATE0 = new Date(2020, 0, 22) // Jan 22nd, 2020. First documented case in WA
const ONE_DAY = 1000*60*60*24;      // number of milliseconds in one day
const SPAN = Math.floor((TODAY-DATE0)/ONE_DAY); // days since first case

export default class NationalView extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            radioSelected: 'positive',                 // tracks selected statistic radio button
            mode: Modes.AGG,                           // Aggregate or rolling increase
            per_capita: false,                         // normalize data per capita?
            date: new Date(TODAY.getTime() - ONE_DAY)  // Currently selected date. Default to yesterday
            // data: this.loadData()                   // all historic covid data, fetched after mount (below)
        }
    }

    /**
     * Only make async request modifying state once component mounts so that
     * it does not have to immediately re-render on promise fulfillment
     * */
    async componentDidMount() {
        //console.log('mount state', this.state);
        let covidData = await this.loadData();
        this.setState({data: covidData});
        //console.log('state after load', this.state);
    }

    /**
     * Load and structure all historic US covid data from API on component mount.
     */
    async loadData() {
        try {
            let response = await fetch(`../api/covid-data/states`);
            if (!response.ok) {
                throw (response.error);
            }
            let json = await response.json();
            //console.log('covid data loaded', json);
            let data = this.structureData(json);
            return data;
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * Covid data is structured as a map (object), with primary keys being dates (YYYYMMDD date strings)
     * primary values are themselves map objects with: key=state abbreviation, value=state data for date
     * {    dateN: { "AL" : {alabama dateN data...},
     *               "AK" : {alaska  dateN data...},
     *          ...  "WY" : {wyoming dateN data...}
     *      },
     *  ... date0: { .... }
     * }
     */
    structureData(json) {
        let map = {};
        for (let entry of json) {
            if (!map[entry.date]) map[entry.date] = {};
            map[entry.date][entry.state] = entry;
        }
        return map;
    }
    
    /* Change Handlers: */
    /* basic handler:  use if solely updating value field */
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        //console.log(this.state);
    }
    handleCheck = (event) => {
        console.log('event', event);
        this.setState({[event.target.name]: event.target.checked});
        //console.log(this.state);
    }
    handleDate = ({y}) => { // unpack y from object {x: xval, y: yval} as parameter
        let nextDate = new Date(); 
        nextDate.setTime(DATE0.getTime()+y*ONE_DAY);
        this.setState({ date: nextDate })
    }
    
    render() {
        return (
            <Container className='grid-container national-view' fluid>
                <Row className='national-view-row'>
                    <Col xs='10' className='national-map'>
                        <USGraph state={this.state}/>
                    </Col>
                    <Col className='menu'>
                        <Form className='info-selector'>
                            <FormGroup tag="fieldset">
                                <FormGroup className="select-mode">
                                    <Label for="select-mode">Select Data Mode:</Label>
                                    <Input  type="select"
                                            name="mode"  
                                            id="select-type" 
                                            onChange={this.handleChange} >
                                        <option value={Modes.AGG}>Aggregate</option>
                                        <option value={Modes.INC}>Daily Increase</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup check>
                                    <Label for="per_capita" check>
                                    <Input 
                                        name="per_capita"
                                        type="checkbox"
                                        checked={this.state.per_capita}
                                        onChange={this.handleCheck}
                                    />{' '}
                                        Per Capita
                                    </Label>
                                </FormGroup><br/>
                                <Label for="select-statistic">Select Statistic:</Label>
                                <FormGroup id="select-statistic" check>
                                    <Label check>
                                    <Input  required // makes selecting one of the radioSelected group required
                                            type="radio" 
                                            name="radioSelected"
                                            value="positive"
                                            defaultChecked           // default value
                                            onClick={this.handleChange}/>{' '}
                                        Infections
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="hospitalizedCumulative"
                                            onClick={this.handleChange}/>{' '}
                                        Hospitalized
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="death"
                                            onClick={this.handleChange}/>{' '}
                                        Deaths
                                    </Label>
                                </FormGroup><br/>
                                <Label for="select-date">Select Date:</Label>
                                <FormGroup className="select-date" id="select-date">
                                    <Row>
                                        <Col xs="2">
                                            <Slider /* y value encodes the day since DAY0 */
                                                axis="y"
                                                ymin={0}
                                                ymax={SPAN}
                                                ystep={1}
                                                y={Math.floor((this.state.date.getTime() - DATE0)/ONE_DAY)}
                                                onChange={this.handleDate}
                                                yreverse
                                                styles={{
                                                    /*track: {
                                                      backgroundColor: 'blue'
                                                    },*/
                                                    active: {
                                                      backgroundColor: '#60828C'
                                                    },
                                                    thumb: {
                                                      width: 25,
                                                      //height: 40,
                                                      opacity: 0.8
                                                    }
                                                  }}
                                            />
                                        </Col>
                                        <Col xs="10" className="align-self-center">
                                            {this.state.date.toLocaleDateString()}
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}