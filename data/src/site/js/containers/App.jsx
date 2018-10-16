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
    translations: {
      data: {},
      loaded: false,
      error: false,
    },
    tariffs: {
      data: [],
      loaded: false,
      error: false,
    },
    countries: {
      data: [],
      loaded: false,
      error: false,
    },
    interCalls: {
      data: {},
      loaded: false,
      error: false,
    },
  };

  componentDidMount() {
    const {
      getTranslations,
      getTariffs,
      getCountries,
      getInterCalls,
    } = this;

    getTranslations();
    getTariffs();
    getCountries();
    getInterCalls();
  }

  getTranslations = () => {
    const { translations } = this.state;
    const { formatTranslations } = this;

    fetch('/api/i18n/ru.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(data => data.json())
      .then(data => this.setState({
        translations: Object.assign({}, translations, { data: formatTranslations(data) }),
      }));
  };

  getTariffs = () => {
    const { tariffs } = this.state;

    fetch('/api/v1/', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        action: 'tariffs.getList',
        lang: 'ru',
      }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        tariffs: Object.assign({}, tariffs, { data }),
      }));
  };

  getCountries = () => {
    const { countries } = this.state;

    fetch('/media/info/map.geo.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(data => data.json())
      .then(data => this.setState({
        countries: Object.assign({}, countries, { data }),
      }));
  };

  getInterCalls = () => {
    const { interCalls } = this.state;

    fetch('/media/info/internation-calls.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(data => data.json())
      .then(data => this.setState({
        interCalls: Object.assign({}, interCalls, { data }),
      }));
  };

  formatTranslations = (data) => {
    const obj = {};
    const { page_home: pageHome, page_tariff: pageTariff, info } = data;

    obj.title = {
      home: pageHome.title,
      tariff: pageTariff.title,
    };

    obj.nav = {
      tariff: data.menu.tariff,
      requestStatus: data.menu.request_status,
      support: data.menu.support,
      signIn: data.menu_auth.signin,
      signUp: data.menu_auth.signup,
    };

    obj.intro = {
      text: pageHome.intro_text,
      note: pageHome.intro_note,
      btn: pageHome.intro_btn,
    };

    obj.best = {
      header: pageHome.best_header,
      text: pageHome.best_text,
    };

    obj.club = {
      header: pageHome.club_header,
      text: pageHome.club_text,
      btn: pageHome.club_btn,
    };

    obj.tariff = {
      header: pageHome.tariff_header,
      btn: pageHome.tariff_btn,
    };

    obj.roaming = {};

    obj.cabinet = {
      header: pageHome.cabinet_header,
      text: pageHome.cabinet_text,
    };

    obj.services = {
      header: pageTariff.services_header,
    };

    obj.earthTariff = {
      header: pageHome.earth_tariff_header,
      text: pageHome.earth_tariff_text,
    };

    obj.roamingTariff = {
      header: pageTariff.roaming_header,
      text: pageTariff.roaming_text,
    };

    obj.tariffTariff = {
      header: pageTariff.header,
      btn: pageTariff.btn,
      note: pageTariff.table_note,
    };

    obj.info = info;

    obj.copyright = data.copyright;

    return obj;
  };

  render() {
    const { state } = this;
    const release = state.translations.data.info ? state.translations.data.info.release * 1 : 1;

    return (
      <div>
        <Switch>
          <Route
            component={props => (
              release === 1 ?
                <HomeR1 {...props} data={state} /> :
                <HomeR2 {...props} data={state} />
            )}
            path={Pages.HOME}
            exact
          />
          <Route
            component={props => (
              release === 1 ?
                <TariffR1 {...props} data={state} /> :
                <TariffR2 {...props} data={state} />
            )}
            path={Pages.TARIFF}
          />
          <Route
            component={props => (<HomeR1 {...props} data={state} />)}
            path={Pages.HOME_R1}
          />
          <Route
            component={props => (<HomeR2 {...props} data={state} />)}
            path={Pages.HOME_R2}
          />
          <Route
            component={props => (<TariffR1 {...props} data={state} />)}
            path={Pages.TARIFF_R1}
          />
          <Route
            component={props => (<TariffR2 {...props} data={state} />)}
            path={Pages.TARIFF_R2}
          />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
