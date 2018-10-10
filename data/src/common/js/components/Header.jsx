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
  info,
                  translate,
}) => {
  const url = info.lk_url || '';
  const release = info.release * 1 || 1;

  return (
    <nav className="header">
      <div className="header__left">
        <div className={cs('header__logo', { header__logo_light: light })}>
          {
            !hideHomeLink && mode === 'site' &&
            <Link to={Pages.HOME} className="header__home" />
          }
          {
            !hideHomeLink && mode === 'cabinet' &&
            <a href={url} className="header__home" />
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
          <HeaderSite light={light} release={release} url={url} translate={translate} /> :
          <HeaderCabinet light={light} />
      }
    </nav>
  );
};

Header.propTypes = {
  back: PropTypes.string,
  light: PropTypes.bool,
  mode: PropTypes.string,
  hideHomeLink: PropTypes.bool,
  info: PropTypes.shape(),
  translate: PropTypes.shape(),
};

Header.defaultProps = {
  back: '',
  light: false,
  mode: 'cabinet',
  hideHomeLink: false,
  info: {},
  translate: {},
};

export default Header;
