import React, {useState} from 'react';
import { Table, Button, Badge }  from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

import PaginationTool from './table-pagination.component';
import RatingDropDownButton from './rating.component';
import Preview from './article-preview.component';
import SortNewsButton from './sort-news.component';

import '../App.css';


const FeedTable = ({ articles}) => {
    const [currentPage, setPage] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);
    const pageSize=10;
    const [news_sort, setNewsSort] = useState("date");
    const [news_sort_dir, setNewsSortDir] = useState("Desc");
    const pageCount = Math.ceil((articles.length) / pageSize);

    /* compare values for sort */
    const compareValues = (a, b) => {
        if(news_sort_dir === "Desc"){
            if(b[news_sort] < a[news_sort]){
                return -1
            }
            if( b[news_sort] > a[news_sort]){
                return 1;
            }
            return 0;
        }else{
            if(b[news_sort] > a[news_sort]){
                return -1
            }
            if( b[news_sort] < a[news_sort]){
                return 1;
            }
            return 0;
        }
        
    }

    return(
        <div>
        <Table id='latest-news' name='latest-news' borderless responsive>
            <thead>
                <tr>
                    <th colSpan="2">
                        <SortNewsButton 
                             handleSortClick={(e, filter) =>{
                                 if(filter === news_sort && news_sort_dir === "Desc"){
                                     setNewsSortDir("Asc");
                                 }
                                 else{
                                     setNewsSortDir("Desc");
                                 }
                                 setNewsSort(filter);
                             }}
                        />
                         <span className="sorted-on-text"> Sorted: {news_sort.charAt(0).toUpperCase()+news_sort.slice(1)} {news_sort_dir} </span>
                    </th>
                </tr>    
            </thead>
            <tbody>
            {(articles.length > 0) ? articles
                .sort(compareValues)
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map( (article, i) => {
                   return (
                    <tr key={ i }>
                        <td ><span className="name">{ReactHtmlParser(article.name)}</span> <Badge color="dark">{ article.date.slice(0,10) }</Badge></td>
                        <td ><Button className='read-latest' size='sm' onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
                        <td><RatingDropDownButton
                            handleItemClick={async (e, rating) => {
                                let url = ('../api/articles/add');
                                let to_send = article;
                                to_send.rating = rating;
                                let options = {
                                    method: 'POST',
                                    body: JSON.stringify(to_send),
                                    headers: { 'Content-Type': 'application/json' }
                                }
                                try {
                                    let response = await fetch(url, options);
                                    let data = await response.json();
                                    console.log(data);
                                }catch(error){
                                    console.log(error);
                                }
                            }}/>
                        </td>
                        <td ><Preview content={ ReactHtmlParser(article.content) } name={ ReactHtmlParser(article.name) } /></td>
                    </tr>
                   )
               }) : <tr><td colSpan="5">Loading Data...</td></tr>}
                         
            </tbody>
            </Table>
            <PaginationTool aria-label='latest-news-pagintation' pageCount={pageCount} 
            currentPage={currentPage} 
            handlePageClick={(e, index) => {
                e.preventDefault();
                setPage(index);
                
            }}
            handleNextClick={() => {
                if(currentPage < pageCount){
                    setPage(currentPage + 1);
                }

                if(pageCount > 5){
                    if(endIndex < pageCount){
                        setStartIndex(startIndex + 1);
                        setEndIndex(endIndex + 1);
                    }
                }
            }} 
            handlePrevClick={() => {
                if(currentPage > 0){
                    setPage(currentPage - 1);
                }
                if(pageCount > 5){
                    if(startIndex > 0){
                        setStartIndex(startIndex - 1);
                        setEndIndex(endIndex - 1);
                    }
                }
            }}
            handleGoToStartClick={() => {
                setPage(0);
                if(pageCount > 5){
                    setStartIndex(0);
                    setEndIndex(5);
                }
            }}
            handleGoToEndClick={() => {
                setPage(pageCount);
                if(pageCount > 5){
                    setStartIndex(pageCount - 5);
                    setEndIndex(pageCount);
                }
            }}
            startIndex={startIndex} endIndex={endIndex}
            />
            </div>
                
    );
}

export default FeedTable;
