import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Chat from '../components/Chat';
import Transitions from '../components/Transitions';

class SupportDashboard extends Component {
  render() {
    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content dashboard__content_support">
            <Chat className="chat_dashboard" />
          </div>
        </Transitions>
      </div>,
    ];
  }
}

export default SupportDashboard;
