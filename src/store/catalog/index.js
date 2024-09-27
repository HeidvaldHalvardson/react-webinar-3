import { codeGenerator } from '../../utils';
import StoreModule from '../module';

const ITEMS_PER_PAGE = 10

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentItem: null,
      currentPage: 1,
      totalPages: 0,
    };
  }

  async load(page) {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const response = await fetch(`/api/v1/articles?limit=${ITEMS_PER_PAGE}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();

    const newTotalPages = Math.ceil(json.result.count / ITEMS_PER_PAGE);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: newTotalPages,
        currentPage: page,
      },
      'Загружены товары из АПИ',
    );
  }

  async getCatalogItem(id) {
    let result = null

    if (sessionStorage.getItem(id)) {
      result = JSON.parse(sessionStorage.getItem(id));
    } else {
      const response = await fetch(`/api/v1/articles/${id}?fields=title,description,edition,price,madeIn(title,code),category(title)`)
      result = await response.json();
      sessionStorage.setItem(id, JSON.stringify(result));
    }

    this.setState(
      {
        ...this.getState(),
        currentItem: result.result,
      },
      `Загружен товар ${id}`
    )
  }
}

export default Catalog;
