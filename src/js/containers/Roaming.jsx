import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import RoamingMap from '../components/RoamingMap';
import Tabs from '../components/Tabs';
import RoamingZone from '../components/RoamingZone';
import RoamingCountries from '../components/RoamingCountries';
import RoamingInternet from '../components/RoamingInternet';
import RoamingTariffZone from '../components/RoamingTariffZone';
import RoamingTariffCountry from '../components/RoamingTariffCountry';
import data from '../../data';

class Roaming extends Component {
  state = {
    tab: 1,
    features: [],
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  getCurrentZone = () => {
    const { tab } = this.state;
    const { roamingZones } = data;

    return roamingZones.find(z => z.id === tab);
  };

  componentDidMount() {
    fetch('/data/map.geo.json', {
      headers: new Headers({
        'Content-Types': 'text/json',
      }),
    })
      .then(features => features.json())
      .then(features => this.setState({
        features,
      }));
  }

  render() {
    const { tab, features } = this.state;
    const { roamingZones } = data;
    const { match: { params: { type, zone } }, history } = this.props;
    const { onChange, getCurrentZone } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_roaming">
          <RoamingMap zone={getCurrentZone()} features={features} />
          {
            !zone &&
            <div className="roaming roaming_zones">
              <Tabs tabs={roamingZones} active={tab} onTabChange={v => onChange('tab', v)} />
              {
                roamingZones.map(z => (
                  <RoamingZone key={z.id} data={z} active={tab} history={history} />
                ))
              }
            </div>
          }
          {
            zone && type === 'countries' &&
            <RoamingCountries items={features} id={zone} />
          }
          {
            zone && type === 'internet' &&
            <RoamingInternet />
          }
          {
            zone && type === 'zone-tariff' &&
            <RoamingTariffZone id={zone} />
          }
          {
            zone && type === 'country-tariff' &&
            <RoamingTariffCountry id={zone} />
          }
        </div>
      </div>,
    ]);
  }
}

Roaming.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default Roaming;
