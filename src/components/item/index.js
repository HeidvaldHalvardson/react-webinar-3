import { memo } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function Item({ item, link, onAdd = (_) => {}, onCloseModal = () => {}, textButton }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => onAdd(item._id),
  };

  const onAddHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    callbacks.onAdd();
  }

  return (
    <Link to={link} onClick={onCloseModal} className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={onAddHandler}>{textButton}</button>
      </div>
    </Link>
  );
}

Item.propTypes = {
  link: PropTypes.string,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  textButton: PropTypes.string,
  onAdd: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(Item);
