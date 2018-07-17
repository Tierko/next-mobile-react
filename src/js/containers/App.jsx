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
import More from './More';
import Kit from './Kit';
import Data from './Data';
import Result from './Result';
import Roaming from './Roaming';
import Invite from './Invite';
import { Pages } from '../constants';

const App = () => (
  <div>
    <Switch>
      <Route path={Pages.SITE_MAP} component={SiteMap} exact />
      <Route path={Pages.SIGN_IN} component={SignIn} exact />
      <Route path={Pages.KIT} component={Kit} />
      <Route path={Pages.SIGN_UP} component={SignUp} exact />
      <Route path={`${Pages.SIGN_UP}/step/:step`} component={SignUp} exact />
      <Route path={Pages.REQUEST_STATUS} component={RequestStatus} exact />
      <Route path={`${Pages.REQUEST_STATUS}/:status`} component={RequestStatus} />
      <Route path={Pages.CONDITIONS} component={Conditions} />
      <Route path={Pages.SUPPORT} component={Support} />
      <Route path={Pages.DASHBOARD} component={Overview} />
      <Route path={`${Pages.MORE}/:type`} component={More} />
      <Route path={Pages.ADD_PACKAGE} component={AddPackage} />
      <Route path={Pages.PAY} component={Pay} />
      <Route path={Pages.SERVICES} component={Services} />
      <Route path={Pages.SETTINGS} component={Settings} />
      <Route path={Pages.HISTORY} component={History} />
      <Route path={Pages.DETAIL} component={Detail} />
      <Route path={Pages.PAY_PACKAGE} component={PayPackage} />
      <Route path={Pages.AUTO_PAY} component={AutoPay} />
      <Route path={Pages.SUPPORT_DASHBOARD} component={SupportDashboard} />
      <Route path={Pages.DATA} component={Data} />
      <Route path={`${Pages.RESULT}/:status`} component={Result} />
      <Route path={`${Pages.ROAMING}/:type/:zoneId/:countryId`} component={Roaming} />
      <Route path={`${Pages.ROAMING}/:type/:zoneId`} component={Roaming} />
      <Route path={Pages.ROAMING} component={Roaming} exact />
      <Route path={Pages.INVITE} component={Invite} exact />
    </Switch>
  </div>
);

export default hot(module)(App);
