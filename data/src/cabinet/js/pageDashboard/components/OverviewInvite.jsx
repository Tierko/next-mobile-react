import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '~/common/js/components/Button';

import CopyCode from '@cabinet/components/CopyCode';

import { Pages } from '~/common/js/constants';

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

    if (!message || !code || !link) {
      return null;
    }

    return (
      <div className="block block_round overview-invite">
        <Link className="overview-invite__header" to={Pages.INVITE}>
          {message}
        </Link>
        <div>
          { message ? `${message} по` : 'По'}&nbsp;{
            mode === 'link' ?
              <Button className="button_code-mode" onClick={() => setCopyMode('')}>промо-коду</Button> :
              'промо-коду'
          } или {
            mode !== 'link' ?
              <Button className="button_code-mode" onClick={() => setCopyMode('link')}>ссылке</Button> :
              'ссылке'
          }
        </div>
        <CopyCode link={link} code={code.code} mode={mode} />
      </div>
    );
  }
}

OverviewInvite.propTypes = {
  message: PropTypes.string.isRequired,
  code: PropTypes.shape(),
  link: PropTypes.string,
};

export default OverviewInvite;
