import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

const RoamingCountries = ({ items, zone }) => {
  const countries = items.filter(c => zone.countries.indexOf(c.properties.iso_a2) !== -1);

  return (
    <div className="roaming">
      <div className="roaming__title">
        <LinkBack className="link-back_roaming" href={Pages.ROAMING} />
        Страны <span>{zone.title_}</span>
      </div>
      <div>
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
