import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useLanguage } from "../../translations";
import ErrorPage from "../error";
import ItemDescription from "../../components/item-description";
import Loader from "../../components/loader";
import MenuBasketContainer from "../../components/menu-basket-container";


const CatalogItem = () => {
  const store = useStore();
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { translation } = useLanguage();
  const { itemId } = useParams();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор конкретного продукта
    getCatalogItem: useCallback((_id) => store.actions.catalog.getCatalogItem(_id), [store]),
  };

  const select = useSelector(state => ({
    item: state.catalog.currentItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(false)
      try {
        await callbacks.getCatalogItem(itemId);
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [store, itemId, callbacks.getCatalogItem, callbacks.clearCurrentItem]);

  const links = {
    '/': translation['Главная']
  }

  if (loading) return <Loader text={translation['Загрузка']} />
  if (error || !select.item) return <ErrorPage title={translation['Такого товара не существует']} />

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <MenuBasketContainer
        translation={translation}
        links={links}
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemDescription item={select.item} addToBasket={callbacks.addToBasket} translation={translation} />
    </PageLayout>
  );
};

export default CatalogItem;
