import React, { PropTypes } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Button, ButtonDropdown } from 'reactstrap';
import '../App.css';


const RatedTable = ({ articles }) => {

    return(
        <Table>
            <thead>
                <tr>
                    <td>Rated News</td>
                    <td colSpan="2">Filter</td>
                    <td colSpan="2">Sort</td>
                </tr>
            </thead>
            <tbody>
             {(articles.length > 0) ? articles.map( (article) => {
                   return (
                    <tr>
                        <td>{ article.name }</td>
                        <td>({ article.rating_sum } / { article.rating_count})</td>
                        <td>{ article.date}</td>
                        <td><Button color="primary" size="sm" onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
                        <td><Button color="secondary" size="sm">Rate</Button></td>
                    </tr>
                   )
               }) : <tr><td colSpan="4">Loading Data...</td></tr>}
                         
            </tbody>
        </Table>
    );
}

export default RatedTable;