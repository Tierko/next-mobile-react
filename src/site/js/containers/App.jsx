import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import SiteMap from './SiteMap';
import HomeR1 from './HomeR1';
import HomeR2 from './HomeR2';
import TariffR1 from './TariffR1';
import TariffR2 from './TariffR2';
import { PAGES } from '../constants';

const App = () => (
  <div>
    <Switch>
      <Route component={SiteMap} path={PAGES.SITE_MAP} exact />
      <Route component={HomeR1} path={PAGES.HOME_R1} />
      <Route component={HomeR2} path={PAGES.HOME_R2} />
      <Route component={TariffR1} path={PAGES.TARIFF_R1} />
      <Route component={TariffR2} path={PAGES.TARIFF_R2} />
    </Switch>
  </div>
);

export default hot(module)(App);
