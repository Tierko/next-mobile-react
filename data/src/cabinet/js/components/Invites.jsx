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
            <CopyCode code={i.code} mode={mode} className="copy-code_invites" />
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
