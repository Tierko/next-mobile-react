import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grade from './Grade';
import { formatCost } from '../utils';
import { Pages, MONTHS } from '../constants';

class History extends Component {
  state = {
    selected: -1,
  };

  selectMonth = ({month}) => {
    this.setState({
      selected: month,
    });
  };

  render() {
    const { data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = selected === -1 ? data[0] : data.find(i => i.month === selected);
    const cost = selectedItem ? selectedItem.total : 0;
    const selectedItemMonth = selectedItem ? (new Date(selectedItem.month)).getMonth() : 0;

    return (
      <div className="block block_round">
        {
          selectedItem &&
          <Fragment>
            <div className="block__header">
              <Link className="link" to={Pages.HISTORY}>Расходы</Link>
            </div>
            <Grade data={data} onItemSelect={selectMonth} wide />
            <div className="history__expense">
              <span>&minus;</span>{formatCost(cost, true)} за&nbsp;{MONTHS[selectedItemMonth].toLowerCase()}
            </div>
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
