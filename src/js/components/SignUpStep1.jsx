import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from './InputPhone';
import Button from './Button';
import { checkPhone } from '../utils';

class SignUpStep1 extends Component {
  state = {
    phone: '+7',
  };

  onChange = (_, value) => {
    this.setState({
      phone: value,
    });
  };

  render() {
    const { phone } = this.state;
    const { onChange } = this;
    const { nextStep } = this.props;
    const isPhoneValid = checkPhone(phone);

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Текущий номер телефона</div>
        <div className="sign-up__form">
          <Input name="phone" value={phone} onChange={onChange} className="input_phone" />
        </div>
        <Button className="button_sign-up-continue" onClick={() => nextStep(2)} disabled={!isPhoneValid}>Продолжить</Button>
        <div className={cs('sign-up__note', { 'sign-up__note_show': isPhoneValid })}>К личной информации</div>
      </div>
    );
  }
}

SignUpStep1.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpStep1;
