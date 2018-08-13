import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import Chat from '../components/Chat';

class Support extends Component {
  render() {
    return [
      <MobileNav type="enter" />,
      <NavLobby />,
      <div className="support">
        <div className="support__aside" />
        <div className="support__chat">
          <Chat />
        </div>
      </div>,
    ];
  }
}

export default Support;
