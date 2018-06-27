import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';

const RequestStatusSimple = ({ header, message, color }) => (
  <div className="welcome__content request-status">
    <Logo type={color} />
    <div className={`request-status__header request-status__header_${color}`}>{header}</div>
    <div className="request-status__message">{message}</div>
  </div>
);

RequestStatusSimple.propTypes = {
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default RequestStatusSimple;
