import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES } from '../constants';

const SiteMap = () => (
  <div>
    <Link href={PAGES.HOME_R1}>Главная (релиз 1)</Link>
    <Link href={PAGES.HOME_R2}>Главная (релиз 2)</Link>
  </div>
);

export default SiteMap;
