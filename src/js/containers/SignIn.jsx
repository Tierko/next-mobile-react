import React, { Component } from 'react';
import NavLobby from '../components/NavLobby';
import Button from '../components/Button';

class SignIn extends Component {
  sendCoe = () => {

  };

  render() {
    const { sendCoe } = this;

    return (
      <div className="sign-in">
        <NavLobby />
        <Button onClick={sendCoe}>Прислать код</Button>
      </div>
    );
  }
}

export default SignIn;
