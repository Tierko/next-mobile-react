import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { URL } from '../constants';

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
    let { code } = this.props;
    const { mode } = this.props;
    const { onCopy } = this;

    if (!code) {
      return false;
    }

    if (mode) {
      code = `${URL}/invite/${code}`;
    }

    return (
      <div className="copy-code">
        <input className="copy-code__code" value={code} ref={(e) => { this.code = e; }} onChange={() => {}} />
        <Button onClick={onCopy}>Скопировать</Button>
      </div>
    );
  }
}

OverviewInvite.propTypes = {
  code: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

export default OverviewInvite;
