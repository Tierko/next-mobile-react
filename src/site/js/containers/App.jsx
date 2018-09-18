import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import HomeR1 from './HomeR1';
import Tariff from './Trariff';
import { PAGES } from '../constants';

const App = () => (
  <div>
    <Switch>
      <Route component={HomeR1} path={PAGES.HOME_R1} exact />
      <Route component={Tariff} path={PAGES.TARIFF} />
    </Switch>
  </div>
);

export default hot(module)(App);
