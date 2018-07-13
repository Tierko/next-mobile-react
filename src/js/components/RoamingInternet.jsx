import React from 'react';
import LinkBack from './LinkBack';
import ProgressLinear from './ProgressLinear';
import Package from './Package';
import { Pages } from '../constants';
import data from '../../data';

const RoamingInternet = () => (
  <div className="roaming">
    <div className="roaming__title">
      <LinkBack href={Pages.ROAMING} className="link-back_roaming" />
      Интернет в Зоне 1
    </div>
    <div>Остаток стандартного пакета: 2,01 ГБ из 20</div>
    <ProgressLinear className="progress-linear_internet-zone" current={2.01} max={20} />
    <div>Действует еще 30 дней</div>
    <Package data={data.roamingInternet.fast} simple />
    <Package data={data.roamingInternet.regular} simple />
  </div>
);

export default RoamingInternet;
