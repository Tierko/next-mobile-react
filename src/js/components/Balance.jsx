import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { formatCost } from '../utils';

const Balance = ({
  status,
  sum,
  className,
  message,
}) => (
  <div className={`balance ${className}`}>
    <div className={`balance__inner balance__inner_${status}`}>
      <div className="balance__title">Ваш баланс</div>
      <div className={cs('balance__sum', { balance__sum_negative: sum < 0 })}>{formatCost(sum)}</div>
      <div className="balance__next-pay">{message}</div>1212
    </div>
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
