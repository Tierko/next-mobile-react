import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../../../common/js/components/Input';
import Button from '../../../common/js/components/Button';
import AutoComplete from '../../../common/js/components/AutoComplete';
import Transitions from '../components/Transitions';

class SignUpDeliveryAddress extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();
    const { nextStep } = this.props;
    const { isFilled } = this;

    if (isFilled()) {
      nextStep('delivery-date');
    }
  };

  isFilled = () => {
    const { city, street, house } = this.state;

    return !!city && !!street && !!house;
  };

  render() {
    const {
      city,
      street,
      house,
      flat,
      housing,
    } = this.state;
    const { onChange, isFilled, onSubmit } = this;

    return (
      <Transitions classNames="slide">
        <div className="welcome__content sign-up">
          <div className="sign-up__header">Адрес доставки</div>
          <form onSubmit={onSubmit} className="sign-up__form">
            <AutoComplete
              name="city"
              value={city}
              onChange={onChange}
              onSelect={(name, value) => onChange(name, value.title)}
              placeholder="Город"
              items={[{ id: 1, title: 'Москва' }, { id: 2, title: 'Владивосток' }]}
            />
            <Input name="street" value={street} onChange={onChange} placeholder="Улица" />
            <div className="sign-up__row">
              <Input
                className="input_sign-up-house"
                name="house"
                value={house}
                onChange={onChange}
                placeholder="Дом"
              />
              <Input
                className="input_sign-up-housing"
                name="housing"
                value={housing}
                onChange={onChange}
                placeholder="Корпус/строение"
              />
              <Input
                className="input_sign-up-flat"
                name="flat"
                value={flat}
                onChange={onChange}
                placeholder="Квартира"
              />
            </div>
            <Button className="button_sign-up-continue" onClick={onSubmit} disabled={!isFilled()}>
              Продолжить
            </Button>
          </form>
          <div className={cs('sign-up__note', { 'sign-up__note_show': isFilled() })}>
            Перейти ко времени доставки
          </div>
        </div>
      </Transitions>
    );
  }
}

SignUpDeliveryAddress.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpDeliveryAddress;
