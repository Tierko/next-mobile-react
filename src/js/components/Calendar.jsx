import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import ButtonIcon from '../components/ButtonIcon';
import { MONTHS, WEEKDAYS_SHORT } from '../constants';

class Calendar extends Component {
  static prevMonthDays = (year, month, count) => {
    let currentMonth = month - 1;
    let currentYear = year;

    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }

    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }

    const days = Array(Calendar.getDaysPerMonth(currentMonth, currentYear)).fill(0)
      .map((_, i) => i + 1);

    return days.slice(days.length - count);
  };

  static nextMonthDays = (count) => {
    const days = Array(count).fill(0).map((_, i) => i + 1);

    if (days.length === 7) {
      return [];
    }

    return days;
  };

  constructor(props) {
    const today = props.initDate || new Date();

    super(props);
    this.state = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
      selectedYear: today.getFullYear(),
      selectedMonth: today.getMonth(),
    };
  }

  onUpdateDate = (year, month, day) => {
    const { onUpdateDate } = this.props;
    const date = new Date(year, month, day);
    const weekday = date.getDay();

    if (onUpdateDate) {
      onUpdateDate({
        year,
        month,
        day,
        weekday,
      });
    }
  };

  static getDaysPerMonth = (month, year) => {
    let days;

    if (
      month === 0 ||
      month === 2 ||
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      days = 31;
    }

    if (
      month === 3 ||
      month === 5 ||
      month === 8 ||
      month === 10
    ) {
      days = 30;
    }

    if (month === 1) {
      if (year % 4 === 0) {
        days = 29;
      } else {
        days = 28;
      }
    }

    return days;
  };

  static getMonthOffsetStart = (month, year) => {
    const date = new Date(year, month, 1);
    const days = date.getDay();

    if (days === 0) {
      return 6;
    }

    if (days - 1 < 0) {
      return 0;
    }

    return days - 1;
  };

  selectDay = (e) => {
    const { selectedYear } = this.state;
    let { day, month } = e.currentTarget.dataset;
    day *= 1;
    month *= 1;

    this.setState({
      day,
      selectedMonth: month,
    });

    this.onUpdateDate(selectedYear, month, day);
  };

  changeMonth = (dir) => {
    const { month, year } = this.state;
    let newMonth = month;
    let newYear = year;

    if (dir === 'next') {
      newMonth += 1;
    }

    if (dir === 'prev') {
      newMonth -= 1;
    }

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    this.setState({
      month: newMonth,
      year: newYear,
    });
  };

  componentDidMount() {
    const date = this.props.initDate || new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    this.onUpdateDate(year, month, day);
  }

  render() {
    const { changeMonth, selectDay } = this;
    const { show } = this.props;
    const {
      year,
      month,
      day,
      selectedMonth,
    } = this.state;
    const daysPerMonth = Calendar.getDaysPerMonth(month, year);
    const offsetStart = Calendar.getMonthOffsetStart(month, year);
    const offsetEnd = 7 - ((daysPerMonth + offsetStart) % 7);
    const prevMonthDays = Calendar.prevMonthDays(year, month, offsetStart);
    const nextMonthDays = Calendar.nextMonthDays(offsetEnd);
    const days = Array(daysPerMonth).fill(null);

    return (
      <div className={cs('calendar', { calendar_show: show })}>
        <div className="calendar__header">
          <div className="calendar__month-year">{MONTHS[month]} {year}</div>
          <div className="calendar__control">
            <ButtonIcon onClick={() => changeMonth('prev')} icon="prev.svg" />
            <ButtonIcon onClick={() => changeMonth('next')} icon="next.svg" />
          </div>
        </div>
        <div className="calendar__weekdays">
          {
            WEEKDAYS_SHORT.map((w, i) => (
              <div key={i} className="calendar__weekday">{w}</div>
            ))
          }
        </div>
        <div className="calendar__days">
          {
            prevMonthDays.map(d => (
              <div key={d + (month + 1)} className="calendar__day calendar__day_disabled">
                <span>{d}</span>
              </div>
            ))
          }
          {
            days.map((_, i) => (
              <div
                key={i * (month + 2)}
                className={cs('calendar__day', {
                  calendar__day_active: day === i + 1 && selectedMonth === month })
                }
                data-day={i + 1}
                data-month={month}
                onClick={selectDay}
              >
                <span>{i + 1}</span>
              </div>
            ))
          }
          {
            nextMonthDays.map(d => (
              <div key={d + (month + 1)} className="calendar__day calendar__day_disabled">
                <span>{d}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  onUpdateDate: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  initDate: PropTypes.shape(),
};

Calendar.defaultProps = {
  initDate: null,
};

export default Calendar;
