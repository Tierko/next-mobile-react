import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PromoCode from './PromoCode';
import Input from './InputPhone';
import Button from './Button';
import Logo from './Logo';
import { Pages } from '../constants';

class SignUp extends Component {
  state = {
    message: 'Введите промокод, чтобы начать работу с Next Mobile',
    code: '',
    phone: '+7',
    option: '',
    stage: 1,
  };

  onCodeEnter = (code) => {
    this.setState({
      code,
      option: 'promo',
      stage: 2,
      message: '8 ГБ интернета, безлимит СМС и 1 000 мин в месяц бесплатно в течение 6 месяцев. Плата после – от 1 000 ₽ в месяц',
    });
  };

  onCodeReject = () => {
    this.setState({
      option: 'no-promo',
      stage: 2,
      message: 'Next Mobile - закрытая сотовая сеть. Присоедениться к ней можно, отправив запрос. Мы перезвоним, как только рассмотрим его',
    });
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      message,
      phone,
      option,
      stage,
    } = this.state;
    const {
      onCodeEnter,
      onCodeReject,
      onChange,
    } = this;
    const { nextStep, toPage } = this.props;

    return (
      <div className="sign-up__content">
        <Logo type="photo" className="logo_sign-up" />
        <div className="sign-up__message">{message}</div>
        {
          stage === 1 &&
          <PromoCode onCodeEnter={onCodeEnter} onCodeReject={onCodeReject} />
        }
        {
          option === 'no-promo' && stage === 2 &&
          <Fragment>
            <Input className="input_phone" name="phone" value={phone} onChange={onChange} />
            <Button className="button_request" onClick={() => toPage(Pages.RequestStatus)} disabled={!phone}>
              Отправить запрос
            </Button>
          </Fragment>
        }
        {
          option === 'promo' && stage === 2 &&
          <Fragment>
            <Button className="button_to-next-mobile" onClick={() => nextStep(1)}>Перейти на Next Mobile</Button>
            <div className="sign-up__agreement">
              Я ознакомлен с <Link to={Pages.Conditions} className="link">условиями перехода</Link>
            </div>
          </Fragment>
        }
      </div>
    );
  }
}

SignUp.propTypes = {
  toPage: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default SignUp;
