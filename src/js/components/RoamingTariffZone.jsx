import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkBack from './LinkBack';
import RoamingTariff from './RoamingTariff';
import { Pages } from '../constants';
import data from '../../data';

const RoamingTariffZone = ({ id }) => (
  <div className="roaming">
    <div className="roaming__title">
      <LinkBack className="link-back_roaming" href={Pages.Roaming} />
      Тарифы в Зоне 1
    </div>
    <RoamingTariff data={data.roamingTariffZone} />
    <div className="roaming__note">
      <Link className="link" to={`${Pages.Roaming}/internet/${id}`}>Выбрать пакет интернета</Link>
      <div className="roaming__note-text">У вас осталось 0,44 ГБ стандартного интернета еще на 10 дней в этой Зоне</div>
    </div>
  </div>
);

RoamingTariffZone.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoamingTariffZone;
