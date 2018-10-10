import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import InlineSvg from 'svg-inline-react';
import { Pages } from '../../../cabinet/js/constants';

const MobileNavHome = ({ r, data }) => {
  let tariff = data.tariff || 'Тарифы и услуги';
  const requestStatus = data.requestStatus || 'Статус заявки';
  const support = data.support || 'Поддержка';
  const signIn = data.signIn || 'Вход';
  const signUp = data.signUp || 'Регистрация';

  tariff = tariff.replace('&nbsp;', ' ');

  return ([
    <NavLink key="tariff" className="mobile-nav__link mobile-nav__link_services" to={Pages[`TARIFF_R${r}`]}>
      <InlineSvg src={require('../../../../media/nav/prices.svg')} /> {tariff}
    </NavLink>,
    <a key="requestStatus" className="mobile-nav__link mobile-nav__link_status" href={`${SERVICE_URL}/#${Pages.REQUEST_STATUS}`}>
      <InlineSvg src={require('../../../../media/nav/status.svg')} /> {requestStatus}
    </a>,
    <a key="support" className="mobile-nav__link mobile-nav__link_support" href={`${SERVICE_URL}/#${Pages.SUPPORT}`}>
      <InlineSvg src={require('../../../../media/nav/support.svg')} /> {support}
    </a>,
    <a key="signIn" className="mobile-nav__link mobile-nav__link_enter" href={`${SERVICE_URL}/#${Pages.SIGN_IN}`}>
      <InlineSvg src={require('../../../../media/nav/enter.svg')} /> {signIn}
    </a>,
    <a key="signUp" className="mobile-nav__link mobile-nav__link_reg" href={`${SERVICE_URL}/#${Pages.SIGN_UP}${r === 2 ? '/after' : ''}`}>
      <InlineSvg src={require('../../../../media/nav/reg.svg')} /> {signUp}
    </a>,
  ]);
};

MobileNavHome.propTypes = {
  r: PropTypes.number.isRequired,
  data: PropTypes.shape().isRequired,
};

export default MobileNavHome;
