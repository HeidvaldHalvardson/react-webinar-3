import React, { memo } from 'react';
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import './style.css';

const ItemDescription = ({ item, addToBasket = (_) => {}, translation }) => {

  return (
    <div className='CatalogItem'>
      <div>
        {item.description}
      </div>
      <div>
        {translation['Страна производитель']}:
        <span>{item.madeIn.title} ({item.madeIn.code})</span>
      </div>
      <div>
        {translation['Категория']}:
        <span>{item.category.title}</span>
      </div>
      <div>
        {translation['Год выпуска']}:
        <span>{item.edition}</span>
      </div>
      <div className='CatalogItem-price'>
        {translation['Цена']}: {numberFormat(item.price)} ₽
      </div>
      <button onClick={() => addToBasket(item._id)}>
        {translation['Добавить']}
      </button>
    </div>
  );
};

ItemDescription.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    description: PropTypes.string,
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    })
  }).isRequired,
  translation: PropTypes.objectOf(PropTypes.string),
  onAdd: PropTypes.func,
  onCloseModal: PropTypes.func,
};

export default memo(ItemDescription);
