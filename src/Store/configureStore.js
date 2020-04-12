/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import ReduxThunk from "redux-thunk";
import { history } from "../utils";

import appReducers from "./reducers";

export default function configureStore(initialState = {}) {
  const enhancers = [];
  const middleware = [ReduxThunk, routerMiddleware(history)];

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(appReducers, initialState, composedEnhancers);

  return store;
}
