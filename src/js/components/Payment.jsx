import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from './Button';
import Cards from './Cards';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: props.sum,
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
    } = this.state;
    const { isEditable, sum, onPay } = this.props;

    return (
      <div className="payment">
        <Cards onPermitChange={onPermitChange} />
        {
          !isEditable &&
          <div className="payment__sum">{sum} ₽</div>
        }
        {
          isEditable &&
          <Fragment>
            <Input className="input_pay" onChange={onChange} value={payment} name="payment" clear />
            <div className="payment__message">Для оплаты по тарифу Супервип на счету не хватает { sum } ₽</div>
          </Fragment>
        }
        <Button className="button_pay-package" onClick={() => onPay(card)} disabled={!payment || !payPermitted}>
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
};

Payment.defaultProps = {
  sum: 0,
  onSumChange: null,
};

export default Payment;
