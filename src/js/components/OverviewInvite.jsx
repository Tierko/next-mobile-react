import React from 'react';
import { Link } from 'react-router-dom';
import CopyCode from './CopyCode';
import { Pages } from '../constants';

const OverviewInvite = () => (
  <div className="overview-invite">
    <Link className="overview-invite__header" to={Pages.INVITE}>
      <span>6 месяцев бесплатной связи для близких</span>
    </Link>
    <CopyCode />
  </div>
);

export default OverviewInvite;
