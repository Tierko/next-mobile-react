import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../constants';

const Aside = () => (
  <div className="aside">
    <div className="aside__logo">
      <img src="/media/images/logo-blue.png" alt="Next Mobile" />
    </div>
    <div className="aside__inner">
      <div className="aside__phone">+ 7 905 123-23-44</div>
      <div className="aside__info">
        <div><span>Баланс:</span> 500 ₽</div>
        <div><span>По России:</span> 1,7 ГБ, 1000 мин, 129 СМС</div>
      </div>
      <nav className="aside__nav">
        <NavLink to={Pages.Overview} className="aside__link">Обзор</NavLink>
        <NavLink to={Pages.Pay} className="aside__link">Пополнение</NavLink>
        <NavLink to={Pages.Services} className="aside__link">Тарифы и услуги</NavLink>
        <NavLink to={Pages.Roaming} className="aside__link">Роуминг</NavLink>
        <NavLink to={Pages.History} className="aside__link">История</NavLink>
        <NavLink to={Pages.Settings} className="aside__link">Настройки</NavLink>
        <NavLink to={Pages.SupportDashboard} className="aside__link">Поддержка</NavLink>
        <NavLink to={Pages.Exit} className="aside__link aside__link_exit" exact>Выйти</NavLink>
      </nav>
    </div>
  </div>
);

export default Aside;
