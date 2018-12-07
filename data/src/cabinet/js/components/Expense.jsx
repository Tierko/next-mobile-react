import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grade from './Grade';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
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
      <div className="block">
        <div className="h1">Расходы</div>
        {
          !item &&
          <div className="expense__empty">У&nbsp;вас пока нет расходов</div>
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
                  let colorNormal;
                  let colorMin;

                  switch (e.type) {
                  case 'pay':
                    colorNormal = '#66d2ff';
                    colorMin = '#66d2ff';
                    break;
                  case 'roaming':
                    colorNormal = '#d170f3';
                    colorMin = '#d170f3';
                    break;
                  default:
                    colorNormal = '#5887ff';
                    colorMin = '#5887ff';
                  }

                  return (
                    <div key={e.id} className="expense__detail">
                      <div className="expense__detail-title">{e.title}</div>
                      <ProgressLinear
                        className="progress-linear_expense"
                        current={e.cost}
                        max={cost}
                        tall
                        colorNormal={colorNormal}
                        colorMin={colorMin}
                      />
                      <div className="expense__detail-cost">{formatCost(e.cost, true)}</div>
                    </div>
                  );
                })
              }
            </div>
            <Button className="button_expense" onClick={orderDetails} primary>
              Заказать детализацию...
            </Button>
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
