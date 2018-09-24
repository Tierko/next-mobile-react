import React from 'react';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import Transitions from '../components/Transitions';
import { Pages, Statuses, TITLES } from '../constants';

const SiteMap = () => (
  <DocumentMeta title={TITLES.SITE_MAP}>
    <div key="dashboard" className="dashboard" style={{ maxWidth: 650, margin: '0 auto' }}>
      <Transitions>
        <div className="dashboard__content">
          <div>
            <Link className="link" to={Pages.DATA}>Демо данные</Link>
            <br />
            <a className="link" href={`${SERVICE_URL}/#/home_r1`}>Главная (релиз 1)</a>
            <br />
            <a className="link" href={`${SERVICE_URL}/#/home_r2`}>Главная (релиз 2)</a>
            <br />
            <a className="link" href={`${SERVICE_URL}/#/tariff_r1`}>Тарифы (релиз 1)</a>
            <br />
            <a className="link" href={`${SERVICE_URL}/#/tariff_r2`}>Тарифы (релиз 2)</a>
            <br />
            <Link className="link" to={Pages.SIGN_IN}>Вход</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/promo`}>Регистрация (промо)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/no-promo`}>Регистрация (без промо)</Link>
            <br />
            <Link className="link" to={Pages.SIGN_UP}>Регистрация (до старта продаж)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/phone`}>Регистрация (текущий номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/personal`}>Регистрация (персональная информация)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-address`}>Регистрация (адрес доставки)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-date`}>Регистрация (дата доставки)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/after`}>Регистрация (после старта продаж)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/phone/number/current`}>Регистрация (текущий номер, переход с имеющегося номера)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/choose-tariff/number/current`}>Регистрация (выбор тарифа, переход с имеющегося номера)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/personal/number/current`}>Регистрация (персональная информация, переход с имеющегося номера)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-address/number/current`}>Регистрация (адрес доставки, переход с имеющегося номера)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-date/number/current`}>Регистрация (дата доставки, переход с имеющегося номера)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/phone/number/new`}>Регистрация (текущий номер, переход на новый номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/choose-tariff/number/new`}>Регистрация (выбор тарифа, переход на новый номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/choose-number/number/new`}>Регистрация (выбор номера, переход на новый номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/personal/number/new`}>Регистрация (персональная информация, переход на новый номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-address/number/new`}>Регистрация (адрес доставки, переход на новый номер)</Link>
            <br />
            <Link className="link" to={`${Pages.SIGN_UP}/step/delivery-date/number/new`}>Регистрация (дата доставки, переход на новый номер)</Link>
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
            <Link className="link" to={`${Pages.ROAMING}/country-tariff/1/BY`}>Роуминг (тарифы страны)</Link>
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
  </DocumentMeta>
);

export default SiteMap;
