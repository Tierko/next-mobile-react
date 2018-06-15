import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Pages } from '../constants';
import Kit from './Kit';

const App = () => (
  <div>
    <Switch>
      <Route path={Pages.SignIn} component={SignIn} />
      <Route path={Pages.Kit} component={Kit} />
      <Route path={Pages.SignUp} component={SignUp} />
    </Switch>
  </div>
);

export default App;
