import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import { Pages } from '../constants';

const NotFound = () => ([
  <MobileNav key="nav" type="dashboard" />,
  <div key="dashboard" className="dashboard">
    <Aside />
    <div className="dashboard__content">
      <div className="dashboard__header">Страница не найдена</div>
      <div className="not-found__message">
        Неправильно набран адрес, или такой страницы на&nbsp;сайте больше не&nbsp;существует
      </div>
      <div className="not-found__nav">
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.OVERVIEW}>Обзор</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.HISTORY}>История</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.PAY}>Пополнение</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.SETTINGS}>Настройки</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.SERVICES}>Тарифы и услуги</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.SUPPORT}>Поддержка</Link>
        </div>
        <div className="not-found__nav-item">
          <Link className="link-nav" to={Pages.ROAMING}>Роуминг</Link>
        </div>
      </div>
      <Footer />
    </div>
  </div>,
]);

export default NotFound;