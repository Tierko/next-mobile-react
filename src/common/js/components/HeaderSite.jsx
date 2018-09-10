import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../../../cabinet/js/constants';

const HeaderSite = ({ light }) => (
  <Fragment>
    <div className="header__center">
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.TARIFF}>
        Тарифы и услуги
      </NavLink>
      <div className={cs('header__span', { header__span_light: light })} />
      <a className={cs('header__item', { header__item_light: light })} href={`${SERVICE_URL}/#${Pages.REQUEST_STATUS}`}>
        Статус заявки
      </a>
      <div className={cs('header__span', { header__span_light: light })} />
      <a className={cs('header__item', { header__item_light: light })} href={`${SERVICE_URL}/#${Pages.SUPPORT}`}>
        Поддержка
      </a>
    </div>
    <div className="header__right">
      <a className={cs('header__item', { header__item_light: light })} href={`${SERVICE_URL}/#${Pages.SIGN_IN}`}>
        Вход
      </a>
      <div className={cs('header__span', { header__span_light: light })} />
      <a className={cs('header__item', { header__item_light: light })} href={`${SERVICE_URL}/#${Pages.SIGN_UP}`}>
        Регистрация
      </a>
    </div>
  </Fragment>
);

HeaderSite.propTypes = {
  light: PropTypes.bool.isRequired,
};

export default HeaderSite;
