import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, itemComponent: ItemComponent = Item, onClickHandler = (_) => {}}) {
  return (
    <div className="List">
      {list.map(item => (
        <ItemComponent
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
  itemComponent: PropTypes.elementType,
  onClickHandler: PropTypes.func,
};

export default React.memo(List);
