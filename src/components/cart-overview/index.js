import React from 'react';
import Controls from "../controls";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {plural} from "../../utils/plural";
import './stlye.css'

const CartOverview = (props) => {
  const {
    cartUniqueCount,
    cartTotalPrice,
    onShowCart = () => {}
  } = props

  const cn = bem('CartOverview')

  return (
    <div className={cn()}>
      <div>
        В корзине:
        <span className={cn('count')}>
          {cartUniqueCount > 0
            ? `${cartUniqueCount} ${plural(cartUniqueCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${cartTotalPrice.toLocaleString()} ₽`
            : 'пусто'
          }
        </span>
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
  onShowCart: PropTypes.func,
  cartUniqueCount: PropTypes.number,
  cartTotalPrice: PropTypes.number,
};

export default React.memo(CartOverview);
