import React, {useState} from 'react';
import { Table, Button, Badge } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

import RatingDropDownButton from './rating.component';
import PaginationTool from './table-pagination.component';
import SortRatedButton from './sort-rated.component';

import '../App.css';


const RatedTable = ({ articles }) => {
    const [currentPage, setPage] = useState(0);
    const pageSize=10;
    const pageCount = Math.ceil((articles.length) / pageSize);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);
    const [rated_sort, setRatedSort] = useState("date");
    const [rated_sort_dir, setRatedSortDir] = useState("Desc");
    /* compare values for sort, TODO refactor so rating is calculated and stored in DB
       this is gross...
    */
    const compareValuesNotRating = (a, b) => {
        if(rated_sort_dir === "Desc"){
            if(b[rated_sort] < a[rated_sort]){
                return -1
            }
            if( b[rated_sort] > a[rated_sort]){
                return 1;
            }
            return 0;
        }else{
            if(b[rated_sort] > a[rated_sort]){
                return -1
            }
            if( b[rated_sort] < a[rated_sort]){
                return 1;
            }
            return 0;
        }
    }
    /* this is really gross ..., see above*/
    const compareValuesRating = (a, b) => {
        let b_rating = Math.floor(b.rating_sum / b.rating_count);
        let a_rating = Math.floor(a.rating_sum / a.rating_count);
        if(rated_sort_dir === "Desc"){
            if(b_rating < a_rating){
                return -1
            }
            if( b_rating > a_rating){
                return 1;
            }
            return 0;
        }else{
            if(b_rating > a_rating){
                return -1
            }
            if(b_rating < a_rating){
                return 1;
            }
            return 0;
        }
    }

    return(
        <div className="xs=5">
        <Table id='rated-news' name='rated-news' responsive borderless>
            <thead>
                <tr>
                    <th colSpan="2">
                        <SortRatedButton 
                             handleSortClick={(e, filter) =>{
                                 if(filter === rated_sort && rated_sort_dir === "Desc"){
                                     setRatedSortDir("Asc");
                                 }
                                 else{
                                     setRatedSortDir("Desc");
                                 }
                                 setRatedSort(filter);
                             }}
                        />
                         <span className="sorted-on-text"> Sorted: {rated_sort.charAt(0).toUpperCase()+rated_sort.slice(1)} {rated_sort_dir} </span>
                    </th>
                </tr>    
            </thead>
            <tbody>
             {(articles.length > 0) ? articles
                .sort(rated_sort === 'rating' ? compareValuesRating : compareValuesNotRating)
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map( (article, index) => {
                   return (
                    <tr key={index}>
                        <td >{ ReactHtmlParser(article.name) } <Badge color="dark">{ article.date.slice(0,10) }</Badge> 
                            <Badge className='rating-badge' pill>Rating: { Math.floor(article.rating_sum / article.rating_count)}
                            </Badge></td>
                        <td ><Button className='read-rated' size="sm" onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
                        <td >
                            <RatingDropDownButton 
                            handleItemClick={async (e, rating) => {
                                let url = ('../api/articles/update');
                                let to_send = { "url": article.url, "rating": rating }
                                let options = {
                                    method: 'POST',
                                    body: JSON.stringify(to_send),
                                    headers: { 'Content-Type': 'application/json' }
                                }
                                try {
                                    let response = await fetch(url, options);
                                    let data = await response.json();
                                    article.rating_sum = article.rating_sum + rating;
                                    article.rating_count += 1;
                                    console.log(data);
                                }catch(error){
                                    console.log(error);
                                }
                            }}/>
                        </td>
                    </tr>
                   )
               }) : <tr><td colSpan="4">Loading Data...</td></tr>}
                         
            </tbody>
        </Table>
        <PaginationTool aria-label='rated-news-pagintation' pageCount={pageCount} 
            currentPage={currentPage} 
            handlePageClick={(e, index) => {
                e.preventDefault();
                setPage(index);
                
            }}
            handleNextClick={() => {
                if(currentPage <= pageCount){
                    setPage(currentPage + 1);
                }

                if(pageCount > 5 && endIndex < pageCount){
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
                setPage(pageCount-1);
                if(pageCount > 5){
                    setStartIndex(pageCount - 5);
                    setEndIndex(pageCount - 1);
                }
            }}
            startIndex={startIndex} endIndex={endIndex}
            />
        </div>
    );
}

export default RatedTable;