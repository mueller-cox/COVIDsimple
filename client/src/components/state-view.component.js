import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
// styling for Datepicker
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

export default class StateView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: "",
            var:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // this.setState({graph: event.target.value})
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit(event) {
        // alert(this.state.graph, this.state.var)
        console.log(this.state.graph)
        // event.preventDefault()
    }

    render() {
        return (
            <Container className='grid-container state-view' fluid>
                <Row className='state-view-row'>
                    <Col xs='9' className='graph'><mark>here goes the selected graph</mark>
                    </Col>
                    <Col className='menu'>
                        <Form className='info-selector' onSubmit={this.handleSubmit}>
                            <FormGroup tag="fieldset">
                                <FormGroup>
                                    <Label for="select-graph">Select Graph</Label>
                                    <Input type="select" name="graph" placeholder="graph" id="select-graph" value={this.state.graph} onChange={this.handleChange} >
                                        <option>graph1</option>
                                        <option>graph2</option>
                                        <option>graph3</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="select-variable">Select Variable</Label>
                                    <Input type="select" name="var" placeholder="var" id="select-var" value={this.state.var} onChange={this.handleChange} >
                                        <option>var1</option>
                                        <option>var2</option>
                                        <option>var3</option>
                                    </Input>
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label for="select-state">Select State</Label>
                                    <Input type="select" name="state" placeholdet='state' id="select-state" value={this.state.state} onChange={this.handleInputChange} multiple>
                                        <option>Oregon</option>
                                        <option>New York</option>
                                        <option>Montana</option>
                                    </Input>
                                </FormGroup>
                            
                            <FormGroup>
                                <Label for="select-graph">Select Date</Label>
                                <DatePicker
                                    // TODO this.state to be implemented 
                                    // selected={this.state.data}
                                    // onChange={this.onChangeDate}
                                />
                                </FormGroup> */}
                                {/* <Label for="select-statistic">Select Statistic</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="daily-new-cases"/>{' '}
                                        Daily New Cases</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="active-cases" />{' '}
                                        Active Cases
                                       </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="infected" />{' '}
                                        Infectes
                                       </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="deaths"/>{' '}
                                        Deaths
                                       </Label>
                                </FormGroup> */}
                            </FormGroup>
                            <input type="submit" value="submit" />
                            {/* <Button className='button2 float-right btn-dark'>Reset</Button>
                            <Button type="submit" className='button1 float-left btn-dark'>Graph</Button> */}
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}