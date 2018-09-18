import React from 'react';
import PropTypes from 'prop-types';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import InterCalls from '../../../common/js/components/InterCalls';

const TariffTariff = ({ to, toTariff }) => (
  <div className="tariff-tariff">
    <div className="tariff-tariff__header">Тарифы</div>
    <TariffTable mode="detail" tariff to={toTariff} />
    <Button onClick={to}>Перейти на Next</Button>
    <div className="tariff-tariff__note">С&nbsp;возможностью получить полгода бесплатной связи и&nbsp;10&nbsp;персональных приглашений для друзей</div>
    <InterCalls className="inter-calls_tariff" />
  </div>
);

TariffTariff.propTypes = {
  to: PropTypes.func.isRequired,
  toTariff: PropTypes.func,
};

TariffTariff.defaultProps = {
  toTariff: null,
};

export default TariffTariff;
