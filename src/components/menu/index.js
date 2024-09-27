import React, { memo } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';

const Menu = ({ links }) => {
  return (
    <nav className="Menu">
      <ul className="Menu-list">
        {
          Object.entries(links).map(([key, value]) => (
            <li key={key}>
              <Link to={key}>{value}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  links: PropTypes.objectOf(PropTypes.string),
};

export default memo(Menu);
