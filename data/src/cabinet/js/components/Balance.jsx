import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './InputRuble';
import OverviewAutoPay from '../components/OverviewAutoPay';
import Button from '../../../common/js/components/Button';
import Limit from './Limit';
import { formatCost, getShortPan } from '../utils';

const Balance = ({
  status,
  sum,
  onChange,
  onPay,
  className,
  message,
  balance,
  defaultCard,
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
        <Input value={sum} onChange={onChange} name="sum" className="input_balance" min={100} />
        <Button className="button_balance" onClick={onPay} disabled={sum > 15000 || sum < 100} primary>
          Оплатить
        </Button>
      </div>
      <Limit sum={sum} className="limit_balance" />
      {
        defaultCard &&
          <div className="balance__card">
            Карта по&nbsp;умолчанию: {getShortPan(defaultCard)}
          </div>
      }
      <OverviewAutoPay />
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
  defaultCard: PropTypes.string,
};

Balance.defaultProps = {
  status: '',
  className: '',
  defaultCard: '',
};

function mapStateToProps(state) {
  return {
    defaultCard: state.Cards.defaultCard,
  };
}

export default connect(mapStateToProps)(Balance);
