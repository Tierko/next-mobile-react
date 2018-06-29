import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import { Pages } from '../constants';

const AutoPayResult = ({ match }) => {
  const { params: { status } } = match;

  return ([
    <MobileNav key="nav" type="dashboard" />,
    <div key="dashboard" className="dashboard">
      <Aside />
      <div className="dashboard__content auto-pay-result">
        {
          status === 'success' &&
          <Fragment>
            <div className="status status_ok">
              <span>Автоплатеж сохранен</span>
            </div>
            <div className="auto-pay-result__text">
              Счет будет автоматически пополняться  на 2 000 ₽ каждый месяц 10 числа до сентября 2018 включительно
            </div>
          </Fragment>
        }
        {
          status === 'error' &&
          <Fragment>
            <div className="status status_error">
              <span>Ошибка</span>
            </div>
            <div className="auto-pay-result__text">
              Не удалось подключить автоплатеж
            </div>
          </Fragment>
        }
        <Link className="link" to={Pages.Overview}>Продолжить работу</Link>
      </div>
    </div>,
  ]);
};

export default AutoPayResult;
