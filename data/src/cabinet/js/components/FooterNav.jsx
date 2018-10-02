import React from 'react';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const FooterNav = () => (
  <div className="footer-nav">
    <div className="footer-nav__item">
      <Link to={Pages.PAY} className="link-light">Пополнение</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.HISTORY} className="link-light">История</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SERVICES} className="link-light">Тарифы и услуги</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SETTINGS} className="link-light">Настройки</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.ROAMING} className="link-light">Роуминг</Link>
    </div>
    <div className="footer-nav__item">
      <Link to={Pages.SUPPORT_DASHBOARD} className="link-light">Поддержка</Link>
    </div>
  </div>
);

export default FooterNav;
