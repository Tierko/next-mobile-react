import React from 'react';
import PropTypes from 'prop-types';
import EarthTariff from './EarthTariff';

const TariffRoaming = ({
  type,
  size,
  translate,
  countries,
  roaming,
}) => {
  const { header, text } = translate;

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
      <EarthTariff className="earth-tariff_tariff" tariff type={type} size={size} countries={countries} roaming={roaming} />
    </div>
  );
};

TariffRoaming.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  translate: PropTypes.shape(),
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  roaming: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

TariffRoaming.defaultProps = {
  translate: {},
};

export default TariffRoaming;
