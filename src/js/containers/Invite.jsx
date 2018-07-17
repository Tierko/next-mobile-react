import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import CopyCode from '../components/CopyCode';
import Invites from '../components/Invites';
import Button from '../components/Button';
import { Pages, PROMO_CODES, LINKS } from '../constants';
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
    fetch('/data/invites.json')
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

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content invite">
          <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
          <div className="dashboard__header">Подарите близким возможность присоединится к закрытому клубу Next Mobile</div>
          <div>{desc}</div>
          {
            count &&
            <div className="invite__subtitle">
              Осталось {
                count
              } {
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
      </div>,
    ]);
  }
}

export default Invite;
