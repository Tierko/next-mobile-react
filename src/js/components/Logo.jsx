import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ src, className }) => (
  <div className={`logo ${className}`}>
    <img className="logo__img" src={src} alt="" />
  </div>
);

Logo.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

Logo.defaultProps = {
  src: '/media/images/logo-blue.svg',
  className: '',
};

export default Logo;
