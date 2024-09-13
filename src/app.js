import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const onClickHandler = (e, code) => {
    e.stopPropagation();
    store.deleteItem(code)
  }

  const getTextForSelected = (count) => {
    let text = 'раз'
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
      text = 'раза'
    }

    return ` | Выделяли ${count} ${text}`
  }


  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}{item.counter ? getTextForSelected(item.counter) : null}</div>
                <div className="Item-actions">
                  <button onClick={(e) => onClickHandler(e, item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
