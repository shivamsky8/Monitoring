import React from "react";
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducer'
import Routes from "../route/route";
import "./App.css";

const store = createStore(rootReducer,applyMiddleware(thunk))

function App() {
  return(
    <Provider store={store}>
    <Routes />
    </Provider>
  )
}

export default App;
