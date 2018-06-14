import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Input extends Component {
  onChange = (e) => {
    const { onChange, name } = this.props;
    const { value } = e.target;

    onChange(name, value);
  };

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
    } = this.props;
    const { onChange } = this;

    return (
      <div className={`input ${className}`}>
        <input type="text" className="input__value" name={name} value={value} onChange={onChange} />
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>{placeholder}</div>
        <div className="input__error">{errorText}</div>
        <div className={cs('input__indicator', { input__indicator_error: errorText })} />
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  errorText: '',
};

export default Input;
