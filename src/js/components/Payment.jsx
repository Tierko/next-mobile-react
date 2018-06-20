import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import { Pages } from '../constants';

const Payment = ({ sum, onChange, onPay }) => (
  <div className="payment">
    <Link to={Pages.Payment} className="payment__title">Пополнение:</Link>
    <Input value={sum + ' ₽'} onChange={onChange} name="sum" className="input_payment" />
    <Button className="button_payment" onClick={onPay}>Оплатить</Button>
  </div>
);

Payment.propTypes = {
  sum: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
};

export default Payment;
