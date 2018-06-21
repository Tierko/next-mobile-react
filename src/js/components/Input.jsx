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

  render() {
    const {
      name,
      value,
      className,
      placeholder,
      errorText,
      multiLine,
      clear,
    } = this.props;
    const { onChange } = this;

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
            ref={(e) => { this.textArea = e; }}
          />
        }
        {
          !multiLine &&
            <input type="text" className="input__value" name={name} value={value} onChange={onChange} />
        }
        <div className={cs('input__placeholder', { input__placeholder_filled: !!value && placeholder })}>{placeholder}</div>
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  multiLine: PropTypes.bool,
  clear: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  errorText: '',
  multiLine: false,
  clear: false,
};

export default Input;
