import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../../../cabinet/js/constants';

const HeaderSite = ({
  light,
  url,
  release,
  data,
}) => {
  let tariff = data.tariff || 'Тарифы и услуги';
  const requestStatus = data.requestStatus || 'Статус заявки';
  const support = data.support || 'Поддержка';
  const signIn = data.signIn || 'Вход';
  const signUp = data.signUp || 'Регистрация';

  tariff = tariff.replace('&nbsp;', ' ');

  return (
    <Fragment>
      <div className="header__center">
        <NavLink className={cs('header__item', { header__item_light: light })} to={Pages.TARIFF}>
          {tariff}
        </NavLink>
        <div className={cs('header__span', { header__span_light: light })} />
        <a className={cs('header__item', { header__item_light: light })} href={`${url}/#${Pages.REQUEST_STATUS}`}>
          {requestStatus}
        </a>
        <div className={cs('header__span', { header__span_light: light })} />
        <a className={cs('header__item', { header__item_light: light })} href={`${url}/#${Pages.SUPPORT}`}>
          {support}
        </a>
      </div>
      <div className="header__right">
        <a className={cs('header__item', { header__item_light: light })} href={`${url}/#${Pages.SIGN_IN}`}>
          {signIn}
        </a>
        <div className={cs('header__span', { header__span_light: light })} />
        <a className={cs('header__item', { header__item_light: light })} href={`${url}/#${Pages.SIGN_UP}${release === 2 ? '/after' : ''}`}>
          {signUp}
        </a>
      </div>
    </Fragment>
  );
};

HeaderSite.propTypes = {
  light: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  release: PropTypes.number.isRequired,
  data: PropTypes.shape().isRequired,
};

export default HeaderSite;
