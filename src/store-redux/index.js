import { applyMiddleware, combineReducers, createStore } from 'redux';

import * as reducers from './exports';
import { thunk, withExtraArgument } from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";

export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    composeWithDevTools(applyMiddleware(withExtraArgument(services))),
  );
}
