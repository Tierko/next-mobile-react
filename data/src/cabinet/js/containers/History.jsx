import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Expense from '../components/Expense';
import Operations from '../components/Operations';
import Transitions from '../components/Transitions';
import Notice from '../components/Notice';
import {TITLES} from '../constants';
import {getData} from '../utils';

function History(props) {
  const {history, expenses} = props;
  const meta = {
    title: TITLES.HISTORY,
  };

  return (
    <DocumentMeta {...meta}>
      <HeaderMobile />
      <MobileNav key="nav" type="dashboard" />
      <Notice />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content">
            <Expense history={history} data={expenses.items} />
            <Operations data={getData('operations')} />
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
}

History.propTypes = {
  history: PropTypes.shape().isRequired,
  expenses: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  const { Expenses } = state;

  return {
    expenses: Expenses,
  };
}

export default connect(mapStateToProps)(History);
