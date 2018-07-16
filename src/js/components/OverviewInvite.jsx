import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Pages } from '../constants';

class OverviewInvite extends Component {
  onCopy = () => {
    const { code } = this;
    let cuccess = false;

    code.focus();
    code.select();

    try {
      cuccess = document.execCommand('copy');
    } catch (e) {}

    console.log(cuccess)
  };

  render() {
    const { onCopy } = this;

    return (
      <div className="overview-invite">
        <Link className="overview-invite__header" to={Pages.INVITE}>
          <span>6 месяцев бесплатной связи для близких</span>
        </Link>
        <div className="overview-invite__link">По промокоду или <Link className="link" to="">ссылке</Link></div>
        <input className="overview-invite__code" value="xj31a5vgue" ref={(e) => { this.code = e; }} />
        <Button onClick={onCopy}>Скопировать</Button>
      </div>
    );
  }
}

export default OverviewInvite;
