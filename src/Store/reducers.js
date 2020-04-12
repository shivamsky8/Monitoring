import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { history } from "../utils";

import appReducers from "../Module";

import { homeReducer } from "../route/Home/homeReducer";

const routeReducers = {
  home: homeReducer,
  router: connectRouter(history)
};

const combinedReducers = combineReducers({
  ...routeReducers,
  ...appReducers
});

export default combinedReducers;
