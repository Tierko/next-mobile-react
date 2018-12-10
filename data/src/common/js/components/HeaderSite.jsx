import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Pages } from '../../../cabinet/js/constants';

const HeaderSite = ({
  url,
  release,
  translate,
}) => {
  let tariff = translate.tariff || 'Тарифы и услуги';
  const requestStatus = translate.requestStatus || 'Статус заявки';
  const support = translate.support || 'Поддержка';
  const signIn = translate.signIn || 'Вход';
  const signUp = translate.signUp || 'Перейти на Next';

  tariff = tariff.replace('&nbsp;', ' ');

  return (
    <Fragment>
      <div className="header__center">
        <NavLink className="header__item" to={Pages.TARIFF}>
          {tariff}
        </NavLink>
        <a className="header__item" href={`${url}/#${Pages.REQUEST_STATUS}`}>
          {requestStatus}
        </a>
        <a className="header__item" href={`${url}/#${Pages.SUPPORT}`}>
          {support}
        </a>
      </div>
      <div className="header__right">
        <a className="header__item" href={`${url}/#${Pages.SIGN_IN}`}>
          {signIn}
        </a>
        <a className="header__go" href={`${url}/#${Pages.SIGN_UP}${release === 2 ? '/after' : ''}`}>
          {signUp}
        </a>
      </div>
    </Fragment>
  );
};

HeaderSite.propTypes = {
  url: PropTypes.string.isRequired,
  release: PropTypes.number.isRequired,
  translate: PropTypes.shape().isRequired,
};

export default HeaderSite;
