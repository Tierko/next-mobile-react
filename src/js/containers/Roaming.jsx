import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';

class Roaming extends Component {
  render() {
    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content"></div>
      </div>,
    ]);
  }
}

export default Roaming;
