import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grade from './Grade';
import ProgressLinear from './ProgressLinear';
import Button from './Button';
import { formatCost } from '../utils';
import { months, Pages } from '../constants';

class Expense extends Component {
  static data = [{
    id: 1,
    year: 2018,
    month: 8,
    expense: [{
      id: 1,
      title: 'Абонентская плата',
      cost: 8000,
    }, {
      id: 2,
      title: 'Другие услуги',
      cost: 42000,
    }, {
      id: 3,
      title: 'Роуминг',
      cost: 3400,
    }],
  }, {
    id: 2,
    year: 2018,
    month: 9,
    expense: [{
      id: 1,
      title: 'Абонентская плата',
      cost: 20000,
    }],
  }];

  state = {
    itemId: -1,
  };

  onMonthSelect = ({ id }) => {
    this.setState({
      itemId: id,
    });
  };

  orderDetails = () => {
    const { history } = this.props;

    history.push(Pages.Detail);
  };

  render() {
    const { orderDetails, onMonthSelect } = this;
    const { data } = Expense;
    const { itemId } = this.state;
    const item = itemId === -1 ? data[data.length - 1] : data.find(d => d.id === itemId);
    const cost = item.expense.reduce((acc, d) => (acc + d.cost), 0);

    return (
      <div className="expense">
        <Grade data={data} onItemSelect={onMonthSelect} wide />
        <div className="expense__total">
          <div className="expense__total-date">{months[item.month]} {item.year}</div>
          <div className="expense__total-cost">{formatCost(cost)}</div>
        </div>

        <div className="expense__details">
          {
            item.expense.map(e => (
              <div key={e.id} className="expense__detail">
                <div className="expense__detail-title">{e.title}</div>
                <ProgressLinear className="progress-linear_expense" current={e.cost} max={cost} tall />
                <div className="expense__detail-cost">{formatCost(e.cost)}</div>
              </div>
            ))
          }
        </div>
        <Button className="button_expense" onClick={orderDetails}>Заказать детализацию</Button>
      </div>
    );
  }
}

Expense.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Expense;
