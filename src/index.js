import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import tableReducer from './store/table'

ReactDOM.render(
  <Provider store={tableReducer}>
    <App />
  </Provider>,
  document.getElementById('root')
);
