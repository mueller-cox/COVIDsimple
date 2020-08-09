import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

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
            rated_src_filter: "None"
        }
    }

    /* when news-list renders fetch data from news and articles apis */
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

    /* pass in event from news filter select and updated news_src_filter with selected item
        which then updates state and rerenders news-list prompting new data to be sent to latest table
    */
    handleNewsSrcFilter = (event) => {
        this.setState({ news_src_filter: event.target.value })
    }

    /* pass in event from rated filter select and updated rated_src_filter with selected item
        which then updates state and rerenders news-list prompting new data to be sent to latest table
    */
    handleRatedSrcFilter = (event) => {
        this.setState({ rated_src_filter: event.target.value })
    }

    /* allows user to update rated data with out reloading entire page 
        on click re-fetches data from articles api 
    */
    handleUpdateRated = async () => {
        let url_rated = '../api/articles';
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

    render() {
        return (
            <Container className="news-container" role='main' fluid>
                <Row>
                    <Col xs='12' md='6'>
                        <Container id='latest-news-list' className='latest-news-list'>
                            <Row className='header-row align-items-baseline'>
                                <Col >
                                    <h3 className='news-heading' id='latest-news-heading'>Latest News</h3>
                                </Col>
                                <Col >
                                    <a id='jump-to-rated' className='jump-link' href="#rated-news-heading">
                                        See Rated News
                                    </a>
                                </Col>
                                
                            </Row>
                            <Row className='news-filter-row'>
                                <Col lg='8'md='12'>
                                    <label htmlFor="news_filter_src">Filter Source  </label>
                                    <select className='filter' id="news_filter_src" name="news_filter_src" onChange={this.handleNewsSrcFilter}>
                                        <option value="None">None</option>
                                        <option value="World">World Health Organization</option>
                                        <option value="Disease">Centers for Disease Control</option>
                                    </select>  
                                </Col>
                            </Row>
                            <Row className='news-list-row'>
                                <Col className='news'>
                                    <FeedTable id='latest-news-results' className='latest-news-results'
                                        articles={ this.state.news_src_filter === "None" ? 
                                                    this.state.articles : 
                                                    this.state.articles
                                                    .filter(article => article.source.includes(this.state.news_src_filter))}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col xs="12" md="6"> 
                        <Container id='rated-news-list' name='rated-news-list'>
                            <Row className='header-row align-items-baseline'>
                                <Col >
                                        <h3 className='news-heading' id='rated-news-heading'>Rated News </h3>
                                </Col>
                                <Col >
                                    <a id='jump-to-latest' className='jump-link' href="#latest-news-heading">
                                        See Latest News
                                    </a>
                                </Col>
                            </Row>
                            <Row className='news-filter-row'>
                                <Col lg='8'md='12'>
                                    <label htmlFor="rated_filter_src">Filter Source  </label>
                                    <select className='filter' id="rated_filter_src" name="rated_filter_src" onChange={this.handleRatedSrcFilter}>
                                        <option value="None">None</option>
                                        <option value="World">World Health Organization</option>
                                        <option value="Disease">Centers for Disease Control</option>
                                    </select>
                                </Col>
                                <Col lg='4' md='12'>
                                    <Button id='refresh-rated' className='rating-refresh' outline color="secondary" 
                                        size='sm' onClick={this.handleUpdateRated}>
                                        Get Updates
                                    </Button>
                                </Col> 
                            </Row>
                            <Row className='news-list-row'>
                                <Col  className='news'>
                                    <RatedTable id='rated-news-results' name='rated-news-results'
                                                articles={ this.state.rated_src_filter === "None" ? this.state.rated : 
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
