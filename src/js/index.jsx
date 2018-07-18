import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import store from './reducers';
import '../less/style.less';

render(
  (
    <Provider store={store}>
      <HashRouter hashType="noslash">
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('root'),
);
