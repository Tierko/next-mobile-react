import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Kit from './Kit';

const App = () => (
    <div>
        <Switch>
            <Route path="/" component={SignIn} />
            <Route path="/kit" component={Kit} />
            <Route path="/signup" component={SignUp} />
        </Switch>
    </div>
);

export default App;
