import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import $ from 'jquery';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // styling for Datepicker

import Graph from './graph.component.js'
import '../App.css';

const initialState = { // save initial state for reset
    graph: '',
    var: '',
    stateList: [],
    startDate: new Date('2020/07/18'),
    //startDate: new Date('2020/01/22'),
    endDate: new Date(),
    radioSelected: '',
    isSubmitted: false,
    payload: []
};

export default class StateView extends Component {
    constructor(props) {
        super(props);
        let initState = Object.assign({}, initialState) // copy state to avoid overwriting initialState
        this.state = initState;
    }

    /* Reset Handler */
    handleReset = (event) => {
        let initState = Object.assign({}, initialState)
        this.setState(initState);
    }

    /* Change Handlers: */
    handleChange = (event) => { // use if solely updating value field
        this.setState({[event.target.name]: event.target.value});
        //console.log(this.state);
    }
    handleChangeStates = (event) => {
        // Use jQuery to get all values from select[multiple]
        this.setState({[event.target.name] : $('#select-states').val()});
        //console.log(this.state);
    }
    handleChangeStartDate = (date) => {
        this.setState({ startDate : date });
    }
    handleChangeEndDate = (date) => {
        this.setState({ endDate : date });
    }

    /* Submit handler: fetch requested data from API, start Graph render*/
    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log('State on submit:', this.state);
        
        let data = await this.fetchStatesData();
        let filtered = await this.filterStatesData(data);
        //console.log('Fetched data', data);
        this.setState({ payload: filtered });
        this.setState({ isSubmitted: true }); // triggers Graph to render
    }

    /* Helpers to Submit handler: */
    /*  method:     fetchStatesData:
        purpose:    use current this.state.stateList variable to fetch historic data for all requested states
        return:     [stateData1, stateData2...], where each stateData is an array in reverse-chron order*/
    fetchStatesData = async () => {
        let data = []; // array whose entries correspond to states' historical data
        for (const state of this.state.stateList) {
            let stateCode = state.toLowerCase();
            let url =`../api/covid-data/${stateCode}`;
            //console.log('Fetching data:', state);
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw (response.error);
                }
                let json = await response.json();
                await data.push(json);
            } catch(error) {
                console.error(error);
            }
        }
        return data;
    }
    /**
     * method:  filterStatesData:
     * purpose: use current this.state variables filter states' data down to match user request,
     *          for passing to <Graph> component
     * return:  [filteredData1, filteredData2...] */  
    filterStatesData = (data) => {
        //console.log('filtering', data);

        let filtered = [];
        /* filter by date range */
        const startDate = formatDate(this.state.startDate);
        const endDate = formatDate(this.state.endDate)
        data.forEach((stateData) => {
            let dateFiltered = stateData.filter((entry) => {
                return entry.date >= startDate && entry.date <= endDate; 
            });
            filtered.push(dateFiltered);
        });
        //console.log('filtered', filtered);

        /* compress by selected statistic(s) */
        let compressed = [];
        // might allow multiple user statistics to be selected in future
        const statistics = ['state', 'date', this.state.radioSelected]; 
        /* compressor creates new object whose only properties are the selected statistics */
        const compressor = (obj) => {
            let result = {};
            statistics.forEach((stat) =>{
                if (obj.hasOwnProperty(stat))
                    result[stat] = obj[stat];
            });
            return result;
        }
        filtered.forEach((stateData) => {
            compressed.push(stateData.map(compressor));
        });
        return compressed;

        /* format date to YYYYMMDD */
        function formatDate(date) {
            let iso = date.toISOString().substring(0,10);
            return iso.replace(/-/g,'');
        }
    }

    render() {
        return (
            <Container className='grid-container state-view' fluid>
                <Row className='state-view-row'>
                    <Col xs='9'>
                        { this.state.isSubmitted && <Graph data={this.state}/> }
                        { /* TODO ? find a way to turn off isSubmitted upon Graph rendering 
                             to avoid regraphing on every component state change 
                             after initial graph */}
                    </Col>
                    <Col className='menu'>
                        <Form className='info-selector' onSubmit={this.handleSubmit}>
                            <FormGroup tag="fieldset">
                                <FormGroup>
                                    <Label for="select-graph">Select Graph:</Label>
                                    <Input  type="select"
                                            name="graph" 
                                            id="select-graph" 
                                            value={this.state.graph} 
                                            onChange={this.handleChange} >
                                        <option>graph1</option>
                                        <option>graph2</option>
                                        <option>graph3</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="select-variable">Select Variable:</Label>
                                    <Input  type="select"
                                            name="var"  
                                            id="select-var" 
                                            value={this.state.var} 
                                            onChange={this.handleChange} >
                                        <option>var1</option>
                                        <option>var2</option>
                                        <option>var3</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="select-states">Select State(s):</Label>
                                    <Input type="select" 
                                            name="stateList" 
                                            id="select-states" 
                                            value={this.state.stateList} 
                                            onChange={this.handleChangeStates} 
                                            multiple
                                            required>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        filtered              <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </Input>
                                </FormGroup>
                                <Label for="select-date">Select Date Range:</Label>
                                <FormGroup id="select-date">
                                    {/* issues: selected value doesn't clear if changing month menu
                                                in middle of selection. */}
                                    {/* Ref: https://reactdatepicker.com/ */}
                                    <DatePicker
                                        selected={this.state.startDate}
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={initialState.startDate}
                                        maxDate={initialState.endDate}
                                        onChange={this.handleChangeStartDate}
                                    />
                                    <DatePicker
                                        selected={this.state.endDate}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={this.state.startDate}
                                        maxDate={initialState.endDate}
                                        onChange={this.handleChangeEndDate}
                                    />                             
                                </FormGroup>
                                <Label for="select-statistic">Select Statistic:</Label>
                                {/* Match name fields of radio buttons to covidtracking API data fields */}
                                <FormGroup check>
                                    <Label check>
                                    <Input  required // makes selecting one of the radioSelected group required
                                            type="radio" 
                                            name="radioSelected"
                                            value="positive"
                                            onClick={this.handleChange}/>{' '}
                                        Total Infected
                                        </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="death"
                                            onClick={this.handleChange}/>{' '}
                                        Total Deaths
                                        </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input  type="radio" 
                                                name="radioSelected"
                                                value="hospitalized"
                                                onClick={this.handleChange}/>{' '}
                                        Total Hospitalized
                                        </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input  type="radio" 
                                                name="radioSelected"
                                                value="positiveIncrease"
                                                onClick={this.handleChange}/>{' '}
                                        Daily New Cases</Label>
                                </FormGroup>
                            </FormGroup>
                            <Button type="reset" 
                                    className='button2 float-right btn-dark'
                                    onClick={this.handleReset}>Reset
                            </Button>
                            <Button type="submit" className='button1 float-left btn-dark'>Graph</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}