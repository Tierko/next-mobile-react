import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyCode from './CopyCode';

class Invites extends Component {

  render() {
    const { items, mode } = this.props;

    return (
      <div className="invites">
        {
          items.map(i => (
            !i.active && <CopyCode code={i.code} mode={mode} className="copy-code_invites" />
          ))
        }
        {
          items.map(i => (
            i.active &&
            <div key={i.id} className="invites__item">
              <div className="invites__row">
                <div className="invites__code invites__code_active">{i.code}</div>
                <div className="invites__span" />
                <div className="invites__status">Не&nbsp;активирован</div>
              </div>
              <div className="invites__note">{i.note}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

Invites.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  mode: PropTypes.string.isRequired,
};

export default Invites;
