import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from './InputPhone';
import Button from './Button';
import { checkPhone } from '../utils';

class SignUpStep1 extends Component {
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
    const { nextStep } = this.props;
    const { phone } = this.state;

    if (checkPhone(phone)) {
      nextStep(2);
    }
  };

  render() {
    const { phone } = this.state;
    const { onChange, onSubmit } = this;
    const isPhoneValid = checkPhone(phone);

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Текущий номер телефона</div>
        <form onSubmit={onSubmit} className="sign-up__form">
          <Input name="phone" value={phone} onChange={onChange} className="input_phone" />
        </form>
        <Button className="button_sign-up-continue" onClick={onSubmit} disabled={!isPhoneValid}>Продолжить</Button>
        <div className={cs('sign-up__note', { 'sign-up__note_show': isPhoneValid })}>К личной информации</div>
      </div>
    );
  }
}

SignUpStep1.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpStep1;
