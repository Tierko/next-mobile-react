import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import HomeR1 from './HomeR1';
import HomeR2 from './HomeR2';
import TariffR1 from './TariffR1';
import TariffR2 from './TariffR2';
import { Pages } from '../../../cabinet/js/constants';

class App extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    fetch('/api/i18n/ru.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(data => data.json())
      .then(data => this.setState({
        data,
      }));
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Switch>
          <Route
            component={props => (<HomeR1 {...props} data={data} />)}
            path={Pages.HOME}
            exact
          />
          <Route
            component={props => (<HomeR1 {...props} data={data} />)}
            path={Pages.HOME_R1}
          />
          <Route
            component={props => (<HomeR2 {...props} data={data} />)}
            path={Pages.HOME_R2}
          />
          <Route
            component={props => (<TariffR1 {...props} data={data} />)}
            path={Pages.TARIFF_R1}
          />
          <Route
            component={props => (<TariffR2 {...props} data={data} />)}
            path={Pages.TARIFF_R2}
          />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
