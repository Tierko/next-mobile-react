import React, { Component } from 'react';
import NavLobby from '../components/NavLobby';
import Input from '../components/Input';
import Logo from '../components/Logo';
import MobileCode from '../components/MobileCode';

class SignIn extends Component {
  state = {
    phone: '+7',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCodeSend = () => {

  };

  render() {
    const { onChange, onCodeSend } = this;
    const { phone } = this.state;

    return (
      <div className="sign-in">
        <NavLobby />
        <div className="sign-in__content">
          <Logo />
          <div className="sign-in__text">На этот номер Next мы вышлем код для входа</div>
          <Input
            name="phone"
            value={phone}
            onChange={onChange}
            className="input_phone"
          />
          <MobileCode phone={phone} onCodeSend={onCodeSend} />
        </div>
      </div>
    );
  }
}

export default SignIn;
