import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = ({ onClick, icon, className }) => (
  <button className={`button-icon ${className}`} onClick={onClick}>
    <img className="button-icon__img" src={`/media/icons/${icon}`} alt="" />
  </button>
);

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ButtonIcon.defaultProps = {
  className: '',
};

export default ButtonIcon;
