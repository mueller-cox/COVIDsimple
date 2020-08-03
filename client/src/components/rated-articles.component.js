import React, {useState} from 'react';
import { Table, Button, Badge } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

import RatingDropDownButton from './rating.component';
import PaginationTool from './table-pagination.component';
import '../App.css';


const RatedTable = ({ articles }) => {
    const [currentPage, setPage] = useState(0);
    const pageSize=20;
    const pageCount = Math.ceil((articles.length) / pageSize);

    return(
        <div className="xs=5">
        <Table responsive borderless>
            <thead>
            </thead>
            <tbody>
             {(articles.length > 0) ? articles
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map( (article, index) => {
                   return (
                    <tr key={index}>
                        <td >{ ReactHtmlParser(article.name) } <Badge color="dark">{ article.date.slice(0,10) }</Badge> <Badge color='warning' pill>Rating: { Math.floor(article.rating_sum / article.rating_count)}</Badge></td>
                        <td ><Button color="primary" size="sm" onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
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
        <PaginationTool pageCount={pageCount} 
        currentPage={currentPage} 
        handlePageClick={(e, index) => {
            e.preventDefault();
            setPage(index);
        }}
        handleNextClick={() => {
            if(currentPage < pageCount){
                setPage(currentPage + 1);
            }
        }} 
        handlePrevClick={() => {
            if(currentPage >= 0){
                setPage(currentPage - 1);
            }
        }}/>
        </div>
    );
}

export default RatedTable;