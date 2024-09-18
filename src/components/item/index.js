import React from 'react';
import PropTypes from 'prop-types';
import Controls from "../controls";
import {cn as bem} from '@bem-react/classname';
import './style.css';


function Item(props) {
  const {
    item,
    className,
    onClickHandler = () => {},
  } = props

  const cn = bem('Item')

  return (
    <div
      className={`${cn()} ${className}`}
    >
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {item.price}&nbsp;₽
      </div>
      {
        item.count &&
        <div className={cn('count')}>
          {item.count} шт
        </div>
      }
      <div className={cn('actions')}>
        <Controls onClickHandler={onClickHandler}>
          {item.count ? 'Удалить' : 'Добавить'}
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
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default React.memo(Item);
