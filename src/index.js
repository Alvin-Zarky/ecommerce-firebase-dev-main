import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './assets/scss/style.scss'
import './assets/scss/responsive.scss'
import '../node_modules/react-toastify/dist/ReactToastify.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

