import React from 'react';
import PropTypes from 'prop-types';
import Controls from "../controls";
import './style.css';

function Item(props) {
  const {
    item,
    onAddToCart = () => {}
  } = props

  return (
    <div
      className="Item"
    >
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className="Item-price">
        {item.price}&nbsp;₽
      </div>
      <div className="Item-actions">
        <Controls onClickHandler={onAddToCart}>
          Добавить
        </Controls>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
