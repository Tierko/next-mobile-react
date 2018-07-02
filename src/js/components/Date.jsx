import React from 'react';
import cs from 'classnames';
import Input from './Input';
import Calendar from './Calendar';
import { monthsM, weekdays } from '../constants';

class Date extends Input {
  state = {
    show: false,
  };

  dateUpdate = (date) => {
    const { name, format } = this.props;
    const {
      month,
      day,
      weekday,
      year,
    } = date;
    let value;

    if (format === 'dmw') {
      value = `${day} ${monthsM[month]} (${weekdays[weekday]})`;
    } else {
      value = `${day} ${monthsM[month]} ${year}`;
    }

    this.props.onChange(name, value);
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
    } = this.props;
    const { dateUpdate, showCalendar } = this;
    const { show } = this.state;

    return (
      <div className={`input ${className}`} ref={(e) => { this.date = e; }}>
        <input
          type="text"
          className="input__value"
          name={name}
          value={value}
          onChange={() => {}}
          onFocus={showCalendar}
          onClick={showCalendar}
        />
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
        <div className="input__icon input__icon_calendar" onClick={showCalendar} />
        {
          clear &&
          <div className="input__icon_clear" onClick={() => this.props.onChange(name, '')} role="button" />
        }
        <Calendar onUpdateDate={dateUpdate} show={show} />
      </div>
    );
  }
}

export default Date;
