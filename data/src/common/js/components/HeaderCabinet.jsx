import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../../../cabinet/js/constants';

const HeaderCabinet = () => (
  <Fragment>
    <div className="header__center">
      <a className="header__item" href={`${SERVICE_URL}/#${Pages.TARIFF}`}>
        Тарифы и услуги
      </a>
      <NavLink className="header__item" to={Pages.REQUEST_STATUS}>
        Статус заявки
      </NavLink>
      <NavLink className="header__item" to={Pages.FAQ}>
        FAQ
      </NavLink>
      <NavLink className="header__item" to={Pages.SUPPORT}>
        Чат
      </NavLink>
    </div>
    <div className="header__right">
      <NavLink className="header__item" to={Pages.SIGN_IN} exact>
        Вход
      </NavLink>
      <NavLink className="header__go" to={Pages.SIGN_UP}>
        Перейти на Next
      </NavLink>
    </div>
  </Fragment>
);

export default HeaderCabinet;
