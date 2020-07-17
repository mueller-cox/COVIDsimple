import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from 'react-datepicker';
// styling for Datepicker
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

export default class StateView extends Component {
    /*constructor(props) { super(props); } */
    render() {
        return (
            <Container className='grid-container state-view' fluid>
                <Row className='state-view-row'>
                    <Col xs='9' className='graph'><mark>here goes the selected graph</mark>
                    </Col>
                    <Col className='menu'>
                        <Form className='info-selector'>
                            <FormGroup tag="fieldset">
                            <FormGroup>
                                <Label for="select-graph">Select Graph</Label>
                                <Input type="select" name="select-graph" id="select-graph">
                                    <option>graph1</option>
                                    <option>graph2</option>
                                    <option>graph3</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="select-graph">Select Date</Label>
                                <DatePicker
                                    // TODO this.state to be implemented 
                                    // selected={this.state.data}
                                    // onChange={this.onChangeDate}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="select-variable">Select Variable</Label>
                                <Input type="select" name="select-var" id="select-variable">
                                    <option>var</option>
                                    <option>var</option>
                                    <option>var</option>
                                </Input>
                            </FormGroup>
                                <Label for="select-statistic">Select Statistic</Label>
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
                                </FormGroup>
                            </FormGroup>
                            <Button className='button2 float-right'>Reset</Button>
                            <Button className='button1 float-left'>Graph</Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}