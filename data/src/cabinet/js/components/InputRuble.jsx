import React from 'react';
import cs from 'classnames';
import Input from '../../../common/js/components/Input';
import { formatCost } from '../utils';

class InputRuble extends Input {
  constructor(props) {
    super();

    this.state = {
      value: formatCost(props.value),
    };
  }
  onChange = ({ target }) => {
    const { name, onChange, length } = this.props;
    const { value } = target;
    const fValue = formatCost(value);

    if (length && value.replace(/[^\d/.,]/g, '').length > length) {
      return;
    }

    this.setState({
      value: fValue,
    }, () => {
      target.setSelectionRange(fValue.length - 2, fValue.length - 2);
    });

    onChange(name, value.replace(/[^\d/.,]/g, '').replace(',', '.') * 1);
  };

  change = (value) => {
    const { name, onChange } = this.props;
    const fValue = formatCost(value);

    this.setState({
      value: fValue,
    });

    onChange(name, value.replace(/[^\d/.,]/g, '').replace(',', '.') * 1);
  };

  onFocus = ({ target }) => {
    const { value } = this.state;

    target.setSelectionRange(value.length - 2, value.length - 2);
  };

  render() {
    const {
      name,
      className,
      placeholder,
      errorText,
      clear,
      disabled,
    } = this.props;
    const { onChange, onFocus, change } = this;
    const { value } = this.state;

    return (
      <div className={`input ${className}`}>
        <input
          type="text"
          className="input__value"
          name={name}
          value={value}
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
          <div
            className="input__icon input__icon_clear"
            onClick={() => !disabled && change(0)}
            role="button"
          />
        }
      </div>
    );
  }
}

export default InputRuble;
