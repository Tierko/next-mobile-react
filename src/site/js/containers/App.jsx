import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import HomeR1 from './HomeR1';
import HomeR2 from './HomeR2';
import TariffR1 from './TariffR1';
import TariffR2 from './TariffR2';
import { Pages } from '../../../cabinet/js/constants';

const App = () => (
  <div>
    <Switch>
      <Route component={HomeR1} path={Pages.HOME} exact />
      <Route component={HomeR1} path={Pages.HOME_R1} />
      <Route component={HomeR2} path={Pages.HOME_R2} />
      <Route component={TariffR1} path={Pages.TARIFF_R1} />
      <Route component={TariffR2} path={Pages.TARIFF_R2} />
    </Switch>
  </div>
);

export default hot(module)(App);
