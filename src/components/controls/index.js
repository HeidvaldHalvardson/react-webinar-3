import React from 'react';
import PropTypes from 'prop-types';

function Controls(props) {
  const {
    onClickHandler = () => {},
    className = '',
    children
  } = props

  return (
    <button className={className} onClick={() => onClickHandler()}>
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
