import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CopyCode from './CopyCode';
import { Pages } from '../constants';
import Button from './Button';

class OverviewInvite extends Component {
  state = {
    mode: '',
  };

  setCopyMode = (mode) => {
    this.setState({
      mode,
    });
  };

  render() {
    const { message, code } = this.props;
    const { mode } = this.state;
    const { setCopyMode } = this;

    if (!message || !code) {
      return false;
    }

    return (
      <div className="overview-invite">
        <Link className="overview-invite__header" to={Pages.INVITE}>
          <span>{message}</span>
        </Link>
        <div>
          По {
            mode === 'link' ?
              <Button className="button_code-mode" borderless onClick={() => setCopyMode('')}>промокоду</Button> :
              'промокоду'
          } или {
            mode !== 'link' ?
              <Button className="button_code-mode" borderless onClick={() => setCopyMode('link')}>ссылке</Button> :
              'ссылке'
          }
        </div>
        <CopyCode code={code} mode={mode} />
      </div>
    );
  }
}

OverviewInvite.propTypes = {
  message: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default OverviewInvite;