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
    const { data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = data.find(i => i.id === selected);
    const cost = selectedItem ? selectedItem.expense.reduce((acc, d) => (acc + d.cost), 0) : 0;

    return (
      <div className="block">
        {
          selectedItem &&
          <Fragment>
            <div className="block__header">
              <Link className="link" to={Pages.HISTORY}>Расходы</Link>
            </div>
            <div className="history__expense">
              <span>&minus;</span>{formatCost(cost, true)} за&nbsp;{MONTHS[selectedItem.date.month]}
            </div>
            <Grade data={data} onItemSelect={selectMonth} wide />
          </Fragment>
        }
        {
          !selectedItem &&
          <div className="history__title">У&nbsp;вас пока нет расходов</div>
        }
      </div>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default History;
