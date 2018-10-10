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

const RoamingTariffCountry = ({ zone, items, id }) => {
  if (!items.length) {
    return false;
  }

  const country = items.find(i => i.properties.iso_a2 === id);

  return (
    <div className="roaming">
      <div className="roaming__title">
        <Breadcrumbs
          items={[
            { title: 'Роуминг', link: Pages.ROAMING },
            { title: zone.name, link: `${Pages.ROAMING}/${zone.id}` },
          ]}
        />
        Тарифы: {country.properties.name}
        <img className="roaming__flag" src={`/media/flags/${id}.svg`} alt="" />
      </div>
      <RoamingTariff data={data} />
      <div className="roaming__note">
        <Link className="link" to={`${Pages.ROAMING}/internet/${zone.id}`}>Выбрать пакет интернета</Link>
        <div className="roaming__note-text">
          У&nbsp;вас осталось 0,44&nbsp;ГБ стандартного интернета еще на&nbsp;10&nbsp;дней в&nbsp;этой Зоне
        </div>
      </div>
    </div>
  );
};

RoamingTariffCountry.propTypes = {
  zone: PropTypes.shape().isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  id: PropTypes.string.isRequired,
};

export default RoamingTariffCountry;
