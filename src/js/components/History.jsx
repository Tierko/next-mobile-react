import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grade from './Grade';
import { formatCost } from '../utils';
import { Pages, MONTHS } from '../constants';

class History extends Component {
  constructor(props) {
    const { data } = props;
    super(props);
    this.state = {
      selected: data.length ? data[data.length - 1].id : -1,
    };
  }

  selectMonth = ({ id }) => {
    this.setState({
      selected: id,
    });
  };

  render() {
    const { className, data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = data.find(i => i.id === selected);
    const cost = selectedItem ? selectedItem.expense.reduce((acc, d) => (acc + d.cost), 0) : 0;

    return (
      <div className={`history ${className}`}>
        {
          selectedItem &&
          <Fragment>
            <div className="history__title">Ваши <Link className="link" to={Pages.HISTORY}>расходы</Link></div>
            <div className="history__expense">&minus;{formatCost(cost)} за {MONTHS[selectedItem.date.month]}</div>
            <Grade data={data} onItemSelect={selectMonth} />
          </Fragment>
        }
        {
          !selectedItem &&
          <div className="history__title">У вас пока нет расходов</div>
        }
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
