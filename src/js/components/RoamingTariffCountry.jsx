import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkBack from './LinkBack';
import RoamingTariff from './RoamingTariff';
import { Pages } from '../constants';
import data from '../../data';

const RoamingTariffCountry = ({ id }) => (
  <div className="roaming">
    <div className="roaming__title">
      <div className="roaming__title-inner">Зона 1</div>
      <LinkBack className="link-back_roaming-country" href={Pages.ROAMING} />
      Тарифы в Бельгии
    </div>
    <RoamingTariff data={data.roamingTariffZone} />
    <div className="roaming__note">
      <Link className="link" to={`${Pages.ROAMING}/internet/${id}`}>Выбрать пакет интернета</Link>
      <div className="roaming__note-text">У вас осталось 0,44 ГБ стандартного интернета еще на 10 дней в этой Зоне</div>
    </div>
  </div>
);

RoamingTariffCountry.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoamingTariffCountry;
