import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../../../cabinet/js/constants';

const HeaderCabinet = ({ light }) => (
  <Fragment>
    <div className="header__center">
      <a className={cs('header__item', { header__item_light: light })} href={`${SERVICE_URL}/#${Pages.TARIFF}`}>
        Тарифы и услуги
      </a>
      <div className={cs('header__span', { header__span_light: light })} />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.REQUEST_STATUS}>
        Статус заявки
      </NavLink>
      <div className={cs('header__span', { header__span_light: light })} />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SUPPORT}>
        Поддержка
      </NavLink>
    </div>
    <div className="header__right">
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_IN} exact>
        Вход
      </NavLink>
      <div className={cs('header__span', { header__span_light: light })} />
      <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.SIGN_UP}>
        Регистрация
      </NavLink>
    </div>
  </Fragment>
);

HeaderCabinet.propTypes = {
  light: PropTypes.bool.isRequired,
};

export default HeaderCabinet;
