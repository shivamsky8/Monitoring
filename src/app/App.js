import React from "react";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
=======
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducer'

>>>>>>> leaflet
import Routes from "../route/route";
import { store } from "../Store";
import { history } from "../utils";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
=======
    <Routes/>
   
   
   
>>>>>>> leaflet
    </Provider>
  );
}

export default App;
