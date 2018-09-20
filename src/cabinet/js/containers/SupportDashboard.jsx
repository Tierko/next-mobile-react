import React from 'react';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Chat from '../components/Chat';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';

const SupportDashboard = () => {
  const meta = {
    title: TITLES.SUPPORT,
  };

  return (
    <DocumentMeta {...meta}>
      <MobileNav key="nav" type="dashboard" />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content dashboard__content_support">
            <Chat className="chat_dashboard" />
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

export default SupportDashboard;
