import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import Input from '../components/InputPhone';
import Logo from '../components/Logo';
import MobileCode from '../components/MobileCode';
import { Pages } from '../constants';

class SignIn extends Component {
  state = {
    phone: '',
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
      history.push(Pages.DASHBOARD);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { mobileCode: { current: { sendCode } } } = this;

    sendCode();
  };

  mobileCode = React.createRef();

  render() {
    const {
      onChange,
      onCodeSend,
      onEnter,
      onSubmit,
      mobileCode,
    } = this;
    const { phone, message, isPhoneVisible } = this.state;

    return (
      <div className="welcome">
        <MobileNav type="enter" />
        <NavLobby />
        <div className="welcome__content">
          <Logo />
          <div className="sign-in__text">{ message }</div>
          <form onSubmit={onSubmit} >
            {
              isPhoneVisible &&
              <Input
                name="phone"
                value={phone}
                onChange={onChange}
                className="input_phone"
              />
            }
          </form>
          <MobileCode className="mobile-code_sign-in" phone={phone} onCodeSend={onCodeSend} onEnter={onEnter} ref={mobileCode} />
          <div className="welcome__footer">
            <Link className="link-nav" to={Pages.SIGN_UP}>Регистрация</Link>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default SignIn;
