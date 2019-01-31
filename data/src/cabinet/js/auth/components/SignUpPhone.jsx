import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../../components/InputPhone';
import Button from '../../../../common/js/components/Button';
import Transitions from '../../components/Transitions';
import { checkPhone } from '../../utils';

class SignUpPhone extends Component {
  state = {
    phone: '',
  };

  onChange = (_, value) => {
    this.setState({
      phone: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { nextStep, number, tariff } = this.props;
    const { phone } = this.state;
    let step = 'personal';

    if (number && !tariff) {
      step = 'choose-tariff';
    }

    if (number && tariff) {
      step = 'choose-number';
    }

    if (number === 'current' && tariff) {
      step = 'personal';
    }

    if (checkPhone(phone)) {
      nextStep(step);
    }
  };

  render() {
    const { phone } = this.state;
    const { onChange, onSubmit } = this;
    const { number, tariff } = this.props;
    const isPhoneValid = checkPhone(phone);
    let message = 'Перейти к персональной информации';

    if (number && !tariff) {
      message = 'Перейти к информации о тарифах';
    }

    if (number && tariff) {
      message = 'Перейти к выбору номер телефона';
    }

    return (
      <Transitions classNames="slide">
        <div className="welcome__content sign-up">
          <div className="sign-up__header">Ваш номер телефона</div>
          <form onSubmit={onSubmit} className="sign-up__form">
            <Input name="phone" value={phone} onChange={onChange} className="input_phone" />
          </form>
          <Button primary className="button_sign-up-continue" onClick={onSubmit} disabled={!isPhoneValid}>Продолжить</Button>
          <div className={cs('sign-up__note', { 'sign-up__note_show': isPhoneValid })}>{ message }</div>
        </div>
      </Transitions>
    );
  }
}

SignUpPhone.propTypes = {
  nextStep: PropTypes.func.isRequired,
  number: PropTypes.string,
  tariff: PropTypes.string,
};

SignUpPhone.defaultProps = {
  number: 0,
  tariff: 0,
};

export default SignUpPhone;
