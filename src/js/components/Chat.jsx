import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <div className="chat__companion">
          <div className="chat__avatar">
            <img className="chat__avatar-img" src="" alt="" />
          </div>
          <div className="chat__companion_title">Ваш персональный ассистент – Наталья</div>
        </div>
      </div>
    );
  }
}

export default Chat;
