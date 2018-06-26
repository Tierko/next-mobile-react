import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RequestStatus from './RequestStatus';
import Conditions from './Conditions';
import SiteMap from './SiteMap';
import Support from './Support';
import Overview from './Overview';
import Settings from './Settings';
import Services from './Services';
import AddPackage from './AddPackage';
import PayPackage from './PayPackage';
import { Pages } from '../constants';
import Kit from './Kit';

const App = () => (
  <div>
    <Switch>
      <Route path={Pages.SignIn} component={SignIn} exact />
      <Route path={Pages.Kit} component={Kit} />
      <Route path={Pages.SignUp} component={SignUp} exact />
      <Route path={`${Pages.SignUp}/step/:step`} component={SignUp} exact />
      <Route path={Pages.RequestStatus} component={RequestStatus} exact />
      <Route path={`${Pages.RequestStatus}/:status`} component={RequestStatus} />
      <Route path={Pages.Conditions} component={Conditions} />
      <Route path={Pages.Support} component={Support} />
      <Route path={Pages.Dashboard} component={Overview} />
      <Route path={Pages.Settings} component={Settings} />
      <Route path={Pages.Services} component={Services} />
      <Route path={Pages.AddPackage} component={AddPackage} />
      <Route path={Pages.PayPackage} component={PayPackage} />
      <Route path={Pages.SiteMap} component={SiteMap} />
    </Switch>
  </div>
);

export default hot(module)(App);
