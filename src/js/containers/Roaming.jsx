import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Map from '../components/Map';
import Tabs from '../components/Tabs';
import RoamingZone from '../components/RoamingZone';
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
    const { roamingZones } = data;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_roaming">
          <Map />
          <Tabs tabs={roamingZones} active={tab} onTabChange={v => onChange('tab', v)} />
          {
            roamingZones.map(z => (
              <RoamingZone key={z.id} data={z} active={tab} />
            ))
          }
        </div>
      </div>,
    ]);
  }
}

export default Roaming;
