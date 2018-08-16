import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grade from './Grade';
import ProgressLinear from './ProgressLinear';
import Button from './Button';
import { formatCost } from '../utils';
import { MONTHS, Pages } from '../constants';

class Expense extends Component {
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

    history.push(Pages.DETAIL);
  };

  render() {
    const { orderDetails, onMonthSelect } = this;
    const { data } = this.props;
    const { itemId } = this.state;
    const item = itemId === -1 ? data[data.length - 1] : data.find(d => d.id === itemId);
    const cost = item && item.expense.reduce((acc, d) => (acc + d.cost), 0);

    return (
      <div className="expense">
        {
          !item &&
          <div className="expense__empty">У вас пока нет расходов</div>
        }
        {
          !!item &&
          <Fragment>
            <Grade data={data} onItemSelect={onMonthSelect} wide className="grade_expense" />
            <div className="expense__total">
              <div className="expense__total-date">{MONTHS[item.date.month]} {item.date.year}</div>
              <div className="expense__total-cost">{formatCost(cost, true)}</div>
            </div>

            <div className="expense__details">
              {
                item.expense.map((e) => {
                  let colorStart;
                  let colorEnd;

                  switch (e.type) {
                  case 'pay':
                    colorStart = '#fe46cc';
                    colorEnd = '#d800b4';
                    break;
                  case 'roaming':
                    colorStart = '#7cfa1c';
                    colorEnd = '#36c73d';
                    break;
                  default:
                    colorStart = '#02c4fe';
                    colorEnd = '#003eff';
                  }

                  return (
                    <div key={e.id} className="expense__detail">
                      <div className="expense__detail-title">{e.title}</div>
                      <ProgressLinear
                        className="progress-linear_expense"
                        current={e.cost}
                        max={cost}
                        tall
                        colorStart={colorStart}
                        colorEnd={colorEnd}
                      />
                      <div className="expense__detail-cost">{formatCost(e.cost, true)}</div>
                    </div>
                  );
                })
              }
            </div>
            <Button className="button_expense" onClick={orderDetails}>Заказать детализацию...</Button>
          </Fragment>
        }
      </div>
    );
  }
}

Expense.propTypes = {
  history: PropTypes.shape().isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Expense;
