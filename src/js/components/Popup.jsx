import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Popup extends Component {
  render() {
    const { show, children } = this.props;

    return (
      <div className={cs('popup', { popup_show: show })}>
        <div className="popup__inner">
          <div className="popup__content" ref={(e) => { this.content = e; }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
