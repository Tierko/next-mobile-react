import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkBack from './LinkBack';
import RoamingTariff from './RoamingTariff';
import { Pages } from '../constants';

const data = [{
  id: 1,
  title: 'Звонки',
  items: [{
    id: 1,
    title: 'Внутри зоны',
    cost: 17,
    unit: 'мин.',
  }, {
    id: 2,
    title: 'Вне зоны',
    cost: 56,
    unit: 'мин.',
  }],
}, {
  id: 2,
  title: 'СМС',
  items: [{
    id: 1,
    title: 'Внутри зоны',
    cost: 17,
    unit: 'СМС',
  }, {
    id: 2,
    title: 'Вне зоны',
    cost: 56,
    unit: 'СМС',
  }],
}, {
  id: 3,
  title: 'Интернет',
  items: [{
    id: 1,
    title: 'Помегабайтно',
    cost: 60,
    unit: 'МБ',
  }, {
    id: 2,
    title: 'Пакет',
    cost: 700,
    unit: '500 МБ',
    from: true,
  }],
}];

const RoamingTariffZone = ({ id }) => (
  <div className="roaming">
    <div className="roaming__title">
      <LinkBack className="link-back_roaming" href={Pages.ROAMING} />
      Тарифы в Зоне 1
    </div>
    <RoamingTariff data={data} />
    <div className="roaming__note">
      <Link className="link" to={`${Pages.ROAMING}/internet/${id}`}>Выбрать интернет-пакет </Link>
      <div className="roaming__note-text">У вас осталось 0,44 ГБ трафика на стандартной скорости на 10 дней в этой зоне</div>
    </div>
  </div>
);

RoamingTariffZone.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RoamingTariffZone;
