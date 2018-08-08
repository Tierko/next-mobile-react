import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';

class SignUpStep2 extends Component {
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
      nextStep(3);
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
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Владелец номера</div>
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
          >
            Продолжить
          </Button>
        </form>
        <div className={cs('sign-up__note', { 'sign-up__note_show': isFilled() })}>
          К  информации о доставке
        </div>
      </div>
    );
  }
}

SignUpStep2.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpStep2;
