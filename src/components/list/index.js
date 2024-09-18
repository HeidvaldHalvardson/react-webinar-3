import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onClickHandler = (_) => {}}) {
  return (
    <div className="List">
      {list.map(item => (
        <Item
          key={item.code}
          className="List-item"
          item={item}
          onClickHandler={() => onClickHandler(item.code)}
        />
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onClickHandler: PropTypes.func,
};

export default React.memo(List);
