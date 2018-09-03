import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Checkbox = ({
  name,
  value,
  onChange,
  className,
  title,
}) => (
  <div className={cs(`checkbox ${className}`, { checkbox_checked: value })}>
    <input
      className="checkbox__value"
      type="checkbox"
      onChange={() => onChange(name, !value)}
      checked={value}
    />
    <div className="checkbox__title">{title}</div>
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  className: '',
};

export default Checkbox;
