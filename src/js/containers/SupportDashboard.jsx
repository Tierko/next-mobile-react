import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Chat from '../components/Chat';

class SupportDashboard extends Component {
  render() {
    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_support">
          <Chat className="chat_dashboard" />
        </div>
      </div>,
    ];
  }
}

export default SupportDashboard;
