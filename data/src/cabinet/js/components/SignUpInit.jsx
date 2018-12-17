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
    PROMO: 'В\u00A0течение полугода после подключения каждый месяц бесплатно предоставляются 8\u00A0ГБ трафика, 1000\u00A0мин. разговоров и\u00A0неограниченное число СМС. Затем плата составит от\u00A02000\u00A0₽/мес.',
    NO_PROMO: 'Подключиться к\u00A0сети Next Mobile можно только после получения приглашения. Оставьте запрос\u00A0— и\u00A0мы\u00A0расскажем, что делать дальше',
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
        <div className="welcome__header">Регистрация</div>
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
                Продолжить
              </Button>
            </form>
          </Transitions>
        }
        {
          mode === 'promo' &&
          <Transitions>
            <Fragment>
              <Button primary className="button_to-next-mobile" onClick={() => nextStep('phone')}>
                Перейти на&nbsp;Next Mobile
              </Button>
              <div className="sign-up__agreement">
                Я соглашаюсь с&nbsp;<Link to={Pages.CONDITIONS} className="link">условиями перехода</Link>
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
