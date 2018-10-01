import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from './InputRuble';
import Button from '../../../common/js/components/Button';
import Limit from './Limit';
import { formatCost } from '../utils';
import { Pages } from '../constants';

const Balance = ({
  status,
  sum,
  onChange,
  onPay,
  className,
  message,
  autoPay,
  balance,
}) => {
  let fSum = formatCost(Math.abs(balance).toFixed(2), true);
  const rubPos = fSum.lastIndexOf(' ');
  const coinsPos = fSum.lastIndexOf(',');
  const rub = fSum.substr(rubPos);
  const coins = fSum.substring(coinsPos + 1, rubPos);
  fSum = coinsPos !== -1 && rubPos !== -1 ? fSum.substring(0, coinsPos) : fSum;

  return (
    <div className={`balance ${className}`}>
      <div className="balance__header">
        Баланс
      </div>
      <div className="balance__inner">
        <div className={cs(`balance__left balance__left_${status}`, { balance__left_negative: balance < 0 })}>
          {
            coinsPos !== -1 && rubPos !== -1 ?

              <div className="balance__sum">
                {balance < 0 && <span>&minus;</span>}{
                  fSum
                },<span className="balance__coins">{coins}</span>{rub}
              </div> :
              <div className="balance__sum">
                {balance < 0 && <span>&minus;</span>}{fSum}
              </div>
          }
          {
            message &&
            <div className="balance__message">
              <div>Следующее списание:</div>
              <div>{message}</div>
            </div>
          }
        </div>
        <div className="balance__center" />
        <div className="balance__right">
          <div className="balance__pay">
            <Input value={sum} onChange={onChange} name="sum" className="input_balance" />
            <Button className="button_balance" onClick={onPay} disabled={sum > 15000 || sum < 100}>Оплатить</Button>
          </div>
          <Limit sum={sum} className="limit_balance" />
          {
            (autoPay.monthlyEnabled || autoPay.lessEnabled) &&
            <div className="balance__auto-pay">
              <div>Подключен <Link className="link-light" to={Pages.AUTO_PAY}>автоплатеж</Link></div>
              {
                autoPay.monthlyEnabled &&
                <div>
                  на {
                    formatCost(autoPay.monthlySum)
                  } ежемесячно {
                    autoPay.monthlyDay
                  } числа
                </div>
              }
              {
                autoPay.lessEnabled &&
                <div>
                  на {
                    formatCost(autoPay.lessSum)
                  }, если на счету меньше чем {
                    formatCost(autoPay.lessLess)
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
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
  autoPay: PropTypes.shape().isRequired,
  balance: PropTypes.number.isRequired,
};

Balance.defaultProps = {
  status: '',
  className: '',
};

function mapDispatchToProps(state) {
  return {
    autoPay: state.AutoPay,
  };
}

export default connect(mapDispatchToProps)(Balance);
