import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OperationsList from './OperationsList';
import OperationsTable from './OperationsTable';
import {
  HISTORY_FILTERS,
  MONTHS_SHORT,
  THIRTY_DAYS,
} from '../constants';

class Operations extends Component {
  static formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day} ${MONTHS_SHORT[month]} ${year}`;
  };

  state = {
    filterBy: HISTORY_FILTERS[0],
    periodStart: new window.Date(window.Date.now() - THIRTY_DAYS),
    periodEnd: new window.Date(),
    show: 10,
    loaded: false,
    sort: {
      type: 'date',
      order: 'desc',
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 1500);
  }

  onChange = (name, value) => {
    const { periodStart, periodEnd } = this.state;

    if (name === 'periodStart' && value.getTime() >= periodEnd.getTime()) {
      return;
    }

    if (name === 'periodEnd' && value.getTime() <= periodStart.getTime()) {
      return;
    }

    if (name === 'filterBy') {
      this.setState({
        [name]: value,
        loaded: false,
      });

      setTimeout(() => {
        this.setState({
          loaded: true,
        });
      }, 1000);
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  filter = (data) => {
    const { filterBy } = this.state;

    if (filterBy.id === 1) {
      return data;
    }

    return data.filter(d => d.type === filterBy.id);
  };

  loadMore = () => {
    const { show } = this.state;

    this.setState({
      show: show + 10,
    });
  };

  setSort = (type) => {
    const { sort } = this.state;
    const newSort = { type };

    if (sort.type === type) {
      newSort.order = sort.order === 'desc' ? 'asc' : 'desc';
    } else {
      newSort.order = 'desc';
    }

    this.setState({
      sort: newSort,
    });
  };

  render() {
    const {
      onChange,
      filter,
      loadMore,
      setSort,
    } = this;
    const {
      filterBy,
      periodStart,
      periodEnd,
      show,
      loaded,
      sort,
    } = this.state;
    const { data } = this.props;
    const filteredData = filter(data).slice(0, show).sort((a, b) => {
      const { type, order } = sort;
      let aa = a[type];
      let bb = b[type];

      if (type === 'date') {
        aa = (new window.Date(a.date.year, a.date.month, a.date.day)).getTime();
        bb = (new window.Date(b.date.year, b.date.month, b.date.day)).getTime();
      }

      if (aa > bb && order === 'desc') {
        return 1;
      } else if (aa > bb && order === 'asc') {
        return -1;
      }

      if (aa < bb && order === 'desc') {
        return -1;
      } else if (aa < bb && order === 'asc') {
        return 1;
      }

      return 0;
    });
    const { formatDate } = Operations;

    return (
      <div className="block block_operations">
        <div className="h1">История операций</div>
        {
          !data.length &&
          <div className="operations__empty">У&nbsp;вас нет данных за&nbsp;указанный период</div>
        }
        <OperationsTable
          loaded={loaded}
          data={filteredData}
          onChange={onChange}
          periodStart={periodStart}
          periodEnd={periodEnd}
          filterBy={filterBy}
          loadMore={loadMore}
          sort={sort}
          setSort={setSort}
        />
        <OperationsList
          loaded={loaded}
          data={filteredData}
          onChange={onChange}
          periodStart={periodStart}
          periodEnd={periodEnd}
          formatDate={formatDate}
          filterBy={filterBy}
          loadMore={loadMore}
        />
      </div>
    );
  }
}

Operations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Operations;
