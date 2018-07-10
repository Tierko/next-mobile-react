import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Map from '../components/Map';
import Tabs from '../components/Tabs';
import RoamingZone from '../components/RoamingZone';
import RoamingCountries from '../components/RoamingCountries';
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
    const { onChange } = this;
    const { roamingZones, countries } = data;
    const { match: { params: { id: zoneId } } } = this.props;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_roaming">
          <Map />
          {
            !zoneId &&
            <Fragment>
              <Tabs tabs={roamingZones} active={tab} onTabChange={v => onChange('tab', v)} />
              {
                roamingZones.map(z => (
                  <RoamingZone key={z.id} data={z} active={tab} />
                ))
              }
            </Fragment>
          }
          {
            zoneId &&
            <RoamingCountries items={countries} />
          }
        </div>
      </div>,
    ]);
  }
}

Roaming.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Roaming;
