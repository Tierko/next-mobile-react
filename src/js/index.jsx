import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './containers/App';
import storage from './reducers';
import '../less/style.less';

render(
  (
    <Provider store={storage.store}>
      <PersistGate persistor={storage.persistor}>
        <HashRouter hashType="noslash">
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  ), document.getElementById('root'),
);
