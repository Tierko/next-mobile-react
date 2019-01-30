import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grade from './Grade';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
import { formatCost } from '../utils';
import { MONTHS, Pages } from '../constants';

class Expense extends Component {
  state = {
    selected: -1,
  };

  onMonthSelect = ({month}) => {
    this.setState({
      selected: month,
    });
  };

  orderDetails = () => {
    const { history } = this.props;

    history.push(Pages.DETAIL);
  };

  render() {
    const { orderDetails, onMonthSelect } = this;
    const { data } = this.props;
    const { selected } = this.state;
    const selectedItem = selected === -1 ? data[0] : data.find(i => i.month === selected);
    let content;
    if (!selectedItem) {
      content = <div className="expense__empty">У&nbsp;вас пока нет расходов</div>;
    } else {
      const cost = selectedItem.total;
      const itemDate = new Date(selectedItem.month);
      const expenseDetails = [
        {
          type: 'pay',
          title: 'Абонентская плата',
          colorNormal: '#66d2ff',
          colorMin: '#66d2ff',
          cost: selectedItem.fee,
        },
        {
          type: 'roaming',
          title: 'Роуминг',
          colorNormal: '#d170f3',
          colorMin: '#d170f3',
          cost: selectedItem.other_services,
        },
        {
          type: 'other',
          title: 'Другие услуги',
          colorNormal: '#5887ff',
          colorMin: '#5887ff',
          cost: selectedItem.roaming,
        },
      ];

      content = (
        <Fragment>
          <Grade data={data} onItemSelect={onMonthSelect} showRatio showTotal />
          <div className="expense__total">
            <div className="expense__total-date">{MONTHS[itemDate.getMonth()]} {itemDate.getFullYear()}</div>
            <div className="expense__total-cost">{formatCost(cost, true)}</div>
          </div>

          <div className="expense__details">
            {
              expenseDetails.map((expense) => (
                <div key={expense.type} className="expense__detail">
                  <div className="expense__detail-title">{expense.title}</div>
                  <ProgressLinear
                    className="progress-linear_expense"
                    current={expense.cost}
                    max={cost}
                    tall
                    colorNormal={expense.colorNormal}
                    colorMin={expense.colorMin}
                  />
                  <div className="expense__detail-cost">{formatCost(expense.cost, true)}</div>
                </div>
              ))
            }
          </div>
          <Button className="button_expense" onClick={orderDetails} primary>
            Заказать детализацию...
          </Button>
        </Fragment>
      );
    }
    
   

    return (
      <div className="block">
        <div className="h1">Расходы</div>
        {content}
      </div>
    );
  }
}

Expense.propTypes = {
  history: PropTypes.shape().isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Expense;
