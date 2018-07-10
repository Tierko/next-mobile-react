import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './InputRuble';
import Button from './Button';
import { Pages } from '../constants';

const OverviewPayment = ({ sum, onChange, onPay }) => (
  <div className="overview-payment">
    <Link to={Pages.PAY} className="overview-payment__title">Пополнение:</Link>
    <Input value={sum} onChange={onChange} name="sum" className="input_payment" />
    <Button className="button_payment" onClick={onPay}>Оплатить</Button>
  </div>
);

OverviewPayment.propTypes = {
  sum: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
};

export default OverviewPayment;
