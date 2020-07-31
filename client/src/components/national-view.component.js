import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import USGraph from './usgraph.component.js'

import '../App.css'


export default class NationalView extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            radioSelected: 'positive',    // tracks selected statistic radio button
            data_type: 'gross',           // interpretation of selected statistic
            payload: [],                  // array to populate with requested data from user
            date: new Date()              // currently selected date

            // TODO: fetch data and consolidate into one entry per date on load
        }
    }
    
    /* Change Handlers: */
    /* basic handler:  use if solely updating value field */
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        //console.log(this.state);
    }
    
    render() {
        return (
            <Container className='grid-container national-view' fluid>
                <Row className='national-view-row'>
                    <Col xs='10' className='national-map'>
                        <USGraph></USGraph>
                    </Col>
                    <Col className='menu'>
                        <Form className='info-selector'>
                            <FormGroup tag="fieldset">
                                <FormGroup className="select-variable">
                                    <Label for="select-variable">Select Data View:</Label>
                                    <Input  type="select"
                                            name="data_type"  
                                            id="select-type" 
                                            /*value={this.state.data_type} */
                                            onChange={this.handleChange} >
                                        <option value="gross">Aggregate</option>
                                        <option value="per_100k">Per 100,000</option>
                                    </Input>
                                </FormGroup>
                                <Label for="select-statistic">Select Statistic:</Label>
                                <FormGroup id="select-statistic" check>
                                    <Label check>
                                    <Input  required // makes selecting one of the radioSelected group required
                                            type="radio" 
                                            name="radioSelected"
                                            value="positive"
                                            onClick={this.handleChange}/>{' '}
                                        Infections
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input  type="radio" 
                                            name="radioSelected"
                                            value="hospitalized"
                                            onClick={this.handleChange}/>{' '}
                                        ICU Cases
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
                                </FormGroup>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

