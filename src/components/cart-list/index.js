import React from 'react';
import List from "../list";
import './style.css'
import PropTypes from "prop-types";
import CartItem from "../cart-item";

const CartList = (props) => {
  const {
    cart,
    cartTotalPrice,
    onDeleteFromCart = (_) => {}
  } = props
  return (
    <div className="CartList">
      <List
        list={cart}
        itemComponent={CartItem}
        onClickHandler={onDeleteFromCart}
      />
      <div className="CartList-total">
        Итого
        <span>
          {cartTotalPrice.toLocaleString()} ₽
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
  cartTotalPrice: PropTypes.number,
  onDeleteFromCart: PropTypes.func,
};

export default React.memo(CartList);
