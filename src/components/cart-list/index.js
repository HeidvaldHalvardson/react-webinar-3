import React from 'react';
import List from "../list";
import './style.css'
import PropTypes from "prop-types";

const CartList = (props) => {
  const {
    cart,
    onDeleteFromCart = (_) => {}
  } = props
  return (
    <div className="CartList">
      <List
        list={cart}
        onClickHandler={onDeleteFromCart}
      />
      <div className="CartList-total">
        Итого
        <span>
          {cart.reduce((total, item) => total + (item.price * item.count), 0)} ₽
        </span>
      </div>
    </div>
  );
};

List.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(CartList);
