import React from 'react';
import cs from 'classnames';
import Input from './Input';
import Calendar from './Calendar';

class Date extends Input {
  static months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  static weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  state = {
    show: false,
  };

  dateUpdate = (date) => {
    const { name } = this.props;
    const { months, weekdays } = Date;
    const { month, day, weekday } = date;
    const value = `${day} ${months[month]} (${weekdays[weekday]})`;

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
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>{placeholder}</div>
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
