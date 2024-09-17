import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

function Controls(props) {
  const {
    onClickHandler = () => {},
    className = '',
    children
  } = props

  return (
    <button
      className={`Controls ${className}`}
      onClick={() => onClickHandler()}
    >
      {children}
    </button>
  );
}

Controls.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClickHandler: PropTypes.func,
};

export default React.memo(Controls);
