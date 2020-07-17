import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */

import { Container, Row, Col } from 'reactstrap';

import '../App.css';
export default class NewsList extends Component {
    /*constructor(props) { super(props); } */
    render() {
        return (
            <Container className='news-list' fluid>
                <Row className='news-list-row'>
                    <Col xs='4'className='news'>news</Col>
                    <Col xs='4'className='abstract'>abstrac</Col>
                    <Col className='recommended-news'>recommended news</Col>
                </Row>
            </Container>  
        );
    }
}