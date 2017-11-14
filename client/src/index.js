import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import axios from 'axios';

registerServiceWorker();

// store.dispatch({
//   type: "FETCH_DRAFTS",
//   payload: axios.get('http://localhost:3001/api/drafts')
// })



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
