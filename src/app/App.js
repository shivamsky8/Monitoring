import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import Routes from "../route/route";
import { store } from "../Store";
import { history } from "../utils";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
