import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import Input from '../components/InputPhone';
import LogoAnimated from '../components/LogoAnimated';
import MobileCode from '../components/MobileCode';
import Transitions from '../components/Transitions';
import { Pages, TITLES, GENERAL_SETTINGS } from '../constants';
import { cleanPhone } from '../utils';

class SignIn extends Component {
  state = {
    phone: '',
    message: 'На\u00A0указанный номер Next Mobile будет отправлен код для входа в\u00A0Личный кабинет',
    isPhoneVisible: true,
    expandLogo: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCodeSend = (onSuccess) => {
    const { phone } = this.state;
    const that = this;

    let headers = new Headers({
      'Content-Types': 'application/json',
    });


    headers.append('Authorization', `Basic ${btoa(GENERAL_SETTINGS.api_login + ":" + GENERAL_SETTINGS.api_password)}`);
    var data = new FormData();
    const formattedPhone = cleanPhone(phone);
    data.append( "phone",  formattedPhone);


    fetch(`${GENERAL_SETTINGS.api_url}${GENERAL_SETTINGS.api_version}/auth/send-code/`, {
      method: 'POST',
      headers: headers,
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
      .then(data => {
        console.log(data);
        that.setState({
          message: `Введите код, присланный на номер \n ${phone}`,
          isPhoneVisible: false,
        });
        onSuccess();
      })
      .catch(error => {
        error.json()
          .then(data => {
            that.setState({
              message: `${data[0].text}`
            });
          })
      });
  };

  onEnter = (code) => {
    const { history } = this.props;

    if (code.length === 4) {
      history.push(Pages.DASHBOARD);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        expandLogo: true,
      });
    }, 400);
  }

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
      expandLogo,
    } = this.state;
    const meta = {
      title: TITLES.SIGN_IN,
    };

    // if (!localStorage.getItem('logged')) {
    //     return <h2>Welcome</h2>;
    // }

    return (
      <DocumentMeta {...meta}>
        <div className="welcome">
          <MobileNav type="enter" />
          <Header />
          <Transitions classNames="slide">
            <div className="welcome__content">
              <LogoAnimated expand={expandLogo} />
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
              <MobileCode className="mobile-code_sign-in" phone={phone} onCodeSend={onCodeSend} onEnter={onEnter} ref={mobileCode} />
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
