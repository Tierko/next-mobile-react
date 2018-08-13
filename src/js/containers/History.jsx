import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Expense from '../components/Expense';
import Operations from '../components/Operations';
import { getData } from '../utils';

class History extends Component {
  render() {
    const { history } = this.props;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="dashboard__header dashboard__header_center">Расходы</div>
          <Expense history={history} data={getData('history')} />
          <div className="dashboard__header dashboard__header_center">История операций</div>
          <Operations data={getData('operations')} />
        </div>
      </div>,
    ]);
  }
}

History.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default History;
