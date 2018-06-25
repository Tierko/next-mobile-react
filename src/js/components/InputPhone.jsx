import React from 'react';
import cs from 'classnames';
import InputMask from 'react-input-mask';
import Input from './Input';

class InputPhone extends Input {
  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      clear,
    } = this.props;
    const { onChange } = this;

    return (
      <div className={`input ${className}`}>
        <InputMask
          type="tel"
          className="input__value"
          name={name}
          value={value}
          onChange={onChange}
          mask="+7 999 999-99-99"
        />
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>
          {placeholder}
        </div>
        <div className="input__error">{errorText}</div>
        <div className={cs('input__indicator', { input__indicator_error: errorText })} />
        {
          clear &&
          <div className="input__clear" onClick={() => this.props.onChange(name, '')} role="button" />
        }
      </div>
    );
  }
}

export default InputPhone;
