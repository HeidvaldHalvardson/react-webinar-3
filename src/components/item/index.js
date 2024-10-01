import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function Item({ onAdd = (_) => {}, labelCurr = '₽', labelAdd = 'Добавить', link, item}) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={link}>{item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>
          {numberFormat(item.price)} {labelCurr}
        </div>
        <button onClick={callbacks.onAdd}>{labelAdd}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
};

export default memo(Item);
