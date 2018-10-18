import React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../../../cabinet/js/constants';

const MobileNavDashboard = () => ([
  <div key="phone" className="mobile-nav__phone">+ 7 905 123-23-44</div>,
  <NavLink key="overview" className="mobile-nav__link mobile-nav__link_overview" to={Pages.OVERVIEW}>
    <InlineSvg src={require('../../../../media/nav/overview.svg')} raw /> Обзор
  </NavLink>,
  <NavLink key="services" className="mobile-nav__link mobile-nav__link_services" to={Pages.SERVICES}>
    <InlineSvg src={require('../../../../media/nav/prices.svg')} raw /> Тарифы
  </NavLink>,
  <NavLink key="pay" className="mobile-nav__link mobile-nav__link_pay" to={Pages.PAY}>
    <InlineSvg src={require('../../../../media/nav/plus.svg')} raw /> Пополнение
  </NavLink>,
  <NavLink key="roaming" className="mobile-nav__link mobile-nav__link_roaming" to={Pages.ROAMING}>
    <InlineSvg src={require('../../../../media/nav/roaming.svg')} raw /> Роуминг
  </NavLink>,
  <NavLink key="history" className="mobile-nav__link mobile-nav__link_history" to={Pages.HISTORY}>
    <InlineSvg src={require('../../../../media/nav/history.svg')} raw /> История
  </NavLink>,
  <NavLink key="support" className="mobile-nav__link mobile-nav__link_support" to={Pages.SUPPORT_DASHBOARD}>
    <InlineSvg src={require('../../../../media/nav/support.svg')} raw /> Чат
  </NavLink>,
  <NavLink key="settings" className="mobile-nav__link mobile-nav__link_settings" to={Pages.SETTINGS}>
    <InlineSvg src={require('../../../../media/nav/settings.svg')} raw /> Настройки
  </NavLink>,
  <NavLink key="exit" className="mobile-nav__link mobile-nav__link_exit" to={Pages.Exit} exact>
    <InlineSvg src={require('../../../../media/nav/exit.svg')} raw /> Выход
  </NavLink>,
]);

export default MobileNavDashboard;
