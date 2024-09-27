import React from 'react';
import './style.css';

const Loader = ({ text }) => {

  return (
    <h1 className="Loader">
      {text}...
    </h1>
  );
};

export default Loader;
