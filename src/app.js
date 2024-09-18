import React, {useCallback, useState} from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartOverview from "./components/cart-overview";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isModal, setIsModal] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code)
    }, [store]),

    onDeleteFromCart: useCallback((code) => {
      store.deleteItemFromCart(code)
    }, [store]),

    onShowCart: useCallback(() => {
      setIsModal(true);
    }, []),

    onCloseCart: useCallback(() => {
      setIsModal(false);
    }, [])
  }

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartOverview
        cart={cart}
        onShowCart={callbacks.onShowCart}
      />
      <List
        list={list}
        onClickHandler={callbacks.onAddToCart}
      />
      {isModal && <CartModal
        cart={cart}
        onCloseModal={callbacks.onCloseCart}
        onDeleteFromCart={callbacks.onDeleteFromCart}
        isOpen={isModal}
      />}
    </PageLayout>
  );
}

export default App;
