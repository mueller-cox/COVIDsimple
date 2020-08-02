import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FeedTable from './feed-articles.component';
import RatedTable from './rated-articles.component';

import '../App.css';


export default class NewsList extends Component {
    /*constructor(props) { super(props); } */
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            news_src_filter: "None",
            rated: [],
            rated_src_filter: "None",
        }
    }

    async componentDidMount() {
        let url_news = '../api/news';
        let url_rated = '../api/articles';
        try {
            let response = await fetch(url_news);
            if (!response.ok) {
                throw (response.error);
            }
            let json = await response.json();
            this.setState({ 'articles': json });
        } catch(error) {
            console.error(error);
        }

        try {
            let response = await fetch(url_rated);
            if (!response.ok) {
                throw (response.error);
            }
            let json = await response.json();
            this.setState({ 'rated': json});
        } catch(error) {
            console.error(error);
        }
    }

    handleNewsSrcFilter = (event) => {
        this.setState({ news_src_filter: event.target.value })
    }

    handleRatedSrcFilter = (event) => {
        this.setState({ rated_src_filter: event.target.value })
    }

    updateRated = async () => {
        let url_rated = '../api/articles';
        try {
            let response = await fetch(url_rated);
            if (!response.ok) {
                throw (response.error);
            }
            let json = await response.json();
            this.setState({ 'rated': json });
        } catch(error) {
            console.error(error);
        }

    }

    
    render() {
        return (
            <Container className="news-container" fluid>
                <Row>
                    <Col sm='12' md='6'>
                        <Container className='news-list'>
                            <Row className='header-row'>
                                <Col >
                                    <h3>Latest News</h3>
                                </Col>
                            </Row>
                            <Row className='news-filter-row'>
                                <Col>
                                    <label htmlFor="news_filter_src">Filter by Source  </label>
                                    <select className='filter' id="news_filter_src" name="news_filter_src" onChange={this.handleNewsSrcFilter}>
                                        <option value="None">None</option>
                                        <option value="World">World Health Organization</option>
                                        <option value="Disease">Centers for Disease Control</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row className='news-list-row'>
                                <Col className='news'>
                                    <FeedTable articles={ this.state.news_src_filter === "None" ? this.state.articles : 
                                                        this.state.articles.filter(article => article.source.includes(this.state.news_src_filter))} 
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm="12" md="6"> 
                        <Container>
                            <Row className='header-row'>
                                <Col >
                                    <h3>Rated News</h3>
                                </Col>
                            </Row>
                            <Row className='news-filter-row'>
                                <Col>
                                    <label htmlFor="rated_filter_src">Filter by Source  </label>
                                    <select className='filter' id="rated_filter_src" name="rated_filter_src" onChange={this.handleRatedSrcFilter}>
                                        <option value="None">None</option>
                                        <option value="World">World Health Organization</option>
                                        <option value="Disease">Centers for Disease Control</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row className='news-list-row'>
                                <Col  className='news'>
                                    <RatedTable articles={ this.state.rated_src_filter === "None" ? this.state.rated : 
                                                        this.state.rated.filter(article => article.source.includes(this.state.rated_src_filter))}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Col>   
                </Row>
            </Container>
        );
    }
}
