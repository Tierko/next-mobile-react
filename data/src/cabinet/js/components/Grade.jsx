import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { formatCost } from "../utils";
import { MONTHS_SHORT } from '../constants';

class Grade extends Component {
  static countExpense = (expense) => {
    if (Array.isArray(expense)) {
      return expense.reduce((acc, e) => (acc + e.cost), 0);
    }

    return expense;
  };

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
    const item = data.find(i => i.id === saved);

    this.setState({
      selected: saved,
    });

    onItemSelect(item || data[data.length - 1]);
  };

  selectItem = (e) => {
    const { onItemSelect, data } = this.props;
    const id = e.currentTarget.dataset.id * 1;
    const item = data.find(i => i.id === id);

    if (e.type === 'click') {
      this.setState({
        selected: id,
        saved: id,
      });
    } else {
      this.setState({
        selected: id,
      });
    }

    if (onItemSelect) {
      onItemSelect(item);
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
    const selected = this.state.selected === -1 ? data[data.length - 1].id : this.state.selected;
    const maxExpense = Math.max.apply(null, data.map(i => Grade.countExpense(i.expense)));

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
              data.map(e => (
                <div
                  onClick={selectItem}
                  onMouseEnter={selectItem}
                  key={e.id}
                  data-id={e.id}
                  className={cs('grade__item', {
                    grade__item_selected: e.id === selected,
                  })}
                >
                  <div
                    className={cs('grade__line', {
                      grade__line_selected: e.id === selected,
                    })}
                    style={{ height: (Grade.countExpense(e.expense) / maxExpense) * 100 }}
                  >
                    {
                      showRatio && e.expense.map(i => (
                        <div
                          className={`grade__subline grade__subline_${i.type}`}
                          style={{ flexGrow: i.cost }}
                        />
                      ))
                    }
                  </div>
                  <div className={cs('grade__month', { grade__month_selected: e.id === selected })}>
                    {MONTHS_SHORT[e.date.month]}
                  </div>
                  {
                    showTotal &&
                    <div
                      className={cs('grade__total', {
                        grade__total_selected: e.id === selected,
                      })}
                    >
                      {formatCost(Grade.countExpense(e.expense))}
                    </div>
                  }
                </div>
              ))
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
