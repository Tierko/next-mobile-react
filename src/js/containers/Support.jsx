import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import Chat from '../components/Chat';
import Transitions from '../components/Transitions';

class Support extends Component {
  render() {
    return [
      <MobileNav type="enter" />,
      <NavLobby />,
      <Transitions classNames="slide">
        <div className="support">
          <div className="support__aside" />
          <div className="support__chat">
            <Chat />
          </div>
        </div>
      </Transitions>,
    ];
  }
}

export default Support;
