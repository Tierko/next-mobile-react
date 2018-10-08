import React from 'react';
import { render } from 'react-dom';
import { HashRouter, BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import '../less/style.less';

if (NODE_ENV === 'development') {
  render(
    <HashRouter>
      <App />
    </HashRouter>
    , document.getElementById('root'),
  );
} else {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('root'),
  );
}
