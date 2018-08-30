import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from './Input';
import Calendar from './Calendar';
import { MONTHS_M } from '../constants';

const formatFunction = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${MONTHS_M[month]} ${year}`;
};

class Date extends Input {
  state = {
    show: false,
  };

  showCalendar = () => {
    this.setState({
      show: true,
    });
  };

  toggleCalendar = () => {
    const { show } = this.state;

    this.setState({
      show: !show,
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

  onChange = (v) => {
    const { name, onChange } = this.props;

    this.setState({
      show: false,
    });

    if (onChange) {
      onChange(name, v);
    }
  };

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      fromTomorrow,
      formatter,
    } = this.props;
    const { showCalendar, toggleCalendar, onChange } = this;
    const { show } = this.state;

    return (
      <div className={`input ${className}`} ref={(e) => { this.date = e; }}>
        <div className="input__inner">
          <div
            className="input__value input__value_date"
            onClick={showCalendar}
          >
            {formatter(value)}
          </div>
          {/*<input*/}
            {/*type="text"*/}
            {/*name={name}*/}
            {/*onChange={() => {}}*/}
            {/*onFocus={showCalendar}*/}
            {/*value={formatter(value)}*/}
            {/*className="input__value"*/}
            {/*onClick={showCalendar}*/}
          {/*/>*/}
          <div className="input__icon input__icon_calendar" onClick={toggleCalendar} />
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
        <Calendar
          onChange={onChange}
          show={show}
          date={value}
          fromTomorrow={fromTomorrow}
        />
      </div>
    );
  }
}

Date.propTypes = {
  value: PropTypes.shape(),
  formatter: PropTypes.func,
};

Date.defaultProps = {
  value: new window.Date(),
  formatter: formatFunction,
};

export default Date;
