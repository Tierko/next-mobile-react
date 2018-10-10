import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { Pages } from '../constants';

const RoamingCountries = ({ items, zone }) => {
  const countries = items.filter(c => zone.countries.indexOf(c.properties.iso_a2) !== -1);

  return (
    <div className="roaming roaming_countries">
      <div className="roaming__title">
        <Breadcrumbs
          items={[
            { title: 'Роуминг', link: Pages.ROAMING },
            { title: zone.name, link: `${Pages.ROAMING}/${zone.id}` },
          ]}
        />
        Страны <span>{zone.title_.toLowerCase()}</span>
      </div>
      <div className="roaming-countries__items">
        {
          countries.map(i => (
            <Link
              key={i.properties.iso_a2}
              className="roaming-country"
              to={`${Pages.ROAMING}/country-tariff/${zone.id}/${i.properties.iso_a2}`}
            >
              <img className="roaming-country__img" src={`/media/flags/${i.properties.iso_a2}.svg`} alt={i.title} />
              <span className="roaming-country__name">{i.properties.name}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

RoamingCountries.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  zone: PropTypes.shape().isRequired,
};

export default RoamingCountries;
