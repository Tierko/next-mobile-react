import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { Pages } from '../../../cabinet/js/constants';

const Header = ({ back }) => (
  <nav className="header">
    {
      back &&
      <Link to={back} className="header__back">
        <img src="/media/icons/back.svg" alt="" />
      </Link>
    }
    <NavLink className="header__item" to={Pages.SIGN_IN} exact>Вход</NavLink>
    <div className="header__span" />
    <NavLink className="header__item" to={Pages.SIGN_UP}>Регистрация</NavLink>
    <div className="header__span" />
    <NavLink className="header__item" to={Pages.SUPPORT}>Поддержка</NavLink>
    <div className="header__span" />
    <NavLink className="header__item" to={Pages.REQUEST_STATUS}>Статус заявки</NavLink>
  </nav>
);

Header.propTypes = {
  back: PropTypes.string,
};

Header.defaultProps = {
  back: '',
};

export default Header;
