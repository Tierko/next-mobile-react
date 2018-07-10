import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

const RoamingCountries = ({ items, id }) => (
  <div className="roaming">
    <div className="roaming__title">
      <LinkBack className="link-back_roaming" href={Pages.ROAMING} />
      Страны Зоны 1
    </div>
    <div>
      {
        items.map(i => (
          <Link key={i.id} className="roaming-country" to={`${Pages.ROAMING}/country-tariff/${id}`}>
            <img className="roaming-country__img" src={`/media/flags/${i.flag}`} alt={i.title} />
            <span className="roaming-country__name">{i.title}</span>
          </Link>
        ))
      }
    </div>
  </div>
);

RoamingCountries.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  id: PropTypes.string.isRequired,
};

export default RoamingCountries;
