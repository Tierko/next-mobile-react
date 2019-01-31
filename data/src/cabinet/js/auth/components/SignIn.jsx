import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../../common/js/components/MobileNav';
import Header from '../../../../common/js/components/Header';
import Input from '../../components/InputPhone';
import MobileCode from '../../components/MobileCode';
import Transitions from '../../components/Transitions';
import { Pages, TITLES } from '../../constants';
import { cleanPhone, sendAjax, token } from '../../utils';

class SignIn extends Component {
  state = {
    phone: '',
    message: 'На\u00A0указанный номер Next Mobile будет отправлен код для входа в\u00A0Личный кабинет',
    isPhoneVisible: true,
  };

  componentDidMount() {
    const { history } = this.props;
    if (token.get()) {
      history.push(Pages.DASHBOARD);
    }
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCodeSend = async (onSuccess) => {
    const { phone } = this.state;

    const formattedPhone = cleanPhone(phone);

    const form = new FormData();
    form.append('phone', formattedPhone);

    try {
      await sendAjax('/auth/send-code/', 'POST', form);
      this.setState({
        message: `Введите код, присланный на номер \n ${phone}`,
        isPhoneVisible: false,
      });
      onSuccess();
    } catch (error) {
      error.json()
        .then((data) => {
          this.setState({
            message: `${data[0].text}`,
          });
        });
    }
  };

  onEnter = async (code) => {
    const { history } = this.props;
    const { phone } = this.state;

    const formattedPhone = cleanPhone(phone);

    const formData = new FormData();
    formData.append('phone', formattedPhone);
    formData.append('code', code);

    if (code.length === 4) {
      await sendAjax('/auth/login/', 'POST', formData)
        .then((data) => {
          token.set(data.token);
          history.push(Pages.DASHBOARD);
        })
        .catch((error) => {
          error.json()
            .then((data) => {
              this.setState({
                message: `${data[0].text}`,
              });
            });
        });
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
