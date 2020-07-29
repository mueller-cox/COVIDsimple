import React, {useState} from 'react';
import { Table, Button}  from 'reactstrap';
import '../App.css';
import PaginationTool from './table-pagination.component';
import RatingDropDownButton from './rating.component';


const FeedTable = ({ articles }) => {
    const [currentPage, setPage] = useState(0);
    const pageSize=50;
    const pageCount = Math.floor((articles.length) / pageSize);
    return(
        <div>
        <Table>
            <thead>
                <tr>
                    <td>News Feed</td>
                    <td colSpan="2">Filter</td>
                    <td colSpan="2">Sort</td>
                </tr>
            </thead>
            <tbody>
             {(articles.length > 0) ? articles
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map( (article, i) => {
                   return (
                    <tr key={ i }>
                        <td>{ article.name }</td>
                        <td>{ article.date }</td>
                        <td><Button color="primary" size="sm" onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
                        <td><Button color="info" size="sm">Preview</Button></td>
                        <td><RatingDropDownButton/></td>
                    </tr>
                   )
               }) : <tr><td colSpan="5">Loading Data...</td></tr>}
                         
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

export default FeedTable;