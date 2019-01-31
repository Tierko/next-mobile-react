import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';

import MobileNav from '~/common/js/components/MobileNav';
import Header from '~/common/js/components/Header';

import Input from '@cabinet/components/InputPhone';
import MobileCode from '@cabinet/components/MobileCode';
import Transitions from '@cabinet/components/Transitions';

import { Pages, TITLES } from '~/common/js/constants';
import { formatPhone } from '@cabinet/utils';

class SignIn extends Component {
  state = {
    message: 'На\u00A0указанный номер Next Mobile будет отправлен код для входа в\u00A0Личный кабинет',
    isPhoneVisible: true,
  };

  onChange = (name, value) => {
    const {
      authFormActions,
    } = this.props
    authFormActions.changeField(name, value)
  }

  onCodeSend = (initTimer) => {
    const {
      authActions,
      authForm,
    } = this.props
    authActions.sendCode(authForm.phone).then(() => {
      initTimer();
      this.setState({
        message: `Введите код, присланный на номер \n ${formatPhone(authForm.phone)}`,
        isPhoneVisible: false,
      });
    })
  };

  showError = (name) => (error) => {
    if (error && error.length !== 0) {
      this.setState({
        [name]: error.data[0].text,
      });
    }
  }

  onEnter = (code) => {
    const {
      history,
      authActions,
      authForm,
    } = this.props;

    if (code.length === 4) {
      authActions.login(authForm.phone, code)
        .then(() => {
          history.push(Pages.DASHBOARD);
        })
        .catch(this.showError('mobileCodeError'));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
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
      message,
      isPhoneVisible,
    } = this.state;
    const {
      authForm,
    } = this.props
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
                      value={authForm.phone}
                      onChange={onChange}
                      className="input_phone input_phone-sign-in"
                    />
                  </Transitions>
                }
              </form>
              <MobileCode
                className="mobile-code_sign-in"
                phone={authForm.phone}
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

  authForm: PropTypes.shape().isRequired,

  authFormActions: PropTypes.shape().isRequired,
  authActions: PropTypes.shape().isRequired,
};

export default SignIn;
