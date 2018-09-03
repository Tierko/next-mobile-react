import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const CheckboxSlide = ({
  value,
  name,
  onChange,
  className,
  color,
}) => (
  <div className={cs(`checkbox-slide ${className}`, { 'checkbox-slide_checked': value })}>
    <input
      className="checkbox-slide__value"
      type="checkbox"
      checked={value}
      name={name}
      onChange={() => onChange(name, !value)}
    />
    <div
      className={cs('checkbox-slide__point', {
        [`checkbox-slide__point_checked-${color}`]: value,
        'checkbox-slide__point_checked': value,
      })}
    />
  </div>
);

CheckboxSlide.propTypes = {
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

CheckboxSlide.defaultProps = {
  className: '',
  color: 'green',
};

export default CheckboxSlide;
