import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RequestStatus from './RequestStatus';
import Conditions from './Conditions';
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
    </Switch>
  </div>
);

export default hot(module)(App);
