import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { Pages } from '../constants';

const NavLobby = ({ back }) => (
  <nav className="nav-lobby">
    {
      back &&
      <Link to={back} className="nav-lobby__back">
        <img src="/media/icons/back.svg" alt="" />
      </Link>
    }
    <NavLink className="nav-lobby__item" to={Pages.SIGN_IN} exact>Вход</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.SIGN_UP}>Регистрация</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.SUPPORT}>Поддержка</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.REQUEST_STATUS}>Статус заявки</NavLink>
  </nav>
);

NavLobby.propTypes = {
  back: PropTypes.string,
};

NavLobby.defaultProps = {
  back: '',
};

export default NavLobby;
