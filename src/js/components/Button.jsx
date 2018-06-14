import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className,
  disabled,
  children,
}) => (
  <button onClick={onClick} className={`button ${className}`} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
  disabled: false,
};

export default Button;
