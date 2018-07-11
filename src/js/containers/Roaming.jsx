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
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { tab } = this.state;
    const { roamingZones, countries } = data;
    const { match: { params: { type, zone } }, history } = this.props;
    const { onChange } = this;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_roaming">
          <RoamingMap />
          {
            !zone &&
            <div className="roaming">
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
            <RoamingCountries items={countries} id={zone} />
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
