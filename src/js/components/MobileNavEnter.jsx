import React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../constants';

const MobileNavDashboard = () => (
  <div className="mobile-nav__list-inner">
    <NavLink exact className="mobile-nav__link" to={Pages.SIGN_IN} exact>
      <InlineSvg src={require('../../../media/nav/enter.svg')} /> Вход
    </NavLink>
    <NavLink exact className="mobile-nav__link" to={Pages.SIGN_UP}>
      <InlineSvg src={require('../../../media/nav/reg.svg')} /> Регистрация
    </NavLink>
    <NavLink exact className="mobile-nav__link" to={Pages.SUPPORT}>
      <InlineSvg src={require('../../../media/nav/support.svg')} /> Поддержка
    </NavLink>
    <NavLink exact className="mobile-nav__link" to={Pages.REQUEST_STATUS}>
      <InlineSvg src={require('../../../media/nav/status.svg')} /> Статус заявки
    </NavLink>
  </div>
);

export default MobileNavDashboard;
