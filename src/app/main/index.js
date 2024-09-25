import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PagePagination from "../../components/page-pagination";
import ErrorPage from "../error";
import { useLanguage } from "../../translations";

function Main() {
  const store = useStore();
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
    store.actions.catalog.load(+catalogPage);
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
        return <Item item={item} onAdd={callbacks.addToBasket} openCatalogItem={callbacks.getCatalogItem} onCloseModal={callbacks.closeModal} />;
      },
      [callbacks.addToBasket, callbacks.getCatalogItem],
    ),
  };

  if (catalogPage > select.totalPages || isNaN(+catalogPage)) return <ErrorPage />

  return (
    <PageLayout>
      <Head title={translation['Магазин']} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} onItemClick={callbacks.getCatalogItem} />
      <PagePagination currentPage={select.currentPage} totalPages={select.totalPages} setPage={callbacks.setPage} />
    </PageLayout>
  );
}

export default memo(Main);
