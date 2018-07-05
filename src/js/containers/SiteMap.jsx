import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import PageFade from '../components/PageFade';
import { Pages, Statuses } from '../constants';

const SiteMap = () => ([
  <MobileNav key="nav" type="dashboard" />,
  <div key="dashboard" className="dashboard">
    <div className="dashboard__content">
      <Link className="link" to={Pages.SignIn}>Вход</Link>
      <br />
      <Link className="link" to={Pages.SignUp}>Регистрация</Link>
      <br />
      <Link className="link" to={`${Pages.SignUp}/step/1`}>Регистрация шаг 1</Link>
      <br />
      <Link className="link" to={`${Pages.SignUp}/step/2`}>Регистрация шаг 2</Link>
      <br />
      <Link className="link" to={`${Pages.SignUp}/step/3`}>Регистрация шаг 3</Link>
      <br />
      <Link className="link" to={`${Pages.SignUp}/step/4`}>Регистрация шаг 4</Link>
      <br />
      <Link className="link" to={Pages.Conditions}>Условия перехода</Link>
      <br />
      <Link className="link" to={Pages.RequestStatus}>Статус заявки</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.REQUEST_SENT}`}>Статус заявки, заявка отпралвена</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.INFORMATION_CHECKED}`}>Статус заявки, информация проверена</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.CHANGES_SAVED}`}>Статус заявки, изменения сохранены</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.TRANSITION_CONFIRMED}`}>Статус заявки, переход подтвержден</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.TRANSITION_STOPPED}`}>Статус заявки, переход приостановлен</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.SIM_DELIVERY}`}>Статус заявки, доставка sim-карты</Link>
      <br />
      <Link className="link" to={`${Pages.RequestStatus}/${Statuses.SIM_DELIVERY_TODAY}`}>Статус заявки, доставка sim-карты, сегодня</Link>
      <br />
      <Link className="link" to={Pages.Overview}>Обзор</Link>
      <br />
      <Link className="link" to={Pages.Calls}>Звонки</Link>
      <br />
      <Link className="link" to={Pages.AddPackage}>Докупка пакета</Link>
      <br />
      <Link className="link" to={Pages.Pay}>Пополнение</Link>
      <br />
      <Link className="link" to={Pages.AutoPay}>Автоплатеж</Link>
      <br />
      <Link className="link" to={Pages.Services}>Тарифы и услуги</Link>
      <br />
      <Link className="link" to={Pages.History}>История</Link>
      <br />
      <Link className="link" to={Pages.Detail}>Детализация</Link>
      <br />
      <Link className="link" to={Pages.Settings}>Настройки</Link>
      <br />
      <Link className="link" to={Pages.Settings}>Поддержка (в лк)</Link>
      <br />
      <Link className="link" to={`${Pages.Result}/success`}>Страница успхеа</Link>
      <br />
      <Link className="link" to={`${Pages.Result}/error`}>Страница ошибки</Link>
    </div>
  </div>,
]);

export default PageFade(SiteMap);
