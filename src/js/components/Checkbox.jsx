import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Checkbox = ({
  value,
  name,
  onChange,
  className,
  color,
}) => (
  <div className={cs(`checkbox ${className}`, { checkbox_checked: value })}>
    <input
      className="checkbox__value"
      type="checkbox"
      checked={value}
      name={name}
      onChange={() => onChange(name, !value)}
    />
    <div
      className={cs('checkbox__point', {
        [`checkbox__point_checked-${color}`]: value,
        checkbox__point_checked: value,
      })}
    />
  </div>
);

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  color: 'green',
};

export default Checkbox;
