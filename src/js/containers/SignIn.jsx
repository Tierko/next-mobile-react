import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import Input from '../components/InputPhone';
import Logo from '../components/Logo';
import MobileCode from '../components/MobileCode';
import PageFade from '../components/PageFade';
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
      history.push(Pages.Dashboard);
    }
  };

  render() {
    const { onChange, onCodeSend, onEnter } = this;
    const { phone, message, isPhoneVisible } = this.state;

    return (
      <div className="welcome">
        <MobileNav type="enter" />
        <NavLobby />
        <div className="welcome__content">
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
          <div className="welcome__footer">
            <Link className="link-nav" to={Pages.SignUp}>Регистрация</Link>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(SignIn);
