import { memo } from 'react';
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useLanguage } from "../../translations";
import './style.css';

function ItemBasket({ item, onRemove = (_) => {}, onCloseModal = () => {} }) {
  const cn = bem('ItemBasket');
  const { translation } = useLanguage()

  const callbacks = {
    onRemove: () => onRemove(item._id),
  };

  const onRemoveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    callbacks.onRemove();
  }

  return (
    <Link to={`catalog/${item._id}`} onClick={onCloseModal} className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} {translation['шт']}</div>
        <div className={cn('cell')}>
          <button onClick={onRemoveHandler}>{translation['Удалить']}</button>
        </div>
      </div>
    </Link>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(ItemBasket);
