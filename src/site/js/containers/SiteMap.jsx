import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES } from '../constants';

const SiteMap = () => (
  <div className="site-map">
    <Link className="link" to={PAGES.HOME_R1}>Главная (релиз 1)</Link>
    <br />
    <Link className="link" to={PAGES.HOME_R2}>Главная (релиз 2)</Link>
    <br />
    <Link className="link" to={PAGES.TARIFF_R1}>Тарифы (релиз 1)</Link>
    <br />
    <Link className="link" to={PAGES.TARIFF_R2}>Тарифы (релиз 2)</Link>
  </div>
);

export default SiteMap;
