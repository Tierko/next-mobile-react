import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import InputMask from 'react-input-mask';
import Input from '../../../common/js/components/Input';

class InputCard extends Input {
  render() {
    const {
      className,
      placeholder,
      value,
      mask,
      title,
    } = this.props;
    const { onChange } = this;

    return (
      <div className={`input-card ${className}`}>
        <div
          className={cs('input-card__placeholder', {
            'input-card__placeholder_filled': !!value && title,
          })}
        >
          {title}
        </div>
        <InputMask
          className="input-card__value"
          mask={mask}
          maskChar={null}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className={cs('input-card__indicator', { input__indicator_error: 0 })} />
      </div>
    );
  }
}

InputCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
};

InputMask.defaultProps = {
  className: '',
};

export default InputCard;