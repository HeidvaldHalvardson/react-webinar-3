import React, { memo } from 'react';
import PropTypes from "prop-types";
import './style.css';

const HeaderLayout = ({ children }) => {
  return (
    <header className="HeaderLayout">
      {children}
    </header>
  );
};

HeaderLayout.propTypes = {
  children: PropTypes.node,
}

export default memo(HeaderLayout);
