import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function PageLayout({ children }) {
  return (
    <div className='PageLayout'>
      {children}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
