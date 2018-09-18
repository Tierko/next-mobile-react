import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';
import TariffTable from '../../../common/js/components/TariffTable';

class SignUpTariffSelect extends Component {
  state = {
    current: -1,
  };

  onChange = (_, v) => {
    this.setState({
      current: v,
    });
  };

  render() {
    const { nextStep, number } = this.props;
    const { current } = this.state;
    const { onChange } = this;
    const message = number === 'new' ? 'К информации о номере' : 'К персональной информации';
    const step = number === 'new' ? 'choose-number' : 'personal/number/new';

    return (
      <div className="welcome__content sign-up sign-up_tariff-select">
        <div className="sign-up__message sign-up__message_select-tariff">
          Выберите подходящий тариф
        </div>
        <TariffTable className="tariff-table_sign-up" onChange={onChange} current={current} signUp />
        <Button onClick={() => nextStep(step)} className="button_sign-up-continue">Продолжить</Button>
        <div className="sign-up__note sign-up__note_show">{message}</div>
      </div>
    );
  }
}

SignUpTariffSelect.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpTariffSelect;
