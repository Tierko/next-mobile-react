import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { formatCost } from '../utils';
import { MONTHS_SHORT } from '../constants';

class Grade extends Component {
  state = {
    selected: -1,
    saved: -1,
  };

  onEnter = () => {
    const { selected } = this.state;

    this.setState({
      saved: selected,
    });
  };

  onBlur = () => {
    const { saved } = this.state;
    const { onItemSelect, data } = this.props;
    const item = data.find(i => i.month === saved);

    this.setState({
      selected: saved,
    });

    onItemSelect(item || data[0]);
  };

  selectItem = (event) => {
    const { onItemSelect, data } = this.props;
    const month = event.currentTarget.dataset.month.toString();
    const item = data.find(i => i.month === month);

    if (event.type === 'click') {
      this.setState({
        selected: month,
        saved: month,
      });
    } else {
      this.setState({
        selected: month,
      });
    }

    if (onItemSelect) {
      onItemSelect(item || data[0]);
    }
  };

  render() {
    const { selectItem, onEnter, onBlur } = this;
    const {
      data,
      className,
      showRatio,
      showTotal,
    } = this.props;
    const selected = this.state.selected === -1 ? data[0].month : this.state.selected;
    const maxExpense = Math.max.apply(null, data.map(item => item.total));

    if (data.length === 1) {
      return false;
    }

    return (
      <div
        className={cs(`grade ${className}`, {
          grade_total: showTotal
        })}
        onMouseEnter={onEnter}
        onMouseLeave={onBlur}
      >
        <div className="grade__inner">
          <div
            className={cs('grade__items', {
              grade__items_total: showTotal,
            })}
          >
            {
              data.map((expense) => {
                const expenseDetails = [
                  {
                    type: 'pay',
                    cost: expense.fee,
                  },
                  {
                    type: 'roaming',
                    cost: expense.other_services,
                  },
                  {
                    type: 'other',
                    cost: expense.roaming,
                  },
                ];
                const month = (new Date(expense.month)).getMonth();
                const itemSelected = expense.month === selected;

                return (
                  <div
                    onClick={selectItem}
                    onMouseEnter={selectItem}
                    key={expense.month}
                    data-month={expense.month}
                    className={cs('grade__item', {
                      grade__item_selected: itemSelected,
                    })}
                  >
                    <div
                      className={cs('grade__line', {
                        grade__line_selected: itemSelected,
                      })}
                      style={{height: (expense.total / maxExpense) * 100}}
                    >
                      {
                        showRatio && expenseDetails.map(i => (
                          <div
                            key={i.type}
                            className={`grade__subline grade__subline_${i.type}`}
                            style={{flexGrow: i.cost}}
                          />
                        ))
                      }
                    </div>
                    <div className={cs('grade__month', {grade__month_selected: itemSelected})}>
                      {MONTHS_SHORT[month]}
                    </div>
                    {
                      showTotal &&
                      <div
                        className={cs('grade__total', {
                          grade__total_selected: itemSelected,
                        })}
                      >
                        {formatCost(expense.total, true)}
                      </div>
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Grade.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  showRatio: PropTypes.bool,
  showTotal: PropTypes.bool,
};

Grade.defaultProps = {
  className: '',
  showRatio: false,
  showTotal: false,
};

export default Grade;
