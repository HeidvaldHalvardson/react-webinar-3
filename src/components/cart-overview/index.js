import React from 'react';
import Controls from "../controls";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './stlye.css'
import {plural} from "../../utils/plural";

const CartOverview = (props) => {
  const {
    cart,
    onShowCart = () => {}
  } = props

  const cn = bem('CartOverview')
  const totalCount = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0);

  return (
    <div className={cn()}>
      <div>
        В корзине:
        <span className={cn('count')}>{totalCount > 0 ? `${totalCount} ${plural(totalCount, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })} / ${totalPrice} ₽` : 'пусто'}</span>
      </div>
      <div className={cn('actions')}>
        <Controls onClickHandler={onShowCart}>
          Перейти
        </Controls>
      </div>
    </div>
  );
};

CartOverview.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  onShowCart: PropTypes.func
};

export default React.memo(CartOverview);
