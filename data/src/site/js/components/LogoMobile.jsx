import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../../../cabinet/js/constants';

const LogoMobile = ({
  className,
  toHome,
  r,
  dark,
}) => (
  <div
    className={cs(`logo-mobile ${className}`, {
      'logo-mobile_dark': dark,
    })}
  >
    {
      toHome &&
      <Link className="logo-mobile__link" to={Pages[`HOME_R${r}`]} />
    }
  </div>
);

LogoMobile.propTypes = {
  className: PropTypes.string,
  toHome: PropTypes.bool,
  r: PropTypes.number,
  dark: PropTypes.bool,
};

LogoMobile.defaultProps = {
  className: '',
  toHome: true,
  r: 1,
  dark: false,
};

export default LogoMobile;
