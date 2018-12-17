import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../../../cabinet/js/constants';

const HeaderCabinet = () => (
  <Fragment>
    <div className="header__center">
      <div className="header__item">
        <a className="header__link" href={`${SERVICE_URL}/#${Pages.TARIFF}`}>
          Тарифы и услуги
        </a>
      </div>
      <div className="header__item">
        <NavLink className="header__link" to={Pages.REQUEST_STATUS}>
          Статус заявки
        </NavLink>
      </div>
      <div className="header__item">
        <NavLink className="header__link" to={Pages.FAQ}>
          FAQ
        </NavLink>
      </div>
      <div className="header__item">
        <NavLink className="header__link" to={Pages.SUPPORT}>
          Чат
        </NavLink>
      </div>
    </div>
    <div className="header__right">
      <div className="header__item">
        <NavLink className="header__link" to={Pages.SIGN_IN} exact>
          Вход
        </NavLink>
      </div>
      <NavLink className="header__go" to={Pages.SIGN_UP}>
        Перейти на Next
      </NavLink>
    </div>
  </Fragment>
);

export default HeaderCabinet;
