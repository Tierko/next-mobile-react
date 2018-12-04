import React from 'react';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

const NotFound = () => {
  const meta = {
    title: TITLES.NOT_FOUND,
  };

  return (
    <DocumentMeta {...meta}>
      <MobileNav key="nav" type="dashboard" />
      <div key="dashboard" className="dashboard">
        <Aside hideNav />
        <Transitions>
          <div className="dashboard__content dashboard__content_white not-found">
            <div className="dashboard__header">Страница не&nbsp;найдена</div>
            <div className="not-found__message">
              Неправильно набран адрес, или такой страницы на&nbsp;сайте больше не&nbsp;существует.
            </div>
            <div className="not-found__nav">
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.OVERVIEW}>Обзор</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.HISTORY}>История</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.PAY}>Пополнение</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.SETTINGS}>Настройки</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.SERVICES}>Тарифы и услуги</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.SUPPORT}>Поддержка</Link>
              </div>
              <div className="not-found__nav-item">
                <Link className="link" to={Pages.ROAMING}>Роуминг</Link>
              </div>
            </div>
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

export default NotFound;
