import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './containers/App';
import '../less/style.less';

render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);
