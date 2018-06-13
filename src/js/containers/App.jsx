import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Kit from './Kit';

const App = () => (
    <div>
        <Switch>
            <Route path="/" component={Home} />
            <Route path="/kit" component={Kit} />
        </Switch>
    </div>
);

export default App;
