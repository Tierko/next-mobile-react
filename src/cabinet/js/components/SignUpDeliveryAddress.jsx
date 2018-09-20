import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../../../common/js/components/Input';
import Button from '../../../common/js/components/Button';
import AutoComplete from '../../../common/js/components/AutoComplete';
import Transitions from '../components/Transitions';
import { Pages, Statuses } from '../constants';

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
    const { toPage } = this.props;
    const { isFilled } = this;

    if (isFilled()) {
      toPage(`${Pages.REQUEST_STATUS}/${Statuses.REQUEST_SENT}`);
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
            <Button
              className="button_sign-up-address"
              onClick={onSubmit}
              disabled={!isFilled()}
              primary
            >
              Отправить заявку
            </Button>
          </form>
          <div className={cs('sign-up__note', { 'sign-up__note_show': isFilled() })}>
            Я соглашаюсь с условиями пользования сайтом и с правилами обработки персональных данных
          </div>
        </div>
      </Transitions>
    );
  }
}

SignUpDeliveryAddress.propTypes = {
  toPage: PropTypes.func.isRequired,
};

export default SignUpDeliveryAddress;
