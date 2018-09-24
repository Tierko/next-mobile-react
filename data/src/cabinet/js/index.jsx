import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';

import App from './containers/App';
import storage from './reducers/index';
import '../less/style.less';

render(
  (
    <Provider store={storage.store}>
      <PersistGate persistor={storage.persistor}>
        <ConnectedRouter history={createHashHistory()}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  ), document.getElementById('root'),
);
