import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from './Button';
import Card from './Card';
import Tabs from './PaymentTabs';
import Checkbox from './Checkbox';
import payment from "../../data/payment";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'card',
      payment: props.sum,
      selectedCard: 2,
      makeDefault: false,
      number: '',
      holder: '',
      cvv: '',
      date: '',
    };
  }

  cards = [{
    id: 1,
    type: 'apple-pay',
  }, {
    id: 2,
    type: 'visa',
    number: '4000000000006266',
    holder: 'Anna Vashulenko',
    cvv: '456',
    date: '',
  }];

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

  changeTab = (e) => {
    const { tab } = e.target.dataset;

    this.setState({
      tab,
    });
  };

  selectCard = (e) => {
    const { id } = e.currentTarget.dataset;

    this.setState({
      selectedCard: id * 1,
    });
  };

  onCardEdit = (e) => {
    const { id } = e.target.dataset;
  };

  static tabs = [{
    title: 'C карты',
    id: 'card',
  }, {
    title: 'За счет компании',
    id: 'company',
  }];

  render() {
    const {
      onChange,
      changeTab,
      onCardEdit,
      selectCard,
      cards,
    } = this;
    const {
      payment,
      tab,
      selectedCard,
      makeDefault,
      number,
      holder,
      date,
      cvv,
    } = this.state;
    const { isEditable, sum, onPay } = this.props;

    if (!sum) {
      return false;
    }

    return (
      <div className="payment">
        <Tabs items={Payment.tabs} onChange={changeTab} tab={tab} />
        {
          tab === 'card' &&
          <div className="payment__cards">
            <div className="payment__card-row">
              <div className="payment__cards-inner">
                {
                  cards.map(c => (
                    <Card
                      key={c.id}
                      type={c.type}
                      id={c.id}
                      onSelect={selectCard}
                      selected={selectedCard}
                      onEdit={onCardEdit}
                    />
                  ))
                }
                <Card
                  key={0}
                  type="new"
                  id={0}
                  onSelect={selectCard}
                  selected={selectedCard}
                  onChange={onChange}
                  values={{
                    number,
                    holder,
                    date,
                    cvv,
                  }}
                />
              </div>
            </div>
          </div>
        }
        {
          tab === 'company' &&
          <div className="payment__company">
            <img className="payment__img" src="/media/content/tyazhmash.png" alt="" />
            <div className="payment__company-name">Оплатит «Тяжмаштрансмагистраль»</div>
            <Checkbox
              name="makeDefault"
              value={makeDefault}
              onChange={onChange}
              title="Сделать платежом по умолчанию"
              className="checkbox_payment"
            />
          </div>
        }
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
        <Button className="button_pay-package" onClick={onPay} disabled={!payment.toString().replace(/\D/g, '')}>
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
