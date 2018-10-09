import React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../../../cabinet/js/constants';

const MobileNavDashboard = () => ([
  <NavLink className="mobile-nav__link mobile-nav__link_enter" to={Pages.SIGN_IN}>
    <InlineSvg src={require('../../../../media/nav/enter.svg')} /> Вход
  </NavLink>,
  <NavLink className="mobile-nav__link mobile-nav__link_reg" to={Pages.SIGN_UP}>
    <InlineSvg src={require('../../../../media/nav/reg.svg')} /> Регистрация
  </NavLink>,
  <NavLink className="mobile-nav__link mobile-nav__link_support" to={Pages.SUPPORT}>
    <InlineSvg src={require('../../../../media/nav/support.svg')} /> Поддержка
  </NavLink>,
  <NavLink className="mobile-nav__link mobile-nav__link_status" to={Pages.REQUEST_STATUS}>
    <InlineSvg src={require('../../../../media/nav/status.svg')} /> Статус заявки
  </NavLink>,
]);

export default MobileNavDashboard;
