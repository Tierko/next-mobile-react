import React from 'react';
import cs from 'classnames';
import Input from './Input';
import Calendar from './Calendar';
import { MONTHS_M, WEEKDAYS } from '../constants';

class Date extends Input {
  state = {
    show: false,
  };

  dateUpdate = (date) => {
    const {
      name,
      format,
      onChange,
      onChangeRaw,
    } = this.props;
    const {
      month,
      day,
      weekday,
      year,
    } = date;
    let value;

    if (format === 'dmw') {
      value = `${day} ${MONTHS_M[month]} (${WEEKDAYS[weekday]})`;
    } else {
      value = `${day} ${MONTHS_M[month]} ${year}`;
    }

    onChange(name, value);

    if (onChangeRaw) {
      onChangeRaw(`${name}Raw`, {
        year,
        month,
        day,
      });
    }

    this.setState({
      show: false,
    });
  };

  showCalendar = () => {
    this.setState({
      show: true,
    });
  };

  componentDidMount() {
    const { outsideClick } = this;

    document.addEventListener('click', outsideClick);
  }

  componentWillUnmount() {
    const { outsideClick } = this;

    document.removeEventListener('click', outsideClick);
  }

  outsideClick = (e) => {
    const { date } = this;

    if (!date.contains(e.target)) {
      this.setState({
        show: false,
      });
    }
  };

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      clear,
      initDate,
      fromToday,
    } = this.props;
    const { dateUpdate, showCalendar } = this;
    const { show } = this.state;

    return (
      <div className={`input ${className}`} ref={(e) => { this.date = e; }}>
        <div className="input__inner">
          <input
            type="text"
            className="input__value"
            name={name}
            value={value}
            onChange={() => {}}
            onFocus={showCalendar}
            onClick={showCalendar}
          />
          <div className="input__icon input__icon_calendar" onClick={showCalendar} />
        </div>
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>
          {placeholder}
        </div>
        <div className="input__error">{errorText}</div>
        <div
          className={cs('input__indicator', {
            input__indicator_error: errorText,
            input__indicator_hide: show,
          })}
        />
        {
          clear &&
          <div className="input__icon_clear" onClick={() => this.props.onChange(name, '')} role="button" />
        }
        <Calendar onUpdateDate={dateUpdate} show={show} initDate={initDate} fromToday={fromToday} />
      </div>
    );
  }
}

export default Date;
