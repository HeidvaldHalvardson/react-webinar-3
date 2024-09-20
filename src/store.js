import {generateCode} from "./utils/generateCode";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  /**
   * Добавление товара в корзину по коду
   * @param code
   */
  addItemToCart(code) {
    const product = this.state.list.find(item => item.code === code);
    const cartItem = this.state.cart.find(item => item.code === code);

    if (cartItem) {
      this.setState({
        ...this.state,
        cartTotalPrice: this.state.cartTotalPrice + product.price,
        cart: this.state.cart.map((item) => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            }
          }
          return item;
        })
      })
    } else {
      this.setState({
        ...this.state,
        cartTotalPrice: this.state.cartTotalPrice + product.price,
        cartUniqueCount: this.state.cartUniqueCount + 1,
        cart: [...this.state.cart, { ...product, count: 1}]
      })
    }
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const productToDelete = this.state.cart.find(item => item.code === code);
    const newCartTotalPrice = this.state.cartTotalPrice - (productToDelete.price * productToDelete.count)

    this.setState({
      ...this.state,
      cartTotalPrice: newCartTotalPrice,
      cartUniqueCount: this.state.cartUniqueCount - 1,
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }


}

export default Store;
