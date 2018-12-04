import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from '../../../common/js/components/Button';
import Cards from './Cards';
import Limit from './Limit';
import Tabs from './Tabs';
import { formatCost } from '../utils';

class Payment extends Component {
  static tabs = [{
    title: 'C карты',
    id: 'card',
  }, {
    title: 'За счет компании',
    id: 'company',
  }];

  constructor(props) {
    super(props);

    this.state = {
      payment: props.sum,
      paymentInit: props.sum,
      payPermitted: true,
      card: null,
      tab: 'card',
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

  changeTab = (tab) => {
    this.setState({
      tab,
    });
  };

  render() {
    const {
      onChange,
      onPermitChange,
      changeTab,
    } = this;
    const {
      payment,
      payPermitted,
      card,
      paymentInit,
      tab,
    } = this.state;
    const {
      isEditable,
      onPay,
      onEdit,
      showNote,
    } = this.props;
    const inLimits = payment >= 100 && payment <= 15000;

    return (
      <div className="payment">
        <Tabs className="tabs_payment" items={Payment.tabs} onChange={changeTab} tab={tab} />
        {
          tab === 'company' ?
            <div className="payment__company">
              <img className="payment__img" src="/media/content/tyazhmash.png" alt="" />
              <div className="payment__company-name">Оплатит «Тяжмаштрансмагистраль»</div>
            </div> :
            <Cards onPermitChange={onPermitChange} onEdit={onEdit} />
        }
        {
          !isEditable &&
          <div className="payment__sum">{formatCost(paymentInit, true)}</div>
        }
        {
          isEditable &&
          <Fragment>
            <Input className="input_pay" onChange={onChange} value={payment} name="payment" clear />
            <Limit className="limit_payment" sum={payment} />
            <div className="payment__message">Для оплаты по&nbsp;тарифу Супервип на&nbsp;счету не&nbsp;хватает <span className="nobr">{formatCost(paymentInit, true)}</span></div>
          </Fragment>
        }
        {
          showNote &&
            <div className="payment__note">Тарифф будет подключен после абонентской платы за первый месяц</div>
        }
        <Button
          className="button_pay"
          onClick={() => onPay(card)}
          disabled={!payment || !payPermitted || !inLimits}
          primary
        >
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
  showNote: PropTypes.bool,
};

Payment.defaultProps = {
  sum: 0,
  onSumChange: null,
  showNote: false,
};

export default Payment;
