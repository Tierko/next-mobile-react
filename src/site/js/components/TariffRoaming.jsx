import React from 'react';
import EarthTariff from './EarthTariff';

const TariffRoaming = () => (
  <div className="tariff-roaming">
    <div className="tariff-roaming__header">Роуминг</div>
    <div>Выезжая &nbsp;командировку или на&nbsp;отдых, вы&nbsp;сразу увидите текущую стоимость связи и&nbsp;сможете легко проследить за&nbsp;расходами</div>
    <EarthTariff className="earth-tariff_tariff" tariff />
  </div>
);

export default TariffRoaming;
