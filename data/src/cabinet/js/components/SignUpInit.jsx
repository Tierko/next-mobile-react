import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PromoCode from './PromoCode';
import Input from './InputPhone';
import Button from '../../../common/js/components/Button';
import LogoAnimated from './LogoAnimated';
import Transitions from './Transitions';
import { Pages, Statuses } from '../constants';
import { checkPhone } from '../utils';

class SignUp extends Component {
  state = {
    phone: '',
  };

  onCodeEnter = () => {
    const { toPage } = this.props;

    toPage(`${Pages.SIGN_UP}/promo`);
  };

  onCodeReject = () => {
    const { toPage } = this.props;

    toPage(`${Pages.SIGN_UP}/no-promo`);
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmitNoPromo = (e) => {
    e.preventDefault();
    const { toPage } = this.props;

    toPage(`${Pages.REQUEST_STATUS}/${Statuses.REQUEST_SENT}`);
  };

  MESSAGES = {
    INIT: 'Введите промо-код, чтобы начать работу',
    PROMO: '8 ГБ интернета, безлимит СМС и 1 000 мин в месяц бесплатно в течение 6 месяцев. Плата после – от 1 000 ₽ в месяц',
    NO_PROMO: 'Подключиться к сети Next Mobile можно только после получения приглашения. Оставьте запрос — и мы расскажем, что делать дальше',
  };

  render() {
    const {
      phone,
    } = this.state;
    const {
      onCodeEnter,
      onCodeReject,
      onChange,
      onSubmitNoPromo,
      MESSAGES,
    } = this;
    const { nextStep, mode } = this.props;

    return (
      <div className="welcome__content sign-up">
        <Transitions>
          <LogoAnimated expand={mode === 'promo'} />
        </Transitions>
        <div className="sign-up__message">
          {
            !mode &&
            <Transitions>
              {MESSAGES.INIT}
            </Transitions>
          }
          {
            mode === 'promo' &&
            <Transitions>
              {MESSAGES.PROMO}
            </Transitions>
          }
          {
            mode === 'no-promo' &&
            <Transitions>
              {MESSAGES.NO_PROMO}
            </Transitions>
          }
        </div>
        {
          !mode &&
          <PromoCode onCodeEnter={onCodeEnter} onCodeReject={onCodeReject} />
        }
        {
          mode === 'no-promo' &&
          <Transitions>
            <form onSubmit={onSubmitNoPromo}>
              <div>Введите номер для связи</div>
              <Input className="input_phone" name="phone" value={phone} onChange={onChange} />
              <Button primary className="button_request" onClick={onSubmitNoPromo} disabled={!checkPhone(phone)}>
                Продолжить…
              </Button>
            </form>
          </Transitions>
        }
        {
          mode === 'promo' &&
          <Transitions>
            <Fragment>
              <Button primary className="button_to-next-mobile" onClick={() => nextStep('phone')}>Перейти на Next Mobile</Button>
              <div className="sign-up__agreement">
                Я ознакомлен с <Link to={Pages.CONDITIONS} className="link">условиями перехода</Link>
              </div>
            </Fragment>
          </Transitions>
        }
      </div>
    );
  }
}

SignUp.propTypes = {
  toPage: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default SignUp;
