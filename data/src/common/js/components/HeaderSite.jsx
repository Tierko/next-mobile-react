import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Pages } from '../../../cabinet/js/constants';

const HeaderSite = ({
  url,
  translate,
  r,
}) => {
  let tariff = translate.tariff || 'Тарифы и услуги';
  const requestStatus = translate.requestStatus || 'Статус заявки';
  const support = translate.support || 'Поддержка';
  const signIn = translate.signIn || 'Вход';
  const signUp = translate.signUp || 'Перейти на Next';

  tariff = tariff.replace('&nbsp;', '\u00A0');

  return (
    <Fragment>
      <div className="header__center">
        <div className="header__item">
          {
            r === 1 &&
            <NavLink className="header__link" to={Pages.TARIFF_R1}>
              {tariff}
            </NavLink>
          }
          {
            r === 2 &&
            <NavLink className="header__link" to={Pages.TARIFF_R2}>
              {tariff}
            </NavLink>
          }
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
        <a className="header__go" href={`${url}/#${Pages.SIGN_UP}${r === 2 ? '/after' : ''}`}>
          {signUp}
        </a>
      </div>
    </Fragment>
  );
};

HeaderSite.propTypes = {
  url: PropTypes.string.isRequired,
  translate: PropTypes.shape().isRequired,
  r: PropTypes.number.isRequired,
};

export default HeaderSite;
