import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Select from '../../../common/js/components/Select';
import Date from '../components/Date';
import Button from '../../../common/js/components/Button';
import Transitions from '../components/Transitions';
import { MONTHS_M, Pages, Statuses, WEEKDAYS } from '../constants';

class SignUpDeliveryDate extends Component {
  static times = [{
    id: 1,
    title: '9:00 — 13:00',
  }, {
    id: 2,
    title: '15:00 — 19:00',
  }];

  state = {
    date: new window.Date(window.Date.now() + (60 * 60 * 24 * 1000)),
    time: {
      id: 1,
      title: '9:00 — 13:00',
    },
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  formatDate = (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const w = date.getDay();

    return `${day} ${MONTHS_M[month]} (${WEEKDAYS[w]})`;
  };

  render() {
    const { date, time } = this.state;
    const { onChange, formatDate } = this;
    const { toPage } = this.props;
    const { times } = SignUpDeliveryDate;
    const permit = !!date && !!time;

    return (
      <Transitions classNames="slide">
        <div className="welcome__content sign-up">
          <div className="sign-up__header">Время доставки</div>
          <div className="sign-up__form">
            <div className="sign-up__message sign-up__message_step4">
              Когда вам будет удобно подписать договор и получить новую сим-карту?
            </div>
            <Date
              name="date"
              value={date}
              onChange={onChange}
              placeholder="Дата"
              fromTomorrow
              formatter={formatDate}
            />
            <Select placeholder="Время" onSelect={v => onChange('time', v)} items={times} value={time} />
            <Button className="button_sign-up-step4" onClick={() => toPage(`${Pages.REQUEST_STATUS}/${Statuses.REQUEST_SENT}`)} disabled={!permit}>
              Отправить заявку
            </Button>
          </div>
          <div className={cs('sign-up__note', { 'sign-up__note_show': permit })}>
            Я соглашаюсь с условиями пользования сайтом и с правилами обработки персональных данных
          </div>
        </div>
      </Transitions>
    );
  }
}

SignUpDeliveryDate.propTypes = {
  toPage: PropTypes.func.isRequired,
};

export default SignUpDeliveryDate;
