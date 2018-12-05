import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import Input from '../components/InputPhone';
import MobileCode from '../components/MobileCode';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

class SignIn extends Component {
  state = {
    phone: '',
    message: 'На\u00A0указанный номер Next Mobile будет отправлен код для входа в\u00A0Личный кабинет',
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
      message: `Введите код, присланный на номер \n ${phone}`,
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
    const {
      phone,
      message,
      isPhoneVisible,
    } = this.state;
    const meta = {
      title: TITLES.SIGN_IN,
    };

    return (
      <DocumentMeta {...meta}>
        <div className="welcome">
          <MobileNav type="enter" dark />
          <Header />
          <Transitions classNames="slide">
            <div className="welcome__content">
              <div className="welcome__header">Вход</div>
              <div className="sign-in__text">{ message }</div>
              <form onSubmit={onSubmit} className="sign-in__form">
                {
                  isPhoneVisible &&
                  <Transitions>
                    <Input
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      className="input_phone input_phone-sign-in"
                    />
                  </Transitions>
                }
              </form>
              <MobileCode
                className="mobile-code_sign-in"
                phone={phone}
                onCodeSend={onCodeSend}
                onEnter={onEnter}
                ref={mobileCode}
              />
              <div className="welcome__footer">
                <Link className="link-nav" to={Pages.SIGN_UP}>Регистрация</Link>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default SignIn;
