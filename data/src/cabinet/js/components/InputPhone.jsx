import React from 'react';
import cs from 'classnames';
import InputMask from 'react-input-mask';

import Input from '~/common/js/components/Input';

import { formatFromPhone, formatPhone } from '@cabinet/utils'

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

    const realOnChange = (e) => {
      onChange({
        target: {
          value: formatFromPhone(e.target.value),
        }
      })
    }

    return (
      <div className={`input ${className}`}>
        <InputMask
          type="tel"
          className="input__value"
          name={name}
          value={value || '+7'}
          onChange={realOnChange}
          mask="+7 999 999-99-99"
          maskChar={null}
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
