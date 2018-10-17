import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Breadcrumbs from '../components/Breadcrumbs';
import CopyCode from '../components/CopyCode';
import Invites from '../components/Invites';
import Button from '../../../common/js/components/Button';
import Transitions from '../components/Transitions';
import { Pages, PROMO_CODES, LINKS, TITLES, LEFT, NOT_ACTIVATED } from '../constants';
import { convertStrings } from '../utils';

class Invite extends Component {
  state = {
    mode: '',
    invites: {
      items: [],
      desc: '',
    },
  };

  componentDidMount() {
    fetch('/media/info/invites.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(invites => invites.json())
      .then(invites => this.setState({ invites }));
  }

  setCopyMode = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    const { mode, invites: { items, desc } } = this.state;
    const { setCopyMode } = this;
    const count = items.reduce((acc, i) => {
      if (!i.active) {
        return acc + 1;
      }

      return acc;
    }, 0);
    let code = items.find(i => !i.active);
    code = code ? code.code : '';
    const meta = {
      title: TITLES.INVITES,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content invite">
              <Breadcrumbs items={[{ title: 'Обзор', link: Pages.OVERVIEW }]} />
              <div className="dashboard__header">
                Подарите близким возможность присоединиться к&nbsp;закрытому клубу Next Mobile
              </div>
              <div className="invite__text">{desc}</div>
              {
                count &&
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
              <CopyCode code={code} mode={mode} />
              <Invites items={items} />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

export default Invite;
