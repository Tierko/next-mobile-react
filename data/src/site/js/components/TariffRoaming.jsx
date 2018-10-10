import React from 'react';
import PropTypes from 'prop-types';
import EarthTariff from './EarthTariff';

const TariffRoaming = ({ type, size, data }) => {
  const { header, text } = data;

  if (!header || !text) {
    return false;
  }

  return (
    <div className="tariff-roaming">
      <div
        className="tariff-roaming__header"
        dangerouslySetInnerHTML={{ __html: header }}
      />
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <EarthTariff className="earth-tariff_tariff" tariff type={type} size={size} />
    </div>
  );
};

TariffRoaming.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  data: PropTypes.shape(),
};

TariffRoaming.defaultProps = {
  data: {},
};

export default TariffRoaming;
