import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  value,
  name,
  onChange,
  className,
}) => (
  <div className={`checkbox ${className}`}>
    <input
      className="checkbox__value"
      type="checkbox"
      checked={value}
      name={name}
      onChange={() => onChange(name, !value)}
    />
  </div>
);

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
};

export default Checkbox;
