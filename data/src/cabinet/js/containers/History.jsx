import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Expense from '../components/Expense';
import Operations from '../components/Operations';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';
import { getData } from '../utils';

const History = ({ history }) => {
  const meta = {
    title: TITLES.HISTORY,
  };

  return (
    <DocumentMeta {...meta}>
      <HeaderMobile />
      <MobileNav key="nav" type="dashboard" />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content">
            <div className="dashboard__header">Расходы</div>
            <Expense history={history} data={getData('history')} />
            <div className="dashboard__header">История операций</div>
            <Operations data={getData('operations')} />
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

History.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default History;
