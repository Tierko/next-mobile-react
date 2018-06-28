import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Select from '../components/Select';
import Date from '../components/Date';
import Button from '../components/Button';
import { Pages } from '../constants';

class SignUpStep4 extends Component {
  static times = [{
    id: 1,
    title: '9:00 - 13:00',
  }, {
    id: 2,
    title: '15:00 - 19:00',
  }];

  state = {
    date: '',
    time: {
      id: 1,
      title: '9:00 - 13:00',
    },
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
    const { times } = SignUpStep4;
    const permit = !!date && !!time;

    return (
      <div className="welcome__content sign-up">
        <div className="sign-up__header">Время доставки</div>
        <div className="sign-up__form">
          <div className="sign-up__message">Когда вам будет удобно получить новую SIM-карту и подписать договор?</div>
          <Date name="date" value={date} onChange={onChange} placeholder="Дата" />
          <Select placeholder="Время" onSelect={v => onChange('time', v)} items={times} value={time} />
          <Button className="button_sign-up-continue" onClick={() => toPage(Pages.RequestStatus)} disabled={!permit}>
            Продолжить
          </Button>
        </div>
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
