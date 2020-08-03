import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const PaginationTool = ({
    pageCount,
    currentPage,
    handlePageClick,
    handlePrevClick,
    handleNextClick
}) => {
   
    return (
        <Pagination aria-label="Paginate Table">
        <PaginationItem disabled={ currentPage <= 0 }>
            <PaginationLink previous onClick={handlePrevClick} href="#">
            </PaginationLink>
        </PaginationItem>
        {[...Array(pageCount)].slice(0,5).map((page, index) => (
            <PaginationItem active={index === currentPage} key={index}>
                <PaginationLink onClick={e => handlePageClick(e, index)} href="#">
                    {index + 1}
                </PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem disabled={ currentPage >= pageCount }>
            <PaginationLink next onClick={handleNextClick} href="#">
            </PaginationLink>
        </PaginationItem>
        </Pagination>
    );
}

export default PaginationTool;