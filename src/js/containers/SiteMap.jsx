import React from 'react';
import { Link } from 'react-router-dom';
import Transitions from '../components/Transitions';
import { Pages, Statuses } from '../constants';

const SiteMap = () => (
  <div key="dashboard" className="dashboard" style={{ maxWidth: 400, margin: '0 auto' }}>
    <Transitions>
      <div className="dashboard__content">
        <div>
          <Link className="link" to={Pages.DATA}>Демо данные</Link>
          <br />
          <Link className="link" to={Pages.SIGN_IN}>Вход</Link>
          <br />
          <Link className="link" to={Pages.SIGN_UP}>Регистрация</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/no-promo`}>Регистрация, без промо</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/promo`}>Регистрация, промо</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/step/1`}>Регистрация шаг 1</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/step/2`}>Регистрация шаг 2</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/step/3`}>Регистрация шаг 3</Link>
          <br />
          <Link className="link" to={`${Pages.SIGN_UP}/step/4`}>Регистрация шаг 4</Link>
          <br />
          <Link className="link" to={Pages.CONDITIONS}>Условия перехода</Link>
          <br />
          <Link className="link" to={Pages.REQUEST_STATUS}>Статус заявки</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.REQUEST_SENT}`}>Статус заявки, заявка отправлена</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.INFORMATION_CHECKED}`}>Статус заявки, информация проверена</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.CHANGES_SAVED}`}>Статус заявки, изменения сохранены</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.TRANSITION_CONFIRMED}`}>Статус заявки, переход подтвержден</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.TRANSITION_STOPPED}`}>Статус заявки, переход приостановлен</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.SIM_DELIVERY}`}>Статус заявки, доставка sim-карты</Link>
          <br />
          <Link className="link" to={`${Pages.REQUEST_STATUS}/${Statuses.SIM_DELIVERY_TODAY}`}>Статус заявки, доставка sim-карты, сегодня</Link>
          <br />
          <Link className="link" to={Pages.OVERVIEW}>Обзор</Link>
          <br />
          <Link className="link" to={`${Pages.MORE}/calls`}>Звонки</Link>
          <br />
          <Link className="link" to={`${Pages.MORE}/internet`}>Интернет</Link>
          <br />
          <Link className="link" to={Pages.ADD_PACKAGE}>Докупка пакета</Link>
          <br />
          <Link className="link" to={Pages.PAY}>Пополнение</Link>
          <br />
          <Link className="link" to={Pages.AUTO_PAY}>Автоплатеж</Link>
          <br />
          <Link className="link" to={Pages.SERVICES}>Тарифы и услуги</Link>
          <br />
          <Link className="link" to={Pages.HISTORY}>История</Link>
          <br />
          <Link className="link" to={Pages.HISTORY}>Детализация</Link>
          <br />
          <Link className="link" to={Pages.SETTINGS}>Настройки</Link>
          <br />
          <Link className="link" to={Pages.SUPPORT_DASHBOARD}>Поддержка (в лк)</Link>
          <br />
          <Link className="link" to={`${Pages.RESULT}/success`}>Страница успеха</Link>
          <br />
          <Link className="link" to={`${Pages.RESULT}/error`}>Страница ошибки</Link>
          <br />
          <Link className="link" to={Pages.ROAMING}>Роуминг</Link>
          <br />
          <Link className="link" to={`${Pages.ROAMING}/countries/1`}>Роуминг (Страны)</Link>
          <br />
          <Link className="link" to={`${Pages.ROAMING}/country-tariff/BY`}>Роуминг (тарифы страны)</Link>
          <br />
          <Link className="link" to={`${Pages.ROAMING}/internet/1`}>Роуминг (докупка пакета)</Link>
          <br />
          <Link className="link" to={`${Pages.ROAMING}/zone-tariff/1`}>Роуминг (тарифы зоны)</Link>
          <br />
          <Link className="link" to={Pages.INVITE}>Инвайты</Link>
          <br />
          <Link className="link" to="/not-found">404</Link>
        </div>
      </div>
    </Transitions>
  </div>
);

export default SiteMap;
