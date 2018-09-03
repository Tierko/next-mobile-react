import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './InputRuble';
import Button from './Button';
import Limit from './Limit';
import { Pages } from '../constants';

const OverviewPayment = ({ sum, onChange, onPay }) => (
  <Fragment>
    <div className="overview-payment">
      <div className="overview-payment__inner">
        <Link to={Pages.PAY} className="overview-payment__title">Пополнение:</Link>
        <Input value={sum} onChange={onChange} name="sum" className="input_payment" />
        <Limit sum={sum} className="limit_overview-mobile" />
        <Button className="button_payment" onClick={onPay} disabled={sum > 15000 || sum < 100}>Оплатить</Button>
      </div>
      <Limit sum={sum} className="limit_overview-desktop" />
    </div>
  </Fragment>
);

OverviewPayment.propTypes = {
  sum: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
};

export default OverviewPayment;
