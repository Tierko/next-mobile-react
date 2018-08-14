import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const LogoAnimated = ({ expand }) => (
  <div className="logo-animated">
    <div className="logo-animated__inner">
      <div className={cs('logo-animated__shadow', { 'logo-animated__shadow_expand': expand })} />
      <div className={cs('logo-animated__square', { 'logo-animated__square_expand': expand })}>
        <div className="logo-animated__text">next</div>
      </div>
    </div>
  </div>
);

LogoAnimated.propTypes = {
  expand: PropTypes.bool,
};

LogoAnimated.defaultProps = {
  expand: false,
};

export default LogoAnimated;
