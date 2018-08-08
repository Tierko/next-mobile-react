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
  };

  onChange = (name, value) => {
    let tmp = value.replace(/^\s/g, '');

    if (tmp.length !== 0) {
      tmp = `${tmp[0].toUpperCase()}${tmp.substr(1).toLowerCase()}`;
    }

    this.setState({
      [name]: tmp,
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

  isFilled = () => {
    const { name, surname, middleName } = this.state;

    return !!name && !!surname && !!middleName;
  };

  render() {
    const { name, surname, middleName } = this.state;
    const { onChange, onSubmit, isFilled } = this;

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Владелец номера</div>
        <form onSubmit={onSubmit} className="sign-up__form">
          <Input name="surname" value={surname} onChange={onChange} placeholder="Фамилия" />
          <Input name="name" value={name} onChange={onChange} placeholder="Имя" />
          <Input name="middleName" value={middleName} onChange={onChange} placeholder="Отчество" />
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
