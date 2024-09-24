import React from 'react';
import './style.css';
import PropTypes from "prop-types";

const PagePaginationButton = ({ num, isActive, setPage }) => {
  const onClickPage = () => {
    setPage(num);
  }

  return (
    <button
      className={
        `${isActive ? 'active' : ''}
        PagePaginationButton`
      }
      disabled={isActive}
      onClick={onClickPage}
    >
      {num}
    </button>
  );
};

PagePaginationButton.propTypes = {
  num: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PagePaginationButton;
