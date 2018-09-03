import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { formatCost } from '../utils';

const Limit = ({
  className,
  limitStart,
  limitEnd,
  sum,
}) => (
  <div className={cs(`limit ${className}`, { limit_show: sum <= limitStart || sum >= limitEnd })}>
    Введите сумму от {limitStart} до {formatCost(limitEnd)}
  </div>
);

Limit.propTypes = {
  className: PropTypes.string,
  limitStart: PropTypes.number,
  limitEnd: PropTypes.number,
  sum: PropTypes.number.isRequired,
};

Limit.defaultProps = {
  className: '',
  limitStart: 100,
  limitEnd: 15000,
};

export default Limit;
