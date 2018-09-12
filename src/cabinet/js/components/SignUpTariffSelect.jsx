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
    const { nextStep } = this.props;
    const { current } = this.state;
    const { onChange } = this;

    return (
      <div className="welcome__content sign-up sign-up_tariff-select">
        <div className="sign-up__message sign-up__message_select-tariff">
          Выберите подходящий тариф
        </div>
        <TariffTable className="tariff-table_sign-up" onChange={onChange} current={current} signUp />
        <Button onClick={() => nextStep('')} className="button_sign-up-continue">Продолжить</Button>
        <div className="sign-up__note sign-up__note_show">К  информации о номере</div>
      </div>
    );
  }
}

SignUpTariffSelect.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpTariffSelect;
