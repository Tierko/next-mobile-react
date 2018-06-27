import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pages } from '../constants';

const RequestStatusFooter = () => (
  <nav className="request-status-footer welcome__footer">
    <NavLink className="request-status-footer__item" to={Pages.Support}>Поддержка</NavLink>
    <div className="request-status-footer__span" />
    <NavLink className="request-status-footer__item" to={Pages.SignIn}>Ко входу</NavLink>
  </nav>
);

export default RequestStatusFooter;
