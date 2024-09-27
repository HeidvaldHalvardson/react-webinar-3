import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useLanguage } from "../../translations";

function Basket() {
  const store = useStore();
  const { translation } = useLanguage()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Выбор конкретного продукта
    getCatalogItem: useCallback((_id) => store.actions.catalog.getCatalogItem(_id), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        return <ItemBasket
          item={item}
          link={`catalog/${item._id}`}
          onRemove={callbacks.removeFromBasket}
          openCatalogItem={callbacks.getCatalogItem}
          onCloseModal={callbacks.closeModal}
          translation={translation}
        />;
      },
      [callbacks.removeFromBasket, callbacks.getCatalogItem],
    ),
  };

  return (
    <ModalLayout title={translation['Корзина']} textButton={translation['Закрыть']} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket} onCloseModal={callbacks.closeModal} />
      <BasketTotal sum={select.sum} totalText={translation['Итого']} />
    </ModalLayout>
  );
}

export default memo(Basket);
