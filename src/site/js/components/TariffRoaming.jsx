import React from 'react';
import PropTypes from 'prop-types';
import EarthTariff from './EarthTariff';

const TariffRoaming = ({ type, size }) => (
  <div className="tariff-roaming">
    <div className="tariff-roaming__header">Роуминг</div>
    <div>Выезжая &nbsp;командировку или на&nbsp;отдых, вы&nbsp;сразу увидите текущую стоимость связи и&nbsp;сможете легко проследить за&nbsp;расходами</div>
    <EarthTariff className="earth-tariff_tariff" tariff type={type} size={size} />
  </div>
);

TariffRoaming.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default TariffRoaming;
