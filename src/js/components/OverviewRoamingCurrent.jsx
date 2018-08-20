import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoamingCurrent from './RoamingCurrent';
import { Pages } from '../constants';

const OverviewRoamingCountry = ({ history, data }) => {
  const currentZone = data.zones.items.find(z => z.id === data.currentZoneId);
  const country = data.features.items.find(f => f.properties.iso_a2 === data.currentCountry);

  if (!currentZone || !country) {
    return false;
  }

  return (
    <div className="overview-roaming-current">
      <div>
        Вы в роуминге: {
          country && country.properties.name
        } <Link to={Pages.ROAMING} className="link-light">({currentZone.name})</Link>
        <img className="overview-roaming-current__flag" src={`/media/flags/${data.currentCountry}.svg`} alt={country.properties.name} />
      </div>
      <RoamingCurrent history={history} data={currentZone} />
    </div>
  );
};

OverviewRoamingCountry.propTypes = {
  history: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
};

export default OverviewRoamingCountry;
