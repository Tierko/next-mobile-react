import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../../../cabinet/js/constants';

const Header = ({ back, light }) => (
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
    <div className="header__center">
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.REQUEST_STATUS}>
        Тарифы и услуги
      </NavLink>
      <div className="header__span" />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.REQUEST_STATUS}>
        Статус заявки
      </NavLink>
      <div className="header__span" />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SUPPORT}>
        Поддержка
      </NavLink>
    </div>
    <div className="header__right">
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_IN} exact>
        Вход
      </NavLink>
      <div className="header__span" />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_UP}>
        Регистрация
      </NavLink>
    </div>
  </nav>
);

Header.propTypes = {
  back: PropTypes.string,
  light: PropTypes.bool,
};

Header.defaultProps = {
  back: '',
  light: false,
};

export default Header;
