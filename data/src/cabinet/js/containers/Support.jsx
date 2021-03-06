import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import Chat from '../components/Chat';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';

class Support extends Component {
  render() {
    return (
      <DocumentMeta title={TITLES.SUPPORT}>
        <MobileNav type="enter" />
        <Header />
        <Transitions classNames="slide">
          <div className="support">
            <div className="support__aside" />
            <div className="support__chat">
              <Chat />
            </div>
          </div>
        </Transitions>
      </DocumentMeta>
    );
  }
}

export default Support;
