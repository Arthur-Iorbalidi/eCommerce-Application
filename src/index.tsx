import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './fonts.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/root';

import App from './App';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
