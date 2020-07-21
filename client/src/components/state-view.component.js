import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import $ from 'jquery';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // styling for Datepicker
import '../App.css';

export default class StateView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: '',
            var: '',
            states: [],
            startDate: new Date(),
            endDate: null,
            radioSelect: '',
            requestedData: []
        };
    }

    /* Change Handlers */
    handleChange = (event) => { // use if solely updating value field
        this.setState({[event.target.name]: event.target.value});
        //console.log(this.state);
    }
    handleChangeStates = (event) => {
        // Use jQuery to get all values from select[multiple]
        this.setState({[event.target.name] : $('#select-states').val()});
        //console.log(this.state);
    }
    handleChangeDates = (dates) => {
        //console.log('dates', dates);
        const [start, end] = dates;
        this.setState({ startDate : start });
        this.setState({ endDate : end });
    }

    /* Submit handler */
    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)

    }

    render() {
        return (
            <Container className='grid-container state-view' fluid>
                <Row className='state-view-row'>
                    <Col xs='9' className='graph'>
                        <mark>here goes the selected graph</mark>
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
                                            name="states" 
                                            id="select-states" 
                                            value={this.state.states} 
                                            onChange={this.handleChangeStates} 
                                            multiple>
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
                                <FormGroup>
                                    <Label for="select-date">Select Date(s):</Label>
                                    {/* issues: selection doesn't clear with 'Reset' button.
                                                selected value doesn't clear if changing month menu
                                                in middle of selection. */}
                                    <DatePicker
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        selected={this.state.endDate}
                                        selectsRange
                                        inline
                                        onChange={this.handleChangeDates}
                                    />
                                </FormGroup>
                                <Label for="select-statistic">Select Statistic:</Label>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="infected"
                                            onClick={this.handleChange}/>{' '}
                                        Total Infected
                                        </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="deaths"
                                            onClick={this.handleChange}/>{' '}
                                        Total Deaths
                                        </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input  type="radio" 
                                                name="radioSelected"
                                                value="new-cases"
                                                onClick={this.handleChange}/>{' '}
                                        Daily New Cases</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input  type="radio" 
                                                name="radioSelected"
                                                value="active-cases"
                                                onClick={this.handleChange}/>{' '}
                                        Active Cases
                                        </Label>
                                </FormGroup>
                            </FormGroup>
                            <Button type="reset" className='button2 float-right btn-dark'>Reset</Button>
                            <Button type="submit" className='button1 float-left btn-dark'>Graph</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}