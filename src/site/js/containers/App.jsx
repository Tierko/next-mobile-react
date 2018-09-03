import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import Home from './Home';
import Tariff from './Trariff';
import { PAGES } from '../constants';

const App = () => (
  <div>
    <Switch>
      <Route component={Home} path={PAGES.HOME} exact />
      <Route component={Tariff} path={PAGES.TARIFF} />
    </Switch>
  </div>
);

export default hot(module)(App);
