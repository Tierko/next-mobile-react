import React from 'react';
import cs from 'classnames';
import Input from './Input';

class InputRuble extends Input {
  sumFocus = () => {
    const { name, value, onChange } = this.props;

    onChange(name, value.replace(' ₽', ''));
  };

  sumBlur = () => {
    const { name, value, onChange } = this.props;

    onChange(name, `${value} ₽`);
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
    const { onChange, sumFocus, sumBlur } = this;

    return (
      <div className={`input ${className}`}>
        <input
          type="text"
          className="input__value"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={sumFocus}
          onBlur={sumBlur}
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

export default InputRuble;
