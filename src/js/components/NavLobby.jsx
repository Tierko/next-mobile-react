import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../constants';

const NavLobby = () => (
  <nav className="nav-lobby">
    <NavLink className="nav-lobby__item" to={Pages.SignIn}>Вход</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.SignUp}>Регистрация</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.Support}>Поддержка</NavLink>
    <div className="nav-lobby__span" />
    <NavLink className="nav-lobby__item" to={Pages.RequestStatus}>Статус заявки</NavLink>
  </nav>
);

export default NavLobby;
