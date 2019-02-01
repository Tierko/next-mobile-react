import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import MobileNav from '~/common/js/components/MobileNav';
import Button from '~/common/js/components/Button';

import HeaderMobile from '@cabinet/components/HeaderMobile';
import Aside from '@cabinet/components/Aside';
import Breadcrumbs from '@cabinet/components/Breadcrumbs';
import CopyCode from '@cabinet/components/CopyCode';
import Invites from '@cabinet/components/Invites';
import Transitions from '@cabinet/components/Transitions';

import {
  Pages,
  PROMO_CODES,
  LINKS,
  TITLES,
  LEFT,
  NOT_ACTIVATED,
  PROMO_STATUS_NEW,
} from '~/common/js/constants';
import { convertStrings } from '@cabinet/utils';

class Invite extends Component {
  state = {
    mode: '',
  };

  setCopyMode = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    const {
      invites,
    } = this.props
    const { mode } = this.state;
    const { setCopyMode } = this;
    const count = invites.invites.reduce((acc, i) => {
      if (i.status === PROMO_STATUS_NEW) {
        return acc + 1;
      }

      return acc;
    }, 0);
    let code = invites.invites.find(i => i.status === PROMO_STATUS_NEW);
    code = code ? code.code : '';
    const meta = {
      title: TITLES.INVITES,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white invite">
              <Breadcrumbs
                items={[{ title: 'Обзор', link: Pages.OVERVIEW }]}
                current={TITLES.INVITES}
              />
              <div className="dashboard__header">
                Подарите близким возможность присоединиться к&nbsp;закрытому клубу Next Mobile
              </div>
              <div className="invite__text">{invites.remaining}</div>
              {
                !!count &&
                <div className="invite__subtitle">
                  {convertStrings(count, LEFT)} {count} {convertStrings(count, NOT_ACTIVATED)} {
                    mode === 'link' ?
                      <Button className="button_code-mode" borderless onClick={() => setCopyMode('')}>
                        {convertStrings(count, PROMO_CODES)}
                      </Button> :
                      convertStrings(count, PROMO_CODES)
                  } или {
                    mode !== 'link' ?
                      <Button className="button_code-mode" borderless onClick={() => setCopyMode('link')}>
                        {convertStrings(count, LINKS)}
                      </Button> :
                      convertStrings(count, LINKS)
                  } для активации
                </div>
              }
              <Invites items={items} mode={mode} />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Invite.propTypes = {
  invites: PropTypes.shape().isRequired,
};

export default Invite;
