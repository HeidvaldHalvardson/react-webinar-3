import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PagePagination from "../../components/page-pagination";
import ErrorPage from "../error";
import { useLanguage } from "../../translations";
import Loader from "../../components/loader";
import MenuBasketContainer from "../../components/menu-basket-container";

function Main() {
  const store = useStore();
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const { translation } = useLanguage();
  const { catalogPage } = useParams();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(false)
      try {
        await store.actions.catalog.load(+catalogPage);
        setError(false)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [store, catalogPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Изменение страницы каталога
    setPage: useCallback((page) => {
      // store.actions.catalog.setPage(page);
      navigate(`/${page}`);
      store.actions.catalog.load(page);
    }, [store, history]),
    // Выбор конкретного продукта
    getCatalogItem: useCallback((_id) => store.actions.catalog.getCatalogItem(_id), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item
          item={item}
          link={`/catalog/${item._id}`}
          onAdd={callbacks.addToBasket}
          openCatalogItem={callbacks.getCatalogItem}
          onCloseModal={callbacks.closeModal}
          textButton={translation['Добавить']}
        />;
      },
      [callbacks.addToBasket, callbacks.getCatalogItem, translation],
    ),
  };

  const links = {
    '/': translation['Главная']
  }

  if (loading) return <Loader text={translation['Загрузка']} />
  if (catalogPage > select.totalPages || isNaN(+catalogPage) || error) return <ErrorPage />

  return (
    <PageLayout>
      <Head title={translation['Магазин']} />
      <MenuBasketContainer
        translation={translation}
        links={links}
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} onItemClick={callbacks.getCatalogItem} />
      <PagePagination currentPage={select.currentPage} totalPages={select.totalPages} setPage={callbacks.setPage} />
    </PageLayout>
  );
}

export default memo(Main);
