import React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../constants';

const MobileNavDashboard = () => (
  <div className="mobile-nav__list-inner">
    <NavLink className="mobile-nav__link" to={Pages.OVERVIEW}>
      <InlineSvg src={require('../../../media/nav/roaming.svg')} raw /> Обзор
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.SERVICES}>
      <InlineSvg src={require('../../../media/nav/prices.svg')} raw /> Трифы
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.PAY}>
      <InlineSvg src={require('../../../media/nav/plus.svg')} raw /> Пополнение
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.ROAMING}>
      <InlineSvg src={require('../../../media/nav/roaming.svg')} raw /> Роуминг
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.HISTORY}>
      <InlineSvg src={require('../../../media/nav/history.svg')} raw /> История
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.SUPPORT}>
      <InlineSvg src={require('../../../media/nav/support.svg')} raw /> Чат
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.SETTINGS}>
      <InlineSvg src={require('../../../media/nav/settings.svg')} raw /> Настройки
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.Exit} exact>
      <InlineSvg src={require('../../../media/nav/exit.svg')} raw /> Выйти
    </NavLink>
  </div>
);

export default MobileNavDashboard;
