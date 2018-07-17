import React, { Component } from 'react';
import Button from './Button';

class OverviewInvite extends Component {
  onCopy = () => {
    const { code } = this;

    code.focus();
    code.select();

    try {
      document.execCommand('copy');
    } catch (e) {}
  };

  render() {
    const { onCopy } = this;

    return (
      <div className="copy-code">
        <input className="copy-code__code" value="xj31a5vgue" ref={(e) => { this.code = e; }} onChange={() => {}} />
        <Button onClick={onCopy}>Скопировать</Button>
      </div>
    );
  }
}

export default OverviewInvite;
