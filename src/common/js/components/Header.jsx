import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import HeaderCabinet from './HeaderCabinet';
import HeaderSite from './HeaderSite';

const Header = ({ back, light, mode }) => (
  <nav className="header">
    <div className="header__left">
      <div className={cs('header__logo', { header__logo_light: light })} />
      {
        back &&
        <Link to={back} className="header__back">
          <img src="/media/icons/back.svg" alt="" />
        </Link>
      }
    </div>
    {
      mode === 'site' ?
        <HeaderSite light={light} /> :
        <HeaderCabinet light={light} />
    }
  </nav>
);

Header.propTypes = {
  back: PropTypes.string,
  light: PropTypes.bool,
  mode: PropTypes.string,
};

Header.defaultProps = {
  back: '',
  light: false,
  mode: 'cabinet',
};

export default Header;
