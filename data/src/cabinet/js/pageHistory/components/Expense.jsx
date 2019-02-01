import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grade from '@cabinet/components/Grade';
import ProgressLinear from '@cabinet/components/ProgressLinear';
import Button from '~/common/js/components/Button';
import { formatCost } from '@cabinet/utils';
import { MONTHS, Pages } from '~/common/js/constants';

const EXPENSES_TITLES = {
  fee: 'Абонентская плата',
  otherServices: 'Другие услуги',
  roaming: 'Роуминг',
}

class Expense extends Component {
  state = {
    currentMonth: moment(),
  };

  onMonthSelect = ({ month }) => {
    this.setState({
      currentMonth: moment(month),
    });
  };

  orderDetails = () => {
    const { history } = this.props;

    history.push(Pages.DETAIL);
  };

  render() {
    const { orderDetails, onMonthSelect } = this;
    const { data } = this.props;
    const { currentMonth } = this.state;
    const item = data.history.find(d => moment(d.month).isSame(currentMonth, 'month'));
    const cost = item && item.total;

    let content;
    if (!item) {
      content = <div className="expense__empty">У&nbsp;вас пока нет расходов</div>;
    } else {
      const cost = item.total;
      const itemDate = new Date(item.month);

      content = (
        <Fragment>
          <Grade data={data.history} selected={currentMonth} onItemSelect={onMonthSelect} showRatio showTotal wide className="grade_expense" />
          <div className="expense__total">
            <div className="expense__total-date">{moment(item.month).format('MMMM YYYY')}</div>
            <div className="expense__total-cost">{formatCost(cost, true)}</div>
          </div>

          <div className="expense__details">
            {
              Object.keys(EXPENSES_TITLES)
                .map((key) => {
                  let colorStart;
                  let colorEnd;

                  switch (key) {
                    case 'fee':
                      colorStart = '#66d2ff';
                      colorEnd = '#66d2ff';
                      break;
                    case 'roaming':
                      colorStart = '#d170f3';
                      colorEnd = '#d170f3';
                      break;
                    default:
                      colorStart = '#5887ff';
                      colorEnd = '#5887ff';
                  }

                  return (
                    <div key={key} className="expense__detail">
                      <div className="expense__detail-title">{EXPENSES_TITLES[key]}</div>
                      <ProgressLinear
                        className="progress-linear_expense"
                        current={item[key]}
                        max={cost}
                        tall
                        colorNormal={colorStart}
                        colorMin={colorEnd}
                      />
                      <div className="expense__detail-cost">{formatCost(item[key], true)}</div>
                    </div>
                  );
                })
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
