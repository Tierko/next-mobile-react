import React, { Component } from 'react';
import Chat from '../components/Chat';

class Support extends Component {
  render() {
    return (
      <div className="support">
        <div className="support__aside"></div>
        <div className="support__chat">
          <Chat />
        </div>
      </div>
    );
  }
}

export default Support;
