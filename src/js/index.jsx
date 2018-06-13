import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import '../less/style.less';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
