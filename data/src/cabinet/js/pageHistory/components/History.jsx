import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import MobileNav from '~/common/js/components/MobileNav';

import HeaderMobile from '@cabinet/components/HeaderMobile';
import Aside from '@cabinet/components/Aside';
import Transitions from '@cabinet/components/Transitions';
import { TITLES } from '~/common/js/constants';

import Operations from './Operations';
import Expense from './Expense';

import { getData } from '@cabinet/utils';


const History = ({
                   history,
                   historyGroups,
                   historyDetail,
                   historyDetailIsLoading,
                   pageHistoryFiltersFormActions,
                 }) => {
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
            <Expense history={history} data={historyGroups} />
            <div className="dashboard__header">История операций</div>
            <Operations
              data={historyDetail}
              pageHistoryFiltersFormActions={pageHistoryFiltersFormActions}
              historyDetailIsLoading={historyDetailIsLoading}
            />
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

History.propTypes = {
  history: PropTypes.shape().isRequired,
  historyGroups: PropTypes.shape().isRequired,
  historyDetail: PropTypes.shape().isRequired,
  historyDetailIsLoading: PropTypes.bool.isRequired,
  pageHistoryFiltersFormActions: PropTypes.shape().isRequired,
};

export default History;
