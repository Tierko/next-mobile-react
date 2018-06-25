import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';

class SignUpStep2 extends Component {
  state = {
    surname: '',
    name: '',
    middlename: '',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, surname, middlename } = this.state;
    const { onChange } = this;
    const { nextStep } = this.props;
    const permit = !!name && !!surname && !!middlename;

    return (
      <div className="sign-up__content">
        <div className="sign-up__header">Владелец номера</div>
        <Input name="surname" value={surname} onChange={onChange} placeholder="Фамилия" />
        <Input name="name" value={name} onChange={onChange} placeholder="Имя" />
        <Input name="middlename" value={middlename} onChange={onChange} placeholder="Отчество" />
        <Button
          className="button_sign-up-continue"
          onClick={() => nextStep(3)}
          disabled={!permit}
        >
          Продолжить
        </Button>
        <div className={cs('sign-up__note', { 'sign-up__note_show': permit })}>
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
