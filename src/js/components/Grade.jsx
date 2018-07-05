import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { monthsShort } from '../constants';

class Grade extends Component {
  static countExpense = (expense) => {
    if (Array.isArray(expense)) {
      return expense.reduce((acc, e) => (acc + e.cost), 0);
    }

    return expense;
  };

  state = {
    selected: -1,
  };

  selectItem = (e) => {
    const { onItemSelect, data } = this.props;
    const id = e.currentTarget.dataset.id * 1;
    const item = data.find(i => i.id === id);

    this.setState({
      selected: id,
    });

    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  render() {
    const { selectItem } = this;
    const { data, className, wide } = this.props;
    const selected = this.state.selected === -1 ? data[data.length - 1].id : this.state.selected;
    const maxExpense = Math.max.apply(null, data.map(i => Grade.countExpense(i.expense)));

    return (
      <div className={`grade ${className}`}>
        <div className="grade__items">
          {
            data.map(e => (
              <div
                onMouseEnter={selectItem}
                key={e.id}
                className="grade__item"
                data-id={e.id}
              >
                <div
                  className={cs('grade__line', {
                    grade__line_selected: e.id === selected,
                    grade__line_wide: wide,
                  })}
                  style={{ height: (Grade.countExpense(e.expense) / maxExpense) * 100 }}
                />
                {
                  wide &&
                  <div className={cs('grade__month', { grade__month_selected: e.id === selected })}>
                    {monthsShort[e.date.month]}
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Grade.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  wide: PropTypes.bool,
};

Grade.defaultProps = {
  className: '',
  wide: false,
};

export default Grade;
