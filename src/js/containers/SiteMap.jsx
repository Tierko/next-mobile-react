import React from 'react';
import { Link } from 'react-router-dom';
import { Pages, Statuses } from '../constants';

const SiteMap = () => (
  <div>
    <Link to={Pages.SignIn}>Вход</Link>
    <Link to={Pages.SignUp}>Регистрация</Link>
    <Link to={`${Pages.SignUp}/step/1`}>Регистрация шаг 1</Link>
    <Link to={`${Pages.SignUp}/step/2`}>Регистрация шаг 2</Link>
    <Link to={`${Pages.SignUp}/step/3`}>Регистрация шаг 3</Link>
    <Link to={`${Pages.SignUp}/step/4`}>Регистрация шаг 4</Link>
    <Link to={Pages.Conditions}>Условия перехода</Link>
    <Link to={Pages.RequestStatus}>Статус заявки, заявка отпралвена</Link>
    <Link to={`${Pages.RequestStatus}/${Statuses.INFORMATION_CHECKED}`}>Статус заявки, информация проверена</Link>
    <Link to={`${Pages.RequestStatus}/${Statuses.CHANGES_SAVED}`}>Статус заявки, изменения сохранены</Link>
    <Link to={`${Pages.RequestStatus}/${Statuses.TRANSITION_CONFIRMED}`}>Статус заявки, переход подтвержден</Link>
    <Link to={`${Pages.RequestStatus}/${Statuses.TRANSITION_STOPPED}`}>Статус заявки, переход приостановлен</Link>
  </div>
);

export default SiteMap;
