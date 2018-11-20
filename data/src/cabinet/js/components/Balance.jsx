import React from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from '../../../common/js/components/Button';
import Limit from './Limit';
import { formatCost } from '../utils';

const Balance = ({
  status,
  sum,
  onChange,
  onPay,
  className,
  message,
  balance,
}) => {
  const fBalance = formatCost(Math.abs(balance).toFixed(2), true);

  return (
    <div className={`block block_round ${className}`}>
      <div className="block__header">
        Баланс
      </div>
      <div className={`balance__sum balance__sum_${status}`}>
        {balance < 0 && <span>&minus;</span>}{fBalance}
      </div>
      {
        message &&
        <div className="balance__message">
          {message}
        </div>
      }
      <div className="balance__pay">
        <Input value={sum} onChange={onChange} name="sum" className="input_balance" />
        <Button className="button_balance" onClick={onPay} disabled={sum > 15000 || sum < 100} primary>
          Оплатить
        </Button>
      </div>
      <Limit sum={sum} className="limit_balance" />
    </div>
  );
};

Balance.propTypes = {
  status: PropTypes.string,
  sum: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  className: PropTypes.string,
  balance: PropTypes.number.isRequired,
};

Balance.defaultProps = {
  status: '',
  className: '',
};

export default Balance;
