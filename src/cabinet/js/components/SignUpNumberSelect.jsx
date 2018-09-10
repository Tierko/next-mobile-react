import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

class SignUpNumberSelect extends Component {
  state = {
    tab: '',
    showList: false,
  };

  render() {
    const { nextStep } = this.props;

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__message sign-up__message_select-number">
          Выберите новый номер телефона
        </div>
        <Button onClick={() => nextStep('')} className="button_sign-up-continue">Продолжить</Button>
      </div>
    );
  }
}

SignUpNumberSelect.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpNumberSelect;
