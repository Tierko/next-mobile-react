import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import PageFade from '../components/PageFade';
import Expense from '../components/Expense';
import Operations from '../components/Operations';

class History extends Component {
  static history = [{
    id: 1,
    date: {
      year: 2020,
      month: 8,
      day: 10,
    },
    time: '22:40',
    type: 3,
    count: 80,
    unit: 'time',
    cost: 0,
    note: 'на номер +7 905 123-45-66',
  }, {
    id: 2,
    date: {
      year: 2020,
      month: 8,
      day: 10,
    },
    time: '9:40',
    type: 8,
    count: 80,
    unit: 'time',
    cost: 0,
    note: 'с номера +7 905 666-45-66',
  }, {
    id: 3,
    date: {
      year: 2020,
      month: 8,
      day: 9,
    },
    time: '17:40',
    type: 7,
    cost: 2200,
    note: 'с баланса',
  }, {
    id: 4,
    date: {
      year: 2020,
      month: 8,
      day: 9,
    },
    time: '14:10',
    type: 2,
    count: 40,
    unit: 'СМС',
    cost: 200,
    note: 'с карты *9333',
  }, {
    id: 5,
    date: {
      year: 2020,
      month: 8,
      day: 9,
    },
    time: '13:15',
    type: 2,
    count: 500,
    unit: 'Мб',
    cost: 1200,
    note: 'с баланса',
  }, {
    id: 6,
    date: {
      year: 2020,
      month: 8,
      day: 9,
    },
    time: '10:40',
    type: 4,
    count: 80,
    unit: 'time',
    cost: 133,
    note: 'на номер + 1 800 123-45-67',
    tariff: 100,
  }];

  render() {
    const { history: data } = History;
    const { history } = this.props;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="dashboard__header dashboard__header_center">Расходы</div>
          <Expense history={history} />
          <div className="dashboard__header dashboard__header_center">История операций</div>
          <Operations data={data} />
        </div>
      </div>,
    ]);
  }
}

PropTypes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(History);
