import React, { Component } from 'react';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import InterCalls from '../../../common/js/components/InterCalls';
import tariff from '../../../cabinet/data/tariff';

class TariffTariff extends Component {
  go = () => {};

  render() {
    const { go } = this;

    return (
      <div className="tariff-tariff">
        <div className="tariff-tariff__header">Тарифы</div>
        <TariffTable data={tariff} mode="detail" tariff />
        <Button onClick={go}>Перейти на Next</Button>
        <div className="tariff-tariff__note">С&nbsp;возможностью получить полгода бесплатной связи и&nbsp;10&nbsp;персональных приглашений для друзей</div>
        <InterCalls className="inter-calls_tariff" />
      </div>
    );
  }
}

export default TariffTariff;
