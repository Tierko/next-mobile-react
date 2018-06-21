import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ type, className }) => {
  const path = '/media/images/';
  let src;

  switch (type) {
  case 'green':
    src = 'logo-green.png';
    break;
  case 'red':
    src = 'logo-red.png';
    break;
  case 'photo':
    src = 'logo-photo.png';
    break;
  default:
    src = 'logo-blue.png';
  }

  return (
    <div className={`logo logo_${type} ${className}`}>
      <img className="logo__img" src={`${path}${src}`} alt="" />
    </div>
  );
};

Logo.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

Logo.defaultProps = {
  type: '',
  className: '',
};

export default Logo;
