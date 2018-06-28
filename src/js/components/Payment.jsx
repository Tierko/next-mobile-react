import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from './InputRuble';
import Button from './Button';
import Card from './Card';
import Tabs from './PaymentTabs';
import Checkbox from './Checkbox';

class Payment extends Component {
  state = {
    tab: 'card',
    payment: '2000 ₽',
    selectedCard: 2,
    makeDefault: false,
    number: '',
    holder: '',
    cvv: '',
    date: '',
  };

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
    this.setState({
      [name]: value,
    });
  };

  onPay = () => {};

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
      onPay,
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
    const { isEditable, sum } = this.props;

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
        <div className="payment__sum">{sum} ₽</div>
        {
          isEditable &&
          <Fragment>
            <Input onChange={onChange} value={payment} name="payment" clear />
            <div>Для оплаты по тарифу Супервип на счету не хватает 2 000 ₽</div>
          </Fragment>
        }
        {
          !isEditable &&
          <Button className="button_pay-package" onClick={onPay}>Пополнить</Button>
        }
      </div>
    );
  }
}

Payment.propTypes = {
  isEditable: PropTypes.bool.isRequired,
  sum: PropTypes.number,
};

Payment.defaultProps = {
  sum: 0,
};

export default Payment;
