import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '../../../common/js/components/Button';
import { URL } from '../constants';

class OverviewInvite extends Component {
  state = {
    copied: false,
  };

  onCopy = () => {
    const { code } = this;

    code.focus();
    code.select();

    clearTimeout(this.timer);

    this.setState({
      copied: true,
    });

    this.timer = setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 2500);

    try {
      setTimeout(() => {
        code.setSelectionRange(0, 9999);
      }, 1);
    } catch (e) {}

    try {
      document.execCommand('copy');
    } catch (e) {}

    try {
      navigator.clipboard.readText();
    } catch (e) {}
  };

  render() {
    let { code } = this.props;
    const { mode, className } = this.props;
    const { copied } = this.state;
    const { onCopy } = this;

    if (!code) {
      return false;
    }

    if (mode) {
      code = `${URL}/invite/${code}`;
    }

    return (
      <div className={`copy-code ${className}`}>
        <textarea
          value={code}
          ref={(e) => { this.code = e; }}
          onChange={() => {}}
          className={cs('copy-code__code', {
            'copy-code__code_link': mode === 'link',
          })}
        />
        <Button
          onClick={onCopy}
          primary
          className={cs('button_copy-code', {
            'button_copy-code-link': mode === 'link'
          })}
        >
          <span>{ copied ? 'Скопировано' : 'Скопировать' }</span>
        </Button>
      </div>
    );
  }
}

OverviewInvite.propTypes = {
  code: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  className: PropTypes.string,
};

OverviewInvite.defaultProps = {
  className: '',
};

export default OverviewInvite;
