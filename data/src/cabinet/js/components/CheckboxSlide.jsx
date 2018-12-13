import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const CheckboxSlide = ({
  value,
  name,
  onChange,
  className,
  disabled,
}) => (
  <div
    className={cs(`checkbox-slide ${className}`, {
      'checkbox-slide_checked': value,
      'checkbox-slide_disabled': disabled && value,
    })}
  >
    <input
      className={cs('checkbox-slide__value', {
        'checkbox-slide__value_disabled': disabled,
        'checkbox-slide__value_disabled-on': disabled && value,
        'checkbox-slide__value_disabled-off': disabled && !value,
      })}
      type="checkbox"
      checked={value}
      name={name}
      onChange={() => !disabled && onChange(name, !value)}
    />
    <div
      className={cs('checkbox-slide__point', {
        'checkbox-slide__point_checked': value,
      })}
    />
  </div>
);

CheckboxSlide.propTypes = {
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

CheckboxSlide.defaultProps = {
  className: '',
  disabled: false,
};

export default CheckboxSlide;
