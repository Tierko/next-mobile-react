import React from 'react';
import cs from 'classnames';
import Input from './Input';
import { formatCost } from '../utils';

class InputRuble extends Input {
  onChange = ({ target }) => {
    const { name, onChange } = this.props;
    const { value } = target;
    const fValue = formatCost(value);

    setTimeout(() => {
      target.setSelectionRange(fValue.length - 2, fValue.length - 2);
    }, 20);

    onChange(name, fValue.replace(/\D/g, '') * 1);
  };

  onFocus = ({ target }) => {
    const { value } = this.props;
    const fValue = formatCost(value);

    target.setSelectionRange(fValue.length - 2, fValue.length - 2);
  };

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      clear,
      disabled,
    } = this.props;
    const { onChange, onFocus } = this;

    return (
      <div className={`input ${className}`}>
        <input
          type="text"
          className="input__value"
          name={name}
          value={formatCost(value)}
          onChange={onChange}
          onFocus={onFocus}
          ref={(e) => { this.input = e; }}
          disabled={disabled}
        />
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>
          {placeholder}
        </div>
        <div className="input__error">{errorText}</div>
        <div className={cs('input__indicator', { input__indicator_error: errorText })} />
        {
          clear &&
          <div className="input__icon input__icon_clear" onClick={() => !disabled && this.props.onChange(name, '')} role="button" />
        }
      </div>
    );
  }
}

export default InputRuble;
