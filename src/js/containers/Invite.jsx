import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import CopyCode from '../components/CopyCode';
import Invites from '../components/Invites';
import { Pages } from '../constants';

class Invite extends Component {
  state = {
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

  render() {
    const { invites } = this.state;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content invite">
          <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
          <div className="dashboard__header">Подарите близким возможность присоединится к закрытому клубу Next Mobile</div>
          <div>{invites.desc}</div>
          <div className="invite__subtitle">Осталось 7 промокодов или ссылок для активации</div>
          <CopyCode />
          <Invites items={invites.items} />
        </div>
      </div>,
    ]);
  }
}

export default Invite;
