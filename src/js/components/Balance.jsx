import React from 'react';
import PropTypes from 'prop-types';

const Balance = ({
  status,
  sum,
  className,
  message,
}) => (
  <div className={`balance balance_${status} ${className}`}>
    <div className="balance__title">Ваш баланс</div>
    <div className="balance__sum">{sum} ₽</div>
    <div className="balance__next-pay">{message}</div>
  </div>
);

Balance.propTypes = {
  status: PropTypes.string,
  sum: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Balance.defaultProps = {
  status: '',
  className: '',
};

export default Balance;
