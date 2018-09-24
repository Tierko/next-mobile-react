import React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../../../cabinet/js/constants';

const MobileNavDashboard = () => (
  <div className="mobile-nav__list-inner">
    <div className="mobile-nav__phone">+ 7 905 123-23-44</div>
    <NavLink className="mobile-nav__link" to={Pages.OVERVIEW}>
      <InlineSvg src={require('../../../../../media/nav/overview.svg')} raw /> Обзор
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.SERVICES}>
      <InlineSvg src={require('../../../../../media/nav/prices.svg')} raw /> Тарифы
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.PAY}>
      <InlineSvg src={require('../../../../../media/nav/plus.svg')} raw /> Пополнение
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.ROAMING}>
      <InlineSvg src={require('../../../../../media/nav/roaming.svg')} raw /> Роуминг
    </NavLink>
    <NavLink className="mobile-nav__link mobile-nav__link_history" to={Pages.HISTORY}>
      <InlineSvg src={require('../../../../../media/nav/history.svg')} raw /> История
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.SUPPORT_DASHBOARD}>
      <InlineSvg src={require('../../../../../media/nav/support.svg')} raw /> Чат
    </NavLink>
    <NavLink className="mobile-nav__link mobile-nav__link_settings" to={Pages.SETTINGS}>
      <InlineSvg src={require('../../../../../media/nav/settings.svg')} raw /> Настройки
    </NavLink>
    <NavLink className="mobile-nav__link" to={Pages.Exit} exact>
      <InlineSvg src={require('../../../../../media/nav/exit.svg')} raw /> Выход
    </NavLink>
  </div>
);

export default MobileNavDashboard;
