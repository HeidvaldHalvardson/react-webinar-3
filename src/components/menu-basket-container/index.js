import React, { memo } from 'react';
import PropTypes from "prop-types";
import Menu from "../menu";
import BasketTool from "../basket-tool";
import './style.css';

const MenuBasketContainer = ({ translation, links, openModalBasket, amount, sum }) => {
  return (
    <div className="MenuBasketContainer">
      <Menu links={links} translation={translation} />
      <BasketTool translation={translation} onOpen={openModalBasket} amount={amount} sum={sum} />
    </div>
  );
};

MenuBasketContainer.propTypes = {
  links: PropTypes.objectOf(PropTypes.string),
  translation: PropTypes.objectOf(PropTypes.string),
  openModalBasket: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(MenuBasketContainer);
