import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../constants';

const RequestStatusFooter = () => (
  <nav className="request-status-footer welcome__footer">
    <div className="request-status-footer__item">
      <NavLink className="link" to={Pages.SUPPORT}>Поддержка</NavLink>
    </div>
    <div className="request-status-footer__item">
      <NavLink className="link" to={Pages.SIGN_IN}>Ко входу</NavLink>
    </div>
  </nav>
);

export default RequestStatusFooter;
