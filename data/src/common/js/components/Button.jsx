import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Button = ({
  onClick,
  className,
  disabled,
  children,
  borderless,
  primary,
}) => (
  <button
    onClick={onClick}
    className={
      cs(`button ${className}`, {
        button_borderless: borderless,
        button_primary: primary,
        button_secondary: !primary,
      })
    }
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  borderless: PropTypes.bool,
  primary: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  borderless: false,
  primary: false,
};

export default Button;
