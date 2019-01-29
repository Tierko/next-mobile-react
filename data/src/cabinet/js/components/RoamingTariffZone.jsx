import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
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

const RoamingTariffZone = ({ zone }) => {
  const title = `Тарифы в ${zone.title.toLowerCase()}`;

  return (
    <div className="roaming">
      <div className="roaming__title">
        <Breadcrumbs
          items={[
            { title: 'Роуминг', link: Pages.ROAMING },
            { title: zone.name, link: `${Pages.ROAMING}/${zone.id}` },
          ]}
          current={title}
        />
        {title}
      </div>
      <RoamingTariff data={data} />
      <div className="roaming__note">
        <Link className="link" to={`${Pages.ROAMING}/internet/${zone.id}`}>Выбрать интернет-пакет </Link>
        <div className="roaming__note-text">У&nbsp;вас осталось 0,44&nbsp;ГБ трафика на&nbsp;стандартной скорости на&nbsp;10&nbsp;дней в&nbsp;этой зоне</div>
      </div>
    </div>
  );
};

RoamingTariffZone.propTypes = {
  zone: PropTypes.shape().isRequired,
};

export default RoamingTariffZone;
