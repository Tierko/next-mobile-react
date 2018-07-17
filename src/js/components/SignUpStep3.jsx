import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from './Input';
import Button from './Button';
import AutoComplete from './AutoComplete';

class SignUpStep3 extends Component {
  state = {
    city: '',
    street: '',
    house: '',
    flat: '',
    housing: '',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      city,
      street,
      house,
      flat,
      housing,
    } = this.state;
    const { onChange } = this;
    const { nextStep } = this.props;
    const permit = !!city && !!street && !!house;

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Адрес доставки</div>
        <div className="sign-up__form">
          <AutoComplete
            name="city"
            value={city}
            onChange={onChange}
            onSelect={onChange}
            placeholder="Город"
            items={[{ id: 1, title: 'Москва' }, { id: 2, title: 'Владивосток' }]}
          />
          <Input name="street" value={street} onChange={onChange} placeholder="Улица" />
          <div className="sign-up__row">
            <Input className="input_narrow-sign-up" name="house" value={house} onChange={onChange} placeholder="Дом" />
            <Input className="input_narrow-sign-up" name="flat" value={flat} onChange={onChange} placeholder="Квартира" />
            <Input className="input_narrow-sign-up" name="housing" value={housing} onChange={onChange} placeholder="Корпус" />
          </div>
          <Button className="button_sign-up-continue" onClick={() => nextStep(4)} disabled={!permit}>
            Продолжить
          </Button>
        </div>
        <div className={cs('sign-up__note', { 'sign-up__note_show': permit })}>
          Ко времени доставки
        </div>
      </div>
    );
  }
}

SignUpStep3.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpStep3;
