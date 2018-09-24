import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../../../cabinet/js/constants';

const MobileNavHome = ({ r }) => (
  <div className="mobile-nav__list-inner">
    <NavLink className="mobile-nav__link" to={Pages[`TARIFF_R${r}`]}>
      <InlineSvg src={require('../../../../../media/nav/prices.svg')} /> Тарифы и услуги
    </NavLink>
    <a className="mobile-nav__link" href={`${SERVICE_URL}/#${Pages.REQUEST_STATUS}`}>
      <InlineSvg src={require('../../../../../media/nav/status.svg')} /> Статус заявки
    </a>
    <a className="mobile-nav__link" href={`${SERVICE_URL}/#${Pages.SUPPORT}`}>
      <InlineSvg src={require('../../../../../media/nav/support.svg')} /> Поддержка
    </a>
    <a className="mobile-nav__link" href={`${SERVICE_URL}/#${Pages.SIGN_IN}`}>
      <InlineSvg src={require('../../../../../media/nav/enter.svg')} /> Вход
    </a>
    <a className="mobile-nav__link" href={`${SERVICE_URL}/#${Pages.SIGN_UP}${r === 2 ? '/after' : ''}`}>
      <InlineSvg src={require('../../../../../media/nav/reg.svg')} /> Регистрация
    </a>
  </div>
);

MobileNavHome.propTypes = {
  r: PropTypes.number.isRequired,
};

export default MobileNavHome;
