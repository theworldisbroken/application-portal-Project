import React from 'react';
import ReactDOM from 'react-dom/client';

import { applyMiddleware, createStore } from "redux";
import { Provider } from 'react-redux'
import rootReducer from "./react/RootReducer"

import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk'

import './index.css';
import App from './react/App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './layout/css/style.css'

const initialState = {
}

const middlewares = [thunk]


const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
