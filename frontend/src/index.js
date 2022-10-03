import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'
import * as groupActions from './store/group'
import * as eventActions from './store/event'
import {ModalProvider} from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.groupActions = groupActions;
  window.eventActions = eventActions;
}

function Root(){
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
