import React from 'react';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const FooterNav = () => (
  <div className="footer-nav">
    <div className="footer-nav__item">
      <Link to={Pages.PAY} className="link">Пополнение</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.HISTORY} className="link">История</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SERVICES} className="link">Тарифы и услуги</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SETTINGS} className="link">Настройки</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.ROAMING} className="link">Роуминг</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SUPPORT_DASHBOARD} className="link">Поддержка</Link>
    </div>
  </div>
);

export default FooterNav;
