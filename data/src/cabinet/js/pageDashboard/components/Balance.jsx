import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '~/common/js/components/Button';

import Input from '@cabinet/components/InputRuble';
import Limit from '@cabinet/components/Limit';

import { formatCost } from '@cabinet/utils';
import { Pages } from '~/common/js/constants';

const Balance = ({
  sum,
  onChange,
  onPay,
  className,
  message,
  balance,
  defaultCard,
}) => {
  let fSum = formatCost(Math.abs(balance).toFixed(2), true);
  const rubPos = fSum.lastIndexOf(' ');
  const coinsPos = fSum.lastIndexOf(',');
  const rub = fSum.substr(rubPos);
  const coins = fSum.substring(coinsPos + 1, rubPos);
  fSum = coinsPos !== -1 && rubPos !== -1 ? fSum.substring(0, coinsPos) : fSum;

  return (
    <div className={`block block_round ${className}`}>
      <div className="block__header">
        Баланс
      </div>
      <div className="balance__sum">
        {balance < 0 && <span>&minus;</span>}{fSum}
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
  sum: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  className: PropTypes.string,
  balance: PropTypes.number.isRequired,
  defaultCard: PropTypes.string,
};

Balance.defaultProps = {
  className: '',
  defaultCard: '',
};

function mapStateToProps(state) {
  return {
    defaultCard: state.Cards.defaultCard,
  };
}

export default connect(mapStateToProps)(Balance);
