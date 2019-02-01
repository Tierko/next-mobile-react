import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoamingCurrent from '@cabinet/components/RoamingCurrent';
import { Pages } from '~/common/js/constants';

const OverviewRoamingCountry = ({ history, data }) => {
  const currentZone = data.zones.items.find(z => z.id === data.currentZoneId);
  const country = data.features.items.find(f => f.properties.code === data.currentCountry);

  if (!currentZone || !country) {
    return false;
  }

  return (
    <div className="block block_round overview-roaming-current">
      <div>
        Вы в&nbsp;роуминге: {
          country && country.properties.name.ru
        } <Link to={Pages.ROAMING} className="link">({currentZone.name})</Link>
        <img className="overview-roaming-current__flag" src={`/media/flags/${data.currentCountry}.svg`} alt={country.properties.name.ru} />
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
