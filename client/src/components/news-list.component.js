import React, { Component } from 'react';
import FeedTable from './feed-articles.component';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import RatedTable from './rated-articles.component';

export default class NewsList extends Component {
    /*constructor(props) { super(props); } */
    constructor(props){
        super(props);
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
        fetch('../api/news')
        .then(res => res.json())
        .then(json => this.setState({ 'articles': json }))
    }

    
    render() {
        
        return (
            <Container className='news-list' fluid>
                <Row className='news-list-row'>
                    <Col xs='6'className='news'>
                        <FeedTable articles={ this.state.articles } />
                    </Col>
                </Row>
            </Container>  
        );
    }
}