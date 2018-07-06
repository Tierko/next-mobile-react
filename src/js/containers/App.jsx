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
import AutoPay from './AutoPay';
import SupportDashboard from './SupportDashboard';
import History from './History';
import Detail from './Detail';
import Pay from './Pay';
import Calls from './Calls';
import Kit from './Kit';
import Data from './Data';
import Result from './Result';
import { Pages } from '../constants';

const App = () => (
  <div>
    <Switch>
      <Route path={Pages.SiteMap} component={SiteMap} exact />
      <Route path={Pages.SignIn} component={SignIn} exact />
      <Route path={Pages.Kit} component={Kit} />
      <Route path={Pages.SignUp} component={SignUp} exact />
      <Route path={`${Pages.SignUp}/step/:step`} component={SignUp} exact />
      <Route path={Pages.RequestStatus} component={RequestStatus} exact />
      <Route path={`${Pages.RequestStatus}/:status`} component={RequestStatus} />
      <Route path={Pages.Conditions} component={Conditions} />
      <Route path={Pages.Support} component={Support} />
      <Route path={Pages.Dashboard} component={Overview} />
      <Route path={Pages.Calls} component={Calls} />
      <Route path={Pages.AddPackage} component={AddPackage} />
      <Route path={Pages.Pay} component={Pay} />
      <Route path={Pages.Services} component={Services} />
      <Route path={Pages.Settings} component={Settings} />
      <Route path={Pages.History} component={History} />
      <Route path={Pages.Detail} component={Detail} />
      <Route path={Pages.PayPackage} component={PayPackage} />
      <Route path={Pages.AutoPay} component={AutoPay} />
      <Route path={Pages.SupportDashboard} component={SupportDashboard} />
      <Route path={Pages.Data} component={Data} />
      <Route path={`${Pages.Result}/:status`} component={Result} />
    </Switch>
  </div>
);

export default hot(module)(App);
