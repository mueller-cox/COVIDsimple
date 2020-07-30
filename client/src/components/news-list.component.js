import React, { Component } from 'react';
import FeedTable from './feed-articles.component';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
//import RatedTable from './rated-articles.component';

export default class NewsList extends Component {
    /*constructor(props) { super(props); } */
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            src_filter: "None"
        }
    }

    async componentDidMount() {
        let url = '../api/news';
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw (response.error);
            }
            let json = await response.json();
            this.setState({ 'articles': json, 'filterd_articles': json });
        } catch(error) {
            console.error(error);
        }
    }

    handleSrcFilter = (event) => {
        this.setState({ src_filter: event.target.value })
    }

    
    render() {
        return (
            <Container className='news-list' fluid>
                <Row className='news-filter-row'>
                    <Col xs='3' classname='filter'>
                        <label for="filter_src">Filter by Source  </label>
                        <select class='filter' id="filter_src" name="filter_src" onChange={this.handleSrcFilter}>
                            <option value="None">None</option>
                            <option value="World">WHO</option>
                            <option value="Disease">CDC</option>
                        </select>
                    </Col>
                </Row>
                <Row className='news-list-row'>
                    <Col xs='6'className='news'>
                        <FeedTable articles={ this.state.src_filter === "None" ? this.state.articles : 
                                              this.state.articles.filter(article => article.source.includes(this.state.src_filter))}
                        />
                    </Col>
                </Row>
            </Container>  
        );
    }
}
