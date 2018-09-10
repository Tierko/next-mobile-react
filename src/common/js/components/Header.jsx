import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import cs from 'classnames';
import HeaderCabinet from './HeaderCabinet';
import HeaderSite from './HeaderSite';
import { Pages } from '../../../cabinet/js/constants';

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
    {/*<div className="header__center">*/}
      {/*<NavLink className={cs('header__item', { header__item_light: light })} to={Pages.REQUEST_STATUS}>*/}
        {/*Тарифы и услуги*/}
      {/*</NavLink>*/}
      {/*<div className={cs('header__span', { header__span_light: light })} />*/}
      {/*<NavLink className={cs('header__item', { header__item_light: light })} to={Pages.REQUEST_STATUS}>*/}
        {/*Статус заявки*/}
      {/*</NavLink>*/}
      {/*<div className={cs('header__span', { header__span_light: light })} />*/}
      {/*<NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SUPPORT}>*/}
        {/*Поддержка*/}
      {/*</NavLink>*/}
    {/*</div>*/}
    {/*<div className="header__right">*/}
      {/*<NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_IN} exact>*/}
        {/*Вход*/}
      {/*</NavLink>*/}
      {/*<div className={cs('header__span', { header__span_light: light })} />*/}
      {/*<NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_UP}>*/}
        {/*Регистрация*/}
      {/*</NavLink>*/}
    {/*</div>*/}
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
