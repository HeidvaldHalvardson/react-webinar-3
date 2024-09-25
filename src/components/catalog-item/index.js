import React, {useCallback, useEffect} from 'react';
import { useParams } from "react-router-dom";
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {numberFormat} from "../../utils";
import ErrorPage from "../../app/error";
import { useLanguage } from "../../translations";
import './style.css'


const CatalogItem = () => {
  const store = useStore();
  const { translation } = useLanguage()
  const { itemId } = useParams();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор конкретного продукта
    getCatalogItem: useCallback((_id) => store.actions.catalog.getCatalogItem(_id), [store]),
    // Очистка выбранного товара
    clearCurrentItem: useCallback(() => store.actions.catalog.clearCurrentItem(), [store]),
  };

  const select = useSelector(state => ({
    item: state.catalog.currentItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    callbacks.getCatalogItem(itemId);
    return () => callbacks.clearCurrentItem();
  }, [store, callbacks.getCatalogItem]);


  if (!select.item) return <ErrorPage title={translation['Такого товара не существует']} />

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className='CatalogItem'>
        <div>
          {select.item.description}
        </div>
        <div>
          {translation['Страна производитель']}:
          <span>{select.item.madeIn.title} ({select.item.madeIn.code})</span>
        </div>
        <div>
          {translation['Категория']}:
          <span>{select.item.category.title}</span>
        </div>
        <div>
          {translation['Год выпуска']}:
          <span>{select.item.edition}</span>
        </div>
        <div className='CatalogItem-price'>
          {translation['Цена']}: {numberFormat(select.item.price)} ₽
        </div>
        <button onClick={() => callbacks.addToBasket(select.item._id)}>
          {translation['Добавить']}
        </button>
      </div>
    </PageLayout>
  );
};

export default CatalogItem;
