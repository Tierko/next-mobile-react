import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Radio = ({
  name,
  value,
  selected,
  onChange,
  className,
  children,
}) => (
  <div
    className={cs(`radio ${className}`, {
      radio_checked: value === selected,
    })}
    onClick={() => onChange(name, value)}
  >
    <div className="radio__input-wrapper">
      <input className="radio__input" type="radio" name={name} defaultChecked={value === selected} />
    </div>
    <div className="radio__value">{children || value}</div>
  </div>
);

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

Radio.defaultProps = {
  className: '',
  children: null,
};

export default Radio;
