import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../constants';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.data[props.data.length - 1].id,
    };
  }

  selectMonth = (e) => {
    const { id } = e.target.dataset;

    this.setState({
      selected: id * 1,
    });
  };

  render() {
    const { className, data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const maxExpense = Math.max.apply(null, data.map(i => i.expense));
    const selectedItem = data.find(i => i.id === selected);

    return (
      <div className={`history ${className}`}>
        <div className="history__title">Ваши <Link className="link" to={Pages.History}>расходы</Link></div>
        <div className="history__expense">- {selectedItem.expense} ₽ за {selectedItem.month}</div>
        <div className="history__items">
          {
            data.map(e => (
              <div
                onClick={selectMonth}
                key={e.id}
                className={cs('history__item', { history__item_selected: e.id === selected })}
                data-id={e.id}
                style={{ height: (e.expense / maxExpense) * 100 }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

History.defaultProps = {
  className: '',
};

export default History;
