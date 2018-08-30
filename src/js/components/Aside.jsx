import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { formatCost, getData } from '../utils';
import { Pages } from '../constants';

const Aside = ({ hideLink, hideNav }) => {
  const traffic = getData('remain')[0].current.toString().replace('.', ',');
  const calls = getData('remain')[1].current;

  return (
    <div className="aside">
      <div className="aside__logo">
        <img src="/media/images/logo-blue.png" alt="Next Mobile" />
        {
          !hideLink && <Link className="aside__home" to={Pages.OVERVIEW} />
        }
      </div>
      {
        !hideNav &&
        <div className="aside__inner">
          <div className="aside__phone">+ 7 905 123-23-44</div>
          <div className="aside__info">
            <div>
              <span>Баланс:</span> {formatCost(getData('balance'))}
            </div>
            <div>
              <span>По России: </span>
              <div>{traffic} ГБ, {calls} мин., БЕЗЛИМИТ СМС</div>
            </div>
          </div>
          <nav className="aside__nav">
            <div className="aside__nav-item">
              <NavLink to={Pages.OVERVIEW} className="aside__link">Обзор</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.PAY} className="aside__link">Пополнение</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.SERVICES} className="aside__link">Тарифы и услуги</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.ROAMING} className="aside__link">Роуминг</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.HISTORY} className="aside__link">История</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.SETTINGS} className="aside__link">Настройки</NavLink>
            </div>
            <div className="aside__nav-item">
              <NavLink to={Pages.SUPPORT_DASHBOARD} className="aside__link">Поддержка</NavLink>
            </div>
            <div className="aside__nav-item aside__nav-item_exit">
              <NavLink to={Pages.Exit} className="aside__link">Выход</NavLink>
            </div>
          </nav>
        </div>
      }
    </div>
  );
};

Aside.propTypes = {
  hideLink: PropTypes.bool,
  hideNav: PropTypes.bool,
};

Aside.defaultProps = {
  hideLink: false,
  hideNav: false,
};

export default Aside;
