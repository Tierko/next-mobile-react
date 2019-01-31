import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import createHistory from 'history/createHashHistory';
import { syncHistoryWithStore, ConnectedRouter } from 'react-router-redux';
import { api, setRestifyStore } from 'redux-restify'

import App from './containers/App';
import '../less/style.less';

import { stringify, parse } from 'qs'
import qhistory from 'qhistory'

import moment from 'moment'

import configRestify from '@cabinet/configRestify'
import getStorage from '@cabinet/storage'

moment.locale('ru')
const history = qhistory(
  createHistory(),
  stringify,
  parse,
)
configRestify()
const { store, persistor } = getStorage(history)
setRestifyStore(store)

store.dispatch({
  type: api.constants.ACTIONS_TYPES.loadsManager.reset,
})

render(
  (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  ), document.getElementById('root'),
);
