import React from 'react';
import PropTypes from 'prop-types';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import InterCalls from '../../../common/js/components/InterCalls';

const TariffTariff = ({
  to,
  toTariff,
  r,
  data,
  translate,
}) => {
  const { header, btn, note } = translate;

  if (!header || !btn || !note) {
    return false;
  }

  return (
    <div className="tariff-tariff">
      <div
        className="tariff-tariff__header"
        dangerouslySetInnerHTML={{ __html: header }}
      />
      <TariffTable mode="detail" tariff to={toTariff} data={data} />
      <Button onClick={to} primary={r === 1}>
        <span dangerouslySetInnerHTML={{ __html: btn }} />
      </Button>
      <div
        className="tariff-tariff__note"
        dangerouslySetInnerHTML={{ __html: note }}
      />
      <InterCalls className="inter-calls_tariff" />
    </div>
  );
};

TariffTariff.propTypes = {
  to: PropTypes.func.isRequired,
  toTariff: PropTypes.func,
  r: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape()),
  translate: PropTypes.shape(),
};

TariffTariff.defaultProps = {
  toTariff: null,
  r: 0,
  data: [],
  translate: {},
};

export default TariffTariff;
