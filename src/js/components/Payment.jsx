import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from './Button';
import Cards from './Cards';
import Limit from './Limit';
import { formatCost } from '../utils';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: props.sum,
      paymentInit: props.sum,
      payPermitted: true,
      card: null,
    };
  }

  onChange = (name, value) => {
    const { onSumChange } = this.props;

    if (name === 'payment' && value.toString().length > 5) {
      return;
    }

    this.setState({
      [name]: value,
    });

    if (onSumChange && name === 'payment') {
      onSumChange(value);
    }
  };

  onPermitChange = (payPermitted, card) => {
    this.setState({
      payPermitted,
      card,
    });
  };

  render() {
    const {
      onChange,
      onPermitChange,
    } = this;
    const {
      payment,
      payPermitted,
      card,
      paymentInit,
    } = this.state;
    const {
      isEditable,
      onPay,
      onEdit,
    } = this.props;
    const inLimits = payment >= 100 && payment <= 15000;

    return (
      <div className="payment">
        <Cards onPermitChange={onPermitChange} onEdit={onEdit} />
        {
          !isEditable &&
          <div className="payment__sum">{formatCost(paymentInit, true)}</div>
        }
        {
          isEditable &&
          <Fragment>
            <Input className="input_pay" onChange={onChange} value={payment} name="payment" clear />
            <Limit className="limit_payment" sum={payment} />
            <div className="payment__message">Для оплаты по тарифу Супервип на счету не хватает <span className="nobr">{formatCost(paymentInit, true)}</span></div>
          </Fragment>
        }
        <Button className="button_pay" onClick={() => onPay(card)} disabled={!payment || !payPermitted || !inLimits}>
          Пополнить
        </Button>
      </div>
    );
  }
}

Payment.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  sum: PropTypes.number,
  onPay: PropTypes.func.isRequired,
  onSumChange: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
};

Payment.defaultProps = {
  sum: 0,
  onSumChange: null,
};

export default Payment;
