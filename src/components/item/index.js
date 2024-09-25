import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from "react-router-dom";
import {useLanguage} from "../../translations/context";

function Item({ item, onAdd = (_) => {}, onCloseModal = () => {} }) {
  const cn = bem('Item');
  const { translation } = useLanguage()

  const callbacks = {
    onAdd: () => onAdd(item._id),
  };

  const onAddHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    callbacks.onAdd();
  }

  return (
    <Link to={`/catalog/${item._id}`} onClick={onCloseModal} className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={onAddHandler}>{translation['Добавить']}</button>
      </div>
    </Link>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(Item);
