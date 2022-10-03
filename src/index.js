import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux"
import { legacy_createStore as createStore } from "redux"

import { persistStore, persistReducer } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage"


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistConfig = {
  key: "root",
  storage: createIdbStorage({ name: "maths", storeName: "maths" }),
  serialize: true, // Data serialization is not required and disabling it allows you to inspect storage value in DevTools
}

const initialState = {
  scoreHistory: []
}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "addToHistory":
    default:
      if (action.payload != null) {
        let newHistory = [...state.scoreHistory]
        newHistory.push(action.payload)
        return {...state, scoreHistory:newHistory}
      }
  }
  return state;
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
