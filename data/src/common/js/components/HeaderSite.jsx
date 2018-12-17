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
        <div className="header__item">
          <NavLink className="header__link" to={Pages.TARIFF}>
            {tariff}
          </NavLink>
        </div>
        <div className="header__item">
          <a className="header__link" href={`${url}/#${Pages.REQUEST_STATUS}`}>
            {requestStatus}
          </a>
        </div>
        <div className="header__item">
          <a className="header__link" href={`${url}/#${Pages.SUPPORT}`}>
            {support}
          </a>
        </div>
      </div>
      <div className="header__right">
        <div className="header__item">
          <a className="header__link" href={`${url}/#${Pages.SIGN_IN}`}>
            {signIn}
          </a>
        </div>
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
