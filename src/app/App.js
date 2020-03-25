import React from "react";
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import rootReducer from '../redux/reducer'
import Routes from "../route/route";
import Counter from '../Counter'
import "./App.css";

const store = createStore(rootReducer)

function App() {
  return(
    <Provider store={store}>
    <Routes />
    </Provider>
  )
}

export default App;
