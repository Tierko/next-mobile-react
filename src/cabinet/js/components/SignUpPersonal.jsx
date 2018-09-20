import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../../../common/js/components/Input';
import Button from '../../../common/js/components/Button';
import Transitions from '../components/Transitions';

class SignUpPersonal extends Component {
  state = {
    surname: '',
    name: '',
    middleName: '',
    surnameError: false,
    nameError: false,
    middleNameError: false,
  };

  onChange = (name, value) => {
    let tmp = value.replace(/[^а-яё]/gi, '');
    let error = false;

    if (value.search(/[^а-яё]/gi) !== -1) {
      error = true;
    }

    if (tmp.length !== 0) {
      tmp = `${tmp[0].toUpperCase()}${tmp.substr(1)}`;
    }

    this.setState({
      [name]: tmp,
      [`${name}Error`]: error,
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

  onBlur = () => {
    this.setState({
      nameError: false,
      surnameError: false,
      middleNameError: false,
    });
  };

  isFilled = () => {
    const { name, surname, middleName } = this.state;

    return !!name && !!surname && !!middleName;
  };

  render() {
    const {
      onChange,
      onSubmit,
      isFilled,
      onBlur,
    } = this;
    const {
      name,
      surname,
      middleName,
      nameError,
      surnameError,
      middleNameError,
    } = this.state;

    return (
      <Transitions classNames="slide">
        <div className="welcome__content sign-up">
          <div className="sign-up__header">Информация о владельце телефонного номера</div>
          <form onSubmit={onSubmit} className="sign-up__form">
            <Input
              name="surname"
              value={surname}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Фамилия"
              errorText={surnameError && 'Смените раскладку на кириллицу'}
            />
            <Input
              name="name"
              value={name}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Имя"
              errorText={nameError && 'Смените раскладку на кириллицу'}
            />
            <Input
              name="middleName"
              value={middleName}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Отчество"
              errorText={middleNameError && 'Смените раскладку на кириллицу'}
            />
            <Button
              className="button_sign-up-continue"
              onClick={onSubmit}
              disabled={!isFilled()}
              primary
            >
              Продолжить
            </Button>
          </form>
          <div className={cs('sign-up__note', { 'sign-up__note_show': isFilled() })}>
            Перейти к дате доставки сим-карты
          </div>
        </div>
      </Transitions>
    );
  }
}

SignUpPersonal.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpPersonal;
