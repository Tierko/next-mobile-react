import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLobby from '../components/NavLobby';
import Input from '../components/Input';
import Logo from '../components/Logo';
import MobileCode from '../components/MobileCode';
import { Pages } from '../constants';

class SignIn extends Component {
  state = {
    phone: '+7',
    message: 'На этот номер Next мы вышлем код для входа',
    isPhoneVisible: true,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCodeSend = () => {
    const { phone } = this.state;

    this.setState({
      message: `Введите код, который мы прислали на номер ${phone}`,
      isPhoneVisible: false,
    });
  };

  onEnter = (code) => {
    const { history } = this.props;

    if (code.length === 4) {
      history.push(Pages.Cabinet);
    }
  };

  render() {
    const { onChange, onCodeSend, onEnter } = this;
    const { phone, message, isPhoneVisible } = this.state;

    return (
      <div className="sign-in">
        <NavLobby />
        <div className="sign-in__content">
          <Logo />
          <div className="sign-in__text">{ message }</div>
          {
            isPhoneVisible &&
            <Input
              name="phone"
              value={phone}
              onChange={onChange}
              className="input_phone"
            />
          }
          <MobileCode className="mobile-code_sign-in" phone={phone} onCodeSend={onCodeSend} onEnter={onEnter} />
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default SignIn;
