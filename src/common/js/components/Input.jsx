import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Input extends Component {
  onChange = (e) => {
    const { onChange, name, multiLine } = this.props;
    const { value } = e.target;
    const { textArea } = this;

    onChange(name, value);

    if (multiLine && textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  onFocus = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus();
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur();
    }
  };

  onKeyDown = (e) => {
    const { onKeyDown } = this.props;

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      multiLine,
      clear,
      simplePlaceholder,
      disabled,
      light,
    } = this.props;
    const {
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
    } = this;

    return (
      <div className={`input ${className}`}>
        {
          multiLine &&
          <textarea
            className="input__value input__value_multiline"
            rows={1}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            ref={(e) => { this.textArea = e; }}
            placeholder={simplePlaceholder && placeholder}
          />
        }
        {
          !multiLine &&
            <input
              type="text"
              className={cs('input__value', {
                input__value_light: light,
              })}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={simplePlaceholder ? placeholder : ''}
              disabled={disabled}
            />
        }
        {
          !simplePlaceholder &&
          <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>
            {placeholder}
          </div>
        }
        <div className="input__error">{errorText}</div>
        <div
          className={cs('input__indicator', {
            input__indicator_error: errorText,
            input__indicator_light: light,
          })}
        />
        {
          clear &&
          <div className="input__clear" onClick={() => this.props.onChange(name, '')} role="button" />
        }
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  multiLine: PropTypes.bool,
  clear: PropTypes.bool,
  simplePlaceholder: PropTypes.bool,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  errorText: '',
  multiLine: false,
  clear: false,
  onBlur: null,
  onFocus: null,
  simplePlaceholder: false,
  onKeyDown: null,
  disabled: false,
};

export default Input;
