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
                    <td colSpan="2">
                    </td>
                    <td></td>
                    <td colSpan="2">Sort</td>
                </tr>
            </thead>
            <tbody>
            {(articles.length > 0) ? articles
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map( (articles, i) => {
                   return (
                    <tr key={ i }>
                        <td>{ articles.name }</td>
                        <td>{ articles.date }</td>
                        <td><Button color="primary" size="sm" onClick={() => window.open(`${articles.url}`, "_blank")}>Read</Button></td>
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
