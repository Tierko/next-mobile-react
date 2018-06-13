import React from 'react';
import { Link } from 'react-router-dom';

const NavLobby = () => (
    <nav className="nav-lobby">
        <Link className="nav-lobby__item" to="">Вход</Link>
        <div className="nav-lobby__span" />
        <Link className="nav-lobby__item" to="">Регистрация</Link>
        <div className="nav-lobby__span" />
        <Link className="nav-lobby__item" to="">Поддержка</Link>
        <div className="nav-lobby__span" />
        <Link className="nav-lobby__item" to="">Статус заявки</Link>
    </nav>
);

export default NavLobby;
