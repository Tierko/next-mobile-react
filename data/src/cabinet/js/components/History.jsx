import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment'

import Grade from './Grade';

import { formatCost } from '@cabinet/utils';
import { Pages, MONTHS } from '~/common/js/constants';

class History extends Component {
  state = {
    selected: moment(),
  }

  constructor(props) {
    const { data } = props;
    super(props);
  }

  selectMonth = ({ month }) => {
    this.setState({
      selectedNumberCard: month,
    });
  };

  render() {
    const { className, data } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = data.history.find(i => moment(i.month).isSame(selected, 'month'));
    const cost = selectedItem && selectedItem.total;

    return (
      <div className={`history ${className}`}>
        {
          selectedItem &&
          <Fragment>
            <div className="history__title">
              <Link className="link-overview" to={Pages.HISTORY}>Расходы</Link>
            </div>
            <div className="history__expense">&minus;{formatCost(cost)} за&nbsp;{moment(selectedItem.month).format('MMMM')}</div>
            <Grade data={data.history} onItemSelect={selectMonth} selected={selected} />
          </Fragment>
        }
        {
          !selectedItem &&
          <div className="history__title">У&nbsp;вас пока нет расходов за&nbsp;{selected.format('MMMM')}</div>
        }
      </div>
    );
  }
}

History.propTypes = {
  data: PropTypes.shape().isRequired,
  className: PropTypes.string,
};

History.defaultProps = {
  className: '',
};

export default History;
