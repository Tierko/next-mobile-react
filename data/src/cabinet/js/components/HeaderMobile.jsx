import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const HeaderMobile = ({ hideHomeLink }) => (
  <div className="header-mobile">
    <div className="header-mobile__logo">
      {
        !hideHomeLink &&
        <Link className="header-mobile__link" to={Pages.OVERVIEW} />
      }
    </div>
  </div>
);

HeaderMobile.propTypes = {
  hideHomeLink: PropTypes.bool,
};

HeaderMobile.defaultProps = {
  hideHomeLink: false,
};

export default HeaderMobile;
