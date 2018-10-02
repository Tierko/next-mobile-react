import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Checkbox = ({
  name,
  value,
  onChange,
  className,
  title,
  children,
}) => (
  <div className={cs(`checkbox ${className}`, { checkbox_checked: value })}>
    <input
      className="checkbox__value"
      type="checkbox"
      onChange={() => onChange(name, !value)}
      checked={value}
    />
    {
      title &&
      <div className="checkbox__title">{title}</div>
    }
    {
      !!children.length &&
      <div className="checkbox__content">{children}</div>
    }
  </div>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

Checkbox.defaultProps = {
  className: '',
  title: '',
};

export default Checkbox;
