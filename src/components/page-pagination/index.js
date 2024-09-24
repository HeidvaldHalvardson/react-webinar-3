import React from 'react';
import PropTypes from "prop-types";
import PagePaginationButton from "../page-pagination-button";
import './style.css'

const PagePagination = ({ currentPage, totalPages, setPage }) => {
  const renderPagesButton = () => {
    const pages = []

    pages.push(
      <PagePaginationButton key={1} num={1} isActive={currentPage === 1} setPage={setPage} />
    )

    if (currentPage > 3) {
      pages.push(
        <div className='dots' key={'dots1'}>...</div>
      )
    } else {
      pages.push(
        <PagePaginationButton key={2} num={2} isActive={currentPage === 2} setPage={setPage} />,
        <PagePaginationButton key={3} num={3} isActive={currentPage === 3} setPage={setPage} />
      )
    }

    if (currentPage === 3) {
      pages.push(
        <PagePaginationButton key={4} num={4} isActive={currentPage === 4} setPage={setPage} />
      )
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(
          <PagePaginationButton key={i} num={i} isActive={currentPage === i} setPage={setPage} />
        )
      }
    }

    if (currentPage === totalPages - 2) {
      pages.push(
        <PagePaginationButton key={totalPages - 3} num={totalPages - 3} isActive={currentPage === totalPages - 3} setPage={setPage} />
      )
    }

    if (currentPage > totalPages - 3) {
      pages.push(
        <PagePaginationButton key={totalPages - 2} num={totalPages - 2} isActive={currentPage === totalPages - 2} setPage={setPage} />,
        <PagePaginationButton key={totalPages - 1} num={totalPages - 1} isActive={currentPage === totalPages - 1} setPage={setPage} />
      )
    } else {
      pages.push(
        <div className='dots' key={'dots2'}>...</div>
      )
    }


    pages.push(
      <PagePaginationButton key={totalPages} num={totalPages} isActive={currentPage === totalPages} setPage={setPage} />
    )

    return pages
  }

  return (
    <div className='PagePagination'>
      {renderPagesButton()}
    </div>
  );
};

PagePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PagePagination;
