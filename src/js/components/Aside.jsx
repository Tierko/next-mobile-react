import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { formatCost, getData } from '../utils';
import { Pages } from '../constants';

const Aside = ({ hideLink }) => (
  <div className="aside">
    <div className="aside__logo">
      <img src="/media/images/logo-blue.png" alt="Next Mobile" />
      {
        !hideLink && <Link className="aside__home" to={Pages.OVERVIEW} />
      }
    </div>
    <div className="aside__inner">
      <div className="aside__phone">+ 7 905 123-23-44</div>
      <div className="aside__info">
        <div>
          <span>Баланс:</span> {formatCost(getData('balance'))}
        </div>
        <div>
          <span>По России: </span>
          {getData('remain')[0].current.toString().replace('.', ',')} ГБ, {getData('remain')[1].current} мин, {getData('remain')[2].current} СМС
        </div>
      </div>
      <nav className="aside__nav">
        <NavLink to={Pages.OVERVIEW} className="aside__link">Обзор</NavLink>
        <NavLink to={Pages.PAY} className="aside__link">Пополнение</NavLink>
        <NavLink to={Pages.SERVICES} className="aside__link">Тарифы и услуги</NavLink>
        <NavLink to={Pages.ROAMING} className="aside__link">Роуминг</NavLink>
        <NavLink to={Pages.HISTORY} className="aside__link">История</NavLink>
        <NavLink to={Pages.SETTINGS} className="aside__link">Настройки</NavLink>
        <NavLink to={Pages.SUPPORT_DASHBOARD} className="aside__link">Поддержка</NavLink>
        <NavLink to={Pages.Exit} className="aside__link aside__link_exit" exact>Выйти</NavLink>
      </nav>
    </div>
  </div>
);

Aside.propTypes = {
  hideLink: PropTypes.bool,
};

Aside.defaultProps = {
  hideLink: false,
};

export default Aside;
