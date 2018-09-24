import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import HeaderCabinet from './HeaderCabinet';
import HeaderSite from './HeaderSite';
import { Pages } from '../../../cabinet/js/constants';

const Header = ({
  back,
  light,
  mode,
  hideHomeLink,
  r,
}) => (
  <nav className="header">
    <div className="header__left">
      <div className={cs('header__logo', { header__logo_light: light })}>
        {
          !hideHomeLink && mode === 'site' &&
          <Link to={Pages[`HOME_R${r}`]} className="header__home" />
        }
        {
          !hideHomeLink && mode === 'cabinet' &&
          <a href={SERVICE_URL} className="header__home" />
        }
      </div>
      {
        back &&
        <Link to={back} className="header__back">
          <img src="/media/icons/back.svg" alt="" />
        </Link>
      }
    </div>
    {
      mode === 'site' ?
        <HeaderSite light={light} r={r} /> :
        <HeaderCabinet light={light} />
    }
  </nav>
);

Header.propTypes = {
  back: PropTypes.string,
  light: PropTypes.bool,
  mode: PropTypes.string,
  hideHomeLink: PropTypes.bool,
  r: PropTypes.number,
};

Header.defaultProps = {
  back: '',
  light: false,
  mode: 'cabinet',
  hideHomeLink: false,
  r: 1,
};

export default Header;
