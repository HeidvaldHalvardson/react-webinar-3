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
      currentPage: 1,
      totalPages: 0,
    };
  }

  async load() {
    const skip = (this.getState().currentPage - 1) * ITEMS_PER_PAGE;

    const response = await fetch(`/api/v1/articles?limit=${ITEMS_PER_PAGE}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();

    const newTotalPages = Math.ceil(json.result.count / ITEMS_PER_PAGE);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: newTotalPages,
      },
      'Загружены товары из АПИ',
    );
  }

  setPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    })
  }
}

export default Catalog;
