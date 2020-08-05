import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import $ from 'jquery';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // styling for Datepicker
import moment from 'moment'

import Graph from './graph.component.js'
import '../App.css';

/* Save inital state for reset and enforcing date selection boundaries */
const initialState = {
    graph: 'g1',
    var: '',
    stateList: [],                          // list of all requested states
    //startDate: new Date('2020/07/25'),
    /* vvv earliest available Covid data, using above date for dev purposes */
    startDate: new Date('2020/01/22'),
    endDate: new Date(),
    radioSelected: '',                      // tracks selected radio button
    payload: []                             // array to populate with requested data from user
};

export default class StateView extends Component {
    constructor(props) {
        super(props);
        let initState = Object.assign({}, initialState) // copy state to avoid overwriting initialState
        this.state = initState;
        //this.handleGraphRender = this.handleGraphRender.bind(this); // bind state-view context to render handler for graph
    }

    /* Reset Handler */
    handleReset = (event) => {
        let initState = Object.assign({}, initialState)
        this.setState(initState);
    }

    /* Change Handlers: */
    /* basic handler:  use if solely updating value field */
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        //console.log(this.state);
    }
    handleChangeStates = (event) => {
        // Use jQuery to get all values from select[multiple]
        this.setState({ [event.target.name]: $('#select-states').val() });
        //console.log(this.state);
    }
    handleChangeStartDate = (date) => {
        this.setState({ startDate: date });
    }
    handleChangeEndDate = (date) => {
        this.setState({ endDate: date });
    }

    /* Submit handler: fetch requested data from API, start Graph render */
    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log('State on submit:', this.state);

        let data = await this.fetchStatesData();
        let filtered = this.filterStatesData(data);
        //console.log('Fetched data', data);
        this.setState({ payload: filtered }); // triggers Graph to render
    }

    /* callback to pass to graph child to turn off flag for rendering */
    /*handleGraphRender() {
        //console.log('setting isSubmitted: false')
        this.setState({ isSubmitted: false });
    }*/

    /* Helpers to Submit handler: */
    /*  method:     fetchStatesData:
        purpose:    use current this.state.stateList variable to fetch historic data for all requested states
        return:     [stateData1, stateData2...], where each stateData is an array in reverse-chron order */
    fetchStatesData = async () => {
        let data = []; // array whose entries correspond to states' historical data
        for (const state of this.state.stateList) {
            let stateCode = state.toLowerCase();
            let url = `../api/covid-data/${stateCode}`;
            //console.log('Fetching data:', state);
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw (response.error);
                }
                let json = await response.json();
                data.push(json);
            } catch (error) {
                console.error(error);
            }
        }
        return data;
    }
    /**
     * method:  filterStatesData:
     * purpose: use current this.state variables filter states' data down to match user request,
     *          for passing to <Graph> component
     * return:  arr: array such that for all i:
     *               arr[i] = { state: "XX", date:"MM/DD", `${radioSelected}`: api_value }
     * */
    filterStatesData = (data) => {
        //console.log('filtering', data);

        /* filter by selected date range: */
        let filtered = [];
        const startDate = dateToStr(this.state.startDate);
        const endDate = dateToStr(this.state.endDate)

        data.forEach((stateData) => {
            let dateFiltered = stateData.filter((entry) => {
                return entry.date >= startDate && entry.date <= endDate;
            });
            filtered.push(dateFiltered);
        });
        //console.log('filtered', filtered);

        /* compress by selected statistic(s) */
        let compressed = [];
        const statistics = ['state', 'date', this.state.radioSelected];
        // (might allow multiple user statistics to be selected in future)

        /* compressor creates new object whose only properties are the selected statistics */
        const compressor = (obj) => {
            let result = {};
            statistics.forEach((stat) => {
                if (obj.hasOwnProperty(stat)) {
                    // Format date into graph-friendly display form
                    if (stat === 'date') {
                        result[stat] = formatDate(obj[stat])
                    } else {
                        result[stat] = obj[stat];
                    }
                }
            });
            return result;
        }
        filtered.forEach((stateData) => {
            compressed.push(...stateData.map(compressor));
        });
        return compressed;

        /* convert date object to 'YYYYMMDD' */
        function dateToStr(date) {
            let iso = date.toISOString().substring(0, 10);
            return iso.replace(/-/g, '');
        }

        /**
         * Take a YYYYMMDD date str as used by the API and convert it into a
         * MM/DD string as to be used on the graph
         */
        function formatDate(datestr) {
            //console.log('formatting', datestr)
            let formatted = moment(datestr, "YYYYMMDD").format('M/DD')
            //console.log('formatted', formatted)
            return formatted;
        }
    }

    render() {
        return (
            <Container className='grid-container state-view' fluid>
                <Row className='state-view-row'>
                    <Col xs='10'>
                        {<Graph data={this.state} />}
                    </Col>
                    <Col className='menu bg-main'>
                        <Form className='info-selector' onSubmit={this.handleSubmit}>
                            <FormGroup tag="fieldset">
                                <FormGroup className="select-graph">
                                    <Label for="select-graph">Select Graph:</Label>
                                    <Input type="select"
                                        name="graph"
                                        id="select-graph"
                                        onChange={this.handleChange} >
                                        <option value="g1">Lines</option>
                                        <option value="g2">Stacked Area</option>
                                        <option value="g3">Bar Chart</option>
                                    </Input>
                                </FormGroup>
                                {/* FOR FUTURE IMPLEMENTATION */}
                                {/* <FormGroup className="select-variable">
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
                                </FormGroup> */}
                                <FormGroup className="select-states">
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
                                        <option value="OK">Oklahoma</option>
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
                                <FormGroup className="select-date" id="select-date">
                                    {/* issues: selected value doesn't clear if changing month menu
                                                in middle of selection. */}
                                    {/* Ref: https://reactdatepicker.com/ */}
                                    <DatePicker className="date"
                                        selected={this.state.startDate}
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={initialState.startDate}
                                        maxDate={initialState.endDate}
                                        onChange={this.handleChangeStartDate}
                                        popperPlacement="left-end"
                                    />
                                    <DatePicker className="date"
                                        selected={this.state.endDate}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={this.state.startDate}
                                        maxDate={initialState.endDate}
                                        onChange={this.handleChangeEndDate}
                                        popperPlacement="left-end"
                                    />
                                </FormGroup>
                                <Label for="select-statistic">Select Statistic:</Label>
                                <FormGroup className="select-statistic1" check>
                                    <Label check>
                                        <Input required // makes selecting one of the radioSelected group required
                                            type="radio"
                                            name="radioSelected"
                                            value="positive"
                                            onClick={this.handleChange} />{' '}
                                        Total Infected
                                        </Label>
                                </FormGroup>
                                <FormGroup className="select-statistic2" check>
                                    <Label check>
                                        <Input type="radio"
                                            name="radioSelected"
                                            value="death"
                                            onClick={this.handleChange} />{' '}
                                        Total Deaths
                                        </Label>
                                </FormGroup>
                                <FormGroup className="select-statistic3" check>
                                    <Label check>
                                        <Input type="radio"
                                            name="radioSelected"
                                            value="hospitalized"
                                            onClick={this.handleChange} />{' '}
                                        Total Hospitalized
                                        </Label>
                                </FormGroup>
                                <FormGroup className="select-statistic4" check>
                                    <Label check>
                                        <Input type="radio"
                                            name="radioSelected"
                                            value="positiveIncrease"
                                            onClick={this.handleChange} />{' '}
                                        Daily New Cases</Label>
                                </FormGroup>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <Button type="submit" className='btn btn-submit btn-dark float-right'>Graph</Button>
                                </Col>
                                <Col>
                                    <Button type="reset"
                                        className='btn btn-reset btn-dark float-left'
                                        onClick={this.handleReset}>Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}