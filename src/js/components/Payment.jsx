import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Input from '../components/InputRuble';
import Button from '../components/Button';
import Card from '../components/Card';

class Payment extends Component {
  state = {
    tab: '',
    payment: '2000 ₽',
    selectedCard: 2,
  };

  cards = [{
    id: 1,
    type: 'apple-pay',
  }, {
    id: 2,
    type: 'visa',
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

  render() {
    const {
      onChange,
      onPay,
      changeTab,
      selectCard,
      cards,
    } = this;
    const { payment, tab, selectedCard } = this.state;
    const { isEditable } = this.props;

    return (
      <div className="payment">
        <div className="payment__tabs">
          <div
            className={cs('payment__tab', { payment__tab_active: tab === 'card' })}
            onClick={changeTab}
            data-tab="card"
          >
            C карты
          </div>
          <div
            className={cs('payment__tab', { payment__tab_active: tab === 'company' })}
            onClick={changeTab}
            data-tab="company"
          >
            За счет компании
          </div>
        </div>
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
                  />
                ))
              }
              <Card
                key={0}
                type="new"
                id={0}
                onSelect={selectCard}
                selected={selectedCard}
              />
            </div>
          </div>
        </div>
        <div className="payment__sum">2000 ₽</div>
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
};

export default Payment;
