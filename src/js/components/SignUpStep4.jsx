import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../components/Input';
import Button from '../components/Button';
import { Pages } from '../constants';

class SignUpStep4 extends Component {
  state = {
    date: '12 сентября (четверг)',
    time: '15:00 – 19:00',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { date, time } = this.state;
    const { onChange } = this;
    const { toPage } = this.props;
    const permit = !!date && !!time;

    return (
      <div className="sign-up__content">
        <div className="sign-up__header">Время доставки</div>
        <div className="sign-up__message">Когда вам будет удобно получить новую SIM-карту и подписать договор?</div>
        <Input name="date" value={date} onChange={onChange} placeholder="Дата" />
        <Input name="time" value={time} onChange={onChange} placeholder="Время" />
        <Button className="button_sign-up-continue" onClick={() => toPage(Pages.RequestStatus)} disabled={!permit}>
          Продолжить
        </Button>
        <div className={cs('sign-up__note', { 'sign-up__note_show': permit })}>
          Я соглашаюсь с условиями пользования и на обработку персональных данных
        </div>
      </div>
    );
  }
}

SignUpStep4.propTypes = {
  toPage: PropTypes.func.isRequired,
};

export default SignUpStep4;