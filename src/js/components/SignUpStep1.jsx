import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import { Pages } from '../constants';

class SignUpStep1 extends Component {
  state = {
    phone: '+7',
  };

  onChange = (_, value) => {
    this.setState({
      phone: value,
    });
  };

  nextStep = () => {
    const { history } = this.props;

    history.push(`${Pages.SignUp}/step/2`);
  };

  render() {
    const { phone } = this.state;
    const { onChange, nextStep } = this;

    return (
      <div className="sign-up__content">
        <div>Текущий номер телефона</div>
        <Input name="phone" value={phone} onChange={onChange} className="input_phone" />
        <Button onClick={nextStep} disabled={!phone}>Продолжить</Button>
      </div>
    );
  }
}

SignUpStep1.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default SignUpStep1;
