import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const PaginationTool = ({
    pageCount,
    currentPage,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
    handleGoToStartClick,
    handleGoToEndClick,
    startIndex,
    endIndex
}) => {

    const findEndIndex = () => {
        if(pageCount < 5){
            return pageCount;
        }
        else{
            return endIndex;
        }
    }


    return (
        <Pagination>
        <PaginationItem disabled={ currentPage <= 0 }>
            <PaginationLink className='start-link' previous onClick={handleGoToStartClick} href="#">
                Start
            </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={ currentPage <= 0 }>
            <PaginationLink className='prev-link' previous onClick={handlePrevClick} href="#">
            </PaginationLink>
        </PaginationItem>
        {[...Array(pageCount)].slice(startIndex, findEndIndex()).map((page, index) => (
            <PaginationItem active={index + startIndex === currentPage} key={index}>
                <PaginationLink onClick={e => handlePageClick(e, startIndex + index)} href="#">
                    {startIndex + index + 1}
                </PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem disabled={ currentPage >= pageCount-1 }>
            <PaginationLink className='next-link' next onClick={handleNextClick} href="#">
            </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={ currentPage >= pageCount-1 }>
            <PaginationLink className='end-link' next onClick={handleGoToEndClick} href="#">
                End
            </PaginationLink>
        </PaginationItem>
        </Pagination>
    );
}

export default PaginationTool;